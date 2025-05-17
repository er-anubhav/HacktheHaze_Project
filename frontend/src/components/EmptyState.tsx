
import React from "react";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

const EmptyState = () => {
  return (
    <Card className="p-12 flex flex-col items-center justify-center text-center">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <Search className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Images Yet</h3>
      <p className="text-gray-500 max-w-md">
        Enter one or more URLs above and click "Scrape Images" to find and display images from those websites.
      </p>
    </Card>
  );
};

export default EmptyState;
