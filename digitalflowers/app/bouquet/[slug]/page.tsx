"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import FlowerCanvas from "@/components/FlowerCanvas";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";

type BouquetData = {
  slug: string;
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
  expiresAt: string;
  shareCount: number;
};

type State = "loading" | "blooming" | "reading" | "error" | "expired";

export default function BouquetPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [state, setState] = useState<State>("loading");
  const [bouquet, setBouquet] = useState<BouquetData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (!slug) return;
    setShareUrl(window.location.href);

    const fetchBouquet = async () => {
      try {
        const res = await fetch(`/api/bouquets/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 404) {
            setState("expired");
          } else {
            setErrorMsg(data.error || "Something went wrong.");
            setState("error");
          }
          return;
        }

        setBouquet(data.bouquet);

        // Start bloom sequence
        setTimeout(() => {
          setState("blooming");
          // After bloom animation (2.2s), show message
          setTimeout(() => {
            setState("reading");
            setTimeout(() => setShowMessage(true), 300);
          }, 2400);
        }, 600);
      } catch {
        setErrorMsg("Could not load this bouquet.");
        setState("error");
      }
    };

    fetchBouquet();
  }, [slug]);

  const daysLeft = bouquet
    ? Math.max(0, Math.ceil((new Date(bouquet.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  // ── Loading ──
  if (state === "loading") {
    return (
      <div className="min-h-screen bg-golden-gradient flex flex-col items-center justify-center">
        <FloatingPetals />
        <div className="text-center space-y-4 relative z-10">
          <div className="text-6xl animate-bounce-gentle">🌸</div>
          <p className="font-display text-2xl text-[var(--gold-700)]">
            Opening your bouquet…
          </p>
          <p className="text-sm text-[var(--gold-600)] opacity-60 font-light">
            Get ready for something beautiful
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[var(--gold-400)] animate-bounce-gentle"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Expired ──
  if (state === "expired") {
    return (
      <div className="min-h-screen bg-golden-gradient flex flex-col items-center justify-center px-6">
        <FloatingPetals />
        <div className="card-glass rounded-3xl p-10 max-w-md w-full text-center space-y-5 relative z-10">
          <div className="text-5xl">🍂</div>
          <h1 className="font-display text-3xl font-semibold text-[var(--foreground)]">
            This Bouquet Has Wilted
          </h1>
          <p className="text-[var(--gold-700)] opacity-75 text-sm leading-relaxed">
            Every DigitalFlowers bouquet is ephemeral — it lived for 7 days and then
            faded away, making that moment forever precious.
          </p>
          <p className="font-script text-xl text-[var(--gold-500)] opacity-70">
            Beauty that knows when to let go.
          </p>
          <Link
            href="/create"
            className="btn-gold inline-block px-8 py-3 rounded-full font-semibold text-sm"
          >
            🌸 Create a New Bouquet
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Error ──
  if (state === "error") {
    return (
      <div className="min-h-screen bg-golden-gradient flex flex-col items-center justify-center px-6">
        <div className="card-glass rounded-3xl p-10 max-w-md w-full text-center space-y-4 relative z-10">
          <div className="text-5xl">😔</div>
          <h1 className="font-display text-2xl font-semibold text-[var(--foreground)]">
            Bouquet Not Found
          </h1>
          <p className="text-sm text-[var(--gold-700)] opacity-70">{errorMsg}</p>
          <Link href="/" className="btn-gold inline-block px-8 py-3 rounded-full text-sm font-semibold">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Blooming + Reading ──
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--gold-50)] via-[var(--cream)] to-[var(--ivory)] relative overflow-hidden">
      <FloatingPetals />

      {/* Subtle top nav */}
      <header className="relative z-10 w-full flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[var(--gold-700)] opacity-60 hover:opacity-100 transition-opacity">
          <span>🌸</span>
          <span className="font-display text-sm">DigitalFlowers</span>
        </Link>
        <div className="flex items-center gap-1.5 bg-white/60 rounded-full px-3 py-1.5 text-xs text-[var(--gold-600)]">
          <span>⏳</span>
          <span>{daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining</span>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg space-y-6">

          {/* ── Bloom Stage ── */}
          <div
            className="card-glass rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-700"
            style={{
              transform: state === "blooming" ? "scale(1.02)" : "scale(1)",
            }}
          >
            {/* Receiver heading */}
            <div className="text-center pt-8 px-6 space-y-1">
              <p className="font-script text-2xl text-[var(--gold-500)] opacity-80">
                Someone sent you something beautiful
              </p>
              <div className="divider-gold mt-3" />
            </div>

            {/* Flower canvas */}
            <div
              className="h-72 sm:h-80 mx-6 my-4 rounded-2xl bg-gradient-to-br from-[var(--gold-50)] to-[var(--ivory)] border border-[var(--border)] flex items-center justify-center overflow-hidden"
              style={{
                opacity: 1,
                transform: state === "blooming" ? "scale(1.05)" : "scale(1)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {bouquet && (
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
              )}
            </div>

            {/* Bloom sparkle overlay */}
            {state === "blooming" && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="text-3xl animate-sparkle">✨</div>
              </div>
            )}

            {/* Message reveal */}
            {state === "reading" && (
              <div
                className="mx-6 mb-8 p-6 bg-gradient-to-br from-[var(--gold-50)] to-white rounded-2xl border border-[var(--gold-200)] shadow-inner"
                style={{
                  opacity: showMessage ? 1 : 0,
                  transform: showMessage ? "translateY(0)" : "translateY(16px)",
                  transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold-300)] to-transparent" />
                  <span className="text-[var(--gold-400)] text-sm">✦</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold-300)] to-transparent" />
                </div>
                <p className="font-script text-xl sm:text-2xl text-[var(--foreground)] leading-relaxed text-center">
                  {bouquet?.message}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold-300)] to-transparent" />
                  <span className="text-[var(--gold-400)] text-sm">💕</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold-300)] to-transparent" />
                </div>
              </div>
            )}
          </div>

          {/* Reply / share actions */}
          {state === "reading" && showMessage && (
            <div
              className="space-y-3 transition-all duration-700"
              style={{
                opacity: showMessage ? 1 : 0,
                transform: showMessage ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="card-glass rounded-2xl p-4 text-center space-y-2">
                <p className="text-sm text-[var(--gold-700)] font-medium">
                  Touched by this? Send your own bloom. 🌸
                </p>
                <Link
                  href="/create"
                  className="btn-gold inline-block w-full py-3 rounded-xl text-sm font-semibold"
                >
                  Create a Bouquet in Return
                </Link>
              </div>

              <div className="text-center">
                <p className="text-xs text-[var(--gold-600)] opacity-50">
                  This bouquet was lovingly crafted on DigitalFlowers.
                  It will wilt in {daysLeft} day{daysLeft !== 1 ? "s" : ""}.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
