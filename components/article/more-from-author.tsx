"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MoreFromAuthorProps {
  author: {
    name: string;
    articles: Array<{
      id: string;
      title: string;
      excerpt: string;
      image: string;
      category: string;
      publishedAt: string;
      readTime: string;
    }>;
  };
}

export default function MoreFromAuthor({ author }: MoreFromAuthorProps) {
  return (
    <section className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">More from {author.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {author.articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {article.category}
                </Badge>
                <Link href={`/articles/${article.id}`}>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.publishedAt} • {article.readTime}
                </p>
                <p className="text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}