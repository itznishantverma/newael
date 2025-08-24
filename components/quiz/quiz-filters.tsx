"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter, Star } from 'lucide-react';

const categories = [
  'All',
  'Programming',
  'Science',
  'Mathematics',
  'History',
  'Geography',
  'Literature',
  'General Knowledge',
  'Technology',
  'Business',
];

const difficulties = [
  'All Levels',
  'Easy',
  'Medium',
  'Hard',
  'Expert',
];

const durations = [
  'Any Duration',
  '5-15 minutes',
  '15-30 minutes',
  '30-60 minutes',
  '60+ minutes',
];

const questionCounts = [
  'Any Length',
  '5-10 questions',
  '10-20 questions',
  '20-50 questions',
  '50+ questions',
];

export default function QuizFilters() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedDuration, setSelectedDuration] = useState('Any Duration');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState('Any Length');
  const [searchQuery, setSearchQuery] = useState('');

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All Levels');
    setSelectedDuration('Any Duration');
    setSelectedQuestionCount('Any Length');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedDifficulty !== 'All Levels' || 
    selectedDuration !== 'Any Duration' || selectedQuestionCount !== 'Any Length' || searchQuery;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Find Your Quiz</h3>
      </div>

      <div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Star className="h-4 w-4" />
          Popular Categories
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Difficulty Level</h4>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Duration</h4>
        <div className="flex flex-wrap gap-2">
          {durations.map((duration) => (
            <Badge
              key={duration}
              variant={selectedDuration === duration ? "default" : "secondary"}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedDuration(duration)}
            >
              {duration}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Quiz Length</h4>
        <div className="flex flex-wrap gap-2">
          {questionCounts.map((count) => (
            <Badge
              key={count}
              variant={selectedQuestionCount === count ? "default" : "secondary"}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedQuestionCount(count)}
            >
              {count}
            </Badge>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}