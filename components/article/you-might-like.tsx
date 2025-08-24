"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function YouMightLike() {
  const articles = [
    {
      id: "1",
      title: "AI-Powered Cybersecurity: The New Frontier",
      category: "Cybersecurity",
      image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
      publishedAt: "2024-05-20"
    },
    {
      id: "2",
      title: "How AI is Transforming the Retail Experience",
      category: "Retail",
      image: "https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg",
      publishedAt: "2024-05-18"
    },
    {
      id: "3",
      title: "AI in Legal Services: Revolutionizing Case Analysis",
      category: "Legal",
      image: "https://images.pexels.com/photos/5668869/pexels-photo-5668869.jpeg",
      publishedAt: "2024-05-16"
    },
    {
      id: "4",
      title: "The Future of Hiring: AI-Driven Talent Acquisition",
      category: "Human Resources",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      publishedAt: "2024-05-14"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative h-40">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <span className="text-xs text-muted-foreground">
                {article.category}
              </span>
              <Link href={`/articles/${article.id}`}>
                <h3 className="font-bold mt-1 hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}