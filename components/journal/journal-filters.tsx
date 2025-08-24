"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter, Star } from 'lucide-react';

const moods = [
  'Inspirational',
  'Romantic',
  'Melancholic',
  'Humorous',
  'Thoughtful',
  'Adventurous',
  'Nostalgic',
  'Mysterious',
];

const lengths = [
  'Quick Read (< 5 min)',
  'Medium (5-15 min)',
  'Long Read (15+ min)',
];

const themes = [
  'Love & Relationships',
  'Nature',
  'Life Lessons',
  'Travel',
  'Family',
  'Dreams',
  'Friendship',
  'Self-Discovery',
];

export default function JournalFilters() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMoodToggle = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood)
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  const handleThemeToggle = (theme: string) => {
    setSelectedThemes(prev =>
      prev.includes(theme)
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const clearFilters = () => {
    setSelectedMoods([]);
    setSelectedLength('');
    setSelectedThemes([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedMoods.length > 0 || selectedLength || selectedThemes.length > 0 || searchQuery;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Discover</h3>
      </div>

      <div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stories, poems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Star className="h-4 w-4" />
          Featured Collections
        </h4>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-sm">
            Editor's Picks
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            Most Loved
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            New Voices
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            Award Winners
          </Button>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Reading Time</h4>
        <div className="space-y-2">
          {lengths.map((length) => (
            <Button
              key={length}
              variant={selectedLength === length ? "default" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => setSelectedLength(selectedLength === length ? '' : length)}
            >
              {length}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Mood</h4>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <Badge
              key={mood}
              variant={selectedMoods.includes(mood) ? "default" : "secondary"}
              className="cursor-pointer text-xs"
              onClick={() => handleMoodToggle(mood)}
            >
              {mood}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Themes</h4>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Badge
              key={theme}
              variant={selectedThemes.includes(theme) ? "default" : "secondary"}
              className="cursor-pointer text-xs"
              onClick={() => handleThemeToggle(theme)}
            >
              {theme}
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