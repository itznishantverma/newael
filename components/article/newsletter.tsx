"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    setEmail("");
  };

  return (
    <div className="bg-card p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get the latest insights on AI and business technology delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <Button type="submit" className="w-full">
          Subscribe
        </Button>
      </form>
      <p className="text-xs mt-3 text-muted-foreground">
        By subscribing, you agree to our Privacy Policy and Terms of Service.
      </p>
    </div>
  );
}