"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Clock, 
  Users, 
  Star,
  Target,
  Trophy,
  AlertTriangle,
  Play
} from "lucide-react";

interface QuizDetailHeaderProps {
  quiz: {
    title: string;
    description: string;
    category: string;
    difficulty: string;
    image: string;
    totalQuestions: number;
    duration: number;
    totalMarks: number;
    passingMarks: number;
    negativeMarking: boolean;
    negativeMarkingValue: number;
    participants: number;
    averageScore: number;
    rating: number;
  };
}

export default function QuizDetailHeader({ quiz }: QuizDetailHeaderProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      case 'Expert': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative">
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={quiz.image}
          alt={quiz.title}
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
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-sm">
                    {quiz.category}
                  </Badge>
                  <Badge className={`${getDifficultyColor(quiz.difficulty)} hover:${getDifficultyColor(quiz.difficulty)} text-sm`}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{quiz.rating}</span>
                  <span className="text-muted-foreground">({quiz.participants.toLocaleString()} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">{quiz.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{quiz.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{quiz.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{quiz.duration}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{quiz.totalMarks}</div>
                  <div className="text-sm text-muted-foreground">Total Marks</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{quiz.participants.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button size="lg" className="gap-2 flex-1 sm:flex-none">
                  <Play className="h-5 w-5" />
                  Start Quiz Now
                </Button>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    Pass: {quiz.passingMarks}/{quiz.totalMarks}
                  </div>
                  {quiz.negativeMarking && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <AlertTriangle className="h-4 w-4" />
                      Negative marking: -{quiz.negativeMarkingValue}
                    </div>
                  )}
                  <div>
                    Avg Score: {quiz.averageScore}%
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