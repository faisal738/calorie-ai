import Link from "next/link";
import { Flame, Target, Utensils, Droplets, Brain } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero */}
      <section className="brand-gradient-sky py-24 md:py-32 px-4">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-[var(--color-ink)] tracking-tight leading-tight">
            Smart Goal &<br />Nutrition Calculator
          </h1>
          <p className="text-lg text-[var(--color-slate)] mt-6 max-w-xl mx-auto leading-relaxed">
            AI-powered calorie tracking, macro calculation, and personalized meal
            suggestions — tailored to your body, your goals, and your cuisine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/onboarding"
              className="bg-[var(--color-brand-green)] text-[var(--color-primary)] text-sm font-medium px-6 py-3 rounded-full hover:bg-[var(--color-brand-green-deep)] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-[var(--color-ink)] mb-12">
            Everything you need to reach your goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Smart Goal Setting",
                desc: "Choose from 6 goals — weight loss, muscle building, recomp, and more. Calories and macros are calculated automatically.",
              },
              {
                icon: Utensils,
                title: "Cuisine-Based Meals",
                desc: "Indian, Western, Asian, Mediterranean — get meal suggestions that match your remaining macros and your palate.",
              },
              {
                icon: Droplets,
                title: "Water & Fiber Tracking",
                desc: "Auto-calculated water intake based on weight. Fiber targets by gender. Track every sip and bite.",
              },
              {
                icon: Brain,
                title: "AI Nutrition Advisor",
                desc: "Real-time insights: protein deficit alerts, water reminders, weekly projections — all rule-based, no API needed.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-xl p-6"
              >
                <feature.icon className="w-8 h-8 text-[var(--color-brand-green)] mb-4" />
                <h3 className="text-base font-semibold text-[var(--color-ink)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-[720px] mx-auto text-center">
          <Flame className="w-10 h-10 text-[var(--color-brand-green)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-ink)] mb-4">
            Start your nutrition journey today
          </h2>
          <p className="text-sm text-[var(--color-steel)] mb-8 leading-relaxed">
            Complete onboarding and get your personalized
            calorie and macro targets instantly.
          </p>
          <Link
            href="/onboarding"
            className="bg-[var(--color-primary)] text-[var(--color-on-primary)] text-sm font-medium px-6 py-3 rounded-full hover:bg-[var(--color-charcoal)] transition-colors inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
