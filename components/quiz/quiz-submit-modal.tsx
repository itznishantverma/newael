"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Flag, Circle } from "lucide-react";

interface QuizSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  answeredCount: number;
  totalQuestions: number;
  flaggedCount: number;
}

export default function QuizSubmitModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  answeredCount, 
  totalQuestions, 
  flaggedCount 
}: QuizSubmitModalProps) {
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Submit Quiz
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to submit your quiz? Once submitted, you cannot make any changes.
          </p>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Quiz Summary</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Answered</span>
                  </div>
                  <span className="font-medium">{answeredCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-orange-500" />
                    <span>Flagged for Review</span>
                  </div>
                  <span className="font-medium">{flaggedCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="h-4 w-4 text-gray-400" />
                    <span>Not Attempted</span>
                  </div>
                  <span className="font-medium">{unansweredCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {unansweredCount > 0 && (
            <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <p className="text-sm text-orange-700 dark:text-orange-300">
                You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. 
                These will be marked as incorrect.
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Continue Quiz
            </Button>
            <Button onClick={onSubmit} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Submit Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}