"use client";

import { Newspaper, TrendingUp, Globe, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsHeader() {
  return (
    <section className="pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Newspaper className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Latest News</h1>
              <p className="text-muted-foreground mt-1">
                Stay informed with breaking news and current affairs
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Global Coverage</span>
            </div>
            <Button variant="outline" size="sm" className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}