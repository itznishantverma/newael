"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ArticleCommentsProps {
  articleId: string;
}

const mockComments = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    content: "Great article! The explanation about modern frameworks really helped clarify some concepts for me.",
    timestamp: "2024-03-19T15:30:00Z",
    likes: 12,
    replies: 2
  },
  {
    id: 2,
    user: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    content: "Would love to see a follow-up article about performance optimization techniques in these frameworks.",
    timestamp: "2024-03-19T16:45:00Z",
    likes: 8,
    replies: 1
  }
];

export default function ArticleComments({ articleId }: ArticleCommentsProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setComment("");
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" disabled={!comment.trim()}>
          Post Comment
        </Button>
      </form>

      <div className="space-y-6">
        {mockComments.map((comment) => (
          <div key={comment.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{comment.user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm mb-3">{comment.content}</p>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <ThumbsUp className="h-4 w-4" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    {comment.replies}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}