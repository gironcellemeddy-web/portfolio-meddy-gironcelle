"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  CatmullRomCurve3,
  Color,
  ExtrudeGeometry,
  Shape,
  Vector3,
  type Group,
  type Mesh,
  type MeshPhysicalMaterial,
} from "three";
import { useEffectsTier } from "@/hooks/useEffectsTier";

/**
 * Ruban de verre en hélice, piloté par le défilement.
 *
 * Deux mouvements combinés, comme une vis : la caméra DESCEND le long du
 * ruban pendant que celui-ci TOURNE sur son axe. La teinte du verre évolue
 * du cobalt au braise au fil de la page. Tout est réversible : remonter
 * rejoue l'animation à l'envers.
 *
 * Le verre est translucide (transmission) : c'est coûteux en calcul, donc
 * réservé aux ordinateurs. Ailleurs, le fond épuré du site reste tel quel.
 */

const TURNS = 5; // nombre de spires
const HEIGHT = 26; // hauteur totale de l'hélice
const RADIUS = 2.6;

// Progression de teinte, choisie dans la palette du site pour ne jamais jurer.
const TINTS_DARK = ["#2a52e0", "#1fb6c9", "#ffa030", "#ef5a17"];
const TINTS_LIGHT = ["#1b3bb0", "#0e8ea0", "#d97b10", "#c2450c"];

function tintAt(p: number, palette: string[], target: Color) {
  const scaled = Math.min(palette.length - 1.001, p * (palette.length - 1));
  const i = Math.floor(scaled);
  target.set(palette[i]).lerp(new Color(palette[i + 1]), scaled - i);
}

function Helix({ dark }: { dark: boolean }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const progress = useRef(0);
  const color = useMemo(() => new Color(TINTS_DARK[0]), []);
  const { camera } = useThree();

  // Ruban plat extrudé le long d'une courbe hélicoïdale.
  const geometry = useMemo(() => {
    const points: Vector3[] = [];
    const steps = TURNS * 48;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * TURNS * Math.PI * 2;
      points.push(new Vector3(Math.cos(a) * RADIUS, HEIGHT * (0.5 - t), Math.sin(a) * RADIUS));
    }
    const curve = new CatmullRomCurve3(points);

    // Section du ruban : large et très fin, comme une lame de verre.
    const w = 0.95;
    const th = 0.055;
    const shape = new Shape();
    shape.moveTo(-w, -th);
    shape.lineTo(w, -th);
    shape.lineTo(w, th);
    shape.lineTo(-w, th);
    shape.closePath();

    return new ExtrudeGeometry(shape, {
      extrudePath: curve,
      steps: steps,
      bevelEnabled: false,
    });
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const target = Math.min(1, Math.max(0, window.scrollY / max));
    // Lissage : le mouvement suit le défilement sans à-coups, dans les deux sens.
    progress.current += (target - progress.current) * 0.07;
    const p = progress.current;

    // 1) On descend le long du ruban.
    camera.position.y = HEIGHT * (0.5 - p) - 0.5;
    camera.lookAt(0, camera.position.y - 1.2, 0);

    // 2) Le ruban tourne sur son axe.
    if (group.current) group.current.rotation.y = p * Math.PI * 2.2;

    // 3) La teinte du verre progresse avec la page.
    tintAt(p, dark ? TINTS_DARK : TINTS_LIGHT, color);
    const mat = mesh.current?.material as MeshPhysicalMaterial | undefined;
    if (mat) {
      mat.attenuationColor.copy(color);
      mat.color.copy(color).lerp(new Color(dark ? "#ffffff" : "#0c0c0e"), dark ? 0.72 : 0.55);
    }
  });

  return (
    <group ref={group} position={[1.1, 0, 0]}>
      <mesh ref={mesh} geometry={geometry}>
        <meshPhysicalMaterial
          transmission={1}
          thickness={1.6}
          roughness={0.06}
          ior={1.46}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={1.32}
          iridescenceThicknessRange={[100, 520]}
          attenuationDistance={2.4}
          envMapIntensity={dark ? 1.5 : 1.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function GlassHelix() {
  const tier = useEffectsTier();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  if (tier !== "full") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -20, opacity: dark ? 0.85 : 0.7 }}
    >
      <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        {/* Environnement construit en code : aucun fichier externe à charger,
            mais le verre a de quoi réfléchir et réfracter. */}
        <Environment resolution={192}>
          <Lightformer intensity={dark ? 2.4 : 3.2} position={[0, 6, 4]} scale={[12, 6, 1]} />
          <Lightformer intensity={dark ? 1.2 : 1.8} position={[-5, -2, 2]} scale={[8, 8, 1]} />
          <Lightformer intensity={dark ? 1.6 : 2.2} position={[5, 1, -3]} scale={[8, 8, 1]} />
        </Environment>
        <Helix dark={dark} />
      </Canvas>
    </div>
  );
}
