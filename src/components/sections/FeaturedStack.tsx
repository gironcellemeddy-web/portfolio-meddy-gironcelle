"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

// Projets à la une : cartes sticky qui s'empilent et se réduisent légèrement
// quand la suivante les recouvre (échelle pilotée par un écouteur de scroll
// direct, sans rAF). Chaque carte renvoie vers sa page « voir plus ».
const CARDS = [
  {
    num: "01",
    cat: "CMA Réunion · Stage",
    name: "Carrousels Instagram",
    href: "/realisations/carrousel-ia",
    imgs: ["/projets/carrousel-ia/1.png", "/projets/carrousel-boulangerie/1.png"],
    tall: "/projets/carrousel-coiffure/1.png",
  },
  {
    num: "02",
    cat: "CMA Réunion · Print & événementiel",
    name: "Affiches & magazine",
    href: "/realisations/fete-du-pain",
    imgs: ["/projets/fete-du-pain/1.png", "/projets/metisse/1.png"],
    tall: "/projets/bras-panon/2.png",
  },
  {
    num: "03",
    cat: "Personnel · Passion",
    name: "Photographie de paysage",
    href: "/photographie",
    imgs: ["/photos/photo-17.jpg", "/photos/photo-21.jpg"],
    tall: "/photos/photo-05.jpg",
  },
];

export function FeaturedStack() {
  const wrapsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const apply = () => {
      const total = CARDS.length;
      for (let i = 0; i < total; i++) {
        const wrap = wrapsRef.current[i];
        const card = cardsRef.current[i];
        if (!wrap || !card) continue;
        const r = wrap.getBoundingClientRect();
        const stickyTop = 110;
        const p = Math.min(1, Math.max(0, (stickyTop - r.top) / Math.max(1, r.height * 0.9)));
        const target = 1 - (total - 1 - i) * 0.05;
        const scale = 1 - p * (1 - target);
        card.style.transform = `scale(${scale.toFixed(4)})`;
      }
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply, { passive: true });
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <section
      id="a-la-une"
      className="anchor relative z-10 -mt-10 rounded-t-[40px] bg-paper px-5 pb-10 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <Reveal>
        <h2
          className="hero-grad font-display mb-14 text-center font-black uppercase leading-none tracking-tight sm:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          À la une
        </h2>
      </Reveal>

      <div className="mx-auto max-w-5xl">
        {CARDS.map((c, i) => (
          <div
            key={c.num}
            ref={(el) => { wrapsRef.current[i] = el; }}
            className="h-[85vh]"
          >
            <div
              ref={(el) => { cardsRef.current[i] = el; }}
              className="sticky top-24 origin-top rounded-[40px] border-2 border-ink/80 bg-paper p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
              style={{ top: `${96 + i * 28}px`, willChange: "transform" }}
            >
              {/* Rangée haute : numéro, catégorie, nom, bouton */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:mb-6">
                <div className="flex items-center gap-4 sm:gap-8">
                  <span
                    className="font-display font-black leading-none"
                    style={{ fontSize: "clamp(2.6rem, 8vw, 110px)" }}
                  >
                    {c.num}
                  </span>
                  <div>
                    <p className="eyebrow">{c.cat}</p>
                    <p
                      className="font-display mt-1 font-medium uppercase tracking-wide"
                      style={{ fontSize: "clamp(1.05rem, 2.4vw, 2rem)" }}
                    >
                      {c.name}
                    </p>
                  </div>
                </div>
                <Link
                  href={c.href}
                  className="font-display rounded-full border-2 border-ink px-8 py-3 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-ink/10 sm:px-10 sm:py-3.5 sm:text-base"
                >
                  Voir plus
                </Link>
              </div>

              {/* Grille d'images : 2 empilées à gauche, 1 haute à droite */}
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
                  <div
                    className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[50px]"
                    style={{ height: "clamp(130px, 16vw, 230px)" }}
                  >
                    <Image src={c.imgs[0]} alt={c.name} fill sizes="40vw" className="object-cover" />
                  </div>
                  <div
                    className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[50px]"
                    style={{ height: "clamp(160px, 22vw, 340px)" }}
                  >
                    <Image src={c.imgs[1]} alt={c.name} fill sizes="40vw" className="object-cover" />
                  </div>
                </div>
                <div
                  className="relative col-span-3 overflow-hidden rounded-[28px] sm:rounded-[40px] md:rounded-[50px]"
                  style={{ height: "clamp(302px, 38vw, 586px)" }}
                >
                  <Image src={c.tall} alt={c.name} fill sizes="60vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
