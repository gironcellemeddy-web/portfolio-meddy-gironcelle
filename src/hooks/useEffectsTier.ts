"use client";

import { useEffect, useState } from "react";

// Niveau d'effets visuels accordé à l'appareil :
//  - "full" : ordinateur avec pointeur fin, écran large et WebGL → tous les effets
//  - "lite" : mobile/tablette → seulement les effets légers (métal, verre)
//  - "off"  : animations réduites ou WebGL absent → aucun canvas, rendu d'origine
export type EffectsTier = "full" | "lite" | "off";

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useEffectsTier(): EffectsTier {
  // "off" au premier rendu : aucun canvas n'est monté avant d'avoir mesuré
  // l'appareil, ce qui garantit que le contenu d'origine s'affiche d'abord.
  const [tier, setTier] = useState<EffectsTier>("off");

  useEffect(() => {
    const compute = (): EffectsTier => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
      if (!hasWebGL()) return "off";
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wide = window.innerWidth >= 1024;
      return finePointer && wide ? "full" : "lite";
    };

    setTier(compute());

    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setTier(compute()), 200);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return tier;
}
