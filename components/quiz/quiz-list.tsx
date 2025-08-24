"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Trophy, ChevronLeft, ChevronRight, Target } from 'lucide-react';

const quizzes = [
  {
    id: '1',
    title: 'Advanced JavaScript Concepts',
    description: 'Test your knowledge of advanced JavaScript concepts including closures, prototypes, and async programming.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    category: 'Programming',
    difficulty: 'Hard',
    duration: 45,
    questions: 25,
    participants: 1247,
    rating: 4.6,
    totalMarks: 100,
    passingMarks: 60
  },
  {
    id: '2',
    title: 'World History: Ancient Civilizations',
    description: 'Explore the fascinating world of ancient civilizations from Egypt to Rome.',
    image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg',
    category: 'History',
    difficulty: 'Medium',
    duration: 30,
    questions: 20,
    participants: 892,
    rating: 4.4,
    totalMarks: 80,
    passingMarks: 48
  },
  {
    id: '3',
    title: 'Basic Mathematics Quiz',
    description: 'Test your fundamental math skills with algebra, geometry, and arithmetic problems.',
    image: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg',
    category: 'Mathematics',
    difficulty: 'Easy',
    duration: 20,
    questions: 15,
    participants: 2156,
    rating: 4.2,
    totalMarks: 60,
    passingMarks: 36
  },
  {
    id: '4',
    title: 'Science and Nature',
    description: 'Discover the wonders of science, from physics and chemistry to biology and earth sciences.',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
    category: 'Science',
    difficulty: 'Medium',
    duration: 35,
    questions: 22,
    participants: 1534,
    rating: 4.5,
    totalMarks: 88,
    passingMarks: 53
  },
  {
    id: '5',
    title: 'General Knowledge Challenge',
    description: 'Test your general knowledge across various topics including current affairs, sports, and entertainment.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    category: 'General Knowledge',
    difficulty: 'Medium',
    duration: 25,
    questions: 18,
    participants: 3421,
    rating: 4.3,
    totalMarks: 72,
    passingMarks: 43
  },
  {
    id: '6',
    title: 'Business Strategy Fundamentals',
    description: 'Assess your understanding of business strategy, management principles, and market analysis.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'Business',
    difficulty: 'Hard',
    duration: 50,
    questions: 30,
    participants: 756,
    rating: 4.7,
    totalMarks: 120,
    passingMarks: 72
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'bg-green-500';
    case 'Medium': return 'bg-yellow-500';
    case 'Hard': return 'bg-red-500';
    case 'Expert': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export default function QuizList() {
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 6;
  const totalPages = Math.ceil(quizzes.length / quizzesPerPage);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Available Quizzes</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {quizzes.length} quizzes available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative h-48">
              <Image
                src={quiz.image}
                alt={quiz.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge variant="secondary">{quiz.category}</Badge>
                <Badge className={`${getDifficultyColor(quiz.difficulty)} hover:${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {quiz.rating}
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <Link href={`/quiz/${quiz.id}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                  {quiz.title}
                </h3>
              </Link>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {quiz.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{quiz.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{quiz.participants.toLocaleString()} taken</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span>{quiz.passingMarks}/{quiz.totalMarks} to pass</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/quiz/${quiz.id}`}>
                    View Details
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/quiz/${quiz.id}/take`}>
                    Start Quiz
                  </Link>
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
    </section>
  );
}