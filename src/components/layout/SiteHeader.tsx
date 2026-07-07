"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, Gamepad2, Menu, X } from "lucide-react";
import { Magnetic } from "@/components/interactive/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const ANCHORS = [
  { href: "#travaux", label: "Travaux" },
  { href: "#a-propos", label: "À propos" },
  { href: "#jeu", label: "Arcade" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      {/* Lien d'évitement (accessibilité clavier) */}
      <a
        href="#travaux"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Aller au contenu
      </a>

      <div
        className={`relative flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2 sm:px-5 ${
          scrolled || open ? "glass shadow-soft" : "border border-transparent"
        }`}
      >
        <a href="#top" className="font-display text-base font-bold tracking-tight">
          Meddy<span className="text-ember">.</span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Navigation principale">
          {ANCHORS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-display whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium uppercase tracking-wider text-ink transition-opacity duration-200 hover:opacity-70"
            >
              {n.label}
            </a>
          ))}
          <Link
            href="/photographie"
            className="font-display inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:border-ember hover:text-ember"
          >
            <Camera className="h-3.5 w-3.5" />
            Photographie
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Magnetic strength={0.35}>
            <a
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-ember"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Disponible
            </a>
          </Magnetic>
          {/* Menu mobile */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ember hover:text-ember sm:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Panneau mobile */}
        {open && (
          <nav
            aria-label="Navigation mobile"
            className="glass shadow-lift absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-3xl p-3 sm:hidden"
          >
            {ANCHORS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-display rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink/[0.06]"
              >
                {n.label}
              </a>
            ))}
            <Link
              href="/photographie"
              onClick={() => setOpen(false)}
              className="font-display inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink/[0.06]"
            >
              <Camera className="h-4 w-4" /> Photographie
            </Link>
            <a
              href="#jeu"
              onClick={() => setOpen(false)}
              className="font-display inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink/[0.06]"
            >
              <Gamepad2 className="h-4 w-4" /> Jouer au Pac-CV
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
