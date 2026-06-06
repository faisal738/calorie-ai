"use client";

import type { AIInsight, DailyTarget, FoodLog, WaterLog } from "@/lib/types";
import { Brain, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

interface AIAdvisorProps {
  targets: DailyTarget;
  foodLogs: FoodLog[];
  waterLogs: WaterLog[];
}

export default function AIAdvisor({ targets, foodLogs, waterLogs }: AIAdvisorProps) {
  const insights: AIInsight[] = [];

  // Calculate totals
  const totalCalories = foodLogs.reduce((sum, f) => sum + f.calories, 0);
  const totalProtein = foodLogs.reduce((sum, f) => sum + f.protein, 0);
  const totalCarbs = foodLogs.reduce((sum, f) => sum + f.carbs, 0);
  const totalFat = foodLogs.reduce((sum, f) => sum + f.fat, 0);
  const totalFiber = foodLogs.reduce((sum, f) => sum + f.fiber, 0);
  const totalWater = waterLogs.reduce((sum, w) => sum + w.amount_ml, 0);

  // Protein insight
  const proteinDiff = targets.protein - totalProtein;
  if (proteinDiff > 40) {
    insights.push({
      type: "warning",
      message: `You are under protein by ${Math.round(proteinDiff)}g today. Try adding a high-protein meal.`,
    });
  } else if (proteinDiff > 0 && proteinDiff <= 40) {
    insights.push({
      type: "success",
      message: `You're close to your protein goal — only ${Math.round(proteinDiff)}g to go!`,
    });
  } else if (totalProtein > targets.protein) {
    insights.push({
      type: "alert",
      message: `You exceeded protein by ${Math.round(totalProtein - targets.protein)}g.`,
    });
  }

  // Fat insight
  if (totalFat > targets.fat) {
    insights.push({
      type: "alert",
      message: `You exceeded fats by ${Math.round(totalFat - targets.fat)}g. Consider lighter options for the rest of the day.`,
    });
  }

  // Carbs insight
  const carbDiff = targets.carbs - totalCarbs;
  if (carbDiff > 100) {
    insights.push({
      type: "info",
      message: `You have ${Math.round(carbDiff)}g of carbs remaining. Plan your meals accordingly.`,
    });
  } else if (totalCarbs > targets.carbs) {
    insights.push({
      type: "alert",
      message: `You exceeded carbs by ${Math.round(totalCarbs - targets.carbs)}g.`,
    });
  }

  // Water insight
  const waterDiffMl = targets.water - totalWater;
  if (waterDiffMl > 1000) {
    insights.push({
      type: "warning",
      message: `You need ${(waterDiffMl / 1000).toFixed(1)}L more water. Stay hydrated!`,
    });
  } else if (waterDiffMl > 0) {
    insights.push({
      type: "info",
      message: `You need ${(waterDiffMl / 1000).toFixed(1)}L more water today.`,
    });
  } else {
    insights.push({
      type: "success",
      message: "Great job! You've hit your water goal for today.",
    });
  }

  // Fiber insight
  const fiberDiff = targets.fiber - totalFiber;
  if (fiberDiff > 15) {
    insights.push({
      type: "info",
      message: `You're ${Math.round(fiberDiff)}g short on fiber. Add vegetables, whole grains, or legumes.`,
    });
  }

  // Calorie projection
  const calorieDiff = targets.daily_calories - totalCalories;
  if (calorieDiff > 500) {
    insights.push({
      type: "info",
      message: `You have ${Math.round(calorieDiff)} calories remaining today. Don't skip meals!`,
    });
  } else if (calorieDiff >= 0 && calorieDiff <= 500) {
    insights.push({
      type: "success",
      message: "You're on track with your calorie target today. Keep it up!",
    });
  } else {
    insights.push({
      type: "alert",
      message: `You're ${Math.round(Math.abs(calorieDiff))} calories over your target.`,
    });
  }

  const iconMap = {
    warning: AlertTriangle,
    success: CheckCircle,
    info: Info,
    alert: AlertCircle,
  };

  const colorMap = {
    warning: "text-amber-500 bg-amber-50",
    success: "text-[var(--color-brand-green)] bg-[var(--color-brand-green-soft)]",
    info: "text-blue-500 bg-blue-50",
    alert: "text-red-500 bg-red-50",
  };

  return (
    <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-[var(--color-brand-green)]" />
        <h3 className="text-sm font-medium text-[var(--color-ink)]">AI Nutrition Advisor</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.type];
          return (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${colorMap[insight.type]}`}>
              <Icon className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed">{insight.message}</p>
            </div>
          );
        })}
        {insights.length === 0 && (
          <p className="text-sm text-[var(--color-steel)]">Log some food to get personalized insights.</p>
        )}
      </div>
    </div>
  );
}
