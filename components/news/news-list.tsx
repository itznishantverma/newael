"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: "Revolutionary Breakthrough in Quantum Computing",
    excerpt: "Scientists achieve major milestone in quantum computing that could transform technology",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    category: "Technology",
    time: "1 hour ago",
    views: 8420,
    source: "Tech Today"
  },
  {
    id: 2,
    title: "Global Health Initiative Launches Worldwide",
    excerpt: "New international program aims to improve healthcare access in developing nations",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg",
    category: "Health",
    time: "3 hours ago",
    views: 6750,
    source: "Health News"
  },
  {
    id: 3,
    title: "Space Exploration Reaches New Milestone",
    excerpt: "Private space company successfully completes historic mission to Mars",
    image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg",
    category: "Science",
    time: "5 hours ago",
    views: 12300,
    source: "Space Daily"
  },
  {
    id: 4,
    title: "Renewable Energy Investment Hits Record High",
    excerpt: "Global investment in renewable energy sources reaches unprecedented levels",
    image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg",
    category: "Business",
    time: "7 hours ago",
    views: 5890,
    source: "Energy Report"
  },
  {
    id: 5,
    title: "Cultural Festival Celebrates Global Diversity",
    excerpt: "International festival showcases traditions from around the world",
    image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    category: "Entertainment",
    time: "9 hours ago",
    views: 4320,
    source: "Culture Today"
  },
  {
    id: 6,
    title: "Educational Reform Initiative Shows Promise",
    excerpt: "New teaching methods demonstrate significant improvement in student outcomes",
    image: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg",
    category: "Education",
    time: "11 hours ago",
    views: 3450,
    source: "Education Weekly"
  }
];

export default function NewsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const totalPages = Math.ceil(newsArticles.length / articlesPerPage);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {newsArticles.length} articles
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {newsArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-80 flex-shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardContent className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{article.source}</span>
                </div>

                <Link href={`/news/${article.id}`}>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.time}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}