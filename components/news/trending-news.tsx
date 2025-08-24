"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Eye } from "lucide-react";

const trendingNews = [
  {
    id: 1,
    title: "Global Climate Summit Reaches Historic Agreement",
    excerpt: "World leaders unite on ambitious climate targets for 2030",
    image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg",
    category: "World",
    time: "2 hours ago",
    views: 15420,
    isBreaking: true
  },
  {
    id: 2,
    title: "Tech Giants Announce AI Safety Initiative",
    excerpt: "Major technology companies collaborate on artificial intelligence safety standards",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    category: "Technology",
    time: "4 hours ago",
    views: 12350
  },
  {
    id: 3,
    title: "Economic Markets Show Strong Recovery",
    excerpt: "Global markets surge following positive economic indicators",
    image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg",
    category: "Business",
    time: "6 hours ago",
    views: 9870
  }
];

export default function TrendingNews() {
  return (
    <section className="mb-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-5 w-5 mr-2 text-red-500" />
        <h2 className="text-2xl font-bold">Trending Now</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingNews.map((news, index) => (
          <Card key={news.id} className={`overflow-hidden ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
            <div className="relative h-48">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge variant="secondary">{news.category}</Badge>
                {news.isBreaking && (
                  <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">
                    BREAKING
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-4">
              <Link href={`/news/${news.id}`}>
                <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h3>
              </Link>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {news.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {news.time}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {news.views.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}