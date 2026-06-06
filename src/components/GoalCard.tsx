"use client";

import type { CalculatedTargets, Profile } from "@/lib/types";
import { Target, Scale, Flame, Droplets, Calendar } from "lucide-react";

interface GoalCardProps {
  profile: Profile;
  targets: CalculatedTargets;
}

export default function GoalCard({ profile, targets }: GoalCardProps) {
  const goalLabels: Record<string, string> = {
    weight_loss: "Weight Loss",
    fat_loss: "Fat Loss",
    maintenance: "Maintenance",
    weight_gain: "Weight Gain",
    muscle_building: "Muscle Building",
    body_recomposition: "Body Recomposition",
  };

  return (
    <div className="bg-[var(--color-canvas)] border-2 border-[var(--color-brand-green)] rounded-xl p-6 shadow-[0_8px_24px_rgba(0,212,164,0.08)]">
      <div className="flex items-center gap-2 mb-5">
        <Target className="w-5 h-5 text-[var(--color-brand-green)]" />
        <h3 className="text-base font-semibold text-[var(--color-ink)]">Your Goal Card</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide">Goal</p>
          <p className="text-sm font-medium text-[var(--color-brand-green)] mt-0.5">
            {goalLabels[profile.goal] || profile.goal}
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide">BMI</p>
          <p className="text-sm font-medium text-[var(--color-ink)] mt-0.5 font-[family-name:var(--font-geist-mono)]">
            {targets.bmi} <span className="text-[var(--color-steel)] font-sans font-normal">({targets.bmiCategory})</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide">BMR</p>
          <p className="text-sm font-medium text-[var(--color-ink)] mt-0.5 font-[family-name:var(--font-geist-mono)]">
            {targets.bmr} cal
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide">TDEE</p>
          <p className="text-sm font-medium text-[var(--color-ink)] mt-0.5 font-[family-name:var(--font-geist-mono)]">
            {targets.tdee} cal
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide">Daily Calories</p>
          <p className="text-sm font-semibold text-[var(--color-brand-green)] mt-0.5 font-[family-name:var(--font-geist-mono)]">
            {targets.daily_calories} cal
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide">Weight Goal</p>
          <p className="text-sm font-medium text-[var(--color-ink)] mt-0.5">
            <Scale className="w-3.5 h-3.5 inline mr-1" />
            {profile.goal_weight} kg
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--color-hairline-soft)] grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div>
            <p className="text-xs text-[var(--color-steel)]">Protein</p>
            <p className="text-sm font-medium text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.protein}g</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div>
            <p className="text-xs text-[var(--color-steel)]">Carbs</p>
            <p className="text-sm font-medium text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.carbs}g</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <div>
            <p className="text-xs text-[var(--color-steel)]">Fat</p>
            <p className="text-sm font-medium text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.fat}g</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-3.5 h-3.5 text-[var(--color-brand-green)]" />
          <div>
            <p className="text-xs text-[var(--color-steel)]">Water</p>
            <p className="text-sm font-medium text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{(targets.water / 1000).toFixed(1)}L</p>
          </div>
        </div>
      </div>

      {targets.estimated_completion_date && (
        <div className="mt-4 pt-3 border-t border-[var(--color-hairline-soft)] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--color-brand-green)]" />
          <p className="text-xs text-[var(--color-steel)]">
            Estimated completion:{" "}
            <span className="font-medium text-[var(--color-ink)]">
              {new Date(targets.estimated_completion_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
