import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuizDetailPage from '@/components/quiz/quiz-detail-page';

// Comprehensive mock quizzes data
const quizzes = [
  {
    id: '1',
    title: 'Advanced JavaScript Concepts',
    description: 'Master advanced JavaScript concepts including closures, prototypes, async/await, and modern ES6+ features. This comprehensive quiz will test your understanding of complex JavaScript topics.',
    category: 'Programming',
    difficulty: 'Hard',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    totalQuestions: 25,
    duration: 45,
    totalMarks: 100,
    passingMarks: 60,
    negativeMarking: true,
    negativeMarkingValue: 0.25,
    participants: 1247,
    averageScore: 72.5,
    rating: 4.6,
    tags: ['JavaScript', 'Programming', 'Web Development', 'ES6'],
    instructions: [
      'Read each question carefully before selecting your answer',
      'You can navigate between questions using the Previous/Next buttons',
      'Use the question palette to jump to any specific question',
      'Questions can be flagged for review',
      'Negative marking: -0.25 marks for each wrong answer',
      'Ensure stable internet connection throughout the exam',
      'Do not refresh the page during the exam',
      'Submit the quiz before time runs out'
    ],
    topics: [
      { name: 'Closures & Scope', questions: 5 },
      { name: 'Prototypes & Inheritance', questions: 6 },
      { name: 'Async Programming', questions: 7 },
      { name: 'ES6+ Features', questions: 7 }
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
      {
        id: 3,
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: [
          "The current function",
          "The global object",
          "The object that is executing the current function",
          "The parent object"
        ],
        correctAnswer: 2,
        explanation: "The 'this' keyword refers to the object that is executing the current function. Its value depends on how the function is called."
      },
      {
        id: 4,
        question: "What is the difference between '==' and '===' in JavaScript?",
        options: [
          "No difference",
          "'==' checks type and value, '===' checks only value",
          "'==' checks only value, '===' checks type and value",
          "Both are deprecated"
        ],
        correctAnswer: 2,
        explanation: "'==' performs type coercion and checks only value, while '===' checks both type and value without coercion."
      },
      {
        id: 5,
        question: "What is hoisting in JavaScript?",
        options: [
          "Moving variables to the top of the file",
          "The behavior where variable and function declarations are moved to the top of their scope",
          "A way to optimize code",
          "A debugging technique"
        ],
        correctAnswer: 1,
        explanation: "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope during compilation."
      }
    ]
  },
  {
    id: '2',
    title: 'React Fundamentals',
    description: 'Master the core concepts of React including components, state management, hooks, and lifecycle methods.',
    category: 'Frontend',
    difficulty: 'Medium',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
    totalQuestions: 20,
    duration: 35,
    totalMarks: 80,
    passingMarks: 48,
    negativeMarking: true,
    negativeMarkingValue: 0.25,
    participants: 892,
    averageScore: 68.3,
    rating: 4.4,
    tags: ['React', 'Frontend', 'Components', 'Hooks'],
    instructions: [
      'Read each question carefully before selecting your answer',
      'You can navigate between questions using the Previous/Next buttons',
      'Use the question palette to jump to any specific question',
      'Questions can be flagged for review',
      'Negative marking: -0.25 marks for each wrong answer',
      'Ensure stable internet connection throughout the exam',
      'Do not refresh the page during the exam'
    ],
    topics: [
      { name: 'Components & JSX', questions: 5 },
      { name: 'State & Props', questions: 5 },
      { name: 'Hooks', questions: 6 },
      { name: 'Event Handling', questions: 4 }
    ],
    questions: [
      {
        id: 1,
        question: "What is JSX in React?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript",
          "A CSS framework",
          "A database query language"
        ],
        correctAnswer: 1,
        explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
      },
      {
        id: 2,
        question: "What is the purpose of useState hook?",
        options: [
          "To manage component lifecycle",
          "To handle side effects",
          "To manage state in functional components",
          "To optimize performance"
        ],
        correctAnswer: 2,
        explanation: "useState is a React hook that allows you to add state to functional components."
      }
    ]
  }
];

function getQuizById(id: string) {
  return quizzes.find(quiz => quiz.id === id) || null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const quiz = getQuizById(params.id);
    
    if (!quiz) {
      return {
        title: 'Quiz Not Found - AelVorm',
        description: 'The requested quiz could not be found.'
      };
    }

    return {
      title: `${quiz.title} - Quiz - AelVorm`,
      description: quiz.description,
    };
  } catch (error) {
    return {
      title: 'Quiz - AelVorm',
      description: 'Quiz page on AelVorm'
    };
  }
}

export async function generateStaticParams() {
  try {
    return quizzes.map((quiz) => ({
      id: quiz.id,
    }));
  } catch (error) {
    return [
      { id: '1' },
      { id: '2' }
    ];
  }
}

export default function QuizDetailPageRoute({ params }: { params: { id: string } }) {
  try {
    const quiz = getQuizById(params.id);

    if (!quiz) {
      notFound();
    }

    return <QuizDetailPage quiz={quiz} />;
  } catch (error) {
    notFound();
  }
}