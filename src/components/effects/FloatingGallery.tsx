"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, Float } from "@react-three/drei";
import type { Group } from "three";
import { photos } from "@/lib/photos";
import { useEffectsTier } from "@/hooks/useEffectsTier";

/**
 * Photographies flottant en 3D autour du cadre-île.
 *
 * Purement décoratif : aucune interaction, aucun texte, jamais au centre
 * (l'île et son diaporama restent dégagés). Ordinateur uniquement.
 */

// Indices choisis pour ne redoubler ni le hero ni « À la une » ni le marquee.
const PICKS = [12, 19, 25, 31, 40, 47, 55, 63, 70];

// Sert les images déjà redimensionnées par Next plutôt que les originaux.
// La qualité 75 est la seule autorisée par défaut depuis Next 16 (toute autre
// valeur renvoie une erreur 400 et la texture resterait vide).
function optimized(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;
}

function Orbit() {
  const group = useRef<Group>(null);
  const { viewport } = useThree();

  const items = useMemo(
    () =>
      PICKS.map((i, k) => {
        const p = photos[i % photos.length];
        const a = (k / PICKS.length) * Math.PI * 2;
        const ratio = p.width / p.height;
        const w = ratio > 1 ? 1.15 : 0.82;
        return {
          url: optimized(p.src),
          position: [Math.cos(a) * 3.4, Math.sin(a) * 1.7, Math.sin(a * 2) * 1.2] as [
            number,
            number,
            number,
          ],
          scale: [w, w / ratio] as [number, number], // drei/Image est un plan : échelle 2D
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.02;
    // Parallaxe douce suivant le curseur.
    const targetX = state.pointer.y * 0.18;
    const targetShift = state.pointer.x * 0.25;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    g.position.x += (targetShift - g.position.x) * 0.04;
  });

  const spread = Math.max(0.85, Math.min(1.4, viewport.width / 9));

  return (
    <group ref={group} scale={spread}>
      {items.map((it, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.15} floatIntensity={0.4}>
          <DreiImage
            url={it.url}
            position={it.position}
            scale={it.scale}
            transparent
            opacity={0.85}
          />
        </Float>
      ))}
    </group>
  );
}

export function FloatingGallery() {
  const tier = useEffectsTier();
  if (tier !== "full") return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={0.8} color="#ef5a17" />
        <Orbit />
      </Canvas>
    </div>
  );
}
