"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Effet magnétique : l'élément suit le curseur lorsqu'il s'approche (zone
// `padding` autour de l'élément), atténué par `strength`. Écriture directe du
// transform + transitions CSS (aucun rAF → fiable partout) ; souris uniquement ;
// inactif si l'utilisateur réduit les animations.
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = "",
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const inZone =
        e.clientX > r.left - padding &&
        e.clientX < r.right + padding &&
        e.clientY > r.top - padding &&
        e.clientY < r.bottom + padding;

      if (inZone) {
        if (!active) {
          active = true;
          el.style.transition = "transform 0.3s ease-out";
        }
        el.style.transform = `translate3d(${((e.clientX - cx) / strength).toFixed(1)}px, ${((e.clientY - cy) / strength).toFixed(1)}px, 0)`;
      } else if (active) {
        active = false;
        el.style.transition = "transform 0.6s ease-in-out";
        el.style.transform = "translate3d(0, 0, 0)";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
