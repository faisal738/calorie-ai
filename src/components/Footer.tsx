import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-canvas)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-steel)]">
            Calorie AI — Smart Goal & Nutrition Calculator
          </p>
          <div className="flex gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/meals"
              className="text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
            >
              Meal Suggestions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
