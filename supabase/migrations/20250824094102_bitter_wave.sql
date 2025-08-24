/*
  # Complete Authentication and User Management System

  1. New Tables
    - `user_profiles` - Extended user profile information
    - `user_roles` - Role management system
    - `user_gamification` - Points, levels, achievements system
    - `user_badges` - Badge system for achievements
    - `user_achievements` - Achievement tracking
    - `user_social_links` - Social media links
    - `user_sessions` - Session tracking with device info
    - `user_follows` - Following/follower system
    - `user_activities` - Activity logging for gamification
    - `achievement_definitions` - Available achievements
    - `badge_definitions` - Available badges

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
    - Secure user data access

  3. Triggers
    - Auto-create profile on user signup
    - Update gamification stats automatically
    - Track user activities
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Roles Enum
CREATE TYPE user_role AS ENUM (
  'superadmin',
  'admin', 
  'author',
  'contributor',
  'editor',
  'legaleditor',
  'moderator',
  'user'
);

-- Activity Types for Gamification
CREATE TYPE activity_type AS ENUM (
  'login',
  'article_read',
  'article_published',
  'quiz_completed',
  'quiz_created',
  'comment_posted',
  'article_liked',
  'profile_updated',
  'social_share',
  'achievement_earned',
  'badge_earned',
  'streak_maintained',
  'follow_user',
  'content_featured'
);

-- Badge Types
CREATE TYPE badge_type AS ENUM (
  'bronze',
  'silver', 
  'gold',
  'platinum',
  'diamond',
  'special',
  'limited'
);

-- Achievement Categories
CREATE TYPE achievement_category AS ENUM (
  'reading',
  'writing',
  'social',
  'learning',
  'engagement',
  'milestone',
  'special'
);

-- User Profiles Table (Extended from auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  display_name text,
  bio text,
  avatar_url text,
  cover_image_url text,
  location text,
  website text,
  birth_date date,
  role user_role DEFAULT 'user',
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  privacy_level integer DEFAULT 1, -- 1=public, 2=friends, 3=private
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Gamification Table
CREATE TABLE IF NOT EXISTS user_gamification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points integer DEFAULT 0,
  current_level integer DEFAULT 1,
  experience_points integer DEFAULT 0,
  points_to_next_level integer DEFAULT 100,
  login_streak integer DEFAULT 0,
  max_login_streak integer DEFAULT 0,
  last_login_date date,
  articles_read integer DEFAULT 0,
  articles_published integer DEFAULT 0,
  quizzes_completed integer DEFAULT 0,
  quizzes_created integer DEFAULT 0,
  comments_posted integer DEFAULT 0,
  likes_received integer DEFAULT 0,
  shares_made integer DEFAULT 0,
  followers_count integer DEFAULT 0,
  following_count integer DEFAULT 0,
  achievements_count integer DEFAULT 0,
  badges_count integer DEFAULT 0,
  reputation_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Achievement Definitions
CREATE TABLE IF NOT EXISTS achievement_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category achievement_category NOT NULL,
  icon text,
  points_reward integer DEFAULT 0,
  requirement_type text NOT NULL, -- 'count', 'streak', 'milestone', etc.
  requirement_value integer NOT NULL,
  requirement_field text, -- field to check (articles_read, login_streak, etc.)
  is_active boolean DEFAULT true,
  is_repeatable boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Badge Definitions  
CREATE TABLE IF NOT EXISTS badge_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  badge_type badge_type NOT NULL,
  icon text,
  color text DEFAULT '#6B7280',
  points_reward integer DEFAULT 0,
  requirement_type text NOT NULL,
  requirement_value integer NOT NULL,
  requirement_field text,
  is_active boolean DEFAULT true,
  rarity_level integer DEFAULT 1, -- 1=common, 5=legendary
  created_at timestamptz DEFAULT now()
);

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievement_definitions(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0,
  is_completed boolean DEFAULT false,
  UNIQUE(user_id, achievement_id)
);

-- User Badges
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badge_definitions(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  is_featured boolean DEFAULT false,
  UNIQUE(user_id, badge_id)
);

-- User Social Links
CREATE TABLE IF NOT EXISTS user_social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  platform text NOT NULL, -- 'twitter', 'linkedin', 'github', etc.
  url text NOT NULL,
  username text,
  is_verified boolean DEFAULT false,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- User Sessions (for tracking login details)
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token text,
  ip_address inet,
  user_agent text,
  device_type text,
  browser text,
  os text,
  country text,
  city text,
  is_active boolean DEFAULT true,
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- User Follows (Following/Follower system)
CREATE TABLE IF NOT EXISTS user_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- User Activities (for gamification tracking)
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  points_earned integer DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- User Preferences (Advanced settings)
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  theme text DEFAULT 'system', -- 'light', 'dark', 'system'
  language text DEFAULT 'en',
  timezone text DEFAULT 'UTC',
  date_format text DEFAULT 'MM/DD/YYYY',
  time_format text DEFAULT '12h',
  content_preferences jsonb DEFAULT '{}',
  notification_settings jsonb DEFAULT '{}',
  privacy_settings jsonb DEFAULT '{}',
  accessibility_settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- User Profiles Policies
CREATE POLICY "Users can view public profiles" ON user_profiles
  FOR SELECT USING (
    privacy_level = 1 OR 
    auth.uid() = id OR
    auth.uid() IN (
      SELECT following_id FROM user_follows WHERE follower_id = user_profiles.id
    )
  );

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- User Gamification Policies
CREATE POLICY "Users can view own gamification data" ON user_gamification
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public gamification data" ON user_gamification
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE privacy_level = 1
    )
  );

CREATE POLICY "System can update gamification data" ON user_gamification
  FOR ALL USING (true);

-- Achievement Definitions Policies (Public read)
CREATE POLICY "Anyone can view achievement definitions" ON achievement_definitions
  FOR SELECT USING (is_active = true);

-- Badge Definitions Policies (Public read)
CREATE POLICY "Anyone can view badge definitions" ON badge_definitions
  FOR SELECT USING (is_active = true);

-- User Achievements Policies
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public achievements" ON user_achievements
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE privacy_level = 1
    )
  );

-- User Badges Policies
CREATE POLICY "Users can view own badges" ON user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public badges" ON user_badges
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE privacy_level = 1
    )
  );

CREATE POLICY "Users can update own badge display" ON user_badges
  FOR UPDATE USING (auth.uid() = user_id);

-- User Social Links Policies
CREATE POLICY "Users can manage own social links" ON user_social_links
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public social links" ON user_social_links
  FOR SELECT USING (is_public = true);

-- User Sessions Policies
CREATE POLICY "Users can view own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON user_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- User Follows Policies
CREATE POLICY "Users can manage own follows" ON user_follows
  FOR ALL USING (auth.uid() = follower_id);

CREATE POLICY "Users can view public follows" ON user_follows
  FOR SELECT USING (true);

-- User Activities Policies
CREATE POLICY "Users can view own activities" ON user_activities
  FOR SELECT USING (auth.uid() = user_id);

-- User Preferences Policies
CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Functions and Triggers

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  
  INSERT INTO user_gamification (user_id)
  VALUES (NEW.id);
  
  INSERT INTO user_preferences (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for user profile creation
CREATE OR REPLACE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Function to update gamification stats
CREATE OR REPLACE FUNCTION update_gamification_stats()
RETURNS TRIGGER AS $$
DECLARE
  current_points integer;
  current_level integer;
  points_for_next_level integer;
BEGIN
  -- Get current stats
  SELECT total_points, current_level, points_to_next_level
  INTO current_points, current_level, points_for_next_level
  FROM user_gamification
  WHERE user_id = NEW.user_id;
  
  -- Update points
  UPDATE user_gamification
  SET 
    total_points = total_points + NEW.points_earned,
    updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Check for level up
  IF (current_points + NEW.points_earned) >= points_for_next_level THEN
    UPDATE user_gamification
    SET 
      current_level = current_level + 1,
      experience_points = (current_points + NEW.points_earned) - points_for_next_level,
      points_to_next_level = (current_level + 1) * 100, -- Simple level progression
      updated_at = now()
    WHERE user_id = NEW.user_id;
  ELSE
    UPDATE user_gamification
    SET 
      experience_points = experience_points + NEW.points_earned,
      updated_at = now()
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for gamification updates
CREATE OR REPLACE TRIGGER update_gamification_trigger
  AFTER INSERT ON user_activities
  FOR EACH ROW
  WHEN (NEW.points_earned > 0)
  EXECUTE FUNCTION update_gamification_stats();

-- Function to update follower counts
CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increase following count for follower
    UPDATE user_gamification
    SET following_count = following_count + 1
    WHERE user_id = NEW.follower_id;
    
    -- Increase followers count for followed user
    UPDATE user_gamification
    SET followers_count = followers_count + 1
    WHERE user_id = NEW.following_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrease following count for follower
    UPDATE user_gamification
    SET following_count = following_count - 1
    WHERE user_id = OLD.follower_id;
    
    -- Decrease followers count for unfollowed user
    UPDATE user_gamification
    SET followers_count = followers_count - 1
    WHERE user_id = OLD.following_id;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for follow count updates
CREATE OR REPLACE TRIGGER update_follow_counts_trigger
  AFTER INSERT OR DELETE ON user_follows
  FOR EACH ROW
  EXECUTE FUNCTION update_follow_counts();

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION check_achievements()
RETURNS TRIGGER AS $$
DECLARE
  achievement_record RECORD;
  user_stat integer;
BEGIN
  -- Loop through all active achievements
  FOR achievement_record IN 
    SELECT * FROM achievement_definitions WHERE is_active = true
  LOOP
    -- Get the user's current stat for this achievement
    EXECUTE format('SELECT %I FROM user_gamification WHERE user_id = $1', 
                   achievement_record.requirement_field)
    INTO user_stat
    USING NEW.user_id;
    
    -- Check if user meets the requirement and doesn't already have the achievement
    IF user_stat >= achievement_record.requirement_value AND
       NOT EXISTS (
         SELECT 1 FROM user_achievements 
         WHERE user_id = NEW.user_id 
         AND achievement_id = achievement_record.id 
         AND is_completed = true
       ) THEN
      
      -- Award the achievement
      INSERT INTO user_achievements (user_id, achievement_id, is_completed, progress)
      VALUES (NEW.user_id, achievement_record.id, true, achievement_record.requirement_value)
      ON CONFLICT (user_id, achievement_id) 
      DO UPDATE SET 
        is_completed = true,
        progress = achievement_record.requirement_value,
        earned_at = now();
      
      -- Award points for the achievement
      INSERT INTO user_activities (user_id, activity_type, points_earned, metadata)
      VALUES (NEW.user_id, 'achievement_earned', achievement_record.points_reward, 
              jsonb_build_object('achievement_id', achievement_record.id, 'achievement_name', achievement_record.name));
      
      -- Update achievement count
      UPDATE user_gamification
      SET achievements_count = achievements_count + 1
      WHERE user_id = NEW.user_id;
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for achievement checking
CREATE OR REPLACE TRIGGER check_achievements_trigger
  AFTER UPDATE ON user_gamification
  FOR EACH ROW
  EXECUTE FUNCTION check_achievements();

-- Insert some default achievements
INSERT INTO achievement_definitions (name, description, category, icon, points_reward, requirement_type, requirement_value, requirement_field) VALUES
('First Steps', 'Welcome to AelVorm! Complete your profile setup.', 'milestone', '🎯', 50, 'count', 1, 'total_points'),
('Bookworm', 'Read your first 10 articles', 'reading', '📚', 100, 'count', 10, 'articles_read'),
('Dedicated Reader', 'Read 100 articles', 'reading', '📖', 500, 'count', 100, 'articles_read'),
('Author', 'Publish your first article', 'writing', '✍️', 200, 'count', 1, 'articles_published'),
('Prolific Writer', 'Publish 10 articles', 'writing', '📝', 1000, 'count', 10, 'articles_published'),
('Social Butterfly', 'Get your first 10 followers', 'social', '🦋', 300, 'count', 10, 'followers_count'),
('Influencer', 'Reach 100 followers', 'social', '⭐', 1500, 'count', 100, 'followers_count'),
('Streak Master', 'Maintain a 7-day login streak', 'engagement', '🔥', 250, 'count', 7, 'login_streak'),
('Quiz Master', 'Complete your first 5 quizzes', 'learning', '🧠', 150, 'count', 5, 'quizzes_completed'),
('Knowledge Seeker', 'Complete 50 quizzes', 'learning', '🎓', 750, 'count', 50, 'quizzes_completed');

-- Insert some default badges
INSERT INTO badge_definitions (name, description, badge_type, icon, color, points_reward, requirement_type, requirement_value, requirement_field, rarity_level) VALUES
('Newcomer', 'Welcome to the community!', 'bronze', '🌟', '#CD7F32', 25, 'count', 1, 'total_points', 1),
('Regular Reader', 'Consistent reading habits', 'silver', '📚', '#C0C0C0', 100, 'count', 50, 'articles_read', 2),
('Expert Reader', 'Exceptional reading dedication', 'gold', '📖', '#FFD700', 300, 'count', 200, 'articles_read', 3),
('Content Creator', 'Published quality content', 'silver', '✍️', '#C0C0C0', 200, 'count', 5, 'articles_published', 2),
('Master Writer', 'Prolific content creation', 'gold', '📝', '#FFD700', 500, 'count', 25, 'articles_published', 3),
('Community Leader', 'Strong social presence', 'platinum', '👑', '#E5E4E2', 1000, 'count', 500, 'followers_count', 4),
('Legend', 'Exceptional community contribution', 'diamond', '💎', '#B9F2FF', 2500, 'count', 1000, 'total_points', 5);