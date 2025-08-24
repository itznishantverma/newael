"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Globe } from 'lucide-react';

interface ArticleAuthorProps {
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

export default function ArticleAuthor({ author }: ArticleAuthorProps) {
  return (
    <section className="bg-muted/30 rounded-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-1">{author.name}</h2>
          <p className="text-sm text-muted-foreground mb-3">{author.role}</p>
          <p className="text-sm mb-4">{author.bio}</p>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Twitter className="h-4 w-4 mr-1" />
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-1" />
              Website
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}