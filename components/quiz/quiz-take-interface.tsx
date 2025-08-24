"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle,
  Circle,
  AlertCircle,
  RotateCcw
} from "lucide-react";
import { useRouter } from "next/navigation";
import QuizInstructionsModal from "./quiz-instructions-modal";
import QuizSubmitModal from "./quiz-submit-modal";

interface QuizTakeInterfaceProps {
  quizId: string;
}

// Mock quiz data
const mockQuiz = {
  id: '1',
  title: 'Advanced JavaScript Concepts',
  totalQuestions: 25,
  duration: 45, // minutes
  totalMarks: 100,
  passingMarks: 60,
  negativeMarking: true,
  negativeMarkingValue: 0.25,
  instructions: [
    "Read each question carefully before selecting your answer.",
    "Each question carries 4 marks.",
    "There is negative marking of 0.25 marks for each wrong answer.",
    "You can flag questions for review and come back to them later.",
    "Once you submit the quiz, you cannot change your answers.",
    "Make sure you have a stable internet connection throughout the quiz.",
    "The timer will continue running even if you navigate away from the page.",
    "Click 'Submit Quiz' when you have completed all questions."
  ],
  questions: [
    {
      id: 1,
      question: "What is a closure in JavaScript?",
      options: [
        "A function that has access to variables in its outer scope",
        "A way to close browser windows",
        "A method to hide variables",
        "A type of loop"
      ],
      correctAnswer: 0,
      explanation: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned."
    },
    {
      id: 2,
      question: "Which of the following is NOT a primitive data type in JavaScript?",
      options: [
        "string",
        "number",
        "object",
        "boolean"
      ],
      correctAnswer: 2,
      explanation: "Object is not a primitive data type. The primitive data types in JavaScript are: string, number, boolean, undefined, null, symbol, and bigint."
    },
    // Add more questions as needed
  ]
};

export default function QuizTakeInterface({ quizId }: QuizTakeInterfaceProps) {
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(mockQuiz.duration * 60); // in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setShowInstructions(false);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const handleSubmitQuiz = () => {
    // Save answers to sessionStorage
    sessionStorage.setItem(`quiz_${quizId}_answers`, JSON.stringify(answers));
    sessionStorage.setItem(`quiz_${quizId}_timeSpent`, JSON.stringify(mockQuiz.duration * 60 - timeRemaining));
    
    // Navigate to results page
    router.push(`/quiz/${quizId}/results`);
  };

  const getQuestionStatus = (questionIndex: number) => {
    if (answers.hasOwnProperty(questionIndex)) {
      return 'answered';
    }
    if (flaggedQuestions.has(questionIndex)) {
      return 'flagged';
    }
    return 'not-attempted';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'flagged':
        return <Flag className="h-4 w-4 text-orange-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-500 hover:bg-green-600';
      case 'flagged':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-gray-300 hover:bg-gray-400';
    }
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flaggedQuestions.size;
  const notAttemptedCount = mockQuiz.totalQuestions - answeredCount;

  if (showInstructions) {
    return (
      <QuizInstructionsModal
        quiz={mockQuiz}
        onStart={handleStartQuiz}
        onCancel={() => router.push(`/quiz/${quizId}`)}
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{mockQuiz.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {mockQuiz.totalQuestions}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  timeRemaining < 300 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 
                  'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSubmitModal(true)}
                  className="gap-2"
                >
                  Submit Quiz
                </Button>
              </div>
            </div>
            <Progress 
              value={(currentQuestion + 1) / mockQuiz.totalQuestions * 100} 
              className="mt-4" 
            />
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Question {currentQuestion + 1}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFlagQuestion}
                    className={`gap-2 ${flaggedQuestions.has(currentQuestion) ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' : ''}`}
                  >
                    <Flag className="h-4 w-4" />
                    {flaggedQuestions.has(currentQuestion) ? 'Unflag' : 'Flag'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-lg mb-6">
                    {mockQuiz.questions[currentQuestion]?.question}
                  </p>
                  
                  <div className="space-y-3">
                    {mockQuiz.questions[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left border rounded-lg transition-all ${
                          answers[currentQuestion] === index
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            answers[currentQuestion] === index
                              ? 'border-primary bg-primary'
                              : 'border-gray-300'
                          }`}>
                            {answers[currentQuestion] === index && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setAnswers(prev => {
                        const newAnswers = { ...prev };
                        delete newAnswers[currentQuestion];
                        return newAnswers;
                      })}
                      className="gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Clear
                    </Button>
                    
                    {currentQuestion < mockQuiz.totalQuestions - 1 ? (
                      <Button
                        onClick={() => setCurrentQuestion(prev => Math.min(mockQuiz.totalQuestions - 1, prev + 1))}
                        className="gap-2"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setShowSubmitModal(true)}
                        className="gap-2"
                      >
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Question Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {Array.from({ length: mockQuiz.totalQuestions }, (_, index) => {
                    const status = getQuestionStatus(index);
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-8 h-8 rounded text-xs font-medium text-white transition-colors ${
                          currentQuestion === index 
                            ? 'ring-2 ring-primary ring-offset-2' 
                            : ''
                        } ${getStatusColor(status)}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Answered</span>
                    </div>
                    <Badge variant="secondary">{answeredCount}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-orange-500" />
                      <span>Flagged</span>
                    </div>
                    <Badge variant="secondary">{flaggedCount}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-gray-400" />
                      <span>Not Attempted</span>
                    </div>
                    <Badge variant="secondary">{notAttemptedCount}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <QuizSubmitModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={handleSubmitQuiz}
        answeredCount={answeredCount}
        totalQuestions={mockQuiz.totalQuestions}
        flaggedCount={flaggedCount}
      />
    </div>
  );
}