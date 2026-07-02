"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  /** Classes de grille (col-span / row-span) et styles additionnels. */
  className?: string;
  /** Index utilisé pour décaler légèrement l'animation d'apparition. */
  index?: number;
};

// Carte réutilisable : conteneur visuel + animation d'apparition sobre.
export function BentoCard({ children, className = "", index = 0 }: BentoCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-3xl border border-card-border bg-card p-5 shadow-sm ${className}`}
    >
      {children}
    </motion.section>
  );
}
