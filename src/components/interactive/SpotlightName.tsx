"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Éclairage de studio : un halo chaud suit le curseur derrière le titre et
   révèle la matière des lettres. Aucune 3D, aucun masquage du contenu — le
   texte reste parfaitement lisible même sans JS. */
export function SpotlightName({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      glow.style.background = `radial-gradient(26rem circle at ${x}px ${y}px, color-mix(in srgb, var(--ember) 42%, transparent), transparent 62%)`;
      glow.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="relative isolate">
      {/* Halo lumineux (sous le texte, jamais devant) */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -inset-y-16 -inset-x-8 -z-10 opacity-0 blur-2xl transition-opacity duration-700"
      />
      {children}
    </div>
  );
}
