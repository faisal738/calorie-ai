"use client";

import type { Meal } from "@/lib/types";
import { Plus } from "lucide-react";

interface MealCardProps {
  meal: Meal;
  onAdd: (meal: Meal) => void;
  adding?: boolean;
}

const cuisineColors: Record<string, string> = {
  indian: "bg-orange-100 text-orange-700",
  western: "bg-blue-100 text-blue-700",
  asian: "bg-red-100 text-red-700",
  mediterranean: "bg-green-100 text-green-700",
};

const cuisineLabels: Record<string, string> = {
  indian: "Indian",
  western: "Western",
  asian: "Asian",
  mediterranean: "Mediterranean",
};

export default function MealCard({ meal, onAdd, adding }: MealCardProps) {
  return (
    <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-5 flex flex-col">
      {/* Cuisine tag + calories */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cuisineColors[meal.cuisine] || "bg-gray-100 text-gray-700"}`}>
          {cuisineLabels[meal.cuisine] || meal.cuisine}
        </span>
        <span className="text-sm font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">
          {meal.calories} cal
        </span>
      </div>

      {/* Name */}
      <h3 className="text-sm font-medium text-[var(--color-ink)] mb-1">
        {meal.name}
      </h3>
      <p className="text-xs text-[var(--color-steel)] mb-3">{meal.serving_size}</p>

      {/* Macro breakdown */}
      <div className="flex gap-3 text-xs text-[var(--color-slate)] mb-4">
        <span>
          <span className="text-red-400 font-medium">P</span> {meal.protein}g
        </span>
        <span>
          <span className="text-amber-400 font-medium">C</span> {meal.carbs}g
        </span>
        <span>
          <span className="text-blue-400 font-medium">F</span> {meal.fat}g
        </span>
        <span>
          <span className="text-purple-400 font-medium">Fi</span> {meal.fiber}g
        </span>
      </div>

      {/* Add button */}
      <button
        onClick={() => onAdd(meal)}
        disabled={adding}
        className="mt-auto w-full bg-[var(--color-surface)] border border-[var(--color-hairline)] text-[var(--color-ink)] text-xs font-medium py-2 rounded-full flex items-center justify-center gap-1.5 hover:bg-[var(--color-brand-green-soft)] hover:border-[var(--color-brand-green)] hover:text-[var(--color-brand-green)] disabled:opacity-50 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        {adding ? "Adding..." : "Add to Log"}
      </button>
    </div>
  );
}
