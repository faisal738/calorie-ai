"use client";

import type { FoodLog } from "@/lib/types";
import { Trash2, Utensils } from "lucide-react";

interface FoodLogListProps {
  logs: FoodLog[];
  onDelete: (id: string) => void;
}

export default function FoodLogList({ logs, onDelete }: FoodLogListProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <Utensils className="w-10 h-10 text-[var(--color-muted)] mx-auto mb-3" />
        <p className="text-sm text-[var(--color-steel)]">No food logged yet</p>
        <p className="text-xs text-[var(--color-muted)] mt-1">Use the form above to log your meals</p>
      </div>
    );
  }

  // Group by meal type
  const grouped: Record<string, FoodLog[]> = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  };

  logs.forEach((log) => {
    if (grouped[log.meal_type]) {
      grouped[log.meal_type].push(log);
    }
  });

  const mealLabels: Record<string, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
  };

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([mealType, items]) => {
        if (items.length === 0) return null;
        const mealCalories = items.reduce((s, f) => s + f.calories, 0);
        return (
          <div key={mealType}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[var(--color-ink)] capitalize">
                {mealLabels[mealType] || mealType}
              </h4>
              <span className="text-xs text-[var(--color-steel)] font-[family-name:var(--font-geist-mono)]">
                {Math.round(mealCalories)} cal
              </span>
            </div>
            <div className="space-y-2">
              {items.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-[var(--color-surface)] rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-ink)] truncate">{log.food_name}</p>
                    <p className="text-xs text-[var(--color-steel)] font-[family-name:var(--font-geist-mono)]">
                      P: {Math.round(log.protein)}g &middot; C: {Math.round(log.carbs)}g &middot; F: {Math.round(log.fat)}g
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className="text-sm font-medium text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">
                      {Math.round(log.calories)} cal
                    </span>
                    {log.id && (
                      <button
                        onClick={() => onDelete(log.id!)}
                        className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-brand-error)] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
