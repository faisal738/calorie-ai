"use client";

import Navbar from "@/components/Navbar";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
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
          <h1 className="text-xl font-semibold text-[var(--color-ink)]">Settings</h1>
        </div>

        <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="w-5 h-5 text-[var(--color-brand-green)]" />
            <h2 className="text-sm font-medium text-[var(--color-ink)]">App Settings</h2>
          </div>
          <p className="text-sm text-[var(--color-steel)]">
            Manage your profile and nutrition targets from the <Link href="/dashboard/profile" className="text-[var(--color-brand-green)] hover:underline">Profile</Link> page.
          </p>
        </div>
      </main>
    </div>
  );
}
