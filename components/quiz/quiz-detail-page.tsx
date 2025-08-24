"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Target, 
  Trophy, 
  AlertTriangle,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle,
  Info
} from 'lucide-react';
import QuizInstructionsModal from './quiz-instructions-modal';
import AdBanner from '@/components/ad-banner';

interface QuizDetailPageProps {
  quiz: {
    id: string;
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
    tags: string[];
    instructions: string[];
    topics: Array<{
      name: string;
      questions: number;
    }>;
  };
}

export default function QuizDetailPage({ quiz }: QuizDetailPageProps) {
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Hard': return 'bg-red-500 text-white';
      case 'Expert': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleStartQuiz = () => {
    setShowInstructions(true);
  };

  const handleQuizStart = () => {
    setShowInstructions(false);
    router.push(`/quiz/${quiz.id}/take`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-8">
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="relative h-80 md:h-96">
                <Image
                  src={quiz.image}
                  alt={quiz.title}
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
                
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-8">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          {quiz.category}
                        </Badge>
                        <Badge className={`${getDifficultyColor(quiz.difficulty)} text-sm px-3 py-1`}>
                          {quiz.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{quiz.rating}</span>
                        </div>
                      </div>
                      
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {quiz.title}
                      </h1>
                      
                      <p className="text-xl text-white/90 mb-6 leading-relaxed">
                        {quiz.description}
                      </p>
                      
                      <Button 
                        size="lg" 
                        className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-3 h-auto font-semibold"
                        onClick={handleStartQuiz}
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Start Quiz Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{quiz.totalQuestions}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Questions</div>
            </Card>
            
            <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{quiz.duration}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Minutes</div>
            </Card>
            
            <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{quiz.totalMarks}</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Total Marks</div>
            </Card>
            
            <Card className="text-center p-6 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-500 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{quiz.participants.toLocaleString()}</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Participants</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quiz Overview */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                    Quiz Overview
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-lg">Exam Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{quiz.duration} minutes</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total Questions:</span>
                          <span className="font-medium">{quiz.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Passing Marks:</span>
                          <span className="font-medium">{quiz.passingMarks}/{quiz.totalMarks}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Negative Marking:</span>
                          <span className="font-medium">
                            {quiz.negativeMarking ? `-${quiz.negativeMarkingValue}` : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 text-lg">Performance Stats</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Average Score</span>
                            <span className="font-medium">{quiz.averageScore}%</span>
                          </div>
                          <Progress value={quiz.averageScore} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Success Rate</span>
                            <span className="font-medium">68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total Attempts:</span>
                          <span className="font-medium">{quiz.participants.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Topics Covered */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-500" />
                    Topics Covered
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quiz.topics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{topic.name}</span>
                        </div>
                        <Badge variant="secondary">{topic.questions} Q</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marking Scheme */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    Marking Scheme
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">+4</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Correct Answer</div>
                    </div>
                    
                    {quiz.negativeMarking && (
                      <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">-{quiz.negativeMarkingValue}</div>
                        <div className="text-sm text-red-700 dark:text-red-300">Wrong Answer</div>
                      </div>
                    )}
                    
                    <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">0</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">Not Attempted</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
                  <Button 
                    className="w-full mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 h-auto"
                    onClick={handleStartQuiz}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Take Quiz Now
                  </Button>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instant results</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Detailed explanations</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Performance analytics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {quiz.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-yellow-500" />
                    Top Performers
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Alex Johnson", score: 98, rank: 1 },
                      { name: "Sarah Chen", score: 95, rank: 2 },
                      { name: "Mike Brown", score: 92, rank: 3 }
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}>
                            {user.rank}
                          </div>
                          <span className="text-sm font-medium">{user.name}</span>
                        </div>
                        <span className="text-sm font-bold">{user.score}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <AdBanner type="sidebar" />
            </div>
          </div>
        </div>
      </div>

      {showInstructions && (
        <QuizInstructionsModal
          quiz={quiz}
          onStart={handleQuizStart}
          onCancel={() => setShowInstructions(false)}
        />
      )}
    </div>
  );
}