-- ============================================================
-- Supabase Database Schema for Calorie AI (No Auth)
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  height REAL NOT NULL,
  weight REAL NOT NULL,
  goal_weight REAL NOT NULL,
  activity_level TEXT NOT NULL CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'athlete')),
  goal TEXT NOT NULL CHECK (goal IN ('weight_loss', 'weight_gain', 'muscle_building', 'fat_loss', 'body_recomposition', 'maintenance')),
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily targets table
CREATE TABLE IF NOT EXISTS daily_targets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  daily_calories INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  carbs INTEGER NOT NULL,
  fat INTEGER NOT NULL,
  fiber INTEGER NOT NULL,
  water INTEGER NOT NULL,
  UNIQUE(user_id, date)
);

-- Food logs table
CREATE TABLE IF NOT EXISTS food_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name TEXT NOT NULL,
  calories REAL NOT NULL,
  protein REAL NOT NULL,
  carbs REAL NOT NULL,
  fat REAL NOT NULL,
  fiber REAL NOT NULL DEFAULT 0,
  quantity REAL NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'serving',
  cuisine TEXT CHECK (cuisine IN ('indian', 'western', 'asian', 'mediterranean')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Water logs table
CREATE TABLE IF NOT EXISTS water_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount_ml INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Health metrics table
CREATE TABLE IF NOT EXISTS health_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  bmi REAL NOT NULL,
  bmr REAL NOT NULL,
  tdee REAL NOT NULL,
  weight REAL NOT NULL,
  UNIQUE(user_id, date)
);

-- Disable RLS (no auth — single-user mode)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_targets DISABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE water_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics DISABLE ROW LEVEL SECURITY;
