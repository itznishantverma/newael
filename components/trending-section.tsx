"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrendingUp, Eye, Bookmark } from "lucide-react";

// Mock data - would be fetched from Supabase in a real implementation
const trendingArticles = [
  {
    id: 1,
    title: "How Web3 is Redefining Digital Ownership",
    image: "https://images.pexels.com/photos/8369590/pexels-photo-8369590.jpeg",
    views: 4580,
    bookmarks: 342
  },
  {
    id: 2,
    title: "The Rising Importance of Cybersecurity in Remote Work",
    image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
    views: 3950,
    bookmarks: 275
  },
  {
    id: 3,
    title: "Global Supply Chain Challenges in the Post-Pandemic Era",
    image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg",
    views: 3670,
    bookmarks: 198
  },
  {
    id: 4,
    title: "Innovative Approaches to Sustainable Urban Planning",
    image: "https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg",
    views: 2890,
    bookmarks: 215
  },
  {
    id: 5,
    title: "The Psychology of Decision Making: New Research Insights",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    views: 2450,
    bookmarks: 187
  },
  {
    id: 6,
    title: "Advances in Renewable Energy Technology",
    image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg",
    views: 2130,
    bookmarks: 164
  }
];

export default function TrendingSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(checkScrollability, 400);
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(checkScrollability, 400);
    }
  };

  return (
    <section className="py-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          onScroll={checkScrollability}
        >
          {trendingArticles.map((article) => (
            <Card key={article.id} className="flex-shrink-0 w-[280px] md:w-[320px] overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={article.image}
                  fill
                  alt={article.title}
                  className="object-cover"
                />
              </div>
              
              <CardContent className="p-4">
                <Link href={`/articles/${article.id}`}>
                  <h3 className="font-medium text-base mb-3 line-clamp-2 hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {article.views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Bookmark className="h-3 w-3 mr-1" />
                    {article.bookmarks.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="h-1 w-10 bg-muted-foreground/30 rounded-full">
            <div className="h-full w-1/2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}