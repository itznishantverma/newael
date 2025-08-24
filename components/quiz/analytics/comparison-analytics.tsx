"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Award, Target, BarChart3 } from "lucide-react";

interface ComparisonAnalyticsProps {
  quizResult: {
    percentage: number;
    rank?: number;
    totalParticipants?: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    totalTime: number;
  };
}

export default function ComparisonAnalytics({ quizResult }: ComparisonAnalyticsProps) {
  // Mock data for comparison (in a real app, this would come from your backend)
  const benchmarkData = {
    averageScore: 68.5,
    topPercentileScore: 85,
    averageTime: 1920, // 32 minutes
    averageAccuracy: 72.3,
    difficultyBreakdown: {
      easy: { average: 85.2, yourScore: 90 },
      medium: { average: 68.7, yourScore: 75 },
      hard: { average: 52.1, yourScore: 60 }
    }
  };

  const yourAccuracy = quizResult.correctAnswers > 0 
    ? (quizResult.correctAnswers / quizResult.totalQuestions) * 100 
    : 0;

  const timeEfficiency = (quizResult.timeSpent / quizResult.totalTime) * 100;
  const avgTimeEfficiency = (benchmarkData.averageTime / quizResult.totalTime) * 100;

  const getPerformanceLevel = (yourScore: number, average: number) => {
    const difference = yourScore - average;
    if (difference >= 15) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (difference >= 5) return { level: 'Above Average', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (difference >= -5) return { level: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Below Average', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const overallPerformance = getPerformanceLevel(quizResult.percentage, benchmarkData.averageScore);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overall Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{quizResult.percentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-600 mb-3">Your Score</div>
              <Badge className={`${overallPerformance.bgColor} ${overallPerformance.color}`}>
                {overallPerformance.level}
              </Badge>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <div className="text-3xl font-bold text-gray-600 mb-2">{benchmarkData.averageScore}%</div>
              <div className="text-sm text-gray-600 mb-3">Average Score</div>
              <div className="text-xs text-gray-500">All Participants</div>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{benchmarkData.topPercentileScore}%</div>
              <div className="text-sm text-gray-600 mb-3">Top 10%</div>
              <div className="text-xs text-gray-500">Best Performers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-500" />
            Detailed Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Score Comparison */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Score</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">You: {quizResult.percentage.toFixed(1)}%</span>
                  <span className="text-sm text-gray-600">Avg: {benchmarkData.averageScore}%</span>
                </div>
              </div>
              <div className="relative">
                <Progress value={benchmarkData.averageScore} className="h-3 bg-gray-200" />
                <div 
                  className="absolute top-0 h-3 bg-blue-500 rounded-full"
                  style={{ width: `${Math.min(quizResult.percentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Time Comparison */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Time Efficiency</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">You: {formatTime(quizResult.timeSpent)}</span>
                  <span className="text-sm text-gray-600">Avg: {formatTime(benchmarkData.averageTime)}</span>
                </div>
              </div>
              <div className="relative">
                <Progress value={avgTimeEfficiency} className="h-3 bg-gray-200" />
                <div 
                  className="absolute top-0 h-3 bg-purple-500 rounded-full"
                  style={{ width: `${Math.min(timeEfficiency, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {timeEfficiency < avgTimeEfficiency ? 'Faster than average' : 'Slower than average'}
              </div>
            </div>

            {/* Accuracy Comparison */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Accuracy Rate</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">You: {yourAccuracy.toFixed(1)}%</span>
                  <span className="text-sm text-gray-600">Avg: {benchmarkData.averageAccuracy}%</span>
                </div>
              </div>
              <div className="relative">
                <Progress value={benchmarkData.averageAccuracy} className="h-3 bg-gray-200" />
                <div 
                  className="absolute top-0 h-3 bg-green-500 rounded-full"
                  style={{ width: `${Math.min(yourAccuracy, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Difficulty Level Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Performance by Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(benchmarkData.difficultyBreakdown).map(([difficulty, data]) => (
              <div key={difficulty} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{difficulty} Questions</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-blue-600">You: {data.yourScore}%</span>
                    <span className="text-gray-600">Avg: {data.average}%</span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={data.average} className="h-2 bg-gray-200" />
                  <div 
                    className={`absolute top-0 h-2 rounded-full ${
                      difficulty === 'easy' ? 'bg-green-500' :
                      difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(data.yourScore, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {data.yourScore > data.average ? 
                    `+${(data.yourScore - data.average).toFixed(1)}% above average` :
                    `${(data.average - data.yourScore).toFixed(1)}% below average`
                  }
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking Information */}
      {quizResult.rank && quizResult.totalParticipants && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Your Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <div className="text-4xl font-bold text-blue-600">#{quizResult.rank}</div>
                <div className="text-gray-600">out of {quizResult.totalParticipants.toLocaleString()} participants</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Your Position</span>
                  <span>{Math.round(((quizResult.totalParticipants - quizResult.rank + 1) / quizResult.totalParticipants) * 100)}th percentile</span>
                </div>
                <Progress 
                  value={((quizResult.totalParticipants - quizResult.rank + 1) / quizResult.totalParticipants) * 100} 
                  className="h-3" 
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {Math.round(((quizResult.totalParticipants - quizResult.rank) / quizResult.totalParticipants) * 100)}%
                  </div>
                  <div className="text-xs text-green-600">Better Than</div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {quizResult.rank <= quizResult.totalParticipants * 0.1 ? 'Top 10%' :
                     quizResult.rank <= quizResult.totalParticipants * 0.25 ? 'Top 25%' :
                     quizResult.rank <= quizResult.totalParticipants * 0.5 ? 'Top 50%' : 'Bottom 50%'}
                  </div>
                  <div className="text-xs text-blue-600">Tier</div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {quizResult.totalParticipants - quizResult.rank}
                  </div>
                  <div className="text-xs text-purple-600">Behind You</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}