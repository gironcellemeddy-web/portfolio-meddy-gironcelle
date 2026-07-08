"use client";

import { useState } from "react";
import Image from "next/image";

/* Livre « PORTFOLIO » en 3D (CSS pur, sans WebGL) : posé en perspective,
   il se feuillette au clic — chaque page tourne autour de la reliure
   (rotateY, backface-hidden) et révèle un pan du CV, une réalisation et
   une photographie. Dernier clic : le livre se referme. */

type Page =
  | { type: "cover" }
  | { type: "text"; label: string; title: string; lines: string[] }
  | { type: "image"; src: string; label: string; caption: string };

const PAGES: Page[] = [
  { type: "cover" },
  {
    type: "text",
    label: "Profil",
    title: "Communication & marketing digital",
    lines: [
      "Master 2 Sciences de l'Information et de la Communication",
      "Université de La Réunion",
      "Basé à La Réunion (974)",
    ],
  },
  {
    type: "text",
    label: "Expériences",
    title: "Stages en communication",
    lines: [
      "EDF Réunion — équipe communication",
      "CMA Réunion — service communication",
      "Antenne Réunion / RTL — rédaction",
    ],
  },
  {
    type: "text",
    label: "Qualités & langues",
    title: "Curieux · Ponctuel · Rigoureux",
    lines: [
      "Français · Créole réunionnais · Anglais (B1)",
      "Canva · Lightroom · Meta Business",
      "Google Ads & Trends · Suite Office",
    ],
  },
  {
    type: "image",
    src: "/projets/carrousel-coiffure/3.png",
    label: "Réalisation",
    caption: "Carrousels Instagram — CMA Réunion",
  },
  {
    type: "image",
    src: "/photos/photo-01.jpg",
    label: "Photographie",
    caption: "Paysages — Galaxy S22 Ultra + Lightroom",
  },
];

export function PortfolioBook() {
  const [flipped, setFlipped] = useState(0);
  const done = flipped >= PAGES.length;

  const next = () => setFlipped((f) => (f >= PAGES.length ? 0 : f + 1));

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Scène en perspective */}
      <div style={{ perspective: "1400px" }}>
        <div
          role="button"
          tabIndex={0}
          aria-label="Livre portfolio de Meddy Gironcelle — cliquer pour feuilleter les pages"
          onClick={next}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              next();
            }
          }}
          className="relative aspect-[3/4] w-[230px] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-ember sm:w-[290px] md:w-[330px]"
          style={{
            transform: "rotateX(7deg) rotateY(-14deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Épaisseur du livre (tranche de pages à droite + dessous) */}
          <div
            aria-hidden
            className="absolute -right-2 top-1 bottom-0 w-2 rounded-r-sm"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #efeadd 0 2px, #d9d2c0 2px 3px)",
              transform: "translateZ(-6px)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 translate-x-1 translate-y-2 rounded-2xl bg-black/40 blur-md"
            style={{ transform: "translateZ(-14px)" }}
          />

          {/* Quatrième de couverture (fond) : appel final + recommencer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-r-xl rounded-l-md border border-black/40 bg-[#15151a] p-6 text-center">
            <p className="font-display text-lg font-black uppercase leading-tight text-[#d7e2ea]">
              La suite ?
            </p>
            <p className="text-xs leading-relaxed text-[#8b929b]">
              Travaux, galerie photo et mini-jeu vous attendent plus bas.
            </p>
            <span className="font-display mt-2 rounded-full border border-[#d7e2ea]/30 px-4 py-1.5 text-[10px] uppercase tracking-widest text-[#d7e2ea]">
              Cliquer pour refermer
            </span>
          </div>

          {/* Feuilles (la première est la couverture) */}
          {PAGES.map((page, i) => {
            const isFlipped = flipped > i;
            return (
              <div
                key={i}
                aria-hidden={isFlipped}
                className={`absolute inset-0 overflow-hidden border border-black/30 ${
                  page.type === "cover"
                    ? "rounded-r-xl rounded-l-md"
                    : "rounded-r-lg rounded-l-sm bg-[#f7f3e9]"
                }`}
                style={{
                  transformOrigin: "left center",
                  transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0.1, 0.2, 1)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  zIndex: isFlipped ? PAGES.length + i : PAGES.length - i,
                  pointerEvents: isFlipped ? "none" : undefined,
                }}
              >
                {page.type === "cover" && (
                  <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#1c1c22] via-[#101014] to-[#0a0a0d] p-6">
                    <p className="font-display text-[10px] uppercase tracking-[0.3em] text-[#8b929b]">
                      Communication · La Réunion
                    </p>
                    <div>
                      <p
                        className="font-display font-black uppercase leading-[0.95] text-[#d7e2ea]"
                        style={{ fontSize: "clamp(1.7rem, 4.5vw, 2.6rem)" }}
                      >
                        Port
                        <br />
                        folio<span className="text-ember">.</span>
                      </p>
                      <p className="font-display mt-4 text-sm font-medium uppercase tracking-widest text-[#d7e2ea]">
                        Meddy Gironcelle
                      </p>
                    </div>
                    <p className="font-display animate-pulse text-[10px] uppercase tracking-[0.25em] text-ember">
                      Cliquer pour feuilleter →
                    </p>
                  </div>
                )}

                {page.type === "text" && (
                  <div className="flex h-full flex-col p-5 sm:p-6">
                    <p className="font-display text-[10px] uppercase tracking-[0.25em] text-[#9a9388]">
                      {page.label}
                    </p>
                    <p className="font-display mt-3 text-base font-black uppercase leading-tight text-[#1c1a16] sm:text-lg">
                      {page.title}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {page.lines.map((l) => (
                        <li key={l} className="border-l-2 border-ember/60 pl-2.5 text-[11px] leading-snug text-[#4a463e] sm:text-xs">
                          {l}
                        </li>
                      ))}
                    </ul>
                    <p className="font-display mt-auto text-right text-[10px] text-[#9a9388]">
                      {i + 1} / {PAGES.length}
                    </p>
                  </div>
                )}

                {page.type === "image" && (
                  <div className="relative h-full">
                    <Image
                      src={page.src}
                      alt={page.caption}
                      fill
                      sizes="330px"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
                      <p className="font-display text-[9px] uppercase tracking-[0.25em] text-white/60">
                        {page.label}
                      </p>
                      <p className="text-[11px] font-medium text-white sm:text-xs">{page.caption}</p>
                    </div>
                    <p className="font-display absolute right-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[9px] text-white/80">
                      {i + 1} / {PAGES.length}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="font-display text-[10px] uppercase tracking-[0.25em] text-muted-2">
        {done ? "Cliquer pour recommencer" : "Cliquer sur le livre pour feuilleter"}
      </p>
    </div>
  );
}
