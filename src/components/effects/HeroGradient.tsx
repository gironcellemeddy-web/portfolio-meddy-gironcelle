"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useEffectsTier } from "@/hooks/useEffectsTier";

// Dégradé vivant derrière le hero (ordinateur uniquement). Le décor CSS
// existant reste en dessous : si ce canvas ne monte pas, rien ne manque.
// Il s'estompe vers le bas pour se fondre dans le fond de la page.
export function HeroGradient() {
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

  const colors = dark
    ? { color1: "#0c0c0c", color2: "#3a1a0e", color3: "#0f1f4a" }
    : { color1: "#f5f4ef", color2: "#ffd7c2", color3: "#dbe4ff" };

  const fade = "linear-gradient(to bottom, #000 55%, transparent 100%)";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%" }}
        pointerEvents="none"
        pixelDensity={1}
        lazyLoad
        rootMargin="200px"
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          uSpeed={0.15}
          uStrength={1.2}
          uDensity={1.3}
          uFrequency={5.5}
          cDistance={2.8}
          cAzimuthAngle={180}
          cPolarAngle={80}
          cameraZoom={1}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          grain="on"
          brightness={dark ? 0.9 : 1.2}
          {...colors}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
