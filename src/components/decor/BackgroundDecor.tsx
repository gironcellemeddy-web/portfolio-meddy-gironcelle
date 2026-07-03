"use client";

import { useEffect, useRef } from "react";

// Arrondi à 2 décimales : coordonnées identiques serveur/client (pas de mismatch
// d'hydratation dû aux flottants de Math.cos/sin).
const r2 = (n: number) => Math.round(n * 100) / 100;

// Configuration des plans (ordre = ordre du DOM). `factor` = vitesse de dérive
// au scroll ; `base` = transform statique (rotation/miroir des palmes).
const LAYERS: { factor: number; base: string }[] = [
  { factor: 0.14, base: "" }, // soleil
  { factor: -0.12, base: "" }, // oiseaux
  { factor: 0.3, base: "" }, // hibiscus
  { factor: 0.22, base: "rotate(15deg)" }, // palme haut-gauche
  { factor: -0.16, base: "" }, // vagues
  { factor: -0.05, base: "" }, // relief arrière
  { factor: -0.1, base: "" }, // relief avant
  { factor: -0.24, base: "rotate(-20deg) scaleX(-1)" }, // palme bas-droite
];

// Décor d'arrière-plan évoquant l'île de La Réunion (relief volcanique, soleil,
// océan, palmes, hibiscus, pailles-en-queue). Motifs SVG originaux, discrets,
// derrière le contenu. Parallaxe au scroll : chaque plan dérive à une vitesse
// différente (écriture directe du transform, sans rAF → fluide et robuste).
// Désactivée si l'utilisateur réduit les animations.
export function BackgroundDecor() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      for (let i = 0; i < LAYERS.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const offset = reduce ? 0 : y * LAYERS[i].factor;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) ${LAYERS[i].base}`;
      }
    };

    apply();
    if (reduce) return;
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply, { passive: true });
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    refs.current[i] = el;
  };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soleil (haut-droite) */}
      <div ref={setRef(0)} className="absolute -right-16 -top-20 h-80 w-80 will-change-transform">
        <svg className="h-full w-full text-accent-2" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="52" fill="currentColor" opacity="0.1" />
          <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.16">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * Math.PI) / 6;
              return (
                <line
                  key={i}
                  x1={r2(100 + Math.cos(a) * 66)}
                  y1={r2(100 + Math.sin(a) * 66)}
                  x2={r2(100 + Math.cos(a) * 82)}
                  y2={r2(100 + Math.sin(a) * 82)}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Pailles-en-queue (oiseaux) */}
      <div ref={setRef(1)} className="absolute left-[18%] top-[12%] h-24 w-48 will-change-transform">
        <svg
          className="h-full w-full text-foreground opacity-[0.18]"
          viewBox="0 0 200 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M20 40 Q35 22 50 40 Q65 22 80 40" />
          <path d="M110 26 Q122 12 134 26 Q146 12 158 26" />
        </svg>
      </div>

      {/* Hibiscus (fleur) */}
      <div ref={setRef(2)} className="absolute right-[10%] top-[42%] h-28 w-28 will-change-transform">
        <svg className="h-full w-full text-accent-2 opacity-[0.14]" viewBox="0 0 100 100">
          <g fill="currentColor">
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} cx="50" cy="28" rx="13" ry="22" transform={`rotate(${i * 72} 50 50)`} />
            ))}
          </g>
          <circle cx="50" cy="50" r="8" fill="var(--accent)" opacity="0.6" />
        </svg>
      </div>

      {/* Palme (haut-gauche) */}
      <div ref={setRef(3)} className="absolute -left-10 top-2 h-56 w-56 will-change-transform">
        <PalmCluster />
      </div>

      {/* Vagues (océan) */}
      <div ref={setRef(4)} className="absolute bottom-[26%] left-0 h-28 w-full will-change-transform">
        <svg
          className="h-full w-full text-accent opacity-[0.14]"
          viewBox="0 0 1440 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          preserveAspectRatio="none"
        >
          <path d="M0 30 Q120 10 240 30 T480 30 T720 30 T960 30 T1200 30 T1440 30" />
          <path d="M0 70 Q120 50 240 70 T480 70 T720 70 T960 70 T1200 70 T1440 70" />
          <path d="M0 110 Q120 90 240 110 T480 110 T720 110 T960 110 T1200 110 T1440 110" />
        </svg>
      </div>

      {/* Relief volcanique — plan arrière */}
      <div ref={setRef(5)} className="absolute bottom-0 left-0 h-[46vh] w-full will-change-transform">
        <svg className="h-full w-full text-accent opacity-[0.07]" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice">
          <path d="M0 360 L0 210 L170 130 L320 195 L470 100 L610 180 L770 80 L910 170 L1080 120 L1240 195 L1440 140 L1440 360 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Relief volcanique — plan avant (pic central type Piton) */}
      <div ref={setRef(6)} className="absolute bottom-0 left-0 h-[40vh] w-full will-change-transform">
        <svg className="h-full w-full text-foreground opacity-[0.06]" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice">
          <path d="M0 360 L0 300 L180 255 L330 285 L470 205 L560 245 L660 150 L760 250 L900 215 L1060 280 L1220 235 L1440 295 L1440 360 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Palme (bas-droite) */}
      <div ref={setRef(7)} className="absolute -right-8 bottom-14 h-64 w-64 will-change-transform">
        <PalmCluster />
      </div>
    </div>
  );
}

// Bouquet de palmes stylisées (fronde = tige courbe + folioles).
function PalmCluster() {
  return (
    <svg className="h-full w-full text-[#1f5e4f] opacity-[0.1]" viewBox="0 0 200 200" fill="none">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {[-55, -30, -8, 15, 40].map((deg, i) => (
          <g key={i} transform={`rotate(${deg} 40 160)`}>
            <path d="M40 160 Q90 120 150 128" />
            {[0, 1, 2, 3, 4, 5].map((j) => {
              const t = 0.2 + j * 0.13;
              const x = r2(40 + (150 - 40) * t);
              const y = r2(160 + (128 - 160) * t - Math.sin(t * Math.PI) * 20);
              return <line key={j} x1={x} y1={y} x2={r2(x + 6)} y2={r2(y - 12)} strokeWidth="1.6" />;
            })}
          </g>
        ))}
      </g>
    </svg>
  );
}
