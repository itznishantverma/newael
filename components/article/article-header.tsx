"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Clock, 
  Eye, 
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Calendar
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ArticleHeaderProps {
  article: {
    title: string;
    excerpt: string;
    publishedAt: string;
    readTime: string;
    category: string;
    image: string;
    author: {
      name: string;
      avatar: string;
      role: string;
    };
    views: number;
    bookmarks: number;
  };
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(156);
  const [comments] = useState(24);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative">
      <div className="relative h-[70vh] min-h-[500px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="w-[90%] mx-auto -mb-32 overflow-visible">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Badge variant="secondary" className="text-sm">
                  {article.category}
                </Badge>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={isBookmarked ? "fill-current" : ""} />
                    {article.bookmarks}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/author/${article.author.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {article.author.name}
                      </Link>
                      <Button
                        variant={isFollowing ? "secondary" : "default"}
                        size="sm"
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{article.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    {article.views.toLocaleString()}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5"
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`} />
                    {likes}
                  </Button>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    {comments}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}