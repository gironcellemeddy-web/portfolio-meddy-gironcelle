"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { ShaderMaterial, type Texture } from "three";
import { useEffectsTier } from "@/hooks/useEffectsTier";

/**
 * Fond d'écran vivant : une descente de l'île au fil de la page.
 *
 * Cinq photographies de Meddy s'enchaînent en fondu suivant la progression du
 * défilement — des remparts jusqu'à l'océan. L'eau coule en continu : le
 * shader ne déplace que les zones CLAIRES de l'image (l'écume), la roche et la
 * végétation restent nettes.
 *
 * Toujours recouvert d'un voile sombre : la lisibilité des textes prime.
 */

// Étapes du parcours, dans l'ordre de lecture de la page.
const STEPS = [
  "/photos/photo-69.jpg", // remparts dans la brume (hero)
  "/photos/photo-48.jpg", // grande cascade en falaise (savoir-faire)
  "/photos/photo-18.jpg", // cascade tropicale (réalisations)
  "/photos/photo-57.jpg", // torrent turquoise (mon île)
  "/photos/photo-65.jpg", // côte et océan (contact)
];

const tex = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uA;
  uniform sampler2D uB;
  uniform float uMix;      // fondu entre l'étape courante et la suivante
  uniform float uTime;
  uniform vec2 uCover;     // correction du cadrage « cover »
  varying vec2 vUv;

  // Échantillonne une photo en faisant couler ses zones claires.
  vec3 flowing(sampler2D t, vec2 uv, float time) {
    vec3 base = texture2D(t, uv).rgb;
    float lum = dot(base, vec3(0.299, 0.587, 0.114));
    // L'écume est claire : elle seule sera déplacée.
    float water = smoothstep(0.42, 0.88, lum);
    float ripple = sin(uv.x * 38.0 + time * 1.7) * 0.5 + 0.5;
    float drop = fract(time * 0.16 + ripple * 0.12);
    vec2 offset = vec2(0.0, -drop * 0.035) * water;
    vec3 moved = texture2D(t, uv + offset).rgb;
    return mix(base, moved, water);
  }

  void main() {
    // Cadrage « cover » : l'image remplit l'écran sans déformation.
    vec2 uv = (vUv - 0.5) * uCover + 0.5;
    vec3 a = flowing(uA, uv, uTime);
    vec3 b = flowing(uB, uv, uTime + 3.0);
    gl_FragColor = vec4(mix(a, b, uMix), 1.0);
  }
`;

function Scene() {
  const textures = useTexture(STEPS.map(tex)) as Texture[];
  const matRef = useRef<ShaderMaterial>(null);
  const progress = useRef(0);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uA: { value: textures[0] },
      uB: { value: textures[1] },
      uMix: { value: 0 },
      uTime: { value: 0 },
      uCover: { value: [1, 1] as [number, number] },
    }),
    [textures],
  );

  useFrame((state, delta) => {
    const m = matRef.current;
    if (!m) return;

    // Progression dans la page (0 en haut, 1 en bas).
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const target = Math.min(1, Math.max(0, window.scrollY / max));
    progress.current += (target - progress.current) * 0.06; // lissage

    const scaled = progress.current * (STEPS.length - 1);
    const i = Math.min(STEPS.length - 2, Math.floor(scaled));
    m.uniforms.uA.value = textures[i];
    m.uniforms.uB.value = textures[i + 1];
    m.uniforms.uMix.value = scaled - i;
    m.uniforms.uTime.value += delta;

    // Cadrage « cover » calculé sur les proportions réelles de la photo.
    const img = textures[i].image as { width?: number; height?: number } | undefined;
    const imgRatio = img?.width && img?.height ? img.width / img.height : 1.5;
    const screenRatio = size.width / size.height;
    const c = m.uniforms.uCover.value as [number, number];
    if (screenRatio > imgRatio) {
      c[0] = 1;
      c[1] = imgRatio / screenRatio;
    } else {
      c[0] = screenRatio / imgRatio;
      c[1] = 1;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function WaterBackdrop() {
  const tier = useEffectsTier();
  if (tier !== "full") return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: -20 }}>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
