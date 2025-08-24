import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types for our database
export interface UserProfile {
  id: string;
  username?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  cover_image_url?: string;
  location?: string;
  website?: string;
  birth_date?: string;
  role: 'superadmin' | 'admin' | 'author' | 'contributor' | 'editor' | 'legaleditor' | 'moderator' | 'user';
  is_verified: boolean;
  is_active: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  privacy_level: number;
  created_at: string;
  updated_at: string;
}

export interface UserGamification {
  id: string;
  user_id: string;
  total_points: number;
  current_level: number;
  experience_points: number;
  points_to_next_level: number;
  login_streak: number;
  max_login_streak: number;
  last_login_date?: string;
  articles_read: number;
  articles_published: number;
  quizzes_completed: number;
  quizzes_created: number;
  comments_posted: number;
  likes_received: number;
  shares_made: number;
  followers_count: number;
  following_count: number;
  achievements_count: number;
  badges_count: number;
  reputation_score: number;
  created_at: string;
  updated_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  progress: number;
  is_completed: boolean;
  achievement_definitions?: AchievementDefinition;
}

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  category: 'reading' | 'writing' | 'social' | 'learning' | 'engagement' | 'milestone' | 'special';
  icon?: string;
  points_reward: number;
  requirement_type: string;
  requirement_value: number;
  requirement_field?: string;
  is_active: boolean;
  is_repeatable: boolean;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  is_featured: boolean;
  badge_definitions?: BadgeDefinition;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  badge_type: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'special' | 'limited';
  icon?: string;
  color: string;
  points_reward: number;
  requirement_type: string;
  requirement_value: number;
  requirement_field?: string;
  is_active: boolean;
  rarity_level: number;
  created_at: string;
}

export interface UserSocialLink {
  id: string;
  user_id: string;
  platform: string;
  url: string;
  username?: string;
  is_verified: boolean;
  is_public: boolean;
  created_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token?: string;
  ip_address?: string;
  user_agent?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  is_active: boolean;
  last_activity: string;
  created_at: string;
  expires_at?: string;
}

export interface UserFollow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: 'login' | 'article_read' | 'article_published' | 'quiz_completed' | 'quiz_created' | 'comment_posted' | 'article_liked' | 'profile_updated' | 'social_share' | 'achievement_earned' | 'badge_earned' | 'streak_maintained' | 'follow_user' | 'content_featured';
  points_earned: number;
  metadata?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  theme: string;
  language: string;
  timezone: string;
  date_format: string;
  time_format: string;
  content_preferences?: any;
  notification_settings?: any;
  privacy_settings?: any;
  accessibility_settings?: any;
  created_at: string;
  updated_at: string;
}