
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CopyToClipboardProps {
  text: string;
  showTooltip?: boolean;
}

export const CopyToClipboard = ({ text, showTooltip = true }: CopyToClipboardProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const button = (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleCopy} 
      className="gap-2"
    >
      {copied ? (
        <ClipboardCheck className="h-4 w-4" />
      ) : (
        <Clipboard className="h-4 w-4" />
      )}
      {text.includes('\n') && "Copy All"}
    </Button>
  );

  if (!showTooltip) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
