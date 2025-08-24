"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareArticleProps {
  article: {
    title: string;
    excerpt: string;
  };
  className?: string;
}

export default function ShareArticle({ article, className }: ShareArticleProps) {
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${article.title}\n\n${article.excerpt}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.excerpt)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Article link has been copied to clipboard",
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Share This Article</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
          onClick={() => handleShare('facebook')}
        >
          <Facebook className="h-5 w-5" />
          Share on Facebook
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
          onClick={() => handleShare('twitter')}
        >
          <Twitter className="h-5 w-5" />
          Share on Twitter
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
          onClick={() => handleShare('linkedin')}
        >
          <Linkedin className="h-5 w-5" />
          Share on LinkedIn
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={() => handleShare('copy')}
        >
          <Link2 className="h-5 w-5" />
          Copy Link
        </Button>
      </CardContent>
    </Card>
  );
}