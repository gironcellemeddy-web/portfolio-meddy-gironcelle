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

// Carte éditoriale flat : bordure marquée, aucune ombre (esprit jessbayer).
// Apparition en CSS (.bento-card) pour rester robuste sans JS.
export function BentoCard({ children, className = "", index = 0 }: BentoCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      style={{ animationDelay: `${index * 55}ms` }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`bento-card group relative overflow-hidden rounded-[var(--radius-bento)] border-[1.5px] border-card-border bg-card p-5 ${className}`}
    >
      {children}
    </motion.section>
  );
}
