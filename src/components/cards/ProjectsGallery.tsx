"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

// Réalisations de stage — visuels issus du dossier Annexes (public/projets).
const projects = [
  { key: "carrousels", img: "/projets/carrousel-ia.png" },
  { key: "pain", img: "/projets/fete-du-pain.png" },
  { key: "metisse", img: "/projets/metisse.png" },
  { key: "brasPanon", img: "/projets/bras-panon.png" },
  { key: "mode", img: "/projets/projet-mode.png" },
  { key: "ligne", img: "/projets/couverture-facebook.png" },
] as const;

export function ProjectsGallery() {
  const t = useTranslations("projects");
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + projects.length) % projects.length,
      ),
    [],
  );

  // Navigation clavier dans la lightbox.
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
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[9rem]">
        {projects.map((p, i) => (
          <button
            key={p.key}
            onClick={() => setActive(i)}
            className={`group/tile relative overflow-hidden rounded-2xl ring-1 ring-card-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              i === 0
                ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                : "aspect-square md:aspect-auto"
            }`}
          >
            <Image
              src={p.img}
              alt={t(`${p.key}.title`)}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover/tile:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity group-hover/tile:opacity-100" />

            {/* Icône zoom révélée au survol */}
            <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover/tile:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" />
            </span>

            <div className="absolute inset-x-0 bottom-0 p-3 text-left">
              <p className={`font-semibold text-white ${i === 0 ? "text-base" : "text-xs"}`}>
                {t(`${p.key}.title`)}
              </p>
              {i === 0 && (
                <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                  {t(`${p.key}.description`)}
                </p>
              )}
              {i !== 0 && (
                <span className="mt-0.5 flex items-center gap-0.5 text-[11px] font-medium text-white/70 opacity-0 transition-opacity group-hover/tile:opacity-100">
                  {t("view")} <ArrowUpRight className="h-3 w-3" />
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <button
              onClick={close}
              aria-label={t("close")}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label={t("prev")}
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label={t("next")}
              className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] max-w-3xl flex-col"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={projects[active].img}
                alt={t(`${projects[active].key}.title`)}
                className="min-h-0 flex-1 rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="mt-3 text-center">
                <p className="text-base font-semibold text-white">
                  {t(`${projects[active].key}.title`)}
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {t(`${projects[active].key}.description`)}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
