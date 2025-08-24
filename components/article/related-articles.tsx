"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye } from "lucide-react";

interface RelatedArticlesProps {
  currentArticleId: string;
}

const relatedArticles = [
  {
    id: "2",
    title: "The Future of JavaScript Frameworks",
    excerpt: "Exploring upcoming trends and innovations in JavaScript frameworks.",
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
    category: "Technology",
    readTime: "6 min read",
    views: 856
  },
  {
    id: "3",
    title: "Building Scalable Web Applications",
    excerpt: "Best practices for creating maintainable and scalable web apps.",
    image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
    category: "Programming",
    readTime: "10 min read",
    views: 1243
  },
  {
    id: "4",
    title: "Modern CSS Techniques",
    excerpt: "Advanced CSS features and methodologies for modern web development.",
    image: "https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg",
    category: "Web Design",
    readTime: "7 min read",
    views: 932
  }
];

export default function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
  return (
    <div className="bg-card p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-6">Related Articles</h2>
      <div className="space-y-4">
        {relatedArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative h-32">
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
              <Link href={`/articles/${article.id}`}>
                <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </Link>
              
              <p className="text-sm text-muted-foreground mt-2 mb-3 line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {article.views.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}