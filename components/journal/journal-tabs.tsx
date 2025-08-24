"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JournalContent from './journal-content';
import JournalFilters from './journal-filters';
import AdBanner from '@/components/ad-banner';

const tabCategories = [
  { id: 'all', label: 'All', icon: '📚' },
  { id: 'stories', label: 'Stories', icon: '📖' },
  { id: 'poetry', label: 'Poetry', icon: '🎭' },
  { id: 'blogs', label: 'Blogs', icon: '✍️' },
  { id: 'essays', label: 'Essays', icon: '📝' },
  { id: 'fiction', label: 'Fiction', icon: '🌟' },
  { id: 'memoir', label: 'Memoir', icon: '💭' },
];

export default function JournalTabs() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Hidden on mobile */}
          <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <JournalFilters />
            <AdBanner type="sidebar" className="mt-6" />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Tabs Navigation */}
            <div className="mb-8">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 h-auto p-1">
                {tabCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-col items-center gap-1 py-3 px-2 text-xs"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            {tabCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <JournalContent category={category.id} />
              </TabsContent>
            ))}

            <AdBanner type="wide" className="mt-8" />
          </main>
        </div>
      </Tabs>
    </div>
  );
}