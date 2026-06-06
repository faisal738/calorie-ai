"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Meal, Cuisine, MealType, DailyTarget, FoodLog } from "@/lib/types";
import { USER_ID } from "@/lib/constants";
import { getMatchedMeals } from "@/lib/meal-matcher";
import Navbar from "@/components/Navbar";
import CuisineFilter from "@/components/CuisineFilter";
import MealCard from "@/components/MealCard";
import { ArrowLeft, Utensils } from "lucide-react";
import Link from "next/link";

export default function MealsPage() {
  const [cuisine, setCuisine] = useState<Cuisine | "all">("all");
  const [mealType, setMealType] = useState<MealType | "all">("all");
  const [targets, setTargets] = useState<DailyTarget | null>(null);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [matchedMeals, setMatchedMeals] = useState<Meal[]>([]);
  const [addingMealId, setAddingMealId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (targets) {
      const meals = getMatchedMeals(targets, foodLogs, {
        cuisine: cuisine === "all" ? undefined : cuisine,
        meal_type: mealType === "all" ? undefined : mealType,
      });
      setMatchedMeals(meals);
    }
  }, [cuisine, mealType, targets, foodLogs]);

  async function loadData() {
    try {
      const today = new Date().toISOString().split("T")[0];

      const { data: targetData } = await supabase
        .from("daily_targets")
        .select("*")
        .eq("user_id", USER_ID)
        .eq("date", today)
        .maybeSingle();

      if (targetData) setTargets(targetData as DailyTarget);

      const { data: foodData } = await supabase
        .from("food_logs")
        .select("*")
        .eq("user_id", USER_ID)
        .eq("date", today);

      setFoodLogs((foodData as FoodLog[]) || []);
    } catch (err) {
      console.error("Error loading meals data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddMeal(meal: Meal) {
    setAddingMealId(meal.id);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data: newLog } = await supabase
        .from("food_logs")
        .insert({
          user_id: USER_ID,
          date: today,
          meal_type: meal.meal_type,
          food_name: meal.name,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat,
          fiber: meal.fiber,
          quantity: 1,
          unit: meal.serving_size,
          cuisine: meal.cuisine,
        })
        .select()
        .maybeSingle();

      if (newLog) {
        setFoodLogs((prev) => [...prev, newLog as FoodLog]);
      }
    } catch (err) {
      console.error("Error adding meal:", err);
    } finally {
      setAddingMealId(null);
    }
  }

  const totalCalories = foodLogs.reduce((s, f) => s + f.calories, 0);
  const remainingCalories = targets ? targets.daily_calories - totalCalories : 0;

  return (
    <div className="min-h-screen bg-[var(--color-surface-soft)]">
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-[var(--color-ink)]">Meal Suggestions</h1>
            <p className="text-sm text-[var(--color-steel)]">
              {targets
                ? `${Math.max(remainingCalories, 0)} cal remaining — meals sorted by fit`
                : "Loading your targets..."}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6 mb-6">
          <CuisineFilter
            selectedCuisine={cuisine}
            selectedMealType={mealType}
            onCuisineChange={setCuisine}
            onMealTypeChange={setMealType}
          />
        </div>

        {/* Meal Grid */}
        {loading ? (
          <p className="text-sm text-[var(--color-steel)] text-center py-12">Loading meals...</p>
        ) : matchedMeals.length === 0 ? (
          <div className="text-center py-12">
            <Utensils className="w-10 h-10 text-[var(--color-muted)] mx-auto mb-3" />
            <p className="text-sm text-[var(--color-steel)]">No meals match your filters</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              Try adjusting your cuisine or meal type filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {matchedMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onAdd={handleAddMeal}
                adding={addingMealId === meal.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
