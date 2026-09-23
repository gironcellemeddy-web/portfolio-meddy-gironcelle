# Effets WebGL — Plan d'implémentation

> **Pour l'exécutant :** suivre les tâches dans l'ordre. Le projet n'a pas de framework de tests ; chaque tâche se vérifie par `tsc --noEmit`, `next build`, et des contrôles sur le HTML/CSS réellement servis. Cases `- [ ]` à cocher.

**But :** ajouter quatre effets temps réel (nom en métal liquide, fond dégradé animé, verre liquide, galerie photo 3D) sans dégrader la vitesse, la lisibilité, l'accessibilité ni la conformité du portfolio.

**Architecture :** approche A de la spec — chaque effet est un composant client isolé, importé dynamiquement (`ssr: false`) et monté seulement quand sa section approche de l'écran. Un hook unique `useEffectsTier()` décide du niveau (`full` / `lite` / `off`). Le DOM existant reste toujours rendu : les canvas se superposent.

**Stack :** Next.js 16, React 19, `@paper-design/shaders-react` (Apache-2.0), `@shadergradient/react` (MIT), `@react-three/fiber` + `@react-three/drei` + `three` (MIT), `liquid-glass-react` (MIT).

**Spec :** `docs/superpowers/specs/2026-09-20-effets-webgl-design.md`

## Contraintes globales

- Aucun effet ne masque du contenu : le DOM reste rendu, les canvas sont `aria-hidden="true"` et `pointer-events: none` sauf interaction explicite.
- `prefers-reduced-motion: reduce` ⇒ tier `off` ⇒ aucun canvas WebGL monté.
- Tier `full` = pointeur fin ET largeur ≥ 1024 px ET WebGL disponible ET pas de reduced-motion. `lite` = le reste. `off` = reduced-motion ou WebGL absent.
- Fond animé et galerie 3D : tier `full` uniquement. Métal liquide et verre : `full` + `lite`.
- Palette lue sur `document.documentElement.classList.contains("dark")`, re-lue via `MutationObserver` sur l'attribut `class`.
- Node uniquement via nvm : `export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use --lts`.
- Ne jamais mêler `next build` et un `next dev` actif sur le même `.next` (faire `rm -rf .next`).
- Commit après chaque tâche.

---

### Tâche 1 : Socle — dépendances et détection du niveau

**Fichiers :**
- Modifier : `package.json` (dépendances)
- Créer : `src/hooks/useEffectsTier.ts`

**Interfaces produites :** `useEffectsTier(): "full" | "lite" | "off"`

- [ ] **Étape 1 : installer les dépendances**

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use --lts
cd /Users/meddygironcelle/Desktop/portfolio-meddy
npm install @paper-design/shaders-react @shadergradient/react @react-three/fiber @react-three/drei three liquid-glass-react
npm install -D @types/three
```

- [ ] **Étape 2 : écrire le hook**

```ts
"use client";

import { useEffect, useState } from "react";

export type EffectsTier = "full" | "lite" | "off";

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Décide du niveau d'effets : full (ordinateur), lite (mobile), off (accessibilité). */
export function useEffectsTier(): EffectsTier {
  const [tier, setTier] = useState<EffectsTier>("off");

  useEffect(() => {
    const compute = (): EffectsTier => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
      if (!hasWebGL()) return "off";
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const wide = window.innerWidth >= 1024;
      return finePointer && wide ? "full" : "lite";
    };

    setTier(compute());
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setTier(compute()), 200);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return tier;
}
```

- [ ] **Étape 3 : vérifier le typage et le build**

```bash
npx tsc --noEmit && rm -rf .next && npm run build 2>&1 | grep -E "Compiled|error"
```
Attendu : `✓ Compiled successfully`, aucune erreur.

- [ ] **Étape 4 : commit**

```bash
git add package.json package-lock.json src/hooks/useEffectsTier.ts
git commit -m "feat(effets): dépendances WebGL et détection du niveau d'effets"
```

---

### Tâche 2 : Fond dégradé animé du hero

**Fichiers :**
- Créer : `src/components/effects/HeroGradient.tsx`
- Modifier : `src/components/sections/Hero.tsx`

**Interfaces consommées :** `useEffectsTier`
**Interfaces produites :** `<HeroGradient />` (aucune prop)

- [ ] **Étape 1 : écrire le composant**

```tsx
"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useEffectsTier } from "@/hooks/useEffectsTier";

// Dégradé vivant derrière le hero (tier full uniquement). Le décor CSS
// existant reste visible en dessous : si ce canvas ne monte pas, rien ne manque.
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

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
      }}
    >
      <ShaderGradientCanvas style={{ width: "100%", height: "100%" }} pointerEvents="none">
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
```

- [ ] **Étape 2 : monter dans le hero (import dynamique)**

Dans `src/components/sections/Hero.tsx`, ajouter en tête :

```tsx
import dynamic from "next/dynamic";

const HeroGradient = dynamic(
  () => import("@/components/effects/HeroGradient").then((m) => m.HeroGradient),
  { ssr: false },
);
```

puis, comme premier enfant du `<section id="top">` :

```tsx
      <HeroGradient />
```

- [ ] **Étape 3 : vérifier**

```bash
npx tsc --noEmit && rm -rf .next && npm run build 2>&1 | grep -E "Compiled|error"
```
Puis servir et contrôler que le hero reste intact sans JS :
```bash
(node node_modules/next/dist/bin/next start --port 3210 &) ; sleep 6
curl -s http://localhost:3210/ | grep -c "Meddy Gironcelle"   # attendu : ≥ 1 (le h1 est dans le HTML)
pkill -f "next start"
```

- [ ] **Étape 4 : commit**

```bash
git add src/components/effects/HeroGradient.tsx src/components/sections/Hero.tsx
git commit -m "feat(effets): fond dégradé animé derrière le hero"
```

---

### Tâche 3 : Nom en métal liquide

**Fichiers :**
- Créer : `src/components/effects/LiquidName.tsx`
- Modifier : `src/components/sections/Hero.tsx`

**Interfaces consommées :** `useEffectsTier`
**Interfaces produites :** `<LiquidName text={string} />`

**Principe :** le `<h1>` reste dans le DOM (référencement, lecteurs d'écran, affichage immédiat). Le composant dessine le même texte sur un canvas hors-DOM, l'exporte en PNG transparent, le passe à `LiquidMetal` comme masque, et n'estompe le texte d'origine qu'une fois le canvas prêt.

- [ ] **Étape 1 : écrire le composant**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";
import { useEffectsTier } from "@/hooks/useEffectsTier";

// Rend `text` en PNG transparent (police Kanit 900), pour servir de masque au shader.
function renderTextMask(text: string, width: number): { url: string; height: number } | null {
  const height = Math.round(width * 0.22);
  const canvas = document.createElement("canvas");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  // Taille de police ajustée pour que le texte occupe ~96 % de la largeur.
  let size = height;
  ctx.font = `900 ${size}px Kanit, sans-serif`;
  const target = width * 0.96;
  const measured = ctx.measureText(text).width;
  size = Math.max(8, (size * target) / measured);
  ctx.font = `900 ${size}px Kanit, sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  return { url: canvas.toDataURL("image/png"), height };
}

export function LiquidName({ text }: { text: string }) {
  const tier = useEffectsTier();
  const hostRef = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<{ url: string; height: number } | null>(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (tier === "off") return;
    let cancelled = false;

    const build = async () => {
      try {
        await document.fonts.load('900 100px "Kanit"');
        await document.fonts.ready;
      } catch {
        /* police indisponible : on dessine quand même */
      }
      const w = hostRef.current?.offsetWidth ?? window.innerWidth;
      const m = renderTextMask(text, w);
      if (!cancelled && m) setMask(m);
    };

    build();
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(build, 250);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [text, tier]);

  if (tier === "off" || !mask) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <LiquidMetal
        image={mask.url}
        width="100%"
        height={mask.height}
        colorBack="#00000000"
        colorTint={dark ? "#d7e2ea" : "#15171b"}
        repetition={3}
        distortion={0.06}
        contour={0.35}
        softness={0.12}
        shiftRed={0.2}
        shiftBlue={0.2}
        speed={0.6}
        angle={45}
        fit="contain"
      />
    </div>
  );
}
```

- [ ] **Étape 2 : brancher dans le hero**

Dans `src/components/sections/Hero.tsx` : importer dynamiquement, envelopper le bloc du `<h1>` dans un conteneur `relative`, y placer `<LiquidName text="Meddy Gironcelle" />`, et masquer le texte d'origine quand l'effet est actif via un état local du hero (classe `opacity-0` appliquée seulement si le canvas est monté). Le `SpotlightName` reste pour les tiers `lite`/`off`.

```tsx
const LiquidName = dynamic(
  () => import("@/components/effects/LiquidName").then((m) => m.LiquidName),
  { ssr: false },
);
```

- [ ] **Étape 3 : vérifier**

```bash
npx tsc --noEmit && rm -rf .next && npm run build 2>&1 | grep -E "Compiled|error"
(node node_modules/next/dist/bin/next start --port 3210 &) ; sleep 6
curl -s http://localhost:3210/ | grep -o "<h1[^>]*>" | head -1     # le h1 doit exister
curl -s http://localhost:3210/ | grep -c "MEDDY\|Meddy Gironcelle" # texte présent dans le HTML
pkill -f "next start"
```

- [ ] **Étape 4 : commit**

```bash
git add src/components/effects/LiquidName.tsx src/components/sections/Hero.tsx
git commit -m "feat(effets): nom du hero en métal liquide"
```

---

### Tâche 4 : Verre liquide

**Fichiers :**
- Créer : `src/components/effects/Glass.tsx`
- Modifier : `src/components/layout/SiteHeader.tsx`, `src/components/sections/TrustBar.tsx`

**Interfaces produites :** `<Glass radius={number} className={string}>{children}</Glass>`

- [ ] **Étape 1 : écrire l'enveloppe**

```tsx
"use client";

import type { ReactNode } from "react";
import LiquidGlass from "liquid-glass-react";
import { useEffectsTier } from "@/hooks/useEffectsTier";

/**
 * Verre réfractant façon Apple. Conserve TOUJOURS la classe `.glass` du site :
 * sur les navigateurs qui ne savent pas déformer l'arrière-plan (Safari,
 * Firefox) et au tier `off`, l'apparence actuelle est préservée.
 */
export function Glass({
  children,
  radius = 999,
  className = "",
}: {
  children: ReactNode;
  radius?: number;
  className?: string;
}) {
  const tier = useEffectsTier();

  if (tier === "off") return <div className={`glass ${className}`}>{children}</div>;

  return (
    <LiquidGlass
      cornerRadius={radius}
      displacementScale={48}
      blurAmount={0.08}
      saturation={130}
      aberrationIntensity={1.5}
      elasticity={0.12}
      mode="standard"
      padding="0"
      className={className}
    >
      {children}
    </LiquidGlass>
  );
}
```

- [ ] **Étape 2 : appliquer aux surfaces**

- `SiteHeader` : envelopper la pilule de navigation (`Glass radius={999}`).
- `TrustBar` : envelopper chaque tuile logo (`Glass radius={12}`), en conservant le fond clair existant à l'intérieur.

- [ ] **Étape 3 : vérifier**

```bash
npx tsc --noEmit && rm -rf .next && npm run build 2>&1 | grep -E "Compiled|error"
(node node_modules/next/dist/bin/next start --port 3210 &) ; sleep 6
for u in / /photographie /mentions-legales ; do printf "%s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3210$u)"; done
curl -s http://localhost:3210/ | grep -c "Travaux"   # la nav doit rester dans le HTML
pkill -f "next start"
```

- [ ] **Étape 4 : commit**

```bash
git add src/components/effects/Glass.tsx src/components/layout/SiteHeader.tsx src/components/sections/TrustBar.tsx
git commit -m "feat(effets): verre liquide sur la navigation et les tuiles logos"
```

---

### Tâche 5 : Galerie photo 3D flottante

**Fichiers :**
- Créer : `src/components/effects/FloatingGallery.tsx`
- Modifier : `src/components/sections/IslandShowcase.tsx`

**Interfaces consommées :** `useEffectsTier`, `photos` de `@/lib/photos`
**Interfaces produites :** `<FloatingGallery />`

- [ ] **Étape 1 : écrire le composant**

```tsx
"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, Float } from "@react-three/drei";
import type { Group } from "three";
import { photos } from "@/lib/photos";
import { useEffectsTier } from "@/hooks/useEffectsTier";

// Indices choisis pour ne redoubler ni le hero ni « À la une » ni le diaporama.
const PICKS = [12, 19, 25, 31, 40, 47, 55, 63, 70];

function optimized(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=640&q=60`;
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
        return {
          url: optimized(p.src),
          position: [Math.cos(a) * 3.2, Math.sin(a) * 1.6, Math.sin(a * 2) * 1.2] as [number, number, number],
          scale: [ratio > 1 ? 1.1 : 0.8, ratio > 1 ? 0.8 : 1.1, 1] as [number, number, number],
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.02;
    // Parallaxe douce suivant le curseur.
    const tx = state.pointer.y * 0.18;
    const ty = state.pointer.x * 0.25;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
    group.current.position.x += (ty - group.current.position.x) * 0.04;
  });

  const spread = Math.max(1, viewport.width / 8);

  return (
    <group ref={group} scale={spread}>
      {items.map((it, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.15} floatIntensity={0.4}>
          <DreiImage url={it.url} position={it.position} scale={it.scale} transparent opacity={0.85} />
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
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={0.8} color="#ef5a17" />
        <Orbit />
      </Canvas>
    </div>
  );
}
```

- [ ] **Étape 2 : monter dans la section île**

Dans `src/components/sections/IslandShowcase.tsx`, importer dynamiquement et placer `<FloatingGallery />` **après** le conteneur du relief et **avant** le voile radial, de sorte que les photos flottent derrière le cadre-île sans le masquer.

```tsx
const FloatingGallery = dynamic(
  () => import("@/components/effects/FloatingGallery").then((m) => m.FloatingGallery),
  { ssr: false },
);
```

- [ ] **Étape 3 : vérifier**

```bash
npx tsc --noEmit && rm -rf .next && npm run build 2>&1 | grep -E "Compiled|error"
(node node_modules/next/dist/bin/next start --port 3210 &) ; sleep 6
curl -s http://localhost:3210/ | grep -c "Mon île, mon regard"      # section intacte
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3210/_next/image?url=%2Fphotos%2Fphoto-13.jpg&w=640&q=60"
pkill -f "next start"
```
Attendu : section présente, image optimisée servie en 200.

- [ ] **Étape 4 : commit**

```bash
git add src/components/effects/FloatingGallery.tsx src/components/sections/IslandShowcase.tsx
git commit -m "feat(effets): galerie photo 3D flottante autour de l'île"
```

---

### Tâche 6 : Crédits légaux et vérification d'ensemble

**Fichiers :**
- Modifier : `src/app/mentions-legales/page.tsx`

- [ ] **Étape 1 : compléter les crédits (section 4)**

Ajouter à la liste des crédits :

```tsx
        <li>
          Effets visuels : Paper Shaders (licence Apache 2.0), ShaderGradient,
          three.js et React Three Fiber (licence MIT).
        </li>
```

- [ ] **Étape 2 : vérification d'ensemble**

```bash
npx tsc --noEmit && rm -rf .next && npm run build 2>&1 | grep -E "Compiled|Generating|error"
(node node_modules/next/dist/bin/next start --port 3210 &) ; sleep 6
for u in / /photographie /realisations/carrousel-ia /mentions-legales /confidentialite ; do
  printf "%-28s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3210$u)"
done
curl -s http://localhost:3210/mentions-legales | grep -c "Paper Shaders"
pkill -f "next start"
```
Attendu : toutes les pages en 200, crédits présents.

- [ ] **Étape 3 : commit**

```bash
git add src/app/mentions-legales/page.tsx
git commit -m "legal: crédits des bibliothèques d'effets visuels"
```

---

## Points de vigilance

1. `@shadergradient/react` et `@react-three/fiber` partagent `three` : vérifier qu'une seule version est installée (`npm ls three`). En cas de doublon, ajouter un `overrides` dans `package.json`.
2. `@react-three/fiber` 9.x exige React `>=19 <19.3` : le projet est en 19.2.4, compatible. Si React est mis à jour au-delà, cette contrainte saute en premier.
3. `liquid-glass-react` s'appuie sur des filtres SVG de déplacement : sans effet sur Safari/Firefox, d'où la conservation systématique de `.glass`.
4. Si le masque de texte du métal liquide sort flou, augmenter le `dpr` plafonné à 2 dans `renderTextMask`.
5. Le rendu animé n'est pas observable depuis l'aperçu local : la validation visuelle finale revient à Meddy, dans Chrome puis Safari.
