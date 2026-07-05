"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/photos";

// Galerie de photographies : masonry (formats natifs, aucun rognage). Clic sur
// une image → agrandissement plein écran (lightbox, navigation clavier).
export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + photos.length) % photos.length,
      ),
    [photos.length],
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
      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 [&>button]:mb-3 sm:[&>button]:mb-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setActive(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          >
            <Image
              src={p.src}
              alt={`Photographie de paysage ${i + 1} — Meddy Gironcelle`}
              width={p.width}
              height={p.height}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          >
            <button onClick={close} aria-label="Fermer" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Précédent" className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Suivant" className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] max-w-5xl flex-col"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[active].src}
                alt={`Photographie ${active + 1} — Meddy Gironcelle`}
                className="min-h-0 flex-1 rounded-lg object-contain shadow-2xl"
              />
              <p className="mt-3 text-center text-xs tracking-wide text-white/60">
                {active + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
