"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { calculateAllTargets } from "@/lib/calculations";
import { USER_ID } from "@/lib/constants";
import type { OnboardingData, CalculatedTargets, ActivityLevel, Goal, Gender } from "@/lib/types";
import { ArrowRight, ArrowLeft, Check, Flame, Activity, Target, Scale, Droplets } from "lucide-react";

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
  { value: "lightly_active", label: "Lightly Active", desc: "1-3 workouts per week" },
  { value: "moderately_active", label: "Moderately Active", desc: "3-5 workouts per week" },
  { value: "very_active", label: "Very Active", desc: "6-7 workouts per week" },
  { value: "athlete", label: "Athlete", desc: "Intense training daily" },
];

const GOAL_OPTIONS: { value: Goal; label: string; desc: string }[] = [
  { value: "weight_loss", label: "Weight Loss", desc: "Lose fat, preserve muscle" },
  { value: "fat_loss", label: "Fat Loss", desc: "Aggressive fat reduction" },
  { value: "maintenance", label: "Maintenance", desc: "Maintain current weight" },
  { value: "weight_gain", label: "Weight Gain", desc: "Gain weight steadily" },
  { value: "muscle_building", label: "Muscle Building", desc: "Build lean muscle (lean bulk)" },
  { value: "body_recomposition", label: "Body Recomposition", desc: "Gain muscle while losing fat" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [targets, setTargets] = useState<CalculatedTargets | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState<OnboardingData>({
    name: "",
    age: 0,
    gender: "male",
    height: 0,
    weight: 0,
    goal_weight: 0,
    activity_level: "sedentary",
    goal: "weight_loss",
  });

  const totalSteps = 5;

  const updateForm = (field: keyof OnboardingData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 3) {
      const result = calculateAllTargets(form);
      setTargets(result);
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Save profile
      await supabase.from("profiles").upsert({
        id: USER_ID,
        name: form.name,
        age: form.age,
        gender: form.gender,
        height: form.height,
        weight: form.weight,
        goal_weight: form.goal_weight,
        activity_level: form.activity_level,
        goal: form.goal,
        onboarding_complete: true,
      });

      // Save daily targets
      if (targets) {
        const today = new Date().toISOString().split("T")[0];
        await supabase.from("daily_targets").upsert({
          user_id: USER_ID,
          date: today,
          daily_calories: targets.daily_calories,
          protein: targets.protein,
          carbs: targets.carbs,
          fat: targets.fat,
          fiber: targets.fiber,
          water: targets.water,
        });

        // Save health metrics
        await supabase.from("health_metrics").upsert({
          user_id: USER_ID,
          date: today,
          bmi: targets.bmi,
          bmr: targets.bmr,
          tdee: targets.tdee,
          weight: form.weight,
        });
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Error saving onboarding data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface-soft)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-[var(--color-brand-green)]" : "bg-[var(--color-hairline)]"
              }`}
            />
          ))}
          <span className="text-xs text-[var(--color-steel)] ml-2">
            {step}/{totalSteps}
          </span>
        </div>

        <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-8">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--color-brand-green-soft)] rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[var(--color-brand-green)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-ink)]">Personal Information</h2>
                  <p className="text-sm text-[var(--color-steel)]">Tell us about yourself</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Age</label>
                    <input
                      type="number"
                      value={form.age || ""}
                      onChange={(e) => updateForm("age", parseInt(e.target.value) || 0)}
                      className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Gender</label>
                    <select
                      value={form.gender}
                      onChange={(e) => updateForm("gender", e.target.value as Gender)}
                      className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      value={form.height || ""}
                      onChange={(e) => updateForm("height", parseInt(e.target.value) || 0)}
                      className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
                      placeholder="175"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      value={form.weight || ""}
                      onChange={(e) => updateForm("weight", parseFloat(e.target.value) || 0)}
                      className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
                      placeholder="80"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Goal Weight (kg)</label>
                  <input
                    type="number"
                    value={form.goal_weight || ""}
                    onChange={(e) => updateForm("goal_weight", parseFloat(e.target.value) || 0)}
                    className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
                    placeholder="70"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Activity Level */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--color-brand-green-soft)] rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[var(--color-brand-green)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-ink)]">Activity Level</h2>
                  <p className="text-sm text-[var(--color-steel)]">How active are you?</p>
                </div>
              </div>
              <div className="space-y-3">
                {ACTIVITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateForm("activity_level", opt.value)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      form.activity_level === opt.value
                        ? "border-[var(--color-brand-green)] bg-[var(--color-brand-green-soft)]"
                        : "border-[var(--color-hairline)] hover:border-[var(--color-brand-green)]"
                    }`}
                  >
                    <p className="text-sm font-medium text-[var(--color-ink)]">{opt.label}</p>
                    <p className="text-xs text-[var(--color-steel)] mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goal Selection */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--color-brand-green-soft)] rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-[var(--color-brand-green)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-ink)]">Your Goal</h2>
                  <p className="text-sm text-[var(--color-steel)]">What do you want to achieve?</p>
                </div>
              </div>
              <div className="space-y-3">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateForm("goal", opt.value)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      form.goal === opt.value
                        ? "border-[var(--color-brand-green)] bg-[var(--color-brand-green-soft)]"
                        : "border-[var(--color-hairline)] hover:border-[var(--color-brand-green)]"
                    }`}
                  >
                    <p className="text-sm font-medium text-[var(--color-ink)]">{opt.label}</p>
                    <p className="text-xs text-[var(--color-steel)] mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: BMI Card */}
          {step === 4 && targets && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--color-brand-green-soft)] rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[var(--color-brand-green)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-ink)]">Your Health Snapshot</h2>
                  <p className="text-sm text-[var(--color-steel)]">Based on your information</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--color-surface)] rounded-lg p-4">
                  <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide mb-1">BMI</p>
                  <p className="text-2xl font-semibold text-[var(--color-ink)]">{targets.bmi}</p>
                  <p className="text-xs text-[var(--color-brand-green)] font-medium">{targets.bmiCategory}</p>
                </div>
                <div className="bg-[var(--color-surface)] rounded-lg p-4">
                  <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide mb-1">BMR</p>
                  <p className="text-2xl font-semibold text-[var(--color-ink)]">{targets.bmr}</p>
                  <p className="text-xs text-[var(--color-steel)]">cal/day</p>
                </div>
                <div className="bg-[var(--color-surface)] rounded-lg p-4">
                  <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide mb-1">TDEE</p>
                  <p className="text-2xl font-semibold text-[var(--color-ink)]">{targets.tdee}</p>
                  <p className="text-xs text-[var(--color-steel)]">cal/day</p>
                </div>
                <div className="bg-[var(--color-surface)] rounded-lg p-4">
                  <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide mb-1">Daily Target</p>
                  <p className="text-2xl font-semibold text-[var(--color-brand-green)]">{targets.daily_calories}</p>
                  <p className="text-xs text-[var(--color-steel)]">cal/day</p>
                </div>
              </div>

              <div className="bg-[var(--color-brand-green-soft)] border border-[var(--color-brand-green)] rounded-lg p-4">
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  BMI Category: {targets.bmiCategory}
                </p>
                <p className="text-xs text-[var(--color-slate)] mt-1">
                  {targets.bmiCategory === "Underweight" && "Consider a calorie surplus to reach a healthier weight."}
                  {targets.bmiCategory === "Normal" && "You're in a healthy range — maintain or recompose."}
                  {targets.bmiCategory === "Overweight" && "A moderate deficit will help you reach a healthier weight."}
                  {targets.bmiCategory === "Obese" && "A structured deficit combined with exercise is recommended."}
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Targets Preview & Confirm */}
          {step === 5 && targets && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--color-brand-green-soft)] rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[var(--color-brand-green)]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-ink)]">Your Daily Targets</h2>
                  <p className="text-sm text-[var(--color-steel)]">Personalized for your goals</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-hairline-soft)]">
                  <span className="text-sm text-[var(--color-slate)]">Daily Calories</span>
                  <span className="text-sm font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.daily_calories} cal</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-hairline-soft)]">
                  <span className="text-sm text-[var(--color-slate)]">Protein</span>
                  <span className="text-sm font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.protein}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-hairline-soft)]">
                  <span className="text-sm text-[var(--color-slate)]">Carbs</span>
                  <span className="text-sm font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.carbs}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-hairline-soft)]">
                  <span className="text-sm text-[var(--color-slate)]">Fat</span>
                  <span className="text-sm font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.fat}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-hairline-soft)]">
                  <span className="text-sm text-[var(--color-slate)]">Fiber</span>
                  <span className="text-sm font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.fiber}g</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-[var(--color-slate)]">Water</span>
                  <span className="text-sm font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{(targets.water / 1000).toFixed(1)}L</span>
                </div>
              </div>

              {targets.estimated_completion_date && (
                <div className="bg-[var(--color-surface)] rounded-lg p-4 text-center">
                  <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide mb-1">
                    Estimated Goal Completion
                  </p>
                  <p className="text-lg font-semibold text-[var(--color-brand-green)]">
                    {new Date(targets.estimated_completion_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-1 text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={step === 1 && (!form.name || !form.age || !form.height || !form.weight || !form.goal_weight)}
                className="bg-[var(--color-brand-green)] text-[var(--color-primary)] text-sm font-medium px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[var(--color-brand-green-deep)] disabled:opacity-40 transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="bg-[var(--color-primary)] text-[var(--color-on-primary)] text-sm font-medium px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[var(--color-charcoal)] disabled:opacity-50 transition-colors"
              >
                {loading ? "Saving..." : "Complete Setup"} <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
