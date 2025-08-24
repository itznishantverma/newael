import type { Metadata } from 'next';
import NewsHeader from '@/components/news/news-header';
import NewsFilters from '@/components/news/news-filters';
import NewsList from '@/components/news/news-list';
import TrendingNews from '@/components/news/trending-news';
import AdBanner from '@/components/ad-banner';

export const metadata: Metadata = {
  title: 'News - AelVorm',
  description: 'Stay updated with the latest news and current affairs from around the world.',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <NewsHeader />
      <AdBanner className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" type="wide" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <NewsFilters />
          </aside>
          
          <main className="flex-1">
            <TrendingNews />
            <NewsList />
          </main>
        </div>
      </div>
    </div>
  );
}