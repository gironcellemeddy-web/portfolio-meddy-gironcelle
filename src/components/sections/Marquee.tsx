"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { projects, projectCover } from "@/lib/projects";
import { photos } from "@/lib/photos";

// Marquee piloté par le scroll : deux rangées d'images (réalisations puis
// photographies) qui glissent horizontalement au fil du défilement — rangée 1
// vers la droite, rangée 2 vers la gauche. Écouteur de scroll direct (sans
// rAF) ; inactif si l'utilisateur réduit les animations.
export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      const r = section.getBoundingClientRect();
      const offset = reduce ? 200 : ((window.innerHeight || 0) - r.top) * 0.3;
      if (row1Ref.current)
        row1Ref.current.style.transform = `translate3d(${(offset - 200).toFixed(1)}px, 0, 0)`;
      if (row2Ref.current)
        row2Ref.current.style.transform = `translate3d(${(-(offset - 200)).toFixed(1)}px, 0, 0)`;
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

  // Rangée 1 : couvertures des réalisations · rangée 2 : photographies.
  const row1 = projects.map((p) => projectCover(p).src);
  const row2 = photos.slice(0, 12).map((p) => p.src);

  return (
    <section ref={sectionRef} className="overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow innerRef={row1Ref} images={[...row1, ...row1]} startLeft />
        <MarqueeRow innerRef={row2Ref} images={[...row2, ...row2]} />
      </div>
    </section>
  );
}

function MarqueeRow({
  images,
  innerRef,
  startLeft = false,
}: {
  images: string[];
  innerRef: React.Ref<HTMLDivElement>;
  startLeft?: boolean;
}) {
  return (
    <div
      ref={innerRef}
      className={`flex w-max gap-3 ${startLeft ? "-ml-[40%]" : ""}`}
      style={{ willChange: "transform" }}
    >
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative h-[170px] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-line md:h-[270px] md:w-[420px]"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="420px"
            loading="lazy"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
