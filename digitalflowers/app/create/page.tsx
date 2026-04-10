"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FlowerCanvas from "@/components/FlowerCanvas";
import Footer from "@/components/Footer";
import {
  FLOWER_TYPES,
  FLOWER_COLORS,
  BOUQUET_STYLES,
  WRAPPING_STYLES,
  RIBBON_STYLES,
  ARRANGEMENT_POSITIONS,
  DECORATION_OPTIONS,
  SIZE_OPTIONS,
  PETAL_DENSITY_OPTIONS,
} from "@/utils/flowerData";

type Step = "flower" | "style" | "message" | "publish";

interface BouquetState {
  flowerType: string;
  flowerColor: string;
  bouquetStyle: string;
  wrappingStyle: string;
  ribbonStyle: string;
  decorations: string[];
  size: string;
  arrangementPosition: string;
  petalDensity: string;
  message: string;
}

const INITIAL: BouquetState = {
  flowerType: "rose",
  flowerColor: "classic-red",
  bouquetStyle: "small-hand-tied",
  wrappingStyle: "kraft-paper",
  ribbonStyle: "gold-ribbon",
  decorations: [],
  size: "medium",
  arrangementPosition: "centered",
  petalDensity: "medium",
  message: "",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-600)] mb-3 opacity-70">
      {children}
    </p>
  );
}

function Chip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`selector-chip px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${active ? "active" : ""}`}
      style={active && color ? { borderColor: color, background: `${color}18` } : {}}
    >
      {children}
    </button>
  );
}

export default function CreatePage() {
  const router = useRouter();
  const [bouquet, setBouquet] = useState<BouquetState>(INITIAL);
  const [step, setStep] = useState<Step>("flower");
  const [agreed, setAgreed] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  const update = useCallback(<K extends keyof BouquetState>(key: K, val: BouquetState[K]) => {
    setBouquet((prev) => ({ ...prev, [key]: val }));
  }, []);

  const toggleDecoration = useCallback((id: string) => {
    setBouquet((prev) => ({
      ...prev,
      decorations: prev.decorations.includes(id)
        ? prev.decorations.filter((d) => d !== id)
        : [...prev.decorations, id],
    }));
  }, []);

  const handlePublish = async () => {
    if (!bouquet.message.trim() || bouquet.message.trim().length < 5) {
      setError("Please write a message of at least 5 characters.");
      return;
    }
    if (!agreed) {
      setError("Please confirm the 7-day expiry.");
      return;
    }
    setPublishing(true);
    setError("");
    try {
      const res = await fetch("/api/bouquets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bouquet),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create bouquet");
      router.push(`/share/${data.slug}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPublishing(false);
    }
  };

  const STEPS: { id: Step; label: string; icon: string }[] = [
    { id: "flower", label: "Flower", icon: "🌸" },
    { id: "style", label: "Style", icon: "🎀" },
    { id: "message", label: "Message", icon: "✍️" },
    { id: "publish", label: "Publish", icon: "🔗" },
  ];

  const currentSelectedFlower = FLOWER_TYPES.find((f) => f.id === bouquet.flowerType);
  const currentSelectedColor = FLOWER_COLORS.find((c) => c.id === bouquet.flowerColor);

  return (
    <div className="min-h-screen flex flex-col bg-golden-gradient">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 w-full bg-[var(--warm-white)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[var(--gold-800)]">
            <span className="text-xl">🌸</span>
            <span className="font-display text-lg font-semibold hidden sm:block">DigitalFlowers</span>
          </a>
          <div className="flex items-center gap-1 sm:gap-3">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  step === s.id
                    ? "bg-[var(--gold-400)] text-white shadow-md"
                    : "text-[var(--gold-700)] hover:bg-[var(--gold-50)]"
                }`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── LEFT: Live Preview ── */}
        <div className="lg:sticky lg:top-24">
          <div className="card-glass rounded-3xl p-6 shadow-xl">
            <div className="text-center mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-500)] mb-1">
                Live Preview
              </p>
              <p className="font-display text-xl text-[var(--foreground)] font-medium">
                {currentSelectedFlower?.emoji} {currentSelectedFlower?.label}
                {currentSelectedColor && (
                  <span className="ml-2 text-sm font-normal text-[var(--gold-600)]">
                    in {currentSelectedColor.label}
                  </span>
                )}
              </p>
            </div>
            <div className="h-72 sm:h-80 flex items-center justify-center bg-gradient-to-br from-[var(--gold-50)] to-[var(--ivory)] rounded-2xl border border-[var(--border)]">
              <FlowerCanvas
                flowerType={bouquet.flowerType}
                flowerColor={bouquet.flowerColor}
                bouquetStyle={bouquet.bouquetStyle}
                wrappingStyle={bouquet.wrappingStyle}
                ribbonStyle={bouquet.ribbonStyle}
                decorations={bouquet.decorations}
                size={bouquet.size}
                arrangementPosition={bouquet.arrangementPosition}
                petalDensity={bouquet.petalDensity}
                animated
              />
            </div>
            {bouquet.message && (
              <div className="mt-4 p-4 bg-[var(--gold-50)] rounded-2xl border border-[var(--border)]">
                <p className="text-xs text-[var(--gold-500)] font-semibold mb-1 uppercase tracking-wide">Your Note</p>
                <p className="font-script text-base text-[var(--foreground)] leading-relaxed line-clamp-3">
                  {bouquet.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Controls ── */}
        <div className="flex flex-col gap-4">

          {/* ═══ STEP: FLOWER ═══ */}
          {step === "flower" && (
            <div className="card-glass rounded-3xl p-6 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] mb-1">
                  Choose Your Flower
                </h2>
                <p className="text-sm text-[var(--gold-700)] opacity-70">
                  Select the heart of your bouquet
                </p>
              </div>

              <div>
                <SectionLabel>Flower Type</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {FLOWER_TYPES.map((f) => (
                    <Chip
                      key={f.id}
                      active={bouquet.flowerType === f.id}
                      onClick={() => update("flowerType", f.id)}
                    >
                      {f.emoji} {f.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Colour Palette</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {FLOWER_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => update("flowerColor", c.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border-[1.5px] transition-all ${
                        bouquet.flowerColor === c.id
                          ? "border-[var(--gold-500)] bg-[var(--gold-50)] shadow-sm"
                          : "border-[var(--border)] bg-white/60 text-[var(--gold-800)]"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/60 shadow-sm flex-shrink-0"
                        style={{ background: c.hex }}
                      />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Petal Density</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {PETAL_DENSITY_OPTIONS.map((d) => (
                    <Chip key={d.id} active={bouquet.petalDensity === d.id} onClick={() => update("petalDensity", d.id)}>
                      {d.label} <span className="opacity-50">— {d.description}</span>
                    </Chip>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep("style")}
                className="btn-gold w-full py-3 rounded-2xl font-semibold text-sm"
              >
                Next: Styling & Arrangement →
              </button>
            </div>
          )}

          {/* ═══ STEP: STYLE ═══ */}
          {step === "style" && (
            <div className="card-glass rounded-3xl p-6 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] mb-1">
                  Style Your Bouquet
                </h2>
                <p className="text-sm text-[var(--gold-700)] opacity-70">
                  Shape, wrap, and decorate to perfection
                </p>
              </div>

              <div>
                <SectionLabel>Bouquet Style</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {BOUQUET_STYLES.map((s) => (
                    <Chip key={s.id} active={bouquet.bouquetStyle === s.id} onClick={() => update("bouquetStyle", s.id)}>
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Arrangement</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {ARRANGEMENT_POSITIONS.map((a) => (
                    <Chip key={a.id} active={bouquet.arrangementPosition === a.id} onClick={() => update("arrangementPosition", a.id)}>
                      {a.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Wrapping</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {WRAPPING_STYLES.map((w) => (
                    <Chip key={w.id} active={bouquet.wrappingStyle === w.id} onClick={() => update("wrappingStyle", w.id)}>
                      {w.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Ribbon</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {RIBBON_STYLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => update("ribbonStyle", r.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border-[1.5px] transition-all ${
                        bouquet.ribbonStyle === r.id
                          ? "border-[var(--gold-500)] bg-[var(--gold-50)] shadow-sm"
                          : "border-[var(--border)] bg-white/60 text-[var(--gold-800)]"
                      }`}
                    >
                      {r.id !== "no-ribbon" && (
                        <span className="w-3 h-3 rounded-full border border-white/50" style={{ background: r.color }} />
                      )}
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Size</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((s) => (
                    <Chip key={s.id} active={bouquet.size === s.id} onClick={() => update("size", s.id)}>
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Decorations (pick any)</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {DECORATION_OPTIONS.map((d) => (
                    <Chip
                      key={d.id}
                      active={bouquet.decorations.includes(d.id)}
                      onClick={() => toggleDecoration(d.id)}
                    >
                      {d.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("flower")}
                  className="flex-1 py-3 rounded-2xl border-2 border-[var(--gold-200)] text-[var(--gold-700)] font-medium text-sm hover:bg-[var(--gold-50)] transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep("message")}
                  className="btn-gold flex-2 flex-grow py-3 rounded-2xl font-semibold text-sm"
                >
                  Next: Write Your Note →
                </button>
              </div>
            </div>
          )}

          {/* ═══ STEP: MESSAGE ═══ */}
          {step === "message" && (
            <div className="card-glass rounded-3xl p-6 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] mb-1">
                  Write Your Note
                </h2>
                <p className="text-sm text-[var(--gold-700)] opacity-70">
                  This message will bloom alongside your flowers
                </p>
              </div>

              <div className="relative">
                <textarea
                  className="input-warm w-full rounded-2xl p-5 min-h-[180px] text-base leading-relaxed resize-none font-body"
                  placeholder="e.g. You make every ordinary moment extraordinary. Thank you for being you."
                  maxLength={1000}
                  value={bouquet.message}
                  onChange={(e) => {
                    update("message", e.target.value);
                    setCharCount(e.target.value.length);
                  }}
                />
                <span className="absolute bottom-3 right-4 text-xs text-[var(--gold-500)] opacity-60">
                  {charCount}/1000
                </span>
              </div>

              <div className="bg-[var(--gold-50)] rounded-2xl p-4 border border-[var(--gold-200)]">
                <p className="font-script text-2xl text-[var(--gold-600)] mb-2 opacity-70">
                  Writing tips...
                </p>
                <ul className="text-xs text-[var(--gold-800)] space-y-1 opacity-70">
                  <li>✨ Be specific — mention a memory or moment</li>
                  <li>💫 Use their name at the start</li>
                  <li>🌸 Keep it genuine — vulnerability is beautiful</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("style")}
                  className="flex-1 py-3 rounded-2xl border-2 border-[var(--gold-200)] text-[var(--gold-700)] font-medium text-sm hover:bg-[var(--gold-50)] transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => { if (bouquet.message.trim().length >= 5) setStep("publish"); else setError("Write at least 5 characters."); }}
                  className="btn-gold flex-2 flex-grow py-3 rounded-2xl font-semibold text-sm"
                >
                  Next: Publish →
                </button>
              </div>
            </div>
          )}

          {/* ═══ STEP: PUBLISH ═══ */}
          {step === "publish" && (
            <div className="space-y-4">

              {/* Donation section */}
              <div className="card-glass rounded-3xl p-6 border-2 border-[var(--gold-200)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">☕</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                      Enjoyed this? Support the creator
                    </h3>
                    <p className="text-xs text-[var(--gold-700)] opacity-70">
                      DigitalFlowers is free & ad-free. If this made someone smile, consider buying me a coffee.
                    </p>
                  </div>
                </div>
                <a
                  href={process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL || "https://buymeacoffee.com/prajwalmd"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#FFDD00] text-[#000000] font-semibold text-sm hover:bg-yellow-300 transition-all hover:-translate-y-0.5"
                >
                  ☕ Buy Me a Coffee — Support Prajwal M D
                </a>
              </div>

              {/* Final publish card */}
              <div className="card-glass rounded-3xl p-6 space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] mb-1">
                    Ready to Share?
                  </h2>
                  <p className="text-sm text-[var(--gold-700)] opacity-70">
                    Review your bouquet before publishing
                  </p>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-2 gap-2 text-xs text-[var(--gold-800)]">
                  {[
                    ["🌸 Flower", FLOWER_TYPES.find(f => f.id === bouquet.flowerType)?.label],
                    ["🎨 Colour", FLOWER_COLORS.find(c => c.id === bouquet.flowerColor)?.label],
                    ["💐 Style", BOUQUET_STYLES.find(s => s.id === bouquet.bouquetStyle)?.label],
                    ["📦 Size", SIZE_OPTIONS.find(s => s.id === bouquet.size)?.label],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[var(--gold-50)] rounded-xl p-3">
                      <p className="opacity-50 text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Expiry notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⏳</span>
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">
                        This bouquet expires in 7 days
                      </p>
                      <p className="text-xs text-amber-700 opacity-80">
                        After 7 days, your link will stop working and the bouquet is permanently deleted.
                        This makes every bloom precious and intentional.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        agreed
                          ? "bg-[var(--gold-500)] border-[var(--gold-500)]"
                          : "border-[var(--gold-300)] bg-white group-hover:border-[var(--gold-400)]"
                      }`}
                    >
                      {agreed && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                  <span className="text-sm text-[var(--gold-800)] leading-relaxed">
                    I understand this bouquet link will expire and be permanently deleted in{" "}
                    <strong>7 days</strong>.
                  </span>
                </label>

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 rounded-xl p-3">{error}</p>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("message")}
                    className="flex-1 py-3 rounded-2xl border-2 border-[var(--gold-200)] text-[var(--gold-700)] font-medium text-sm hover:bg-[var(--gold-50)] transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={publishing || !agreed}
                    className={`btn-gold flex-2 flex-grow py-3 rounded-2xl font-semibold text-sm transition-all ${
                      publishing || !agreed ? "opacity-50 cursor-not-allowed" : "animate-pulse-gold"
                    }`}
                  >
                    {publishing ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">🌸</span> Publishing…
                      </span>
                    ) : (
                      "🌸 Publish & Get Link"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
