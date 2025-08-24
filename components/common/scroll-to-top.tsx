"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  className?: string;
}

export default function ScrollToTop({ className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className={cn("fixed bottom-6 right-6 flex flex-col gap-3", className)}>
      <Button
        size="icon"
        variant="secondary"
        onClick={scrollToTop}
        className="rounded-full h-10 w-10"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full h-10 w-10"
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}