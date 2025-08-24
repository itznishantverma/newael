"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Target, AlertTriangle, CheckCircle, BookOpen, Award, Info } from "lucide-react";

interface QuizInstructionsModalProps {
  quiz: {
    title: string;
    totalQuestions: number;
    duration: number;
    totalMarks: number;
    passingMarks: number;
    negativeMarking: boolean;
    negativeMarkingValue: number;
    instructions: string[];
  };
  onStart: () => void;
  onCancel: () => void;
}

export default function QuizInstructionsModal({ quiz, onStart, onCancel }: QuizInstructionsModalProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            Quiz Instructions & Rules
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quiz Overview Card */}
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">{quiz.title}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{quiz.totalQuestions}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">Questions</div>
                </div>
                
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">{quiz.duration}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">Minutes</div>
                </div>
                
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <Award className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{quiz.totalMarks}</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">Total Marks</div>
                </div>
                
                <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {quiz.negativeMarking ? `-${quiz.negativeMarkingValue}` : 'No'}
                  </div>
                  <div className="text-sm text-orange-600 dark:text-orange-400">Negative Marking</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                General Instructions
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quiz.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{instruction}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Marking Scheme Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Marking Scheme
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">+4</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Correct Answer</div>
                </div>
                
                {quiz.negativeMarking && (
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">-{quiz.negativeMarkingValue}</div>
                    <div className="text-sm text-red-700 dark:text-red-300">Wrong Answer</div>
                  </div>
                )}
                
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-2">0</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">Not Attempted</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-700 dark:text-blue-300">Passing Marks:</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {quiz.passingMarks} / {quiz.totalMarks}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes Card */}
          <Card className="border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <AlertTriangle className="h-5 w-5" />
                Important Notes
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Timer:</strong> Once you start the quiz, the timer will begin and cannot be paused. Make sure you have enough time to complete the quiz.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Internet Connection:</strong> Ensure you have a stable internet connection throughout the quiz to avoid any disruptions.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Browser Tab:</strong> Do not close or refresh the browser tab during the quiz as this may result in loss of progress.
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Auto-Save:</strong> Your progress is automatically saved as you answer questions, but final submission is required.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Section */}
          <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agree"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor="agree"
                  className="text-sm font-medium leading-relaxed text-green-700 dark:text-green-300 cursor-pointer"
                >
                  I have carefully read and understood all the instructions, rules, and marking scheme mentioned above. 
                  I agree to abide by all the terms and conditions of this quiz examination. I understand that any 
                  violation of these rules may result in disqualification.
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4">
            <Button variant="outline" onClick={onCancel} className="px-8">
              Cancel
            </Button>
            <Button 
              onClick={onStart} 
              disabled={!agreed} 
              className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Start Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}