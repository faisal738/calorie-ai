// ============================================================
// Health & Nutrition Calculation Engine
// ============================================================

import { ActivityLevel, CalculatedTargets, Gender, Goal, OnboardingData } from "./types";

// ---- Activity multipliers ----
const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  athlete: 1.9,
};

// ---- Calorie adjustments per goal ----
const CALORIE_ADJUSTMENTS: Record<Goal, number> = {
  weight_loss: -500,
  fat_loss: -750,
  maintenance: 0,
  weight_gain: 300,
  muscle_building: 250,
  body_recomposition: 0,
};

// ---- Protein multipliers (g per kg body weight) per goal ----
const PROTEIN_MULTIPLIERS: Record<Goal, number> = {
  weight_loss: 2.2,
  muscle_building: 2.0,
  weight_gain: 1.8,
  body_recomposition: 2.3,
  fat_loss: 2.2,
  maintenance: 1.8,
};

// ---- BMI classification ----
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// ---- BMI ----
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

// ---- BMR (Mifflin-St Jeor) ----
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

// ---- TDEE ----
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_FACTORS[activityLevel];
}

// ---- Daily calorie target ----
export function calculateDailyCalories(tdee: number, goal: Goal): number {
  return Math.round(tdee + CALORIE_ADJUSTMENTS[goal]);
}

// ---- Macro calculation ----
export function calculateMacros(
  dailyCalories: number,
  weightKg: number,
  goal: Goal
): { protein: number; fat: number; carbs: number } {
  const protein = Math.round(PROTEIN_MULTIPLIERS[goal] * weightKg);
  const fatCalories = dailyCalories * 0.25;
  const fat = Math.round(fatCalories / 9); // 9 cal per gram
  const proteinCalories = protein * 4;
  const carbCalories = dailyCalories - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4); // 4 cal per gram
  return { protein, fat, carbs };
}

// ---- Fiber target ----
export function calculateFiber(gender: Gender): number {
  return gender === "male" ? 35 : 25;
}

// ---- Water intake ----
export function calculateWater(weightKg: number, exerciseMinutes: number = 0): number {
  const base = weightKg * 35; // ml
  const exerciseExtra = Math.floor(exerciseMinutes / 60) * 500;
  return Math.round(base + exerciseExtra);
}

// ---- Estimated goal completion date ----
export function estimateCompletionDate(
  currentWeight: number,
  goalWeight: number,
  goal: Goal
): string {
  // Only meaningful for weight change goals
  if (goal === "maintenance" || goal === "body_recomposition") {
    // For recomp, estimate ~12 weeks
    if (goal === "body_recomposition") {
      const date = new Date();
      date.setDate(date.getDate() + 12 * 7);
      return date.toISOString().split("T")[0];
    }
    return ""; // No target for maintenance
  }

  const weeklyChange: Record<Goal, number> = {
    weight_loss: 0.45, // kg/week
    fat_loss: 0.85,
    weight_gain: 0.25,
    muscle_building: 0.2,
    maintenance: 0,
    body_recomposition: 0,
  };

  const diff = Math.abs(currentWeight - goalWeight);
  const rate = weeklyChange[goal];
  if (rate === 0) return "";

  const weeks = Math.ceil(diff / rate);
  const date = new Date();
  date.setDate(date.getDate() + weeks * 7);
  return date.toISOString().split("T")[0];
}

// ---- Full calculation pipeline ----
export function calculateAllTargets(data: OnboardingData): CalculatedTargets {
  const bmi = calculateBMI(data.weight, data.height);
  const bmr = calculateBMR(data.weight, data.height, data.age, data.gender);
  const tdee = calculateTDEE(bmr, data.activity_level);
  const daily_calories = calculateDailyCalories(tdee, data.goal);
  const { protein, fat, carbs } = calculateMacros(daily_calories, data.weight, data.goal);
  const fiber = calculateFiber(data.gender);
  const water = calculateWater(data.weight);
  const estimated_completion_date = estimateCompletionDate(data.weight, data.goal_weight, data.goal);

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory: getBMICategory(bmi),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    daily_calories,
    protein,
    carbs,
    fat,
    fiber,
    water,
    estimated_completion_date,
  };
}
