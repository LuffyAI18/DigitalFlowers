"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";

const USE_CASES = [
  {
    emoji: "💕",
    title: "Express Your Love",
    desc: "Send a bouquet that says what words can't. Let your heart bloom through petals.",
    color: "#F4A7B9",
  },
  {
    emoji: "🙏",
    title: "Heartfelt Apology",
    desc: "When sorry isn't enough, let flowers speak your sincerity with grace.",
    color: "#C084FC",
  },
  {
    emoji: "🌟",
    title: "Say Thank You",
    desc: "Honour someone who made a difference. Gratitude, beautifully wrapped.",
    color: "#F9D23A",
  },
  {
    emoji: "🎉",
    title: "Celebrate Milestones",
    desc: "Birthdays, promotions, graduations — every triumph deserves a bouquet.",
    color: "#F97316",
  },
];

const HERO_FLOWERS = ["🌹", "🌻", "🌸", "🌷", "🌺", "🪷", "🌼", "💐"];

export default function LandingPage() {
  const [currentFlower, setCurrentFlower] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentFlower((prev) => (prev + 1) % HERO_FLOWERS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-golden-gradient relative overflow-hidden">
      <FloatingPetals />

      {/* ── Nav ── */}
      <nav className="relative z-10 w-full flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-sway inline-block">🌸</span>
          <span className="font-display text-xl font-semibold text-[var(--gold-800)]">
            DigitalFlowers
          </span>
        </div>
        <Link
          href="/create"
          className="btn-gold px-5 py-2 rounded-full text-sm font-semibold"
        >
          Create a Bouquet
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-10 pb-20">
        {/* Rotating flower icon */}
        <div
          className="text-7xl sm:text-8xl mb-6 select-none transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0 }}
          key={currentFlower}
        >
          <span
            className="inline-block animate-bloom"
            style={{ animationDuration: "0.6s" }}
          >
            {HERO_FLOWERS[currentFlower]}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-4 text-[var(--foreground)]">
          Send Love That{" "}
          <span className="text-gold-gradient italic">Blooms</span>
        </h1>

        <p className="max-w-xl text-lg sm:text-xl text-[var(--gold-800)] opacity-80 mb-4 leading-relaxed font-light">
          Craft a stunning digital bouquet, pour your heart into a note,
          and share a link that blooms beautifully — for exactly 7 days.
        </p>

        <p className="font-script text-2xl text-[var(--gold-600)] mb-10 opacity-70">
          every petal, a moment of love.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/create"
            className="btn-gold px-10 py-4 rounded-full text-base font-semibold tracking-wide animate-bounce-gentle shadow-lg"
          >
            🌸 Create Your Bouquet
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full border-2 border-[var(--gold-300)] text-[var(--gold-700)] font-medium hover:bg-[var(--gold-50)] transition-all text-sm"
          >
            How It Works ↓
          </a>
        </div>

        {/* Expiry badge */}
        <div className="mt-10 flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[var(--gold-200)] rounded-full px-5 py-2 text-sm text-[var(--gold-700)] font-medium">
          <span>⏳</span>
          <span>Each bouquet lives for <strong>7 days</strong> — precious & ephemeral</span>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="divider-gold mx-auto w-2/3 my-4 relative z-10" />

      {/* ── How it Works ── */}
      <section
        id="how-it-works"
        className="relative z-10 section-padding max-w-5xl mx-auto w-full"
      >
        <h2 className="font-display text-4xl font-semibold text-center text-[var(--foreground)] mb-3">
          How It Works
        </h2>
        <p className="text-center text-[var(--gold-700)] opacity-70 mb-12 text-sm">
          Three steps to something unforgettable
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: "01", icon: "🎨", title: "Design Your Bouquet", desc: "Choose your flower type, colour palette, style, wrapping, ribbon and decorations. Watch it come alive in real-time." },
            { step: "02", icon: "✍️", title: "Write Your Note", desc: "Pour your heart out. A personal message that lives alongside your bouquet, waiting to be read by someone special." },
            { step: "03", icon: "🔗", title: "Share the Link", desc: "Get a unique link. Send it over chat, email, or social. Your recipient opens it to a beautiful flower bloom reveal." },
          ].map(({ step, icon, title, desc }) => (
            <div
              key={step}
              className="card-glass rounded-3xl p-8 flex flex-col items-center text-center gap-4 glow-on-hover transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl">{icon}</span>
              <span className="text-[var(--gold-400)] font-display text-5xl font-light opacity-30 -mb-4">
                {step}
              </span>
              <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">
                {title}
              </h3>
              <p className="text-sm text-[var(--gold-800)] opacity-70 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="relative z-10 section-padding max-w-5xl mx-auto w-full">
        <h2 className="font-display text-4xl font-semibold text-center mb-3 text-[var(--foreground)]">
          Every Occasion, One Bouquet
        </h2>
        <p className="text-center text-[var(--gold-700)] opacity-70 mb-12 text-sm">
          The perfect gesture for every meaningful moment
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map(({ emoji, title, desc, color }) => (
            <div
              key={title}
              className="card-glass rounded-3xl p-6 flex flex-col gap-3 hover:-translate-y-2 transition-all duration-300 cursor-default"
              style={{ borderColor: `${color}40` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: `${color}25` }}
              >
                {emoji}
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                {title}
              </h3>
              <p className="text-xs text-[var(--gold-800)] opacity-70 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Variety Showcase ── */}
      <section className="relative z-10 section-padding bg-[var(--ivory)] w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-semibold mb-3 text-[var(--foreground)]">
            16 Flowers. 15 Colours. Infinite Combinations.
          </h2>
          <p className="text-[var(--gold-700)] opacity-70 mb-10 text-sm">
            Every bouquet feels unique. Because it is.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["🌹 Rose","🌻 Sunflower","🌸 Lily","🌷 Tulip","🌼 Daisy","🌺 Orchid",
              "🪷 Lotus","🌸 Peony","🌼 Marigold","💜 Lavender","🌺 Hibiscus",
              "🌸 Carnation","💐 Hydrangea","🌿 Wild Mix","👰 Bridal","🌱 Single Stem"].map((f) => (
              <span
                key={f}
                className="selector-chip px-4 py-2 rounded-full text-sm font-medium"
              >
                {f}
              </span>
            ))}
          </div>

          <Link
            href="/create"
            className="btn-gold inline-block px-10 py-4 rounded-full text-base font-semibold"
          >
            Start Creating — It's Free ✨
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 section-padding max-w-3xl mx-auto w-full text-center">
        <div className="card-glass rounded-[2rem] p-12 glow-gold">
          <p className="font-script text-3xl text-[var(--gold-600)] mb-4">
            Someone is waiting to receive this.
          </p>
          <h2 className="font-display text-4xl font-semibold text-[var(--foreground)] mb-6">
            Create your bouquet now.
          </h2>
          <Link
            href="/create"
            className="btn-gold inline-block px-12 py-4 rounded-full text-lg font-semibold animate-pulse-gold"
          >
            🌸 Create Your Bouquet
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
