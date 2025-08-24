"use client";

import { PenTool, BookOpen, Heart, Feather, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JournalHeader() {
  return (
    <section className="pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <PenTool className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Creative Journal</h1>
              <p className="text-muted-foreground mt-1">
                Discover inspiring stories, poetry, and creative expressions
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <Feather className="h-4 w-4" />
              <span>Poetry</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Creative Writing</span>
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