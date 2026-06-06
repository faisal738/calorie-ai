"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { FoodLog, MealType, Cuisine } from "@/lib/types";
import { USER_ID } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import FoodEntryForm from "@/components/FoodEntryForm";
import FoodLogList from "@/components/FoodLogList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FoodLogPage() {
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingFood, setAddingFood] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadFoodLogs();
  }, []);

  async function loadFoodLogs() {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("food_logs")
        .select("*")
        .eq("user_id", USER_ID)
        .eq("date", today)
        .order("created_at", { ascending: true });

      setFoodLogs((data as FoodLog[]) || []);
    } catch (err) {
      console.error("Error loading food logs:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddFood(data: {
    food_name: string;
    meal_type: MealType;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    quantity: number;
    unit: string;
    cuisine?: Cuisine;
  }) {
    setAddingFood(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data: newLog } = await supabase
        .from("food_logs")
        .insert({
          user_id: USER_ID,
          date: today,
          ...data,
        })
        .select()
        .maybeSingle();

      if (newLog) {
        setFoodLogs((prev) => [...prev, newLog as FoodLog]);
      }
    } catch (err) {
      console.error("Error adding food:", err);
    } finally {
      setAddingFood(false);
    }
  }

  async function handleDeleteFood(id: string) {
    try {
      await supabase.from("food_logs").delete().eq("id", id);
      setFoodLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  }

  const totalCalories = foodLogs.reduce((s, f) => s + f.calories, 0);

  return (
    <div className="min-h-screen bg-[var(--color-surface-soft)]">
      <Navbar />
      <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-[var(--color-ink)]">Food Log</h1>
            <p className="text-sm text-[var(--color-steel)]">
              {totalCalories > 0 ? `${Math.round(totalCalories)} calories logged today` : "Track your meals"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6 sticky top-24">
              <h2 className="text-sm font-medium text-[var(--color-ink)] mb-4">Add Food</h2>
              <FoodEntryForm onSubmit={handleAddFood} loading={addingFood} />
            </div>
          </div>

          {/* Log List */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6">
              <h2 className="text-sm font-medium text-[var(--color-ink)] mb-4">Today&apos;s Log</h2>
              {loading ? (
                <p className="text-sm text-[var(--color-steel)]">Loading...</p>
              ) : (
                <FoodLogList logs={foodLogs} onDelete={handleDeleteFood} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
