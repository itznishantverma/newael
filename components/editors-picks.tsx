'use client';

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Clock } from "lucide-react";

// Mock data - would be fetched from Supabase in a real implementation
const editorsPicks = [
  {
    id: 1,
    title: "The Renaissance of Traditional Craftsmanship in Modern Design",
    excerpt: "How artisans are bringing back traditional techniques to create contemporary masterpieces that combine heritage with innovation.",
    image: "https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg",
    author: {
      name: "Isabella Martinez",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    readTime: "12 min read"
  },
  {
    id: 2,
    title: "Reimagining Urban Spaces: The Future of City Planning",
    excerpt: "Innovative approaches to urban design that prioritize sustainability, community, and quality of life.",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
    author: {
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    readTime: "9 min read"
  },
  {
    id: 3,
    title: "The Science of Sleep: New Discoveries and Practical Applications",
    excerpt: "Recent breakthroughs in sleep research and how they can help improve your nightly rest.",
    image: "https://images.pexels.com/photos/936133/pexels-photo-936133.jpeg",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    readTime: "7 min read"
  },
  {
    id: 4,
    title: "Digital Minimalism: Finding Balance in a Connected World",
    excerpt: "Strategies for maintaining a healthy relationship with technology while maximizing its benefits.",
    image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg",
    author: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    readTime: "8 min read"
  }
];

export default function EditorsPicks() {
  // Featured article is the first in the list
  const featuredArticle = editorsPicks[0];
  // Other picks are the rest
  const otherPicks = editorsPicks.slice(1);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Award className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold">Editor's Picks</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Pick - Larger Card */}
          <Card className="lg:col-span-7 overflow-hidden">
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={featuredArticle.image}
                fill
                alt={featuredArticle.title}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={featuredArticle.author.avatar} alt={featuredArticle.author.name} />
                    <AvatarFallback>{featuredArticle.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-white text-sm font-medium">{featuredArticle.author.name}</div>
                </div>
                
                <Link href={`/articles/${featuredArticle.id}`}>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{featuredArticle.title}</h3>
                </Link>
                
                <p className="text-white/80 mb-2 line-clamp-2 hidden md:block">{featuredArticle.excerpt}</p>
                
                <div className="flex items-center text-white/70">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span className="text-sm">{featuredArticle.readTime}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Other Picks - Smaller Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {otherPicks.map((article) => (
              <Card key={article.id} className="overflow-hidden flex flex-col md:flex-row h-full">
                <div className="relative h-40 md:h-auto md:w-1/3">
                  <Image
                    src={article.image}
                    fill
                    alt={article.title}
                    className="object-cover"
                  />
                </div>
                
                <CardContent className="p-4 md:w-2/3 flex flex-col">
                  <Link href={`/articles/${article.id}`}>
                    <h3 className="font-bold text-base mb-1.5 line-clamp-2 hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={article.author.avatar} alt={article.author.name} />
                        <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{article.author.name}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}