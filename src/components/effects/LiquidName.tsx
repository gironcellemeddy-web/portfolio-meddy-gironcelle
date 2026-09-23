"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";
import { useEffectsTier } from "@/hooks/useEffectsTier";

/**
 * Transforme le nom du hero en métal liquide.
 *
 * Le titre HTML reste TOUJOURS dans la page (référencement, lecteurs d'écran,
 * affichage immédiat). Ce composant dessine le même texte sur un canvas hors
 * écran, s'en sert de masque pour le shader, et n'estompe le titre d'origine
 * qu'une fois l'effet réellement prêt. Si quoi que ce soit échoue, le titre
 * reste visible tel quel.
 */

type Mask = { url: string; width: number; height: number };

function renderTextMask(text: string, width: number, height: number): Mask | null {
  const canvas = document.createElement("canvas");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  // Taille de police ajustée pour occuper ~96 % de la largeur disponible.
  let size = height;
  ctx.font = `900 ${size}px Kanit, sans-serif`;
  const measured = ctx.measureText(text).width || 1;
  size = Math.max(8, (size * (width * 0.96)) / measured);
  ctx.font = `900 ${size}px Kanit, sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  return { url: canvas.toDataURL("image/png"), width, height };
}

export function LiquidName({ text }: { text: string }) {
  const tier = useEffectsTier();
  const hostRef = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<Mask | null>(null);
  const [dark, setDark] = useState(true);

  // Palette suivant le thème du site.
  useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Construit (et reconstruit au redimensionnement) le masque de texte.
  useEffect(() => {
    if (tier === "off") return;
    let cancelled = false;

    const build = async () => {
      try {
        await document.fonts.load('900 100px "Kanit"');
        await document.fonts.ready;
      } catch {
        /* police indisponible : on dessine avec la police de repli */
      }
      const host = hostRef.current;
      if (!host || cancelled) return;
      const r = host.getBoundingClientRect();
      if (r.width < 40 || r.height < 10) return;
      const m = renderTextMask(text, Math.round(r.width), Math.round(r.height));
      if (!cancelled && m) setMask(m);
    };

    void build();
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => void build(), 250);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [text, tier]);

  // Estompe le titre d'origine seulement quand l'effet est prêt.
  useEffect(() => {
    const target = hostRef.current?.parentElement?.querySelector<HTMLElement>(
      "[data-liquid-target]",
    );
    if (!target) return;
    if (mask && tier !== "off") {
      target.style.transition = "opacity 500ms ease-out";
      target.style.opacity = "0";
    } else {
      target.style.opacity = "";
    }
    return () => {
      target.style.opacity = "";
    };
  }, [mask, tier]);

  return (
    <div ref={hostRef} aria-hidden className="pointer-events-none absolute inset-0">
      {mask && tier !== "off" && (
        <LiquidMetal
          image={mask.url}
          width={mask.width}
          height={mask.height}
          colorBack="#00000000"
          colorTint={dark ? "#d7e2ea" : "#15171b"}
          repetition={2}
          distortion={0.03}
          contour={0.28}
          softness={0.22}
          shiftRed={0.1}
          shiftBlue={0.1}
          speed={0.35}
          angle={45}
          scale={1}
          fit="contain"
        />
      )}
    </div>
  );
}
