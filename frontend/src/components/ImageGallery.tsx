
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import ImageCard from "@/components/ImageCard";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {images.length} {images.length === 1 ? "Image" : "Images"} Found
        </h2>
        <div className="flex gap-2">
          <Button 
            variant={view === "grid" ? "default" : "outline"} 
            onClick={() => setView("grid")}
            size="sm"
          >
            Grid
          </Button>
          <Button 
            variant={view === "list" ? "default" : "outline"} 
            onClick={() => setView("list")}
            size="sm"
          >
            List
          </Button>
          <CopyToClipboard text={images.join('\n')} />
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <ImageCard key={index} imageUrl={imageUrl} />
          ))}
        </div>
      ) : (
        <Card className="p-4">
          <ul className="space-y-2">
            {images.map((imageUrl, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="truncate flex-1 mr-4">
                  <a 
                    href={imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600 hover:text-blue-800"
                  >
                    {imageUrl}
                  </a>
                </div>
                <CopyToClipboard text={imageUrl} showTooltip={false} />
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default ImageGallery;
