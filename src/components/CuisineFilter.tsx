"use client";

import type { Cuisine, MealType } from "@/lib/types";
import { getCuisines, getMealTypes } from "@/lib/meal-matcher";

interface CuisineFilterProps {
  selectedCuisine: Cuisine | "all";
  selectedMealType: MealType | "all";
  onCuisineChange: (cuisine: Cuisine | "all") => void;
  onMealTypeChange: (mealType: MealType | "all") => void;
}

export default function CuisineFilter({
  selectedCuisine,
  selectedMealType,
  onCuisineChange,
  onMealTypeChange,
}: CuisineFilterProps) {
  const cuisines = getCuisines();
  const mealTypes = getMealTypes();

  return (
    <div className="space-y-4">
      {/* Cuisine filter */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-steel)] uppercase tracking-wide mb-2">
          Cuisine
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onCuisineChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCuisine === "all"
                ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                : "bg-[var(--color-surface)] text-[var(--color-steel)] border border-[var(--color-hairline)]"
            }`}
          >
            All
          </button>
          {cuisines.map((c) => (
            <button
              key={c.value}
              onClick={() => onCuisineChange(c.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCuisine === c.value
                  ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "bg-[var(--color-surface)] text-[var(--color-steel)] border border-[var(--color-hairline)]"
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Meal type filter */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-steel)] uppercase tracking-wide mb-2">
          Meal Type
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onMealTypeChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedMealType === "all"
                ? "bg-[var(--color-brand-green)] text-[var(--color-primary)]"
                : "bg-[var(--color-surface)] text-[var(--color-steel)] border border-[var(--color-hairline)]"
            }`}
          >
            All
          </button>
          {mealTypes.map((mt) => (
            <button
              key={mt.value}
              onClick={() => onMealTypeChange(mt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedMealType === mt.value
                ? "bg-[var(--color-brand-green)] text-[var(--color-primary)]"
                : "bg-[var(--color-surface)] text-[var(--color-steel)] border border-[var(--color-hairline)]"
              }`}
            >
              {mt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
