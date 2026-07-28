"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/lib/photos";
import { ISLAND_PATH, ISLAND_VIEWBOX, ISLAND_W, ISLAND_H } from "@/lib/islandShape";

/* Relief 3D réel de La Réunion (MapLibre + tuiles d'élévation) en toile de
   fond, surmonté de la silhouette de l'île dans laquelle défilent mes
   photographies (fondu enchaîné + lent zoom façon Ken Burns).
   MapLibre n'est chargé QUE lorsque la section approche de l'écran : le reste
   du site n'en supporte pas le poids. */

// Masque du cadre photo : contour géographique réel de l'île.
const ISLAND_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ISLAND_VIEWBOX}"><path d="${ISLAND_PATH}" fill="#fff"/></svg>`,
)}")`;

const SLIDE_MS = 4200;

export function IslandShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapHostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [mapReady, setMapReady] = useState(false);

  // Défilement en boucle des photographies (2 images montées à la fois).
  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  // Inclinaison 3D du cadre au passage de la souris.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1100px) rotateX(${(-ny * 9).toFixed(2)}deg) rotateY(${(nx * 12).toFixed(2)}deg)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Chargement différé de MapLibre (au moment où la section approche).
  useEffect(() => {
    const section = sectionRef.current;
    const host = mapHostRef.current;
    if (!section || !host) return;

    let map: { remove: () => void } | null = null;
    let cancelled = false;

    const io = new IntersectionObserver(
      async (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        try {
          const maplibregl = await import("maplibre-gl");
          await import("maplibre-gl/dist/maplibre-gl.css");
          if (cancelled) return;

          const dark = document.documentElement.classList.contains("dark");
          const style = dark
            ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

          const m = new maplibregl.Map({
            container: host,
            style,
            center: [55.5364, -21.1151],
            zoom: 9.1,
            pitch: 62,
            bearing: -22,
            maxPitch: 85,
            attributionControl: { compact: true },
            interactive: false, // décor : ne capture ni le scroll ni les clics
          });
          map = m;

          m.on("load", () => {
            m.addSource("terrain-reunion", {
              type: "raster-dem",
              tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
              tileSize: 256,
              encoding: "terrarium",
              maxzoom: 15,
            });
            m.setTerrain({ source: "terrain-reunion", exaggeration: 1.6 });
            m.addLayer({
              id: "hillshade",
              type: "hillshade",
              source: "terrain-reunion",
              paint: { "hillshade-exaggeration": 0.65 },
            });
            setMapReady(true);

            // Rotation lente et continue autour de l'île.
            let bearing = -22;
            const spin = window.setInterval(() => {
              bearing = (bearing + 0.6) % 360;
              m.setBearing(bearing);
            }, 90);
            m.once("remove", () => window.clearInterval(spin));
          });
        } catch {
          /* Relief indisponible : la section reste belle sans lui. */
        }
      },
      { rootMargin: "300px" },
    );

    io.observe(section);
    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, []);

  const next = (index + 1) % photos.length;

  return (
    <section
      ref={sectionRef}
      id="ile"
      className="anchor relative overflow-hidden py-20 sm:py-28"
    >
      {/* Fond océan permanent : la section reste habitée même si les tuiles
          d'élévation ne répondent pas. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 45%, color-mix(in srgb, var(--cobalt) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Relief réel en toile de fond */}
      <div
        ref={mapHostRef}
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-1000 ${mapReady ? "opacity-60 dark:opacity-75" : "opacity-0"}`}
      />
      {/* Voile : fond estompé sur les bords, relief visible au centre */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(135% 95% at 50% 45%, transparent 38%, var(--paper) 88%)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-5">
        <div className="text-center">
          <p className="eyebrow mb-3">/ 03 — Photographie</p>
          <h2
            className="hero-grad font-display font-black uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 7vw, 5rem)" }}
          >
            Mon île, mon regard
          </h2>
        </div>

        {/* Cadre photo en forme d'île, incliné en 3D */}
        <div
          ref={frameRef}
          className="relative w-full max-w-[520px] transition-transform duration-500 ease-out"
          // Ratio exact de l'île : aucune déformation du contour.
          style={{ transform: "perspective(1100px)", aspectRatio: `${ISLAND_W} / ${ISLAND_H}` }}
        >
          {/* Ombre portée sous l'île */}
          <div
            aria-hidden
            className="absolute inset-10 rounded-[50%] bg-black/40 blur-2xl"
            style={{ transform: "translateZ(-40px)" }}
          />

          {/* Photos masquées par la silhouette */}
          <div
            className="absolute inset-0"
            style={{
              maskImage: ISLAND_MASK,
              WebkitMaskImage: ISLAND_MASK,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            {[index, next].map((i, slot) => (
              <div
                key={`${i}-${slot}`}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: slot === 0 ? 1 : 0, zIndex: slot === 0 ? 2 : 1 }}
              >
                <Image
                  src={photos[i].src}
                  alt=""
                  fill
                  sizes="520px"
                  priority={i === 0}
                  className={slot === 0 ? "kenburns object-cover" : "object-cover"}
                />
              </div>
            ))}
            {/* Teinte pour fondre l'image dans la DA */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          </div>

          {/* Liseré côtier lumineux */}
          <svg viewBox={ISLAND_VIEWBOX} className="pointer-events-none absolute inset-0 h-full w-full">
            <path
              d={ISLAND_PATH}
              fill="none"
              stroke="var(--ember)"
              strokeOpacity="0.85"
              strokeWidth="1.6"
              style={{ filter: "drop-shadow(0 0 6px var(--ember))" }}
            />
          </svg>

          {/* Compteur de défilement */}
          <p className="font-display absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-paper backdrop-blur">
            {index + 1} / {photos.length}
          </p>
        </div>

        <Link
          href="/photographie"
          className="font-display inline-flex items-center gap-2 rounded-full border-2 border-ink px-8 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper sm:text-sm"
        >
          Voir les {photos.length} photographies
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
