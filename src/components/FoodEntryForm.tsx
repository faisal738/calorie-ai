"use client";

import { useState } from "react";
import type { MealType, Cuisine } from "@/lib/types";

interface FoodEntryFormProps {
  onSubmit: (data: {
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
  }) => void;
  loading?: boolean;
}

export default function FoodEntryForm({ onSubmit, loading }: FoodEntryFormProps) {
  const [foodName, setFoodName] = useState("");
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("serving");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      food_name: foodName,
      meal_type: mealType,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      quantity,
      unit,
    });
    // Reset
    setFoodName("");
    setCalories(0);
    setProtein(0);
    setCarbs(0);
    setFat(0);
    setFiber(0);
    setQuantity(1);
    setUnit("serving");
  };

  const mealTypes: { value: MealType; label: string }[] = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Food Name */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
          Food Name
        </label>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
          placeholder="e.g. Grilled Chicken Breast"
          className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
        />
      </div>

      {/* Meal Type */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
          Meal Type
        </label>
        <div className="flex gap-2 flex-wrap">
          {mealTypes.map((mt) => (
            <button
              key={mt.value}
              type="button"
              onClick={() => setMealType(mt.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mealType === mt.value
                  ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "bg-[var(--color-surface)] text-[var(--color-steel)] border border-[var(--color-hairline)]"
              }`}
            >
              {mt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Calories</label>
          <input
            type="number"
            value={calories || ""}
            onChange={(e) => setCalories(parseInt(e.target.value) || 0)}
            required
            placeholder="0"
            className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Protein (g)</label>
          <input
            type="number"
            value={protein || ""}
            onChange={(e) => setProtein(parseInt(e.target.value) || 0)}
            required
            placeholder="0"
            className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Carbs (g)</label>
          <input
            type="number"
            value={carbs || ""}
            onChange={(e) => setCarbs(parseInt(e.target.value) || 0)}
            required
            placeholder="0"
            className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Fat (g)</label>
          <input
            type="number"
            value={fat || ""}
            onChange={(e) => setFat(parseInt(e.target.value) || 0)}
            required
            placeholder="0"
            className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Fiber (g)</label>
          <input
            type="number"
            value={fiber || ""}
            onChange={(e) => setFiber(parseInt(e.target.value) || 0)}
            placeholder="0"
            className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Quantity</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
              step="0.5"
              min="0.5"
              className="w-20 h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
            />
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="serving"
              className="flex-1 h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !foodName}
        className="w-full bg-[var(--color-brand-green)] text-[var(--color-primary)] text-sm font-medium py-2.5 rounded-full hover:bg-[var(--color-brand-green-deep)] disabled:opacity-40 transition-colors"
      >
        {loading ? "Adding..." : "Add to Food Log"}
      </button>
    </form>
  );
}
