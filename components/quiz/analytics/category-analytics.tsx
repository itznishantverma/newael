"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target, TrendingUp, Award } from "lucide-react";

interface CategoryAnalyticsProps {
  quizResult: {
    questions: Array<{
      category: string;
      difficulty: 'easy' | 'medium' | 'hard';
      userAnswer?: number;
      correctAnswer: number;
      isMarkedForReview?: boolean;
    }>;
  };
}

export default function CategoryAnalytics({ quizResult }: CategoryAnalyticsProps) {
  // Group questions by category
  const categoryData = quizResult.questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = {
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        reviewed: 0,
        questions: []
      };
    }
    
    acc[question.category].total++;
    acc[question.category].questions.push(question);
    
    if (question.userAnswer === undefined) {
      acc[question.category].unanswered++;
    } else if (question.userAnswer === question.correctAnswer) {
      acc[question.category].correct++;
    } else {
      acc[question.category].incorrect++;
    }
    
    if (question.isMarkedForReview) {
      acc[question.category].reviewed++;
    }
    
    return acc;
  }, {} as Record<string, any>);

  const categories = Object.entries(categoryData).map(([name, data]) => ({
    name,
    ...data,
    accuracy: data.correct + data.incorrect > 0 ? (data.correct / (data.correct + data.incorrect)) * 100 : 0,
    attemptRate: ((data.total - data.unanswered) / data.total) * 100
  }));

  // Sort by accuracy for ranking
  const sortedCategories = [...categories].sort((a, b) => b.accuracy - a.accuracy);

  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 bg-green-100';
    if (accuracy >= 60) return 'text-blue-600 bg-blue-100';
    if (accuracy >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStrengthLevel = (accuracy: number) => {
    if (accuracy >= 80) return 'Strong';
    if (accuracy >= 60) return 'Good';
    if (accuracy >= 40) return 'Average';
    return 'Needs Work';
  };

  return (
    <div className="space-y-6">
      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Category Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <Badge className={getPerformanceColor(category.accuracy)}>
                      {getStrengthLevel(category.accuracy)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="font-semibold">{category.accuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={category.accuracy} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3">
                      <div>Correct: {category.correct}</div>
                      <div>Incorrect: {category.incorrect}</div>
                      <div>Unanswered: {category.unanswered}</div>
                      <div>Reviewed: {category.reviewed}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Detailed Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{category.total} questions</Badge>
                    <Badge className={getPerformanceColor(category.accuracy)}>
                      {category.accuracy.toFixed(1)}% accuracy
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{category.correct}</div>
                    <div className="text-sm text-green-600">Correct</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{category.incorrect}</div>
                    <div className="text-sm text-red-600">Incorrect</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{category.unanswered}</div>
                    <div className="text-sm text-gray-600">Unanswered</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{category.reviewed}</div>
                    <div className="text-sm text-orange-600">Reviewed</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy Rate</span>
                    <span>{category.accuracy.toFixed(1)}%</span>
                  </div>
                  <Progress value={category.accuracy} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Attempt Rate</span>
                    <span>{category.attemptRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={category.attemptRate} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Award className="h-5 w-5" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedCategories.slice(0, 3).map((category, index) => (
                <div key={category.name} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600">{category.total} questions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{category.accuracy.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">{category.correct}/{category.total - category.unanswered}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <TrendingUp className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedCategories.slice(-3).reverse().map((category, index) => (
                <div key={category.name} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600">{category.total} questions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">{category.accuracy.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">{category.correct}/{category.total - category.unanswered}</div>
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