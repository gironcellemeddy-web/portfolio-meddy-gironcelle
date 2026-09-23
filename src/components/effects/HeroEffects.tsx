"use client";

import dynamic from "next/dynamic";

// Point d'entrée client des effets du hero. Next 16 interdit `ssr: false`
// depuis un composant serveur : ce fichier fait le pont, et reste minuscule
// (le vrai code de l'effet n'est téléchargé qu'ensuite, à la demande).
const LiquidName = dynamic(
  () => import("@/components/effects/LiquidName").then((m) => m.LiquidName),
  { ssr: false },
);

/** Métal liquide, superposé au titre (qui reste dans la page). */
export function LiquidNameEffect({ text }: { text: string }) {
  return <LiquidName text={text} />;
}
