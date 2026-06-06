"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Flame } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-canvas)] border-b border-[var(--color-hairline-soft)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Flame className="w-7 h-7 text-[var(--color-brand-green)]" />
            <span className="text-lg font-semibold text-[var(--color-ink)]">
              Calorie AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/log"
              className="text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
            >
              Log Food
            </Link>
            <Link
              href="/dashboard/meals"
              className="text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
            >
              Meals
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-sm text-[var(--color-steel)] hover:text-[var(--color-ink)] transition-colors"
            >
              Profile
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--color-ink)]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[var(--color-hairline-soft)]">
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[var(--color-steel)] px-2 py-2"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/log"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[var(--color-steel)] px-2 py-2"
              >
                Log Food
              </Link>
              <Link
                href="/dashboard/meals"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[var(--color-steel)] px-2 py-2"
              >
                Meals
              </Link>
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[var(--color-steel)] px-2 py-2"
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
