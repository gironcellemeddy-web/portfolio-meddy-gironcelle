"use client";

import { useRef, type ReactNode } from "react";

// Inclinaison 3D au survol : la carte suit le pointeur (perspective).
// Écriture directe du transform (pas de rAF) ; souris uniquement (pas de
// jitter au scroll tactile) ; inactif si l'utilisateur réduit les animations.
export function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`will-change-transform transition-transform duration-300 ease-out ${className}`}
      style={{ transform: "perspective(900px)", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
