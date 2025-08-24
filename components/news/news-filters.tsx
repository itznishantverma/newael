"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';

const categories = [
  'All',
  'Breaking News',
  'Politics',
  'Business',
  'Technology',
  'Sports',
  'Entertainment',
  'Health',
  'Science',
  'World',
];

const regions = [
  'Global',
  'United States',
  'Europe',
  'Asia',
  'Africa',
  'Americas',
  'Middle East',
];

const timeFilters = [
  'Last Hour',
  'Today',
  'This Week',
  'This Month',
];

export default function NewsFilters() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [selectedTime, setSelectedTime] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedRegion('Global');
    setSelectedTime('Today');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedRegion !== 'Global' || selectedTime !== 'Today' || searchQuery;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Filters</h3>
      </div>

      <div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Region</h4>
        <div className="space-y-2">
          {regions.map((region) => (
            <Button
              key={region}
              variant={selectedRegion === region ? "default" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Time</h4>
        <div className="flex flex-wrap gap-2">
          {timeFilters.map((time) => (
            <Badge
              key={time}
              variant={selectedTime === time ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedTime(time)}
            >
              {time}
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