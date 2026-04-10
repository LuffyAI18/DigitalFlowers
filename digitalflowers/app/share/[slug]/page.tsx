"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import FlowerCanvas from "@/components/FlowerCanvas";

export default function SharePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const url = `${window.location.origin}/bouquet/${slug}`;
    setShareUrl(url);

    // Try to get expiresAt from sessionStorage (set after publish)
    const stored = sessionStorage.getItem(`df-expires-${slug}`);
    if (stored) setExpiresAt(new Date(stored));
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const expiryText = expiresAt
    ? expiresAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "7 days from creation";

  const shareButtons = [
    {
      label: "WhatsApp",
      icon: "💬",
      color: "#25D366",
      href: `https://wa.me/?text=${encodeURIComponent(`🌸 I made you a digital bouquet! Open it here:\n${shareUrl}`)}`,
    },
    {
      label: "Twitter / X",
      icon: "𝕏",
      color: "#000000",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🌸 Sending love digitally — beautifully. ${shareUrl}`)}`,
    },
    {
      label: "Email",
      icon: "✉️",
      color: "#EA4335",
      href: `mailto:?subject=${encodeURIComponent("I made you something beautiful 🌸")}&body=${encodeURIComponent(`Hi,\n\nI made you a digital bouquet. Open it here:\n\n${shareUrl}\n\nNote: This link expires in 7 days. Enjoy 💕`)}`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-golden-gradient">
      {/* Nav */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[var(--gold-800)]">
          <span className="text-xl">🌸</span>
          <span className="font-display text-lg font-semibold">DigitalFlowers</span>
        </Link>
        <Link
          href="/create"
          className="text-sm text-[var(--gold-600)] hover:text-[var(--gold-800)] transition-colors font-medium"
        >
          + Create another
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full">
        {/* Success burst */}
        {mounted && (
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bloom" style={{ animationDuration: "0.8s" }}>
              🎊
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--foreground)] mb-3">
              Your Bouquet is{" "}
              <span className="text-gold-gradient italic">Ready!</span>
            </h1>
            <p className="text-[var(--gold-700)] opacity-80 text-base">
              Share your unique link — someone is about to receive something beautiful.
            </p>
          </div>
        )}

        {/* Link card */}
        <div className="card-glass rounded-3xl p-6 w-full mb-5 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-500)] mb-3">
            Your Shareable Link
          </p>

          <div className="flex items-center gap-3 bg-[var(--gold-50)] rounded-2xl p-4 border border-[var(--gold-200)] mb-4">
            <span className="text-[var(--gold-600)] text-sm flex-1 break-all font-mono text-xs">
              {shareUrl || `…/bouquet/${slug}`}
            </span>
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                copied
                  ? "bg-green-500 text-white"
                  : "btn-gold"
              }`}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {shareButtons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-[var(--border)] text-sm font-medium hover:-translate-y-0.5 transition-all text-[var(--gold-800)] hover:border-[var(--gold-300)] hover:bg-[var(--gold-50)]"
              >
                <span>{btn.icon}</span>
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* Expiry notice */}
        <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
          <span className="text-xl">⏳</span>
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Expires: {expiryText}
            </p>
            <p className="text-xs text-amber-700 opacity-80 mt-0.5">
              After expiry, the link stops working and all data is permanently deleted.
            </p>
          </div>
        </div>

        {/* Slug info */}
        <div className="w-full card-glass rounded-2xl p-4 mb-6">
          <p className="text-xs text-[var(--gold-600)] mb-1 uppercase tracking-wider font-semibold">Bouquet ID</p>
          <p className="font-mono text-sm text-[var(--foreground)] break-all">{slug}</p>
        </div>

        {/* Mini preview */}
        <div className="w-full card-glass rounded-3xl p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-500)] mb-3">
            Your Bouquet Preview
          </p>
          <div className="h-48 bg-[var(--gold-50)] rounded-2xl border border-[var(--border)] flex items-center justify-center">
            <p className="text-4xl animate-bounce-gentle">🌸</p>
          </div>
          <p className="text-center text-xs text-[var(--gold-600)] opacity-60 mt-3">
            The receiver will see a full bloom animation when they open the link.
          </p>
        </div>

        {/* Create another CTA */}
        <Link
          href="/create"
          className="w-full py-4 rounded-2xl border-2 border-[var(--gold-300)] text-[var(--gold-700)] font-semibold text-sm text-center hover:bg-[var(--gold-50)] transition-all"
        >
          🌼 Create Another Bouquet
        </Link>
      </main>

      <Footer />
    </div>
  );
}
