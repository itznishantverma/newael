"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Share2, Bookmark, Users, TrendingUp, Award } from "lucide-react";
import AdBanner from "@/components/ad-banner";

interface QuizDetailSidebarProps {
  quiz: {
    id: string;
    tags: string[];
    participants: number;
    averageScore: number;
    rating: number;
  };
}

export default function QuizDetailSidebar({ quiz }: QuizDetailSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full gap-2" size="lg">
            <Play className="h-4 w-4" />
            Start Quiz
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quiz Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Participants</span>
              <span className="font-medium">{quiz.participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">People have taken this quiz</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Average Score</span>
              <span className="font-medium">{quiz.averageScore}%</span>
            </div>
            <Progress value={quiz.averageScore} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Success Rate</span>
              <span className="font-medium">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quiz.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Alex Johnson", score: 98, rank: 1 },
              { name: "Sarah Chen", score: 95, rank: 2 },
              { name: "Mike Brown", score: 92, rank: 3 }
            ].map((user) => (
              <div key={user.rank} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {user.rank}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <span className="text-sm font-bold">{user.score}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdBanner type="sidebar" />
    </div>
  );
}