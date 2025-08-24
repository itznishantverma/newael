"use client";

import { BrainCircuit, Trophy, Users, Target, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuizHeader() {
  return (
    <section className="pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
              <BrainCircuit className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Knowledge Quiz</h1>
              <p className="text-muted-foreground mt-1">
                Test your knowledge across various subjects and skill levels
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Compete & Learn</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Join Thousands</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Track Progress</span>
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