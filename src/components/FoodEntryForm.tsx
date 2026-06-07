"use client";

import { useState, useRef, useEffect } from "react";
import type { MealType, Cuisine, Meal } from "@/lib/types";
import { searchMeals } from "@/lib/meal-matcher";

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
  const [suggestions, setSuggestions] = useState<Meal[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleFoodNameChange(value: string) {
    setFoodName(value);
    setAutoFilled(false);
    if (value.trim().length >= 2) {
      const results = searchMeals(value);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }

  function handleSelectMeal(meal: Meal) {
    setFoodName(meal.name);
    setCalories(meal.calories);
    setProtein(meal.protein);
    setCarbs(meal.carbs);
    setFat(meal.fat);
    setFiber(meal.fiber);
    setUnit(meal.serving_size);
    setAutoFilled(true);
    setShowDropdown(false);
    inputRef.current?.focus();
  }

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
    setAutoFilled(false);
  };

  const mealTypes: { value: MealType; label: string }[] = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Food Name with Autocomplete */}
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">
          Food Name
        </label>
        <input
          ref={inputRef}
          type="text"
          value={foodName}
          onChange={(e) => handleFoodNameChange(e.target.value)}
          onFocus={() => {
            if (foodName.trim().length >= 2 && suggestions.length > 0) setShowDropdown(true);
          }}
          required
          placeholder="e.g. Grilled Chicken Breast"
          autoComplete="off"
          className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
        />
        {/* Autocomplete Dropdown */}
        {showDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {suggestions.map((meal) => (
              <button
                key={meal.id}
                type="button"
                onClick={() => handleSelectMeal(meal)}
                className="w-full text-left px-3 py-2.5 hover:bg-[var(--color-surface-soft)] transition-colors border-b border-[var(--color-hairline)] last:border-b-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--color-ink)]">{meal.name}</span>
                  <span className="text-xs text-[var(--color-steel)] whitespace-nowrap">{meal.calories} kcal</span>
                </div>
                <div className="flex gap-3 mt-0.5 text-xs text-[var(--color-steel)]">
                  <span>P: {meal.protein}g</span>
                  <span>C: {meal.carbs}g</span>
                  <span>F: {meal.fat}g</span>
                  <span className="capitalize">{meal.cuisine}</span>
                </div>
              </button>
            ))}
          </div>
        )}
        {autoFilled && (
          <p className="text-xs text-[var(--color-brand-green)] mt-1">
            Auto-filled from database — edit values if needed
          </p>
        )}
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
      {autoFilled && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-surface-soft)] border border-[var(--color-hairline)]">
          <svg className="w-4 h-4 text-[var(--color-brand-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="text-xs text-[var(--color-ink)]">Nutrition auto-filled from database</span>
        </div>
      )}
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
