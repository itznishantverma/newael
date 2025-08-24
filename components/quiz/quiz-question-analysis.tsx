"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Circle, AlertTriangle, Flag } from "lucide-react";

interface QuizQuestionAnalysisProps {
  quiz: {
    questions: Array<{
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
  userAnswers: { [key: number]: number };
  onReportIssue: () => void;
}

export default function QuizQuestionAnalysis({ quiz, userAnswers, onReportIssue }: QuizQuestionAnalysisProps) {
  const getAnswerStatus = (questionIndex: number) => {
    if (!userAnswers.hasOwnProperty(questionIndex)) {
      return 'unattempted';
    }
    
    const userAnswer = userAnswers[questionIndex];
    const correctAnswer = quiz.questions[questionIndex].correctAnswer;
    
    return userAnswer === correctAnswer ? 'correct' : 'wrong';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'wrong':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
      case 'wrong':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Question-wise Analysis</span>
          <Button variant="outline" size="sm" onClick={onReportIssue} className="gap-2">
            <Flag className="h-4 w-4" />
            Report Issue
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => {
            const status = getAnswerStatus(index);
            const userAnswer = userAnswers[index];
            
            return (
              <Card key={question.id} className={`border-2 ${getStatusColor(status)}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold">Question {index + 1}</h4>
                        <Badge variant={status === 'correct' ? 'default' : status === 'wrong' ? 'destructive' : 'secondary'}>
                          {status === 'correct' ? 'Correct' : status === 'wrong' ? 'Wrong' : 'Not Attempted'}
                        </Badge>
                      </div>
                      
                      <p className="mb-4">{question.question}</p>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === question.correctAnswer;
                          const isUserAnswer = optionIndex === userAnswer;
                          
                          let optionClass = 'p-3 rounded-lg border ';
                          
                          if (isCorrect) {
                            optionClass += 'border-green-500 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300';
                          } else if (isUserAnswer && !isCorrect) {
                            optionClass += 'border-red-500 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300';
                          } else {
                            optionClass += 'border-gray-200 dark:border-gray-700';
                          }
                          
                          return (
                            <div key={optionIndex} className={optionClass}>
                              <div className="flex items-center gap-2">
                                {isCorrect && <CheckCircle className="h-4 w-4 text-green-500" />}
                                {isUserAnswer && !isCorrect && <XCircle className="h-4 w-4 text-red-500" />}
                                <span className="font-medium">
                                  {String.fromCharCode(65 + optionIndex)}.
                                </span>
                                <span>{option}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Explanation</h5>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}