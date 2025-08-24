"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Heart, BookOpen, Eye, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

interface JournalContentProps {
  category: string;
}

const journalEntries = {
  all: [
    {
      id: 1,
      title: "The Last Letter",
      excerpt: "A touching story about love, loss, and the letters we never send...",
      content: "In the quiet corner of an old bookstore, Sarah found a letter that would change everything...",
      image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg",
      type: "Story",
      readTime: "8 min",
      likes: 342,
      views: 1240,
      author: {
        name: "Emma Wilson",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      publishedAt: "2 days ago",
      mood: "Melancholic",
      theme: "Love & Relationships"
    },
    {
      id: 2,
      title: "Whispers of the Wind",
      excerpt: "A poem about nature's gentle voice and the secrets it carries...",
      content: "Through the rustling leaves and dancing trees, the wind carries stories of old...",
      image: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg",
      type: "Poetry",
      readTime: "3 min",
      likes: 189,
      views: 567,
      author: {
        name: "David Chen",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      publishedAt: "1 day ago",
      mood: "Inspirational",
      theme: "Nature"
    },
    {
      id: 3,
      title: "Finding Purpose in the Digital Age",
      excerpt: "Reflections on meaning, connection, and authenticity in our modern world...",
      content: "In a world of endless notifications and digital distractions, how do we find our true purpose?",
      image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg",
      type: "Blog",
      readTime: "12 min",
      likes: 456,
      views: 2340,
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=3"
      },
      publishedAt: "3 days ago",
      mood: "Thoughtful",
      theme: "Life Lessons"
    }
  ],
  stories: [
    {
      id: 4,
      title: "The Midnight Train",
      excerpt: "A mysterious journey that leads to unexpected discoveries...",
      content: "The train arrived at exactly midnight, just as the old man had promised...",
      image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg",
      type: "Story",
      readTime: "15 min",
      likes: 278,
      views: 890,
      author: {
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?img=4"
      },
      publishedAt: "1 week ago",
      mood: "Mysterious",
      theme: "Adventure"
    }
  ],
  poetry: [
    {
      id: 5,
      title: "Seasons of the Heart",
      excerpt: "A collection of verses about love's changing seasons...",
      content: "Like autumn leaves that fall and rise again in spring...",
      image: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg",
      type: "Poetry",
      readTime: "5 min",
      likes: 234,
      views: 678,
      author: {
        name: "Isabella Martinez",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      publishedAt: "4 days ago",
      mood: "Romantic",
      theme: "Love & Relationships"
    }
  ]
};

export default function JournalContent({ category }: JournalContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [likedEntries, setLikedEntries] = useState<number[]>([]);
  
  const entries = journalEntries[category as keyof typeof journalEntries] || journalEntries.all;
  const entriesPerPage = 6;
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const handleLike = (entryId: number) => {
    setLikedEntries(prev =>
      prev.includes(entryId)
        ? prev.filter(id => id !== entryId)
        : [...prev, entryId]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Story': return 'bg-blue-500';
      case 'Poetry': return 'bg-purple-500';
      case 'Blog': return 'bg-green-500';
      case 'Essay': return 'bg-orange-500';
      case 'Fiction': return 'bg-pink-500';
      case 'Memoir': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold capitalize">
          {category === 'all' ? 'All Entries' : category}
        </h2>
        <div className="text-sm text-muted-foreground">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative h-36">
              <Image
                src={entry.image}
                alt={entry.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <Badge className={`${getTypeColor(entry.type)} hover:${getTypeColor(entry.type)} text-xs`}>
                  {entry.type}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  {entry.mood}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={entry.author.avatar} alt={entry.author.name} />
                  <AvatarFallback>{entry.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium">{entry.author.name}</p>
                  <p className="text-xs text-muted-foreground">{entry.publishedAt}</p>
                </div>
              </div>

              <Link href={`/journal/${entry.id}`}>
                <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                  {entry.title}
                </h3>
              </Link>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {entry.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {entry.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {entry.views}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 h-7 px-2"
                    onClick={() => handleLike(entry.id)}
                  >
                    <Heart 
                      className={`h-3 w-3 ${
                        likedEntries.includes(entry.id) 
                          ? 'fill-red-500 text-red-500' 
                          : ''
                      }`} 
                    />
                    {entry.likes + (likedEntries.includes(entry.id) ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <Badge variant="outline" className="text-xs">
                  {entry.theme}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
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
      )}
    </div>
  );
}