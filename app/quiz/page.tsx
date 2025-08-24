import type { Metadata } from 'next';
import QuizHeader from '@/components/quiz/quiz-header';
import QuizFilters from '@/components/quiz/quiz-filters';
import QuizList from '@/components/quiz/quiz-list';
import FeaturedQuizzes from '@/components/quiz/featured-quizzes';
import AdBanner from '@/components/ad-banner';

export const metadata: Metadata = {
  title: 'Quiz - AelVorm',
  description: 'Test your knowledge with our comprehensive collection of quizzes across various subjects.',
};

export default function QuizPage() {
  return (
    <div className="min-h-screen">
      <QuizHeader />
      <AdBanner className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" type="wide" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <QuizFilters />
          </aside>
          
          <main className="flex-1">
            <FeaturedQuizzes />
            <QuizList />
          </main>
        </div>
      </div>
    </div>
  );
}