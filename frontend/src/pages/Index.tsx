
import React, { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, Search } from "lucide-react";
import UrlInput from "@/components/UrlInput";
import ImageGallery from "@/components/ImageGallery";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { scrapeImages } from "@/lib/api";

const Index = () => {
  const { user } = useUser();
  const [urls, setUrls] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!urls.trim()) {
      toast.error("Please enter at least one URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const urlList = urls
        .split(/[\n,]/)
        .map(url => url.trim())
        .filter(url => url.length > 0);
      
      if (urlList.length === 0) {
        throw new Error("No valid URLs provided");
      }
      
      const data = await scrapeImages(urlList);
      
      // Convert the results object to an array of image URLs
      const allImages: string[] = Object.values(data.results).flat();
      setImages(allImages);
      
      if (allImages.length === 0) {
        toast.info("No images found on the provided URLs");
      } else {
        toast.success(`Found ${allImages.length} images`);
        
        // Store scrape history if user is logged in
        if (user) {
          await supabase.from('scrape_history').insert({
            user_id: user.id,
            urls: urlList,
            image_count: allImages.length,
            metadata: {
              errors: data.errors || null,
              scrapedUrls: Object.keys(data.results).length
            }
          });
        }
      }
    } catch (error) {
      console.error("Error scraping images:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error("Failed to scrape images");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Hack The Haze</h1>
        <p className="text-xl text-gray-600">Image Scraper</p>
      </div>

      <Card className="p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <UrlInput 
            value={urls} 
            onChange={(e) => setUrls(e.target.value)}
            disabled={isLoading}
          />
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Scraping...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Scrape Images</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {error ? (
        <ErrorState message={error} />
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader className="h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-lg text-gray-600">Scraping images...</p>
        </div>
      ) : images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Index;
