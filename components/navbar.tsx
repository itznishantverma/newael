"use client";
  
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Menu, 
  Sun, 
  Moon, 
  BookOpen,
  Newspaper,
  PenTool,
  BrainCircuit,
  Calendar,
  Info,
  MessageSquare,
  User,
  LogOut,
  UserPlus,
  LogIn,
  Settings,
  Trophy,
  Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import SignInForm from "@/components/auth/sign-in-form";
import SignUpForm from "@/components/auth/sign-up-form";

const navLinks = [
  { name: "Home", href: "/", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { name: "Articles", href: "/articles", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { name: "News", href: "/news", icon: <Newspaper className="h-4 w-4 mr-2" /> },
  { name: "Journal", href: "/journal", icon: <PenTool className="h-4 w-4 mr-2" /> },
  { name: "Quiz", href: "/quiz", icon: <BrainCircuit className="h-4 w-4 mr-2" /> },
  { name: "Daily GK", href: "/daily-gk", icon: <Calendar className="h-4 w-4 mr-2" /> },
  { name: "About", href: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
  { name: "Contact", href: "/contact", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, gamification, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin': return 'bg-purple-500 text-white';
      case 'admin': return 'bg-red-500 text-white';
      case 'author': return 'bg-blue-500 text-white';
      case 'contributor': return 'bg-green-500 text-white';
      case 'editor': return 'bg-orange-500 text-white';
      case 'legaleditor': return 'bg-indigo-500 text-white';
      case 'moderator': return 'bg-yellow-500 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-xl">AelVorm</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="top-4 translate-y-0">
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                  <DialogDescription>Search across all content</DialogDescription>
                </DialogHeader>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-full"
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-1"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Menu */}
            {!loading && (
              <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        {user && profile ? (
                          <>
                            <AvatarImage src={profile.avatar_url || undefined} alt={profile.display_name || profile.username || 'User'} />
                            <AvatarFallback>
                              {(profile.display_name || profile.username || user.email || 'U')[0].toUpperCase()}
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {gamification && gamification.total_points > 0 && (
                        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {gamification.current_level}
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    {user && profile ? (
                      <>
                        <div className="p-3 border-b">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={profile.avatar_url || undefined} alt={profile.display_name || profile.username || 'User'} />
                              <AvatarFallback>
                                {(profile.display_name || profile.username || user.email || 'U')[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {profile.display_name || profile.username}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {user.email}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getRoleColor(profile.role)}`}>
                                  {profile.role}
                                </Badge>
                                {profile.is_verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Star className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {gamification && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>Level {gamification.current_level}</span>
                                <span>{gamification.total_points} points</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-1.5">
                                <div 
                                  className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                                  style={{ 
                                    width: `${(gamification.experience_points / gamification.points_to_next_level) * 100}%` 
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{gamification.experience_points} XP</span>
                                <span>{gamification.points_to_next_level} XP to next level</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" /> Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer">
                            <BookOpen className="mr-2 h-4 w-4" /> Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/achievements" className="cursor-pointer">
                            <Trophy className="mr-2 h-4 w-4" /> Achievements
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/settings" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" /> Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                          <LogOut className="mr-2 h-4 w-4" /> Sign out
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DialogTrigger asChild>
                          <DropdownMenuItem 
                            onSelect={() => setAuthMode("signin")} 
                            className="cursor-pointer"
                          >
                            <LogIn className="mr-2 h-4 w-4" /> Sign in
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                          <DropdownMenuItem 
                            onSelect={() => setAuthMode("signup")} 
                            className="cursor-pointer"
                          >
                            <UserPlus className="mr-2 h-4 w-4" /> Sign up
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {authMode === "signin" ? "Welcome back" : "Create an account"}
                    </DialogTitle>
                    <DialogDescription>
                      {authMode === "signin" 
                        ? "Sign in to your account to continue" 
                        : "Enter your details to create your account"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-6">
                    {authMode === "signin" ? (
                      <SignInForm
                        onSuccess={() => setIsAuthOpen(false)}
                        onToggleMode={() => setAuthMode("signup")}
                      />
                    ) : (
                      <SignUpForm
                        onSuccess={() => setIsAuthOpen(false)}
                        onToggleMode={() => setAuthMode("signin")}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* Mobile/Tablet Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col space-y-4 py-4">
                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.name}
                        href={link.href}
                        className="flex items-center py-2 px-3 rounded-md hover:bg-secondary"
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}