"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

type Project = { img: string; type: string; fr: string; en: string };

// Toutes les réalisations issues du dossier Annexes (public/projets).
const projects: Project[] = [
  { img: "/projets/carrousel-ia.png", type: "Carrousel Instagram", fr: "L'IA ne te remplacera pas", en: "AI won't replace you" },
  { img: "/projets/carrousel-boulangerie.png", type: "Carrousel Instagram", fr: "Boulangerie", en: "Bakery" },
  { img: "/projets/carrousel-maconnerie.png", type: "Carrousel Instagram", fr: "Maçonnerie", en: "Masonry" },
  { img: "/projets/carrousel-carrosserie.png", type: "Carrousel Instagram", fr: "Carrosserie", en: "Bodywork" },
  { img: "/projets/carrousel-coiffure.png", type: "Carrousel Instagram", fr: "Coiffure", en: "Hairdressing" },
  { img: "/projets/carrousel-ambulancier.png", type: "Carrousel Instagram", fr: "Ambulancier", en: "Ambulance driver" },
  { img: "/projets/carrousel-fleuriste.png", type: "Carrousel Instagram", fr: "Fleuriste", en: "Florist" },
  { img: "/projets/carrousel-poissonnerie.png", type: "Carrousel Instagram", fr: "Poissonnerie", en: "Fishmonger" },
  { img: "/projets/fete-du-pain.png", type: "Affiche", fr: "Fête du Pain 2026", en: "Bread Festival 2026" },
  { img: "/projets/metisse-1.png", type: "Magazine Métisse", fr: "Page 1", en: "Page 1" },
  { img: "/projets/metisse-2.png", type: "Magazine Métisse", fr: "Page 2", en: "Page 2" },
  { img: "/projets/bras-panon-post.png", type: "Foire de Bras-Panon", fr: "Publication", en: "Feed post" },
  { img: "/projets/bras-panon-story.png", type: "Foire de Bras-Panon", fr: "Story", en: "Story" },
  { img: "/projets/couverture-facebook.png", type: "Facebook CMAR", fr: "Couverture 2026", en: "2026 cover" },
  { img: "/projets/fb-formation.png", type: "Facebook CMAR", fr: "Formation à pourvoir", en: "Training available" },
  { img: "/projets/fb-projet-mode.png", type: "Facebook CMAR", fr: "Projet Mode", en: "Fashion project" },
];

export function ProjectsGallery() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [active, setActive] = useState<number | null>(null);

  const title = (p: Project) => (locale === "en" ? p.en : p.fr);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + projects.length) % projects.length,
      ),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, go]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:auto-rows-[8.5rem] md:grid-cols-3">
        {projects.map((p, i) => (
          <button
            key={p.img}
            onClick={() => setActive(i)}
            className={`group/tile relative overflow-hidden rounded-[var(--radius-bento)] border-[1.5px] border-card-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square md:aspect-auto"
            }`}
          >
            <Image
              src={p.img}
              alt={title(p)}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover/tile:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity group-hover/tile:opacity-100" />
            <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover/tile:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3 text-left">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
                {p.type}
              </p>
              <p className={`truncate font-semibold text-white ${i === 0 ? "text-base" : "text-xs"}`}>
                {title(p)}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox — image agrandie au clic */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button onClick={close} aria-label={t("close")} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t("prev")} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t("next")} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] max-w-2xl flex-col items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={projects[active].img} alt={title(projects[active])} className="min-h-0 flex-1 rounded-lg object-contain shadow-2xl" />
              <figcaption className="mt-3 text-center text-white">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">{projects[active].type}</p>
                <p className="text-base font-semibold">{title(projects[active])}</p>
                <p className="mt-1 text-xs text-white/50">{active + 1} / {projects.length}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
