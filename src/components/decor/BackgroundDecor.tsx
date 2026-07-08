"use client";

import { useEffect, useRef } from "react";

// Décor d'arrière-plan : halos « aurora » braise/cobalt, lignes topographiques
// (relief de La Réunion), anneau 3D, panneau de verre, grille fine — le tout
// réagissant SUBTILEMENT à la souris (parallaxe légère par plan + halo qui
// suit le curseur) et au scroll. Écriture directe des transforms (sans rAF),
// couleurs pilotées par les variables CSS → dark/light automatique.
// Inactif si l'utilisateur réduit les animations.

const LAYERS: { scroll: number; mouse: number; base: string }[] = [
  { scroll: 0.1, mouse: 18, base: "" }, // aurora braise
  { scroll: -0.06, mouse: -14, base: "" }, // aurora cobalt
  { scroll: -0.04, mouse: 8, base: "" }, // topographie
  { scroll: 0.16, mouse: -26, base: "rotateX(62deg)" }, // anneau 3D
  { scroll: 0.22, mouse: 22, base: "perspective(900px) rotateY(-16deg) rotateX(7deg)" }, // panneau
  { scroll: 0.03, mouse: 6, base: "" }, // grille fine
];

const CONTOUR =
  "M100,18 C146,22 180,56 176,100 C172,146 138,182 96,179 C54,176 21,140 24,97 C27,56 56,14 100,18 Z";

export function BackgroundDecor() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mx = 0, my = 0; // position souris normalisée (-0.5 … 0.5)

    const apply = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      for (let i = 0; i < LAYERS.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const L = LAYERS[i];
        const sy = reduce ? 0 : y * L.scroll;
        const ox = reduce ? 0 : mx * L.mouse;
        const oy = reduce ? 0 : my * L.mouse * 0.7;
        el.style.transform = `translate3d(${ox.toFixed(1)}px, ${(sy + oy).toFixed(1)}px, 0) ${L.base}`;
      }
    };

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / (window.innerWidth || 1) - 0.5;
      my = e.clientY / (window.innerHeight || 1) - 0.5;
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(44rem circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--ember) 8%, transparent), transparent 70%)`;
      }
      apply();
    };

    apply();
    if (reduce) return;
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    refs.current[i] = el;
  };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Halo qui suit le curseur (très subtil, couleur du thème) */}
      <div ref={spotRef} className="absolute inset-0 opacity-60 dark:opacity-100" />

      {/* Aurora braise (haut-droite) */}
      <div
        ref={setRef(0)}
        className="absolute -right-40 -top-40 h-[38rem] w-[38rem] opacity-[0.12] blur-3xl will-change-transform dark:opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle, var(--ember) 0%, color-mix(in srgb, var(--ember-2) 55%, transparent) 38%, transparent 68%)",
        }}
      />

      {/* Aurora cobalt (gauche, mi-hauteur) */}
      <div
        ref={setRef(1)}
        className="absolute -left-48 top-[30%] h-[34rem] w-[34rem] opacity-[0.09] blur-3xl will-change-transform dark:opacity-[0.14]"
        style={{ background: "radial-gradient(circle, var(--cobalt) 0%, transparent 66%)" }}
      />

      {/* Lignes topographiques (bas-gauche) */}
      <div ref={setRef(2)} className="absolute -bottom-44 -left-44 h-[48rem] w-[48rem] will-change-transform">
        <svg className="h-full w-full text-ink opacity-[0.045] dark:opacity-[0.065]" viewBox="0 0 200 200" fill="none">
          {[1, 0.86, 0.72, 0.58, 0.44, 0.3, 0.16].map((s) => (
            <path
              key={s}
              d={CONTOUR}
              stroke="currentColor"
              strokeWidth={0.55 / s}
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
            <circle cx="100" cy="100" r="76" stroke="url(#ring-grad)" strokeWidth="17" opacity="0.32" />
            <circle cx="100" cy="100" r="76" stroke="var(--ink)" strokeWidth="0.5" opacity="0.18" />
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
        className="absolute inset-x-0 top-0 h-[42vh] opacity-[0.045] will-change-transform dark:opacity-[0.06]"
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
