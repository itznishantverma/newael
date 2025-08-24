import type { Metadata } from 'next';
import ArticleList from '@/components/article/article-list';
import ArticleFilters from '@/components/article/article-filters';

export const metadata: Metadata = {
  title: 'Articles - AelVorm',
  description: 'Explore our collection of articles on technology, programming, and web development.',
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Articles</h1>
            <p className="text-lg text-muted-foreground">
              Discover in-depth articles about technology, programming, and web development
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <ArticleFilters />
          </aside>
          
          <main className="flex-1">
            <ArticleList />
          </main>
        </div>
      </div>
    </div>
  );
}