// ============================================================
// Shared TypeScript interfaces for the Calorie AI application
// ============================================================

export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderately_active"
  | "very_active"
  | "athlete";

export type Goal =
  | "weight_loss"
  | "weight_gain"
  | "muscle_building"
  | "fat_loss"
  | "body_recomposition"
  | "maintenance";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type Cuisine = "indian" | "western" | "asian" | "mediterranean";

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  goal_weight: number; // kg
  activity_level: ActivityLevel;
  goal: Goal;
  created_at: string;
  updated_at: string;
}

export interface DailyTarget {
  id?: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  daily_calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  water: number; // ml
}

export interface FoodLog {
  id?: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  meal_type: MealType;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  quantity: number;
  unit: string;
  cuisine?: Cuisine;
}

export interface WaterLog {
  id?: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  amount_ml: number;
}

export interface HealthMetrics {
  id?: string;
  user_id: string;
  date: string;
  bmi: number;
  bmr: number;
  tdee: number;
  weight: number;
}

export interface Meal {
  id: string;
  name: string;
  cuisine: Cuisine;
  meal_type: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  serving_size: string;
  description?: string;
}

export interface OnboardingData {
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  goal_weight: number;
  activity_level: ActivityLevel;
  goal: Goal;
}

export interface CalculatedTargets {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  daily_calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: number; // ml
  estimated_completion_date: string;
}

export interface AIInsight {
  type: "warning" | "success" | "info" | "alert";
  message: string;
}
