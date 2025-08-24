"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { X, BarChart3, TrendingUp, Target, Clock } from "lucide-react";
import PerformanceAnalytics from "./performance-analytics";
import TimeAnalytics from "./time-analytics";
import CategoryAnalytics from "./category-analytics";
import ComparisonAnalytics from "./comparison-analytics";

interface QuizAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizResult: {
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
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      userAnswer?: number;
      isMarkedForReview?: boolean;
      explanation?: string;
      difficulty: 'easy' | 'medium' | 'hard';
      category: string;
      timeSpent?: number;
    }>;
    rank?: number;
    totalParticipants?: number;
  };
}

export default function QuizAnalyticsModal({ isOpen, onClose, quizResult }: QuizAnalyticsModalProps) {
  const [activeTab, setActiveTab] = useState("performance");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              Detailed Analytics - {quizResult.title}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Analysis
            </TabsTrigger>
            <TabsTrigger value="category" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Category Wise
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="mt-6">
            <PerformanceAnalytics quizResult={quizResult} />
          </TabsContent>

          <TabsContent value="time" className="mt-6">
            <TimeAnalytics quizResult={quizResult} />
          </TabsContent>

          <TabsContent value="category" className="mt-6">
            <CategoryAnalytics quizResult={quizResult} />
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <ComparisonAnalytics quizResult={quizResult} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}