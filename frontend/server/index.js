
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const validUrl = require('valid-url');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Normalize URL (add protocol if missing)
const normalizeUrl = (url) => {
  if (!url) return null;
  url = url.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

// Validate URL
const isValidUrl = (url) => {
  return validUrl.isUri(url);
};

// Extract images from a single URL
const scrapeImagesFromUrl = async (url) => {
  try {
    // Normalize URL
    const normalizedUrl = normalizeUrl(url);
    
    if (!isValidUrl(normalizedUrl)) {
      return {
        url,
        error: 'Invalid URL format',
        images: []
      };
    }

    // Fetch page content
    const response = await axios.get(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Parse HTML
    const $ = cheerio.load(response.data);
    const images = [];
    const seenUrls = new Set(); // To avoid duplicates

    // Get all img tags
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        let imageUrl = src;
        
        // Handle relative URLs
        if (src.startsWith('/')) {
          const baseUrl = new URL(normalizedUrl);
          imageUrl = `${baseUrl.origin}${src}`;
        } else if (!src.startsWith('http')) {
          imageUrl = new URL(src, normalizedUrl).href;
        }

        // Add only if not seen before
        if (!seenUrls.has(imageUrl)) {
          seenUrls.add(imageUrl);
          images.push(imageUrl);
        }
      }
    });

    // Get images from srcset
    $('img[srcset], source[srcset]').each((_, element) => {
      const srcset = $(element).attr('srcset');
      if (srcset) {
        // Parse srcset to get URLs
        const srcsetUrls = srcset.split(',').map(part => {
          const [url] = part.trim().split(' ');
          if (url) {
            // Handle relative URLs
            if (url.startsWith('/')) {
              const baseUrl = new URL(normalizedUrl);
              return `${baseUrl.origin}${url}`;
            } else if (!url.startsWith('http')) {
              return new URL(url, normalizedUrl).href;
            }
            return url;
          }
          return null;
        }).filter(Boolean);
        
        // Add only unique URLs
        srcsetUrls.forEach(url => {
          if (!seenUrls.has(url)) {
            seenUrls.add(url);
            images.push(url);
          }
        });
      }
    });

    // Get CSS background images
    $('[style*="background"]').each((_, element) => {
      const style = $(element).attr('style');
      if (style) {
        const match = style.match(/background(-image)?\s*:\s*url\(['"]?([^'")]+)['"]?\)/i);
        if (match && match[2]) {
          let imageUrl = match[2];
          
          // Handle relative URLs
          if (imageUrl.startsWith('/')) {
            const baseUrl = new URL(normalizedUrl);
            imageUrl = `${baseUrl.origin}${imageUrl}`;
          } else if (!imageUrl.startsWith('http')) {
            imageUrl = new URL(imageUrl, normalizedUrl).href;
          }
          
          if (!seenUrls.has(imageUrl)) {
            seenUrls.add(imageUrl);
            images.push(imageUrl);
          }
        }
      }
    });

    return {
      url: normalizedUrl,
      error: null,
      images
    };
  } catch (error) {
    return {
      url,
      error: error.message,
      images: []
    };
  }
};

// API route to scrape images from multiple URLs
app.post('/api/scrape', async (req, res) => {
  try {
    const { urls } = req.body;
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one valid URL' });
    }
    
    // Scrape each URL in parallel
    const results = await Promise.all(
      urls.map(url => scrapeImagesFromUrl(url))
    );
    
    // Collect results
    const allImages = [];
    const errors = [];
    const seenUrls = new Set(); // For global deduplication
    
    results.forEach(result => {
      if (result.error) {
        errors.push({ url: result.url, error: result.error });
      }
      
      result.images.forEach(imageUrl => {
        if (!seenUrls.has(imageUrl)) {
          seenUrls.add(imageUrl);
          allImages.push(imageUrl);
        }
      });
    });
    
    res.json({
      images: allImages,
      errors: errors.length > 0 ? errors : null,
      totalImages: allImages.length,
      scrapedUrls: results.length
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
