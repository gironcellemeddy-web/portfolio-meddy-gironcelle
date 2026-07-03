"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";

// Affiche toutes les images d'une réalisation en masonry : chaque cadre épouse
// le format natif de l'image (aucun rognage). Un clic ouvre l'image en grand.
export function ProjectDetailGallery({
  images,
  title,
}: {
  images: ProjectImage[];
  title: string;
}) {
  const t = useTranslations("projects");
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + images.length) % images.length,
      ),
    [images.length],
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
      <div className="columns-1 gap-4 sm:columns-2 [&>button]:mb-4">
        {images.map((im, i) => (
          <button
            key={im.src}
            onClick={() => setActive(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-[var(--radius-xl2)] border border-line transition-colors hover:border-cobalt focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          >
            <Image
              src={im.src}
              alt={`${title} — ${i + 1}`}
              width={im.width}
              height={im.height}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {images.length > 1 && (
              <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                {i + 1} / {images.length}
              </span>
            )}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button onClick={close} aria-label={t("close")} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            {images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t("prev")} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t("next")} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] max-w-2xl flex-col"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[active].src} alt={`${title} — ${active + 1}`} className="min-h-0 flex-1 rounded-lg object-contain shadow-2xl" />
              <p className="mt-2 text-center text-xs text-white/60">{active + 1} / {images.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
