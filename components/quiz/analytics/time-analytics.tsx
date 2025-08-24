"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Timer, Zap, TrendingDown } from "lucide-react";

interface TimeAnalyticsProps {
  quizResult: {
    timeSpent: number;
    totalTime: number;
    totalQuestions: number;
    questions: Array<{
      timeSpent?: number;
      difficulty: 'easy' | 'medium' | 'hard';
      userAnswer?: number;
      correctAnswer: number;
    }>;
  };
}

export default function TimeAnalytics({ quizResult }: TimeAnalyticsProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const timeUtilization = (quizResult.timeSpent / quizResult.totalTime) * 100;
  const avgTimePerQuestion = quizResult.timeSpent / quizResult.totalQuestions;
  const timeRemaining = quizResult.totalTime - quizResult.timeSpent;

  // Mock time data for questions (in a real app, this would come from tracking)
  const questionTimeData = quizResult.questions.map((q, index) => ({
    ...q,
    timeSpent: q.timeSpent || Math.floor(Math.random() * 120) + 30, // 30-150 seconds
    questionNumber: index + 1
  }));

  const fastestQuestions = questionTimeData
    .sort((a, b) => a.timeSpent - b.timeSpent)
    .slice(0, 3);

  const slowestQuestions = questionTimeData
    .sort((a, b) => b.timeSpent - a.timeSpent)
    .slice(0, 3);

  const difficultyTimeAnalysis = ['easy', 'medium', 'hard'].map(difficulty => {
    const questions = questionTimeData.filter(q => q.difficulty === difficulty);
    const avgTime = questions.length > 0 
      ? questions.reduce((sum, q) => sum + q.timeSpent, 0) / questions.length 
      : 0;
    
    return {
      difficulty,
      avgTime,
      questions: questions.length
    };
  });

  const getTimeEfficiency = (timeUtilization: number) => {
    if (timeUtilization < 50) return { level: 'Very Fast', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (timeUtilization < 70) return { level: 'Optimal', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (timeUtilization < 90) return { level: 'Good Pace', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Time Pressure', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const efficiency = getTimeEfficiency(timeUtilization);

  return (
    <div className="space-y-6">
      {/* Time Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-700">{formatTime(quizResult.timeSpent)}</div>
            <div className="text-sm text-blue-600">Time Spent</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <Timer className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-700">{formatTime(timeRemaining)}</div>
            <div className="text-sm text-green-600">Time Remaining</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <Zap className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-700">{formatTime(Math.floor(avgTimePerQuestion))}</div>
            <div className="text-sm text-purple-600">Avg per Question</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6 text-center">
            <TrendingDown className="h-10 w-10 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-700">{timeUtilization.toFixed(1)}%</div>
            <div className="text-sm text-orange-600">Time Utilized</div>
          </CardContent>
        </Card>
      </div>

      {/* Time Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Time Efficiency Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Time Utilization</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${efficiency.bgColor} ${efficiency.color}`}>
                  {efficiency.level}
                </span>
                <span className="font-semibold">{timeUtilization.toFixed(1)}%</span>
              </div>
            </div>
            <Progress value={timeUtilization} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Recommended Time per Question</h4>
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(Math.floor(quizResult.totalTime / quizResult.totalQuestions))}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Your Average Time</h4>
                <div className="text-2xl font-bold text-green-600">
                  {formatTime(Math.floor(avgTimePerQuestion))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time by Difficulty */}
      <Card>
        <CardHeader>
          <CardTitle>Time Analysis by Difficulty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {difficultyTimeAnalysis.map((item) => (
              <div key={item.difficulty} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{item.difficulty} Questions</span>
                  <span className="text-sm text-gray-600">
                    {formatTime(Math.floor(item.avgTime))} avg ({item.questions} questions)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.difficulty === 'easy' ? 'bg-green-500' :
                      item.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((item.avgTime / 180) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fastest and Slowest Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Fastest Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fastestQuestions.map((q, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <span className="font-medium">Question {q.questionNumber}</span>
                    <div className="text-sm text-gray-600 capitalize">{q.difficulty}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{formatTime(q.timeSpent)}</div>
                    <div className="text-xs text-gray-500">
                      {q.userAnswer === q.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Slowest Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {slowestQuestions.map((q, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <span className="font-medium">Question {q.questionNumber}</span>
                    <div className="text-sm text-gray-600 capitalize">{q.difficulty}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">{formatTime(q.timeSpent)}</div>
                    <div className="text-xs text-gray-500">
                      {q.userAnswer === q.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}