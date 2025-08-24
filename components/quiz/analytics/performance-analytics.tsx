"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Flag
} from "lucide-react";

interface PerformanceAnalyticsProps {
  quizResult: {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    unanswered: number;
    markedForReview: number;
    score: number;
    percentage: number;
    questions: Array<{
      difficulty: 'easy' | 'medium' | 'hard';
      userAnswer?: number;
      correctAnswer: number;
      isMarkedForReview?: boolean;
    }>;
    rank?: number;
    totalParticipants?: number;
  };
}

export default function PerformanceAnalytics({ quizResult }: PerformanceAnalyticsProps) {
  const accuracyRate = quizResult.correctAnswers + quizResult.incorrectAnswers > 0 
    ? (quizResult.correctAnswers / (quizResult.correctAnswers + quizResult.incorrectAnswers)) * 100 
    : 0;

  const attemptRate = ((quizResult.totalQuestions - quizResult.unanswered) / quizResult.totalQuestions) * 100;

  const difficultyAnalysis = ['easy', 'medium', 'hard'].map(difficulty => {
    const questions = quizResult.questions.filter(q => q.difficulty === difficulty);
    const correct = questions.filter(q => q.userAnswer === q.correctAnswer).length;
    const attempted = questions.filter(q => q.userAnswer !== undefined).length;
    
    return {
      difficulty,
      total: questions.length,
      correct,
      attempted,
      accuracy: attempted > 0 ? (correct / attempted) * 100 : 0
    };
  });

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 70) return { level: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (percentage >= 60) return { level: 'Average', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const performance = getPerformanceLevel(quizResult.percentage);

  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-700 mb-2">{quizResult.percentage.toFixed(1)}%</div>
            <div className="text-blue-600 font-medium">Overall Score</div>
            <Badge className={`mt-2 ${performance.bgColor} ${performance.color}`}>
              {performance.level}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-700 mb-2">{accuracyRate.toFixed(1)}%</div>
            <div className="text-green-600 font-medium">Accuracy Rate</div>
            <div className="text-sm text-green-600 mt-1">
              {quizResult.correctAnswers} correct out of {quizResult.correctAnswers + quizResult.incorrectAnswers} attempted
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-purple-700 mb-2">{attemptRate.toFixed(1)}%</div>
            <div className="text-purple-600 font-medium">Attempt Rate</div>
            <div className="text-sm text-purple-600 mt-1">
              {quizResult.totalQuestions - quizResult.unanswered} out of {quizResult.totalQuestions} questions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Performance Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">{quizResult.correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
              <Progress value={(quizResult.correctAnswers / quizResult.totalQuestions) * 100} className="mt-2 h-2" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-600">{quizResult.incorrectAnswers}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
              <Progress value={(quizResult.incorrectAnswers / quizResult.totalQuestions) * 100} className="mt-2 h-2" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                <Flag className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{quizResult.markedForReview}</div>
              <div className="text-sm text-gray-600">Reviewed</div>
              <Progress value={(quizResult.markedForReview / quizResult.totalQuestions) * 100} className="mt-2 h-2" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-600">{quizResult.unanswered}</div>
              <div className="text-sm text-gray-600">Unanswered</div>
              <Progress value={(quizResult.unanswered / quizResult.totalQuestions) * 100} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Difficulty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {difficultyAnalysis.map((item) => (
              <div key={item.difficulty} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      item.difficulty === 'easy' ? 'default' : 
                      item.difficulty === 'medium' ? 'secondary' : 
                      'destructive'
                    }>
                      {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {item.correct}/{item.attempted} correct ({item.total} total)
                    </span>
                  </div>
                  <span className="font-semibold">
                    {item.accuracy.toFixed(1)}%
                  </span>
                </div>
                <Progress value={item.accuracy} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking */}
      {quizResult.rank && quizResult.totalParticipants && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Your Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">#{quizResult.rank}</div>
              <div className="text-lg text-gray-600 mb-4">
                out of {quizResult.totalParticipants.toLocaleString()} participants
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full" 
                  style={{ width: `${((quizResult.totalParticipants - quizResult.rank + 1) / quizResult.totalParticipants) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                You performed better than {Math.round(((quizResult.totalParticipants - quizResult.rank) / quizResult.totalParticipants) * 100)}% of participants
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}