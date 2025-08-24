"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AdBannerProps {
  className?: string;
  type: "sidebar" | "wide" | "mobile";
}

export default function AdBanner({ className, type }: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getAdContent = () => {
    switch (type) {
      case "sidebar":
        return (
          <div className="bg-muted/50 border rounded-lg overflow-hidden flex flex-col items-center justify-center p-4 w-full h-[600px]">
            <div className="text-xs text-muted-foreground mb-2">Advertisement</div>
            <div className="w-[300px] h-[540px] bg-muted/80 rounded flex items-center justify-center">
              <p className="text-muted-foreground text-sm">300 x 600 Ad Space</p>
            </div>
          </div>
        );
      case "wide":
        return (
          <div className={`bg-muted/50 border rounded-lg overflow-hidden ${className}`}>
            <div className="flex items-center justify-between px-4 py-1">
              <div className="text-xs text-muted-foreground">Advertisement</div>
              <button 
                onClick={() => setDismissed(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center h-[90px] md:h-[120px] bg-muted/80">
              <p className="text-muted-foreground text-sm">Banner Ad Space</p>
            </div>
          </div>
        );
      case "mobile":
        return (
          <div className="bg-muted/50 border rounded-lg overflow-hidden p-3 w-full">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs text-muted-foreground">Advertisement</div>
              <button 
                onClick={() => setDismissed(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <div className="h-[100px] bg-muted/80 rounded flex items-center justify-center">
              <p className="text-muted-foreground text-xs">Mobile Ad Space</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return getAdContent();
}