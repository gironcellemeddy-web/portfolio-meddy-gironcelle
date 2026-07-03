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

// Carte réutilisable : conteneur épuré + survol subtil (Framer Motion).
// L'apparition est gérée en CSS (.bento-card) pour rester robuste : le contenu
// est visible même sans JS. Framer Motion ne pilote que le survol.
export function BentoCard({ children, className = "", index = 0 }: BentoCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      style={{ animationDelay: `${index * 55}ms` }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`bento-card group relative overflow-hidden rounded-[var(--radius-bento)] border border-card-border bg-card p-5 shadow-[0_1px_2px_rgba(40,40,40,0.03),0_10px_28px_-14px_rgba(40,40,40,0.14)] transition-shadow hover:shadow-[0_2px_4px_rgba(40,40,40,0.04),0_18px_38px_-16px_rgba(40,40,40,0.22)] ${className}`}
    >
      {children}
    </motion.section>
  );
}
