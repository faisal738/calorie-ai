"use client";

import { Plus, Minus } from "lucide-react";

interface WaterTrackerProps {
  consumed: number; // ml
  target: number;   // ml
  onAdd: (ml: number) => void;
  onRemove: (ml: number) => void;
}

export default function WaterTracker({ consumed, target, onAdd, onRemove }: WaterTrackerProps) {
  const percentage = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
  const glasses = Math.round(consumed / 250);
  const targetGlasses = Math.round(target / 250);
  const isComplete = consumed >= target;

  return (
    <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[var(--color-ink)]">Water Intake</h3>
        <span className="text-xs text-[var(--color-steel)]">
          {(consumed / 1000).toFixed(1)}L / {(target / 1000).toFixed(1)}L
        </span>
      </div>

      {/* Glass indicators */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {Array.from({ length: targetGlasses }, (_, i) => (
          <div
            key={i}
            className={`w-6 h-8 rounded-sm transition-colors ${
              i < glasses
                ? "bg-[var(--color-brand-green)]"
                : "bg-[var(--color-hairline)]"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[var(--color-hairline)] rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-[var(--color-brand-green)] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isComplete && (
        <p className="text-xs text-[var(--color-brand-green)] font-medium mb-3">
          Water goal reached!
        </p>
      )}

      {/* Quick add/remove */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onRemove(250)}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xs text-[var(--color-steel)] flex-1 text-center">1 glass (250ml)</span>
        <button
          onClick={() => onAdd(250)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-brand-green)] text-[var(--color-primary)] hover:bg-[var(--color-brand-green-deep)] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
