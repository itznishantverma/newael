"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, UserProfile, UserGamification } from './supabase';
import { User, Session } from '@supabase/supabase-js';

interface ExtendedUser extends User {
  profile?: UserProfile;
  gamification?: UserGamification;
}

interface AuthContextType {
  user: ExtendedUser | null;
  session: Session | null;
  profile: UserProfile | null;
  gamification: UserGamification | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: any }>;
  signUp: (email: string, password: string, name: string, username?: string) => Promise<{ user: User | null; error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  trackActivity: (activityType: string, pointsEarned?: number, metadata?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  gamification: null,
  loading: true,
  signIn: async () => ({ user: null, error: null }),
  signUp: async () => ({ user: null, error: null }),
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
  trackActivity: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [gamification, setGamification] = useState<UserGamification | null>(null);
  const [loading, setLoading] = useState(true);

  // Get device and browser info
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    let browser = 'unknown';
    let os = 'unknown';

    // Detect device type
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = 'tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      deviceType = 'mobile';
    }

    // Detect browser
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    // Detect OS
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';

    return { deviceType, browser, os, userAgent };
  };

  // Track user session
  const trackSession = async (userId: string) => {
    try {
      const deviceInfo = getDeviceInfo();
      
      // Get IP address (you might want to use a service for this)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      await supabase.from('user_sessions').insert({
        user_id: userId,
        ip_address: ip,
        user_agent: deviceInfo.userAgent,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      });
    } catch (error) {
      console.error('Error tracking session:', error);
    }
  };

  // Load user profile and gamification data
  const loadUserData = async (userId: string) => {
    try {
      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Load gamification data
      const { data: gamificationData, error: gamificationError } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (gamificationError) {
        console.error('Error loading gamification:', gamificationError);
      } else {
        setGamification(gamificationData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error };
      }

      if (data.user) {
        // Track login activity
        await trackActivity('login', 10);
        
        // Track session
        await trackSession(data.user.id);
      }

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const signUp = async (email: string, password: string, name: string, username?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            name: name,
            username: username || email.split('@')[0],
          }
        }
      });

      if (error) {
        return { user: null, error };
      }

      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setProfile(data);
      await trackActivity('profile_updated', 5);
      
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const trackActivity = async (activityType: string, pointsEarned: number = 0, metadata: any = {}) => {
    if (!user) return;

    try {
      const deviceInfo = getDeviceInfo();
      
      await supabase.from('user_activities').insert({
        user_id: user.id,
        activity_type: activityType,
        points_earned: pointsEarned,
        metadata,
        user_agent: deviceInfo.userAgent,
      });
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user as ExtendedUser);
        loadUserData(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (session?.user) {
        setUser(session.user as ExtendedUser);
        await loadUserData(session.user.id);
        
        // Track login activity for sign in events
        if (event === 'SIGNED_IN') {
          await trackActivity('login', 10);
          await trackSession(session.user.id);
        }
      } else {
        setUser(null);
        setProfile(null);
        setGamification(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update login streak
  useEffect(() => {
    if (user && gamification) {
      const updateLoginStreak = async () => {
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = gamification.last_login_date;
        
        if (lastLogin !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          let newStreak = 1;
          if (lastLogin === yesterdayStr) {
            newStreak = gamification.login_streak + 1;
          }
          
          const { error } = await supabase
            .from('user_gamification')
            .update({
              login_streak: newStreak,
              max_login_streak: Math.max(newStreak, gamification.max_login_streak),
              last_login_date: today,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id);

          if (!error) {
            setGamification(prev => prev ? {
              ...prev,
              login_streak: newStreak,
              max_login_streak: Math.max(newStreak, prev.max_login_streak),
              last_login_date: today,
            } : null);
            
            // Award points for maintaining streak
            if (newStreak > 1) {
              await trackActivity('streak_maintained', newStreak * 5, { streak: newStreak });
            }
          }
        }
      };
      
      updateLoginStreak();
    }
  }, [user, gamification]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      gamification, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      updateProfile, 
      trackActivity 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};