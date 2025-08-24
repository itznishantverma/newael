import type { Metadata } from 'next';
import QuizTakeInterface from '@/components/quiz/quiz-take-interface';

export const metadata: Metadata = {
  title: 'Take Quiz - AelVorm',
  description: 'Take the quiz and test your knowledge.',
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

export default function QuizTakePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <QuizTakeInterface quizId={params.id} />
    </div>
  );
}