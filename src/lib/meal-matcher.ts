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
 * Search meals by name (case-insensitive, partial match).
 * Returns matches sorted by relevance (exact first, then by how early the match appears).
 */
export function searchMeals(query: string, limit = 8): Meal[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  const scored = MEALS.map((meal) => {
    const name = meal.name.toLowerCase();
    let score = 0;

    if (name === q) {
      score = 1000; // exact match
    } else if (name.startsWith(q)) {
      score = 500;
    } else if (name.includes(q)) {
      score = 200 + (10 - name.indexOf(q)); // earlier match = higher score
    } else {
      // word-level partial match
      const words = name.split(/\s+/);
      for (const word of words) {
        if (word.startsWith(q)) {
          score = Math.max(score, 100);
        } else if (word.includes(q)) {
          score = Math.max(score, 50);
        }
      }
    }

    return { meal, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.meal);

  return scored;
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
