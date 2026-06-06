"use client";

interface CalorieRingProps {
  consumed: number;
  target: number;
}

export default function CalorieRing({ consumed, target }: CalorieRingProps) {
  const percentage = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
  const remaining = Math.max(target - consumed, 0);
  const over = consumed > target;

  // SVG circle calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={over ? "var(--color-brand-error)" : "var(--color-brand-green)"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-[var(--color-ink)] font-[family-name:var(--font-geist-mono)]">
            {consumed}
          </span>
          <span className="text-xs text-[var(--color-steel)]">of {target} cal</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        {over ? (
          <p className="text-sm font-medium text-[var(--color-brand-error)]">
            Over by {consumed - target} cal
          </p>
        ) : (
          <p className="text-sm text-[var(--color-steel)]">
            {remaining} cal remaining
          </p>
        )}
      </div>
    </div>
  );
}
