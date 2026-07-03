"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  /** Classes de grille (col-span / row-span) et styles additionnels. */
  className?: string;
  /** Index utilisé pour décaler légèrement l'apparition (stagger). */
  index?: number;
};

// Carte réutilisable : conteneur visuel + survol animé (Framer Motion).
// L'apparition est gérée en CSS (classe .bento-card) pour rester robuste :
// le contenu est visible même si le JS ne s'exécute pas. Framer Motion ne
// pilote que le survol, sans jamais masquer le contenu.
export function BentoCard({ children, className = "", index = 0 }: BentoCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      style={{ animationDelay: `${index * 60}ms` }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`bento-card group relative overflow-hidden rounded-3xl border border-card-border bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </motion.section>
  );
}
