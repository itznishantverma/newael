"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  type: "sidebar" | "wide";
  className?: string;
}

export default function AdBanner({ type, className }: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={cn(
      "bg-muted/50 border rounded-lg overflow-hidden",
      type === "sidebar" ? "p-4" : "p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Advertisement</span>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className={cn(
        "bg-muted/30 rounded flex items-center justify-center",
        type === "sidebar" ? "h-[600px]" : "h-[90px] md:h-[120px]"
      )}>
        <span className="text-muted-foreground">
          {type === "sidebar" ? "300 x 600" : "Banner"} Ad Space
        </span>
      </div>
    </div>
  );
}