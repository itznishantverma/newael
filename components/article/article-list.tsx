"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Eye, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data - would be fetched from backend
const articles = [
  {
    id: '1',
    title: 'Understanding Modern Web Development Frameworks',
    excerpt: 'An overview of current web development frameworks and how to choose the right one for your project.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    date: 'May 14, 2025',
    readTime: '8 min',
    category: 'Technology',
    views: 1240,
    bookmarks: 78,
    author: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Senior Developer'
    }
  },
  // ... more articles
];

export default function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary">{article.category}</Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{article.author.name}</p>
                  <p className="text-xs text-muted-foreground">{article.author.role}</p>
                </div>
              </div>

              <Link href={`/articles/${article.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {article.views.toLocaleString()}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Bookmark className="h-4 w-4" />
                  {article.bookmarks}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
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
    </div>
  );
}