"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, Trophy } from "lucide-react";

const featuredQuizzes = [
  {
    id: '1',
    title: 'Advanced JavaScript Concepts',
    description: 'Master advanced JavaScript concepts and become a better developer.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    category: 'Programming',
    difficulty: 'Hard',
    duration: 45,
    participants: 1247,
    rating: 4.6,
    isFeatured: true
  },
  {
    id: '2',
    title: 'World History: Ancient Civilizations',
    description: 'Journey through time and explore ancient civilizations.',
    image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg',
    category: 'History',
    difficulty: 'Medium',
    duration: 30,
    participants: 892,
    rating: 4.4
  },
  {
    id: '3',
    title: 'Science and Nature',
    description: 'Discover the wonders of our natural world.',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
    category: 'Science',
    difficulty: 'Medium',
    duration: 35,
    participants: 1534,
    rating: 4.5
  }
];

export default function FeaturedQuizzes() {
  return (
    <section className="mb-8">
      <div className="flex items-center mb-6">
        <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
        <h2 className="text-2xl font-bold">Featured Quizzes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredQuizzes.map((quiz, index) => (
          <Card key={quiz.id} className={`overflow-hidden group hover:shadow-lg transition-all duration-300 ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
            <div className="relative h-48">
              <Image
                src={quiz.image}
                alt={quiz.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge variant="secondary">{quiz.category}</Badge>
                {quiz.isFeatured && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    FEATURED
                  </Badge>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {quiz.rating}
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <Link href={`/quiz/${quiz.id}`}>
                <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                  {quiz.title}
                </h3>
              </Link>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {quiz.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {quiz.duration}m
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {quiz.participants}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {quiz.difficulty}
                </Badge>
              </div>

              <Button asChild className="w-full">
                <Link href={`/quiz/${quiz.id}`}>
                  Take Quiz
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}