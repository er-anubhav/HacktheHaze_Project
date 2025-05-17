
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UrlInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const UrlInput = ({ value, onChange, disabled = false }: UrlInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="urls">Enter URLs to scrape (one per line or comma-separated)</Label>
      <Textarea
        id="urls"
        placeholder="https://example.com
https://another-website.com
Or separate with commas: site1.com, site2.com"
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={5}
        className="w-full font-mono text-sm"
      />
      <p className="text-xs text-gray-500">
        Enter complete URLs including http:// or https:// for best results
      </p>
    </div>
  );
};

export default UrlInput;
