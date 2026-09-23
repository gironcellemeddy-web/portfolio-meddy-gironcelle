"use client";

import type { ReactNode } from "react";
import LiquidGlass from "liquid-glass-react";
import { useEffectsTier } from "@/hooks/useEffectsTier";

/**
 * Surface en verre réfractant.
 *
 * La classe `.glass` du site est TOUJOURS appliquée : sur les navigateurs qui
 * ne savent pas déformer l'arrière-plan (Safari, Firefox) et au niveau « off »,
 * l'apparence actuelle du site est conservée à l'identique.
 */
export function Glass({
  children,
  radius = 999,
  className = "",
  padding = "0",
}: {
  children: ReactNode;
  radius?: number;
  className?: string;
  padding?: string;
}) {
  const tier = useEffectsTier();

  if (tier === "off") {
    return <div className={`glass ${className}`}>{children}</div>;
  }

  return (
    <LiquidGlass
      cornerRadius={radius}
      displacementScale={48}
      blurAmount={0.08}
      saturation={130}
      aberrationIntensity={1.5}
      elasticity={0.12}
      mode="standard"
      padding={padding}
      className={className}
    >
      {children}
    </LiquidGlass>
  );
}
