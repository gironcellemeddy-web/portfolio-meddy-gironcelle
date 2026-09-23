"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Fond photographique vivant (ordinateur uniquement), chargé à la demande.
const WaterBackdrop = dynamic(
  () => import("@/components/effects/WaterBackdrop").then((m) => m.WaterBackdrop),
  { ssr: false },
);

/**
 * Arrière-plan du site : volontairement nu.
 *
 * Aucune forme décorative — la page laisse toute la place au contenu et aux
 * effets (métal liquide, photographies, carte de l'île). Il ne reste que deux
 * choses : une variation de luminosité très douce pour que le fond ne soit pas
 * plat en grand format, et une lueur discrète qui suit le curseur.
 * Le grain de pellicule, lui, est appliqué globalement dans globals.css.
 */
export function BackgroundDecor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      glow.style.background = `radial-gradient(38rem circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--ember) 5%, transparent), transparent 68%)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Descente de l'île au fil de la page : photos de Meddy, eau animée */}
      <WaterBackdrop />

      {/* Voile de lisibilité : le fond reste perceptible, les textes priment.
          Sur mobile, il couvre le fond fixe défini plus bas. */}
      <div
        aria-hidden
        className="water-veil pointer-events-none fixed inset-0"
        style={{ zIndex: -15 }}
      />

    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Profondeur : le noir absolu paraît plat, une lueur très faible en
          haut de page lui donne du relief sans dessiner de forme. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% -10%, color-mix(in srgb, var(--ink) 6%, transparent) 0%, transparent 60%)",
        }}
      />
      {/* Lueur qui suit le curseur */}
      <div ref={glowRef} className="absolute inset-0" />
    </div>
    </>
  );
}
