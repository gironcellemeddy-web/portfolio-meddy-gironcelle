"use client";

import dynamic from "next/dynamic";

// Point d'entrée client des effets du hero. Next 16 interdit `ssr: false`
// depuis un composant serveur : ce fichier fait le pont, et reste minuscule
// (le vrai code des effets n'est téléchargé qu'ensuite, à la demande).
const HeroGradient = dynamic(
  () => import("@/components/effects/HeroGradient").then((m) => m.HeroGradient),
  { ssr: false },
);

export function HeroEffects() {
  return <HeroGradient />;
}
