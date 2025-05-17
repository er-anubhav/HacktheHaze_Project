
# Hack The Haze - Fullstack Image Scraper

This project is a fullstack web application that accepts URLs from users, scrapes the web pages, and returns all the image links found.

## 🚀 Features

- 📝 Input field to enter one or multiple URLs (comma-separated or multiline)
- 🖼️ Display all image results in a responsive grid or list view
- 🔄 Loading state handling
- ❌ Error state handling
- 🔍 URL validation and normalization
- 🔗 Copy image URLs to clipboard
- 📱 Fully responsive design

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Shadcn UI component library
- React Router for navigation

### Backend
- Node.js with Express
- Cheerio for HTML parsing
- Axios for HTTP requests

## 📷 Screenshots

[Screenshots will be added here]

## 🏗️ Project Structure

```
hackthehaze-fullstack-image-scraper/
├── client/              # Frontend (React.js)
│   ├── src/
│   │   ├── components/  # UI Components
│   │   └── pages/       # Page components
├── server/              # Backend (Node.js with Express)
│   ├── index.js         # Main server file
└── README.md
```

## 🚀 Getting Started

### Frontend

```bash
# From project root
cd client
npm install
npm start
```

### Backend

```bash
# From project root
cd server
npm install
npm run dev
```

## 🧠 Implementation Approach

### Image Scraping Strategy

The application scrapes images by:
1. Making HTTP requests to provided URLs
2. Parsing the HTML content using Cheerio
3. Extracting image URLs from various sources:
   - Standard `<img>` tags
   - CSS background images
   - Image sources in `srcset` attributes
4. Normalizing relative URLs to absolute URLs
5. Deduplicating images to avoid repetition

### Challenges and Solutions

- **Challenge**: Handling relative URLs
  - **Solution**: Normalizing paths to absolute URLs using URL resolution

- **Challenge**: Extracting images from various sources
  - **Solution**: Implemented multiple extraction methods (img tags, srcset, CSS backgrounds)

- **Challenge**: Responsive display of varying image sizes
  - **Solution**: Created a flexible grid layout with consistent card heights

## 🔮 Future Enhancements

With more time, I would add:
- Image metadata extraction (dimensions, file type, etc.)
- Image caching to improve performance
- User authentication with saved scraping history
- Filtering options for images (by size, type, etc.)
- Advanced URL crawling for multi-page scraping
- Pagination for large image collections

## 📝 License

[MIT License](LICENSE)
