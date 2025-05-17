
import React from "react";
import ScrapeHistory from "@/components/ScrapeHistory";

const HistoryPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Scrape History</h1>
        <p className="text-xl text-gray-600">View your previous image scraping sessions</p>
      </div>

      <ScrapeHistory />
    </div>
  );
};

export default HistoryPage;
