"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - would be fetched from Supabase in a real implementation
const latestPosts = [
  {
    id: 1,
    title: "Understanding Modern Web Development Frameworks",
    excerpt: "An overview of current web development frameworks and how to choose the right one for your project.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
    date: "May 14, 2025",
    readTime: "8 min",
    category: "Technology",
    views: 1240,
    bookmarks: 78,
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "Senior Developer"
    }
  },
  {
    id: 2,
    title: "The Rise of Remote Work Culture",
    excerpt: "How remote work is reshaping the corporate landscape and what it means for the future of work.",
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
    date: "May 13, 2025",
    readTime: "6 min",
    category: "Business",
    views: 890,
    bookmarks: 45,
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      role: "Business Analyst"
    }
  },
  {
    id: 3,
    title: "Essential Nutrition Tips for Optimal Health",
    excerpt: "Learn about the key nutritional components that contribute to a healthy lifestyle.",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
    date: "May 12, 2025",
    readTime: "5 min",
    category: "Health",
    views: 760,
    bookmarks: 62,
    author: {
      name: "Dr. Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=3",
      role: "Health Expert"
    }
  },
  {
    id: 4,
    title: "Exploring Minimalist Interior Design Trends",
    excerpt: "Discover how minimalism is influencing modern interior design and how to incorporate it into your home.",
    image: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg",
    date: "May 11, 2025",
    readTime: "7 min",
    category: "Lifestyle",
    views: 550,
    bookmarks: 38,
    author: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=4",
      role: "Interior Designer"
    }
  },
  {
    id: 5,
    title: "The Impact of Artificial Intelligence on Education",
    excerpt: "Exploring how AI technologies are transforming educational methods and outcomes.",
    image: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg",
    date: "May 10, 2025",
    readTime: "9 min",
    category: "Education",
    views: 1120,
    bookmarks: 91,
    author: {
      name: "Prof. David Lee",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "Education Researcher"
    }
  },
  {
    id: 6,
    title: "Sustainable Fashion: Ethical Choices for Conscious Consumers",
    excerpt: "A guide to making environmentally responsible fashion choices without sacrificing style.",
    image: "https://images.pexels.com/photos/5710224/pexels-photo-5710224.jpeg",
    date: "May 9, 2025",
    readTime: "6 min",
    category: "Fashion",
    views: 630,
    bookmarks: 53,
    author: {
      name: "Isabella Martinez",
      avatar: "https://i.pravatar.cc/150?img=6",
      role: "Fashion Consultant"
    }
  },
  {
    id: 7,
    title: "Mental Health Awareness: Breaking the Stigma",
    excerpt: "Discussing the importance of mental health awareness and strategies for emotional wellbeing.",
    image: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg",
    date: "May 8, 2025",
    readTime: "7 min",
    category: "Health",
    views: 980,
    bookmarks: 87,
    author: {
      name: "Dr. Rachel Green",
      avatar: "https://i.pravatar.cc/150?img=7",
      role: "Mental Health Professional"
    }
  },
  {
    id: 8,
    title: "The Evolution of Electric Vehicles",
    excerpt: "Tracking the development of electric vehicles and their impact on sustainable transportation.",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
    date: "May 7, 2025",
    readTime: "8 min",
    category: "Automotive",
    views: 840,
    bookmarks: 72,
    author: {
      name: "James Turner",
      avatar: "https://i.pravatar.cc/150?img=8",
      role: "Automotive Analyst"
    }
  },
];

// Category colors for badges
const categoryColors: Record<string, string> = {
  Technology: "bg-blue-500",
  Business: "bg-green-500",
  Health: "bg-red-500",
  Lifestyle: "bg-purple-500",
  Education: "bg-yellow-500",
  Fashion: "bg-pink-500",
  Automotive: "bg-indigo-500",
};

export default function LatestPosts() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
          <Link 
            href="/articles" 
            className="text-primary hover:underline text-sm font-medium flex items-center"
          >
            View all articles <span className="ml-1">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latestPosts.map((post) => (
            <Card 
              key={post.id}
              className="overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  fill
                  alt={post.title}
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`${categoryColors[post.category]} hover:${categoryColors[post.category]}`}>
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <span>{post.date}</span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                
                <Link href={`/articles/${post.id}`}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
              </CardContent>
              
              <CardFooter className="px-4 py-3 border-t flex justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="flex items-center mr-3">
                    <Eye className="h-3 w-3 mr-1" />
                    {post.views}
                  </span>
                  <span className="flex items-center">
                    <Bookmark className="h-3 w-3 mr-1" />
                    {post.bookmarks}
                  </span>
                </div>
                <Link 
                  href={`/articles/${post.id}`} 
                  className="text-primary hover:underline text-xs font-medium"
                >
                  Read more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}