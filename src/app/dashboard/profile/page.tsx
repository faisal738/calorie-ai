"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { calculateAllTargets } from "@/lib/calculations";
import type { Profile, CalculatedTargets, Gender, ActivityLevel, Goal } from "@/lib/types";
import { USER_ID } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: "sedentary", label: "Sedentary" },
  { value: "lightly_active", label: "Lightly Active" },
  { value: "moderately_active", label: "Moderately Active" },
  { value: "very_active", label: "Very Active" },
  { value: "athlete", label: "Athlete" },
];

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: "weight_loss", label: "Weight Loss" },
  { value: "fat_loss", label: "Fat Loss" },
  { value: "maintenance", label: "Maintenance" },
  { value: "weight_gain", label: "Weight Gain" },
  { value: "muscle_building", label: "Muscle Building" },
  { value: "body_recomposition", label: "Body Recomposition" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [targets, setTargets] = useState<CalculatedTargets | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const { data } = await supabase.from("profiles").select("*").eq("id", USER_ID).single();
      if (data) {
        setProfile(data as Profile);
        setTargets(
          calculateAllTargets({
            name: data.name,
            age: data.age,
            gender: data.gender,
            height: data.height,
            weight: data.weight,
            goal_weight: data.goal_weight,
            activity_level: data.activity_level,
            goal: data.goal,
          })
        );
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    setSaved(false);
    try {
      await supabase
        .from("profiles")
        .update({
          name: profile.name,
          age: profile.age,
          gender: profile.gender,
          height: profile.height,
          weight: profile.weight,
          goal_weight: profile.goal_weight,
          activity_level: profile.activity_level,
          goal: profile.goal,
          updated_at: new Date().toISOString(),
        })
        .eq("id", USER_ID);

      // Recalculate and update daily targets
      const newTargets = calculateAllTargets({
        name: profile.name,
        age: profile.age,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        goal_weight: profile.goal_weight,
        activity_level: profile.activity_level,
        goal: profile.goal,
      });
      setTargets(newTargets);

      const today = new Date().toISOString().split("T")[0];
      await supabase
        .from("daily_targets")
        .upsert({
          user_id: USER_ID,
          date: today,
          daily_calories: newTargets.daily_calories,
          protein: newTargets.protein,
          carbs: newTargets.carbs,
          fat: newTargets.fat,
          fiber: newTargets.fiber,
          water: newTargets.water,
        });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--color-steel)]">Loading profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[var(--color-surface-soft)]">
      <Navbar />
      <main className="max-w-[640px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-semibold text-[var(--color-ink)]">Edit Profile</h1>
        </div>

        <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as Gender })}
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
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) || 0 })}
                className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Weight (kg)</label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) || 0 })}
                className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Goal Weight (kg)</label>
            <input
              type="number"
              value={profile.goal_weight}
              onChange={(e) => setProfile({ ...profile, goal_weight: parseFloat(e.target.value) || 0 })}
              className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Activity Level</label>
            <select
              value={profile.activity_level}
              onChange={(e) => setProfile({ ...profile, activity_level: e.target.value as ActivityLevel })}
              className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
            >
              {ACTIVITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)] mb-1.5">Goal</label>
            <select
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value as Goal })}
              className="w-full h-10 px-3 border border-[var(--color-hairline)] rounded-lg text-sm bg-[var(--color-canvas)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)]"
            >
              {GOAL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Updated targets preview */}
          {targets && (
            <div className="bg-[var(--color-surface)] rounded-lg p-4 mt-2">
              <p className="text-xs text-[var(--color-steel)] uppercase tracking-wide mb-2">Updated Targets</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-lg font-semibold text-[var(--color-brand-green)] font-[family-name:var(--font-geist-mono)]">{targets.daily_calories}</p>
                  <p className="text-xs text-[var(--color-steel)]">cal/day</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.protein}g</p>
                  <p className="text-xs text-[var(--color-steel)]">protein</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">{targets.carbs}g</p>
                  <p className="text-xs text-[var(--color-steel)]">carbs</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[var(--color-brand-green)] text-[var(--color-primary)] text-sm font-medium py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-[var(--color-brand-green-deep)] disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save & Recalculate Targets"}
          </button>
        </div>
      </main>
    </div>
  );
}
