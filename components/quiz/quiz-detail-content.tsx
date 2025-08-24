"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Target } from "lucide-react";

interface QuizDetailContentProps {
  quiz: {
    instructions: string[];
    topics: Array<{
      name: string;
      questions: number;
    }>;
    negativeMarking: boolean;
    negativeMarkingValue: number;
    passingMarks: number;
    totalMarks: number;
  };
}

export default function QuizDetailContent({ quiz }: QuizDetailContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Quiz Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {quiz.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{instruction}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Topics Covered
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quiz.topics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{topic.name}</span>
                <Badge variant="secondary">{topic.questions} questions</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Marking Scheme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">+4</div>
              <div className="text-sm text-muted-foreground">Correct Answer</div>
            </div>
            
            {quiz.negativeMarking && (
              <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">-{quiz.negativeMarkingValue}</div>
                <div className="text-sm text-muted-foreground">Wrong Answer</div>
              </div>
            )}
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">0</div>
              <div className="text-sm text-muted-foreground">Not Attempted</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Passing Marks:</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {quiz.passingMarks} / {quiz.totalMarks}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}