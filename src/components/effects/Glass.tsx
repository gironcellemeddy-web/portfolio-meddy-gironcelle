"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useEffectsTier } from "@/hooks/useEffectsTier";

// Le moteur de verre (~100 Ko) n'est téléchargé qu'après le premier rendu :
// d'ici là, et sur les navigateurs qui ne le supportent pas, la classe
// `.glass` du site assure exactement l'apparence actuelle.
const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

/**
 * Surface en verre réfractant.
 *
 * La classe `.glass` reste TOUJOURS la référence visuelle de repli : au
 * niveau « off » (animations réduites, WebGL absent), pendant le chargement,
 * et sur Safari ou Firefox qui ne savent pas déformer l'arrière-plan.
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
