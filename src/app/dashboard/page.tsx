"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { calculateAllTargets } from "@/lib/calculations";
import { USER_ID } from "@/lib/constants";
import type { Profile, DailyTarget, FoodLog, WaterLog, CalculatedTargets } from "@/lib/types";
import Navbar from "@/components/Navbar";
import CalorieRing from "@/components/CalorieRing";
import MacroBar from "@/components/MacroBar";
import WaterTracker from "@/components/WaterTracker";
import GoalCard from "@/components/GoalCard";
import AIAdvisor from "@/components/AIAdvisor";
import { Utensils, Plus } from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [targets, setTargets] = useState<CalculatedTargets | null>(null);
  const [dailyTarget, setDailyTarget] = useState<DailyTarget | null>(null);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const today = new Date().toISOString().split("T")[0];

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", USER_ID)
        .maybeSingle();

      if (!profileData) {
        // No profile yet — redirect to onboarding
        router.replace("/onboarding");
        return;
      }

      setProfile(profileData as Profile);

      // Calculate targets
      const calculated = calculateAllTargets({
        name: profileData.name,
        age: profileData.age,
        gender: profileData.gender,
        height: profileData.height,
        weight: profileData.weight,
        goal_weight: profileData.goal_weight,
        activity_level: profileData.activity_level,
        goal: profileData.goal,
      });
      setTargets(calculated);

      // Load daily targets
      const { data: targetData } = await supabase
        .from("daily_targets")
        .select("*")
        .eq("user_id", USER_ID)
        .eq("date", today)
        .maybeSingle();

      if (targetData) {
        setDailyTarget(targetData as DailyTarget);
      } else {
        // Create daily target for today
        const newTarget = {
          user_id: USER_ID,
          date: today,
          daily_calories: calculated.daily_calories,
          protein: calculated.protein,
          carbs: calculated.carbs,
          fat: calculated.fat,
          fiber: calculated.fiber,
          water: calculated.water,
        };
        await supabase.from("daily_targets").insert(newTarget);
        setDailyTarget({ ...newTarget, date: today });
      }

      // Load food logs
      const { data: foodData } = await supabase
        .from("food_logs")
        .select("*")
        .eq("user_id", USER_ID)
        .eq("date", today)
        .order("created_at", { ascending: true });

      setFoodLogs((foodData as FoodLog[]) || []);

      // Load water logs
      const { data: waterData } = await supabase
        .from("water_logs")
        .select("*")
        .eq("user_id", USER_ID)
        .eq("date", today)
        .order("created_at", { ascending: true });

      setWaterLogs((waterData as WaterLog[]) || []);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddWater(ml: number) {
    const today = new Date().toISOString().split("T")[0];
    await supabase.from("water_logs").insert({
      user_id: USER_ID,
      date: today,
      amount_ml: ml,
    });

    setWaterLogs((prev) => [
      ...prev,
      { user_id: USER_ID, date: today, amount_ml: ml },
    ]);
  }

  async function handleRemoveWater(ml: number) {
    const lastLog = [...waterLogs].reverse().find((w) => w.amount_ml >= ml);
    if (lastLog?.id) {
      await supabase.from("water_logs").delete().eq("id", lastLog.id);
      setWaterLogs((prev) => prev.filter((w) => w.id !== lastLog.id));
    }
  }

  // Compute totals
  const totalCalories = foodLogs.reduce((s, f) => s + f.calories, 0);
  const totalProtein = foodLogs.reduce((s, f) => s + f.protein, 0);
  const totalCarbs = foodLogs.reduce((s, f) => s + f.carbs, 0);
  const totalFat = foodLogs.reduce((s, f) => s + f.fat, 0);
  const totalFiber = foodLogs.reduce((s, f) => s + f.fiber, 0);
  const totalWater = waterLogs.reduce((s, w) => s + w.amount_ml, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-[var(--color-steel)]">Loading your dashboard...</div>
      </div>
    );
  }

  if (!profile || !targets || !dailyTarget) return null;

  return (
    <div className="min-h-screen bg-[var(--color-surface-soft)]">
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-ink)]">
              Hello, {profile.name}
            </h1>
            <p className="text-sm text-[var(--color-steel)] mt-1">
              Here&apos;s your nutrition overview for today
            </p>
          </div>
          <Link
            href="/dashboard/log"
            className="bg-[var(--color-brand-green)] text-[var(--color-primary)] text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[var(--color-brand-green-deep)] transition-colors w-fit"
          >
            <Plus className="w-4 h-4" /> Log Food
          </Link>
        </div>

        {/* Goal Card */}
        <div className="mb-8">
          <GoalCard profile={profile} targets={targets} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Calorie ring + macros */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calorie Ring */}
            <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6">
              <h3 className="text-sm font-medium text-[var(--color-ink)] mb-4">Calorie Progress</h3>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <CalorieRing consumed={Math.round(totalCalories)} target={dailyTarget.daily_calories} />
                <div className="flex-1 w-full space-y-4">
                  <MacroBar
                    label="Protein"
                    consumed={Math.round(totalProtein)}
                    target={dailyTarget.protein}
                    color="#ef4444"
                  />
                  <MacroBar
                    label="Carbs"
                    consumed={Math.round(totalCarbs)}
                    target={dailyTarget.carbs}
                    color="#f59e0b"
                  />
                  <MacroBar
                    label="Fat"
                    consumed={Math.round(totalFat)}
                    target={dailyTarget.fat}
                    color="#3b82f6"
                  />
                  <MacroBar
                    label="Fiber"
                    consumed={Math.round(totalFiber)}
                    target={dailyTarget.fiber}
                    color="#8b5cf6"
                  />
                </div>
              </div>
            </div>

            {/* Today's Food Log Summary */}
            <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[var(--color-brand-green)]" />
                  <h3 className="text-sm font-medium text-[var(--color-ink)]">Today&apos;s Food Log</h3>
                </div>
                <Link
                  href="/dashboard/log"
                  className="text-xs text-[var(--color-brand-green)] font-medium hover:underline"
                >
                  View All
                </Link>
              </div>
              {foodLogs.length === 0 ? (
                <p className="text-sm text-[var(--color-steel)] py-4 text-center">
                  No food logged yet. Start tracking your meals!
                </p>
              ) : (
                <div className="space-y-2">
                  {foodLogs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between py-2 border-b border-[var(--color-hairline-soft)] last:border-0"
                    >
                      <div>
                        <p className="text-sm text-[var(--color-ink)]">{log.food_name}</p>
                        <p className="text-xs text-[var(--color-steel)] capitalize">{log.meal_type}</p>
                      </div>
                      <p className="text-sm font-[family-name:var(--font-geist-mono)] text-[var(--color-slate)]">
                        {log.calories} cal
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column: Water + AI */}
          <div className="space-y-6">
            <WaterTracker
              consumed={totalWater}
              target={dailyTarget.water}
              onAdd={handleAddWater}
              onRemove={handleRemoveWater}
            />
            <AIAdvisor
              targets={dailyTarget}
              foodLogs={foodLogs}
              waterLogs={waterLogs}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
