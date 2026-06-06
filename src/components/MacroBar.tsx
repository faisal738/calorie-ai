"use client";

interface MacroBarProps {
  label: string;
  consumed: number;
  target: number;
  unit?: string;
  color?: string;
}

export default function MacroBar({
  label,
  consumed,
  target,
  unit = "g",
  color = "var(--color-brand-green)",
}: MacroBarProps) {
  const percentage = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
  const over = consumed > target;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[var(--color-ink)]">{label}</span>
        <span className="text-sm font-[family-name:var(--font-geist-mono)] text-[var(--color-slate)]">
          <span className={over ? "text-[var(--color-brand-error)] font-medium" : ""}>
            {consumed}
          </span>
          /{target}{unit}
        </span>
      </div>
      <div className="h-2 bg-[var(--color-hairline)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: over ? "var(--color-brand-error)" : color,
          }}
        />
      </div>
    </div>
  );
}
