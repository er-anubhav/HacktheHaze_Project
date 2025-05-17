
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader, Link } from "lucide-react";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ImageCardProps {
  imageUrl: string;
}

const ImageCard = ({ imageUrl }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <Card className="overflow-hidden font-serif flex flex-col">
      <div className="relative h-40 bg-gray-100">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-4">
              <p className="text-sm text-gray-500">Failed to load image</p>
            </div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Scraped content"
            className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
      </div>
      
      <div className="p-3 bg-white flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <Link className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs max-w-xs truncate">{imageUrl}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <CopyToClipboard text={imageUrl} />
      </div>
    </Card>
  );
};

export default ImageCard;
