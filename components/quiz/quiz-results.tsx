'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  BookOpen,
  RefreshCw,
  History,
  Eye,
  Share2,
  TrendingUp,
  Award,
  Flag
} from 'lucide-react';
import QuizAnalyticsModal from './analytics/quiz-analytics-modal';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
  isMarkedForReview?: boolean;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  appearedInPreviousExams?: {
    examName: string;
    year: string;
    frequency: number;
  }[];
}

interface QuizResult {
  id: string;
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  markedForReview: number;
  timeSpent: number;
  totalTime: number;
  score: number;
  percentage: number;
  questions: Question[];
  rank?: number;
  totalParticipants?: number;
}

// Mock data - in a real app, this would come from an API
const mockQuizResults: Record<string, QuizResult> = {
  '1': {
    id: '1',
    title: 'Advanced JavaScript Concepts',
    totalQuestions: 20,
    correctAnswers: 15,
    incorrectAnswers: 3,
    unanswered: 2,
    markedForReview: 4,
    timeSpent: 1800, // 30 minutes in seconds
    totalTime: 2400, // 40 minutes in seconds
    score: 75,
    percentage: 75,
    rank: 12,
    totalParticipants: 150,
    questions: [
      {
        id: '1',
        question: 'What is a closure in JavaScript?',
        options: ['A function that has access to variables in its outer scope', 'A way to close browser windows', 'A method to hide variables', 'A type of loop'],
        correctAnswer: 0,
        userAnswer: 0,
        explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
        difficulty: 'medium',
        category: 'JavaScript Fundamentals',
        appearedInPreviousExams: [
          { examName: 'JavaScript Advanced Test 2023', year: '2023', frequency: 3 },
          { examName: 'Web Development Quiz 2022', year: '2022', frequency: 2 }
        ]
      },
      {
        id: '2',
        question: 'Which of the following is NOT a primitive data type in JavaScript?',
        options: ['string', 'number', 'object', 'boolean'],
        correctAnswer: 2,
        userAnswer: 1,
        isMarkedForReview: true,
        explanation: 'Object is not a primitive data type. The primitive data types in JavaScript are: string, number, boolean, undefined, null, symbol, and bigint.',
        difficulty: 'easy',
        category: 'Data Types'
      },
      {
        id: '3',
        question: 'What does the "this" keyword refer to in JavaScript?',
        options: ['The current function', 'The global object', 'The object that is executing the current function', 'The parent object'],
        correctAnswer: 2,
        userAnswer: 2,
        isMarkedForReview: true,
        explanation: 'The "this" keyword refers to the object that is executing the current function. Its value depends on how the function is called.',
        difficulty: 'hard',
        category: 'Context & Scope',
        appearedInPreviousExams: [
          { examName: 'JavaScript Concepts Quiz 2023', year: '2023', frequency: 5 }
        ]
      },
      {
        id: '4',
        question: 'What is the difference between "==" and "===" in JavaScript?',
        options: ['No difference', '"==" checks type and value, "===" checks only value', '"==" checks only value, "===" checks type and value', 'Both are deprecated'],
        correctAnswer: 2,
        isMarkedForReview: true,
        explanation: '"==" performs type coercion and checks only value, while "===" checks both type and value without coercion.',
        difficulty: 'medium',
        category: 'Operators'
      },
      {
        id: '5',
        question: 'What is hoisting in JavaScript?',
        options: ['Moving variables to the top of the file', 'The behavior where variable and function declarations are moved to the top of their scope', 'A way to optimize code', 'A debugging technique'],
        correctAnswer: 1,
        explanation: 'Hoisting is JavaScript\'s behavior of moving variable and function declarations to the top of their containing scope during compilation.',
        difficulty: 'medium',
        category: 'JavaScript Fundamentals'
      }
    ]
  }
};

export default function QuizResults({ quizId }: { quizId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchResult = () => {
      const mockResult = mockQuizResults[quizId];
      if (mockResult) {
        // Calculate attempted questions (including flagged ones)
        const attemptedQuestions = mockResult.questions.filter(q => 
          q.userAnswer !== undefined || q.isMarkedForReview
        );
        
        // Update the result to reflect attempted questions properly
        const updatedResult = {
          ...mockResult,
          correctAnswers: mockResult.questions.filter(q => q.userAnswer === q.correctAnswer).length,
          incorrectAnswers: mockResult.questions.filter(q => q.userAnswer !== undefined && q.userAnswer !== q.correctAnswer).length,
          unanswered: mockResult.questions.filter(q => q.userAnswer === undefined && !q.isMarkedForReview).length,
          markedForReview: mockResult.questions.filter(q => q.isMarkedForReview).length
        };
        
        setResult(updatedResult);
      }
    };

    fetchResult();
  }, [quizId]);

  const handleRetakeQuiz = () => {
    router.push(`/quiz/${quizId}`);
  };

  const handleViewAnalytics = () => {
    setShowAnalytics(true);
  };

  const handleShareResults = () => {
    const shareText = `I just completed "${result?.title}" quiz and scored ${result?.percentage}%! 🎉`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Results',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      toast({
        title: "Results Copied!",
        description: "Quiz results have been copied to your clipboard.",
      });
    }
  };

  if (!result) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your results...</p>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const reviewQuestions = result.questions.filter(q => q.isMarkedForReview);
  const attemptedQuestions = result.questions.filter(q => q.userAnswer !== undefined || q.isMarkedForReview);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
        </div>
        <p className="text-gray-600 text-lg">{result.title}</p>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Final Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(result.percentage)}`}>
                  {result.score}%
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 font-medium">Correct</p>
                <p className="text-3xl font-bold text-green-700">{result.correctAnswers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 font-medium">Incorrect</p>
                <p className="text-3xl font-bold text-red-700">{result.incorrectAnswers}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 font-medium">Attempted</p>
                <p className="text-3xl font-bold text-purple-700">{attemptedQuestions.length}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Badge */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`px-4 py-2 text-lg font-semibold ${getScoreBadgeColor(result.percentage)}`}>
                  {result.percentage >= 80 ? 'Excellent!' : result.percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                </Badge>
                {result.rank && (
                  <div className="text-sm text-gray-600">
                    Rank: <span className="font-semibold">{result.rank}</span> out of {result.totalParticipants}
                  </div>
                )}
              </div>
              <div className="text-right">
                <Progress value={result.percentage} className="w-32 mb-2" />
                <p className="text-sm text-gray-600">{result.percentage}% Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Section */}
      {reviewQuestions.length > 0 && (
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <Flag className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            You marked {reviewQuestions.length} question{reviewQuestions.length > 1 ? 's' : ''} for review. 
            Consider reviewing these questions to improve your understanding.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            All Questions
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Review ({reviewQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-600">Correct Answers</span>
                  <span className="font-semibold">{result.correctAnswers}/{result.totalQuestions}</span>
                </div>
                <Progress value={(result.correctAnswers / result.totalQuestions) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-red-600">Incorrect Answers</span>
                  <span className="font-semibold">{result.incorrectAnswers}/{result.totalQuestions}</span>
                </div>
                <Progress value={(result.incorrectAnswers / result.totalQuestions) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Marked for Review</span>
                  <span className="font-semibold">{result.markedForReview}/{result.totalQuestions}</span>
                </div>
                <Progress value={(result.markedForReview / result.totalQuestions) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unanswered</span>
                  <span className="font-semibold">{result.unanswered}/{result.totalQuestions}</span>
                </div>
                <Progress value={(result.unanswered / result.totalQuestions) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Time Spent</span>
                  <span className="font-semibold">{formatTime(result.timeSpent)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Time</span>
                  <span className="font-semibold">{formatTime(result.totalTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Time Remaining</span>
                  <span className="font-semibold text-blue-600">{formatTime(result.totalTime - result.timeSpent)}</span>
                </div>
                <Progress value={(result.timeSpent / result.totalTime) * 100} className="h-2" />
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Time per Question</span>
                    <span className="font-semibold text-sm">{formatTime(Math.floor(result.timeSpent / attemptedQuestions.length))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <div className="space-y-4">
            {result.questions.map((question, index) => (
              <Card key={question.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Q{index + 1}</Badge>
                        <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline">{question.category}</Badge>
                        {question.isMarkedForReview && (
                          <Badge className="bg-orange-100 text-orange-800">
                            <Flag className="h-3 w-3 mr-1" />
                            Review
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg">{question.question}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {question.userAnswer === question.correctAnswer ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : question.userAnswer !== undefined ? (
                        <XCircle className="h-6 w-6 text-red-500" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : optionIndex === question.userAnswer && question.userAnswer !== question.correctAnswer
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                          <span>{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                          )}
                          {optionIndex === question.userAnswer && question.userAnswer !== question.correctAnswer && (
                            <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </AlertDescription>
                    </Alert>
                  )}

                  {question.appearedInPreviousExams && question.appearedInPreviousExams.length > 0 && (
                    <Alert className="bg-purple-50 border-purple-200">
                      <History className="h-4 w-4 text-purple-600" />
                      <AlertDescription className="text-purple-800">
                        <strong>Previous Appearances:</strong>
                        <div className="mt-2 space-y-1">
                          {question.appearedInPreviousExams.map((exam, idx) => (
                            <div key={idx} className="text-sm">
                              • {exam.examName} ({exam.year}) - Appeared {exam.frequency} time{exam.frequency > 1 ? 's' : ''}
                            </div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="review">
          {reviewQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Questions Marked for Review</h3>
                <p className="text-gray-600">You didn't mark any questions for review during the quiz.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Questions Marked for Review</h3>
                <Badge className="bg-orange-100 text-orange-800">
                  {reviewQuestions.length} question{reviewQuestions.length > 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="space-y-4">
                {reviewQuestions.map((question, index) => {
                  const originalIndex = result.questions.findIndex(q => q.id === question.id);
                  return (
                    <Card key={question.id} className="overflow-hidden border-orange-200">
                      <CardHeader className="pb-3 bg-orange-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline">Q{originalIndex + 1}</Badge>
                              <Badge className="bg-orange-100 text-orange-800">
                                <Flag className="h-3 w-3 mr-1" />
                                Review
                              </Badge>
                              <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                                {question.difficulty}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg">{question.question}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            {question.userAnswer === question.correctAnswer ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : question.userAnswer !== undefined ? (
                              <XCircle className="h-6 w-6 text-red-500" />
                            ) : (
                              <AlertCircle className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-50 border-green-200 text-green-800'
                                  : optionIndex === question.userAnswer && question.userAnswer !== question.correctAnswer
                                  ? 'bg-red-50 border-red-200 text-red-800'
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                                <span>{option}</span>
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                                )}
                                {optionIndex === question.userAnswer && question.userAnswer !== question.correctAnswer && (
                                  <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {question.explanation && (
                          <Alert className="bg-blue-50 border-blue-200">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(result.questions.map(q => q.category))).map(category => {
                    const categoryQuestions = result.questions.filter(q => q.category === category);
                    const correct = categoryQuestions.filter(q => q.userAnswer === q.correctAnswer).length;
                    const percentage = (correct / categoryQuestions.length) * 100;
                    
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category}</span>
                          <span className="text-sm text-gray-600">
                            {correct}/{categoryQuestions.length} ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Difficulty Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['easy', 'medium', 'hard'].map(difficulty => {
                    const difficultyQuestions = result.questions.filter(q => q.difficulty === difficulty);
                    if (difficultyQuestions.length === 0) return null;
                    
                    const correct = difficultyQuestions.filter(q => q.userAnswer === q.correctAnswer).length;
                    const percentage = (correct / difficultyQuestions.length) * 100;
                    
                    return (
                      <div key={difficulty} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">{difficulty}</span>
                          <span className="text-sm text-gray-600">
                            {correct}/{difficultyQuestions.length} ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={handleRetakeQuiz}
          variant="outline" 
          size="lg"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retake Quiz
        </Button>
        <Button 
          onClick={handleViewAnalytics}
          variant="outline" 
          size="lg"
          className="gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          View Detailed Analytics
        </Button>
        <Button 
          onClick={handleShareResults}
          size="lg"
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Results
        </Button>
      </div>

      {/* Analytics Modal */}
      {showAnalytics && (
        <QuizAnalyticsModal
          isOpen={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          quizResult={result}
        />
      )}
    </div>
  );
}