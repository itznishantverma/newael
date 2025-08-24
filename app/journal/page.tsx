import type { Metadata } from 'next';
import JournalHeader from '@/components/journal/journal-header';
import JournalTabs from '@/components/journal/journal-tabs';

export const metadata: Metadata = {
  title: 'Journal - AelVorm',
  description: 'Explore stories, poetry, blogs, and creative writing from our community.',
};

export default function JournalPage() {
  return (
    <div className="min-h-screen">
      <JournalHeader />
      <JournalTabs />
    </div>
  );
}