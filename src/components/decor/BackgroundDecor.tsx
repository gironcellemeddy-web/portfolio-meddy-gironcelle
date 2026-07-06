"use client";

import { useEffect, useRef } from "react";

// Décor d'arrière-plan professionnel : halos « aurora » braise/cobalt, lignes
// topographiques (clin d'œil au relief de La Réunion), objets 3D flottants
// (anneau en perspective, panneau de verre). Chaque plan dérive en parallaxe
// au scroll (écriture directe du transform, sans rAF). Les couleurs suivent
// les variables CSS → s'adaptent automatiquement au mode sombre.
// Désactivé si l'utilisateur réduit les animations.

const LAYERS: { factor: number; base: string }[] = [
  { factor: 0.1, base: "" }, // aurora braise
  { factor: -0.06, base: "" }, // aurora cobalt
  { factor: -0.04, base: "" }, // topographie
  { factor: 0.16, base: "rotateX(62deg)" }, // anneau 3D
  { factor: 0.22, base: "perspective(900px) rotateY(-16deg) rotateX(7deg)" }, // panneau verre
  { factor: 0.03, base: "" }, // grille fine
];

// Courbe organique fermée (base des anneaux topographiques).
const CONTOUR =
  "M100,18 C146,22 180,56 176,100 C172,146 138,182 96,179 C54,176 21,140 24,97 C27,56 56,14 100,18 Z";

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
      {/* Aurora braise (haut-droite) */}
      <div
        ref={setRef(0)}
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] opacity-[0.13] blur-3xl will-change-transform dark:opacity-[0.17]"
        style={{ background: "radial-gradient(circle, var(--ember) 0%, transparent 68%)" }}
      />

      {/* Aurora cobalt (gauche, mi-hauteur) */}
      <div
        ref={setRef(1)}
        className="absolute -left-48 top-[32%] h-[32rem] w-[32rem] opacity-[0.1] blur-3xl will-change-transform dark:opacity-[0.15]"
        style={{ background: "radial-gradient(circle, var(--cobalt) 0%, transparent 68%)" }}
      />

      {/* Lignes topographiques (bas-gauche) */}
      <div ref={setRef(2)} className="absolute -bottom-40 -left-40 h-[44rem] w-[44rem] will-change-transform">
        <svg className="h-full w-full text-ink opacity-[0.05] dark:opacity-[0.07]" viewBox="0 0 200 200" fill="none">
          {[1, 0.84, 0.68, 0.52, 0.36, 0.2].map((s) => (
            <path
              key={s}
              d={CONTOUR}
              stroke="currentColor"
              strokeWidth={0.7 / s}
              transform={`translate(${100 - 100 * s} ${100 - 100 * s}) scale(${s})`}
            />
          ))}
        </svg>
      </div>

      {/* Anneau 3D (droite, sous le hero) */}
      <div ref={setRef(3)} className="absolute -right-16 top-[58%] h-64 w-64 will-change-transform">
        <div className="animate-floaty h-full w-full">
          <svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
            <defs>
              <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--ember)" />
                <stop offset="100%" stopColor="var(--cobalt)" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="76" stroke="url(#ring-grad)" strokeWidth="17" opacity="0.35" />
            <circle cx="100" cy="100" r="76" stroke="var(--ink)" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>
      </div>

      {/* Panneau de verre en perspective (gauche, bas de page) */}
      <div ref={setRef(4)} className="absolute -left-6 top-[74%] h-48 w-36 will-change-transform">
        <div
          className="animate-floaty h-full w-full rounded-3xl border shadow-soft"
          style={{
            animationDelay: "1.6s",
            borderColor: "var(--line)",
            background:
              "linear-gradient(150deg, color-mix(in srgb, var(--surface) 78%, transparent) 0%, color-mix(in srgb, var(--surface) 30%, transparent) 100%)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        />
      </div>

      {/* Grille fine estompée (haut) */}
      <div
        ref={setRef(5)}
        className="absolute inset-x-0 top-0 h-[42vh] opacity-[0.05] will-change-transform dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(60% 100% at 70% 0%, #000 0%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(60% 100% at 70% 0%, #000 0%, transparent 78%)",
        }}
      />
    </div>
  );
}
