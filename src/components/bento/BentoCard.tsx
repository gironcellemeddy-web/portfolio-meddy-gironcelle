"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type BentoCardProps = {
  children: ReactNode;
  /** Classes de grille (col-span / row-span) et styles additionnels. */
  className?: string;
  /** Index utilisé pour décaler légèrement l'apparition (stagger). */
  index?: number;
  /** Active le tilt 3D au survol (désactivé pour les très grandes cartes). */
  tilt?: boolean;
};

// Carte réutilisable : conteneur blanc + tilt 3D suivant la souris.
// L'apparition (opacité) est gérée en CSS (.bento-card) pour rester robuste
// sans JS ; le tilt (transform) est piloté par Framer Motion, sans conflit.
export function BentoCard({ children, className = "", index = 0, tilt = true }: BentoCardProps) {
  const reduce = useReducedMotion();
  const enableTilt = tilt && !reduce;
  const ref = useRef<HTMLElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5.5, -5.5]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5.5, 5.5]), { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enableTilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.section
      ref={ref}
      onMouseMove={enableTilt ? handleMove : undefined}
      onMouseLeave={enableTilt ? reset : undefined}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformPerspective: 1100,
        animationDelay: `${index * 55}ms`,
      }}
      className={`bento-card group relative rounded-[var(--radius-bento)] border border-card-border bg-card p-5 shadow-[0_1px_2px_rgba(15,16,18,0.03),0_14px_34px_-16px_rgba(15,16,18,0.16)] transition-shadow duration-300 hover:shadow-[0_2px_6px_rgba(15,16,18,0.05),0_26px_48px_-20px_rgba(37,99,235,0.28)] ${className}`}
    >
      {children}
    </motion.section>
  );
}
