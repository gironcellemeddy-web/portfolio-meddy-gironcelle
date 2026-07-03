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
      style={{ animationDelay: `${index * 55}ms` }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`bento-card group relative overflow-hidden rounded-3xl border border-card-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_18px_40px_-16px_rgba(0,0,0,0.28)] ${className}`}
    >
      {/* Liseré dégradé qui s'illumine au survol */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: "1px",
          background:
            "linear-gradient(130deg, var(--accent), transparent 40%, transparent 60%, var(--accent-2))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </motion.section>
  );
}
