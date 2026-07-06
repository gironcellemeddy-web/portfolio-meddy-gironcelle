"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Bouton clair/sombre du site : bascule la classe .dark sur <html>,
// persiste le choix (localStorage), appliqué avant rendu par l'anti-flash.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("site-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ember hover:text-ember ${className}`}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
