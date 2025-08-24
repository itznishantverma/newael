"use client";
  
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  BookOpen,
  ArrowUp
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/articles" },
  { name: "News", href: "/news" },
  { name: "Blogs", href: "/blogs" },
  { name: "Quiz", href: "/quiz" },
  { name: "Daily Affairs", href: "/daily-affairs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  "Technology", 
  "Business", 
  "Health", 
  "Lifestyle", 
  "Education", 
  "Fashion", 
  "Automotive", 
  "Science", 
  "Politics", 
  "Travel"
];

export default function Footer() {
  return (
    <footer className="bg-secondary/40 border-t pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-xl">AelVorm</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              AelVorm is a platform for insightful articles, news, blogs, and daily knowledge. 
              Our mission is to provide high-quality content that informs, educates, and inspires.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="inline-flex px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe to Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Stay updated with our latest articles and news.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background"
              />
              <Button className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AelVorm. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}