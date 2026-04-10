import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--warm-white)] py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[var(--gold-700)]">
          <span className="text-xl">🌸</span>
          <span className="font-display text-lg font-medium">DigitalFlowers</span>
        </div>
        <p className="text-sm text-[var(--gold-700)] font-medium text-center">
          Made with{" "}
          <span className="text-red-500 animate-sparkle inline-block">❤️</span>{" "}
          by{" "}
          <Link
            href="https://www.linkedin.com/in/prajwal-m-d"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--gold-500)] transition-colors"
          >
            Prajwal M D
          </Link>
        </p>
        <p className="text-xs text-[var(--gold-700)] opacity-60">
          Every flower expires in 7 days — making it precious 🕊️
        </p>
      </div>
    </footer>
  );
}
