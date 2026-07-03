"use client";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/interactive/Magnetic";

const NAV = [
  { href: "#travaux", label: "Travaux" },
  { href: "#a-propos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2 sm:px-5 ${
          scrolled ? "glass shadow-soft" : "border border-transparent"
        }`}
      >
        <a href="#top" className="font-display text-base font-bold tracking-tight">
          Meddy<span className="text-ember">.</span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-ink/[0.04] hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Magnetic strength={0.35}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ember"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Disponible
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
