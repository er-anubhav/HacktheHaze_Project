
import React from "react";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <Card className="p-12 flex flex-col items-center justify-center text-center">
      <div className="bg-red-100 p-4 rounded-full mb-4">
        <X className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Error Occurred</h3>
      <p className="text-red-500 mb-2">{message}</p>
      <p className="text-gray-500 max-w-md">
        Please check the URLs you entered and try again. Make sure you have a proper
        internet connection and the URLs are accessible.
      </p>
    </Card>
  );
};

export default ErrorState;
