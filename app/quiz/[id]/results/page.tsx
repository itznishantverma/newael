import type { Metadata } from 'next';
import QuizResults from '@/components/quiz/quiz-results';

export const metadata: Metadata = {
  title: 'Quiz Results - AelVorm',
  description: 'View your quiz results and performance analysis.',
};

export async function generateStaticParams() {
  // Return static params for known quiz IDs
  // In a real app, you'd fetch this from your database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function QuizResultsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen py-8">
      <QuizResults quizId={params.id} />
    </div>
  );
}