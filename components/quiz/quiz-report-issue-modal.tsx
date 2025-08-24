"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface QuizReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  questionId?: number;
}

export default function QuizReportIssueModal({ 
  isOpen, 
  onClose, 
  quizId, 
  questionId 
}: QuizReportIssueModalProps) {
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const issueTypes = [
    { value: "incorrect-answer", label: "Incorrect Answer" },
    { value: "unclear-question", label: "Unclear Question" },
    { value: "typo", label: "Spelling/Grammar Error" },
    { value: "technical", label: "Technical Issue" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueType || !description.trim()) {
      toast({
        title: "Error",
        description: "Please select an issue type and provide a description.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the report to your backend
    console.log({
      quizId,
      questionId,
      issueType,
      description,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Report Submitted",
      description: "Thank you for your feedback. We'll review the issue and make necessary corrections.",
    });

    // Reset form and close modal
    setIssueType("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Report an Issue</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              What type of issue are you reporting?
            </Label>
            <RadioGroup value={issueType} onValueChange={setIssueType}>
              {issueTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="text-sm">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide details about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}