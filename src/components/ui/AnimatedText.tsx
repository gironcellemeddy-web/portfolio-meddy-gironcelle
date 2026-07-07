"use client";

import { useEffect, useRef } from "react";

// Révélation caractère par caractère pilotée par le scroll : chaque lettre
// passe d'une opacité 0.25 (toujours lisible, même sans JS) à 1 au fil du
// défilement. Écouteur de scroll direct (sans rAF) → fiable partout.
export function AnimatedText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>("span[data-ch]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const start = vh * 0.85; // début de la révélation
      const end = vh * 0.3; // révélation complète
      const p = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
      const n = Math.floor(p * chars.length);
      for (let i = 0; i < chars.length; i++) {
        chars[i].style.opacity = i < n ? "1" : "0.25";
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [text]);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((c, ci) => (
              <span
                key={ci}
                data-ch
                style={{ opacity: 0.25, transition: "opacity 0.25s ease-out" }}
              >
                {c}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
