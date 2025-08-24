"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data - would be fetched from Supabase in a real implementation
const trendingArticles = [
  {
    id: 1,
    title: "The Future of AI in Everyday Applications",
    excerpt: "Discover how artificial intelligence is transforming daily life and what to expect in the coming years.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    date: "May 15, 2025",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "Sustainable Living: Small Changes, Big Impact",
    excerpt: "Learn how making minor adjustments to your daily routine can contribute significantly to environmental conservation.",
    image: "https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg",
    author: {
      name: "Sophia Chen",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    date: "May 12, 2025",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "The Psychology Behind Successful Habit Formation",
    excerpt: "Understanding the mental frameworks that help establish long-lasting positive habits.",
    image: "https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg",
    author: {
      name: "Marcus Williams",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    date: "May 10, 2025",
    readTime: "5 min read"
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const article = trendingArticles[currentIndex];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === trendingArticles.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-b from-transparent to-secondary/20 dark:to-secondary/5 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12">
        {isLoaded && article ? (
          <Card className={cn(
            "overflow-hidden border-0 shadow-lg transition-all duration-500 ease-in-out",
            "transform translate-y-0 opacity-100",
            !isLoaded && "translate-y-4 opacity-0"
          )}>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
              <Image 
                src={article.image} 
                fill
                alt={article.title}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-white text-sm font-medium">{article.author.name}</div>
                  <div className="text-white/70 text-sm">•</div>
                  <div className="text-white/70 text-sm">{article.date}</div>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{article.title}</h1>
                
                <p className="text-white/80 mb-4 max-w-3xl hidden sm:block">{article.excerpt}</p>
                
                <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                  <Button className="gap-1.5" variant="default">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Bookmark className="h-4 w-4 mr-1.5" /> Bookmark
                  </Button>
                  <div className="flex items-center text-white/80 text-sm ml-2">
                    <Clock className="h-4 w-4 mr-1.5" /> {article.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="animate-pulse flex flex-col w-full h-[500px] bg-muted rounded-lg"></div>
        )}
        
        <div className="flex justify-center mt-4 space-x-2">
          {trendingArticles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}