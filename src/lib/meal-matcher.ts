// ============================================================
// Meal Matcher — Filter and sort meals by remaining macros
// ============================================================

import type { Meal, DailyTarget, FoodLog, MealType, Cuisine } from "./types";
import { MEALS } from "./meal-database";

export interface MealFilterOptions {
  cuisine?: Cuisine;
  meal_type?: MealType;
  max_calories?: number;
}

/**
 * Get meals filtered by cuisine, meal type, and remaining calories.
 * Sorted by how well they fit within the remaining budget.
 */
export function getMatchedMeals(
  targets: DailyTarget,
  foodLogs: FoodLog[],
  filters: MealFilterOptions = {}
): Meal[] {
  // Calculate consumed
  const consumedCalories = foodLogs.reduce((s, f) => s + f.calories, 0);
  const remainingCalories = targets.daily_calories - consumedCalories;

  // Start with all meals
  let meals = [...MEALS];

  // Filter by cuisine
  if (filters.cuisine) {
    meals = meals.filter((m) => m.cuisine === filters.cuisine);
  }

  // Filter by meal type
  if (filters.meal_type) {
    meals = meals.filter((m) => m.meal_type === filters.meal_type);
  }

  // Filter by max calories
  const maxCal = filters.max_calories || remainingCalories;
  if (maxCal > 0) {
    meals = meals.filter((m) => m.calories <= maxCal * 1.1); // 10% tolerance
  }

  // Sort by how close they are to filling the remaining budget
  meals.sort((a, b) => {
    const aDiff = Math.abs(remainingCalories - a.calories);
    const bDiff = Math.abs(remainingCalories - b.calories);
    return aDiff - bDiff;
  });

  return meals;
}

/**
 * Get all available cuisines
 */
export function getCuisines(): { value: Cuisine; label: string; emoji: string }[] {
  return [
    { value: "indian", label: "Indian", emoji: "🇮🇳" },
    { value: "western", label: "Western", emoji: "🍔" },
    { value: "asian", label: "Asian", emoji: "🥢" },
    { value: "mediterranean", label: "Mediterranean", emoji: "🫒" },
  ];
}

/**
 * Get meal type options
 */
export function getMealTypes(): { value: MealType; label: string }[] {
  return [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
  ];
}
