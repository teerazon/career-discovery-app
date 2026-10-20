-- ==============================================================================
-- Career Discovery Platform - Complete Supabase Production Schema & Migration
-- ==============================================================================

-- 1. Enable UUID Extension (standard in PostgreSQL / Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. User Profiles Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    education_level TEXT DEFAULT 'มัธยมศึกษาตอนปลาย',
    phone TEXT,
    province TEXT DEFAULT 'กรุงเทพมหานคร',
    interested_careers TEXT[] DEFAULT '{}',
    interested_faculties TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_province ON public.profiles(province);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile trigger on auth.users sign-up (Handles unverified & verified email flows)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    username, 
    email, 
    education_level, 
    phone, 
    province, 
    interested_careers, 
    interested_faculties
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'education_level', 'มัธยมศึกษาตอนปลาย'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'province', 'กรุงเทพมหานคร'),
    '{}',
    '{}'
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    education_level = EXCLUDED.education_level,
    phone = EXCLUDED.phone,
    province = EXCLUDED.province,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 3. Game Logs & Skill Analytics Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.game_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    career_id TEXT NOT NULL,
    career_name TEXT,
    total_score INT NOT NULL,
    max_score INT DEFAULT 100,
    skills_analytical INT DEFAULT 0,
    skills_problem_solving INT DEFAULT 0,
    skills_communication INT DEFAULT 0,
    skills_thoroughness INT DEFAULT 0,
    strengths TEXT[] DEFAULT '{}',
    areas_to_improve TEXT[] DEFAULT '{}',
    case_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_game_logs_user_id ON public.game_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_game_logs_career_id ON public.game_logs(career_id);
CREATE INDEX IF NOT EXISTS idx_game_logs_created_at ON public.game_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.game_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for game_logs
DROP POLICY IF EXISTS "Users can view their own game logs." ON public.game_logs;
CREATE POLICY "Users can view their own game logs." 
ON public.game_logs FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Anyone can insert game logs." ON public.game_logs;
CREATE POLICY "Anyone can insert game logs." 
ON public.game_logs FOR INSERT WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 4. Careers Reference Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.careers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    title_en TEXT,
    category TEXT NOT NULL,
    salary_range TEXT,
    salary_min INT DEFAULT 0,
    salary_max INT DEFAULT 0,
    demand TEXT,
    demand_level INT DEFAULT 0,
    description TEXT,
    licenses TEXT,
    minigame_ready BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Careers are viewable by everyone." ON public.careers;
CREATE POLICY "Careers are viewable by everyone." ON public.careers FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- 5. Universities Reference Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.universities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    province TEXT,
    tcas_criteria TEXT,
    tuition_fee TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Universities are viewable by everyone." ON public.universities;
CREATE POLICY "Universities are viewable by everyone." ON public.universities FOR SELECT USING (true);

-- ==============================================================================
-- End of Schema Migration
-- ==============================================================================
