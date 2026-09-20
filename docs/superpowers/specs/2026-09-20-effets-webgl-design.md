# Effets WebGL — métal liquide, fond vivant, verre liquide, galerie 3D

Date : 2026-09-20 · Statut : validé par Meddy (« OK ») · Approche retenue : **A** (effets indépendants, chargés à la demande, allégés sur mobile).

## 1. Objectif

Élever la direction artistique du portfolio avec quatre effets temps réel, **sans dégrader** la vitesse d'arrivée, la lisibilité, l'accessibilité ni la conformité acquises. Chaque effet est un plus visuel posé **par-dessus** un contenu déjà complet : si l'effet ne charge pas (WebGL absent, réseau lent, préférence « réduire les animations »), la page reste exactement celle d'aujourd'hui.

## 2. Bibliothèques et licences

| Effet | Paquet | Version | Licence | Note |
|---|---|---|---|---|
| Métal liquide | `@paper-design/shaders-react` | ^0.0.81 | Apache-2.0 | Moteur officiel de « Liquid Logo ». L'application liquid-logo elle-même (PolyForm Shield) n'est **pas** utilisée. |
| Fond dégradé animé | `@shadergradient/react` | ^2.4.20 | MIT | Dépend de three + @react-three/fiber. |
| Galerie 3D | `@react-three/fiber` + `@react-three/drei` + `three` | fiber ^9.7 | MIT | Une seule instance de three partagée. |
| Verre liquide | `liquid-glass-react` | ^1.1.1 | MIT | Filtre SVG de déplacement ; dégradation propre hors Chromium. |

Crédits à ajouter dans `/mentions-legales` (section 4).

## 3. Principes transverses (non négociables)

1. **Anti-page-blanche** : le contenu DOM (h1, nav, tuiles, diaporama) reste rendu et visible ; les canvas se superposent avec `aria-hidden` et `pointer-events: none` sauf besoin d'interaction explicite.
2. **Chargement différé** : chaque effet est un composant `"use client"` importé via `next/dynamic({ ssr: false })` et monté uniquement quand sa section est à ≤ 300 px de l'écran (IntersectionObserver, même patron que `IslandShowcase`).
3. **Mobile allégé** : un hook `useEffectsTier()` renvoie `"full"` (pointer fin ET largeur ≥ 1024 px ET pas de reduced-motion), `"lite"` (mobile/tablette) ou `"off"` (reduced-motion ou WebGL indisponible). Fond animé et galerie 3D : `full` seulement. Métal liquide et verre : `full` et `lite`.
4. **Thème** : chaque effet lit `document.documentElement.classList.contains("dark")` au montage et observe les changements (MutationObserver sur `class`) pour changer de palette sans rechargement.
5. **Budget** : three.js n'est téléchargé que si un effet `full` est monté. Aucun effet ne tourne hors écran (pause via l'IntersectionObserver : démontage quand la section sort de l'écran depuis > 600 px).
6. **Pas de rAF dans l'aperçu local** : les animations ne sont vérifiables que dans un vrai navigateur ; les tests locaux portent sur le montage, les replis, l'absence d'erreurs console et le build.

## 4. Composants

### 4.1 `useEffectsTier` — `src/hooks/useEffectsTier.ts`
Retourne `"full" | "lite" | "off"` ; calcule une fois au montage, réagit au `resize` (debounce 200 ms). Détection WebGL : création d'un contexte `webgl2`/`webgl` sur un canvas hors-DOM, en try/catch.

### 4.2 `HeroGradient` — `src/components/effects/HeroGradient.tsx`
- ShaderGradient plein cadre derrière le hero (`absolute inset-0 -z-10`), **tier full uniquement**.
- Palette sombre : `#0c0c0c` / `#3a1a0e` (braise profonde) / `#0f1f4a` (cobalt nuit). Palette claire : `#f5f4ef` / `#ffd7c2` / `#dbe4ff`. Type `waterPlane`, vitesse lente (`uSpeed ≈ 0.15`), `uStrength ≈ 1.2`, grain léger.
- Fondu vers le fond de page : masque CSS `mask-image: linear-gradient(to bottom, #000 55%, transparent 100%)`.
- Repli (`lite`/`off`) : rien — le décor actuel (`BackgroundDecor`) reste.

### 4.3 `LiquidName` — `src/components/effects/LiquidName.tsx`
- Remplace visuellement le `<span class="hero-grad">` du hero, **sans le retirer du DOM** (il passe en `opacity: 0` uniquement quand le canvas a rendu sa première frame, via l'événement/propriété de prêt du composant ou un délai de 400 ms après montage).
- Masque : le texte « MEDDY GIRONCELLE » est dessiné à l'exécution sur un canvas hors-DOM avec la police Kanit 900 déjà chargée par `next/font` (`document.fonts.ready`), fond transparent, exporté en `HTMLImageElement` et passé à `LiquidMetal` (`image`). Re-rendu sur `resize` (debounce) pour conserver la taille fluide `clamp(2.4rem, 9vw, 10.5rem)`.
- Réglages : `colorBack` transparent, `colorTint` = `--ink` du thème, `repetition 3`, `distortion 0.06`, `contour 0.35`, `speed 0.6` ; réaction au curseur : `angle` interpolé selon la position X de la souris (0 → 180), transition 0.4 s.
- Tiers `full` et `lite`. `off` : texte actuel.

### 4.4 `Glass` — `src/components/effects/Glass.tsx`
- Enveloppe `liquid-glass-react` avec les réglages maison : `displacementScale 48`, `blurAmount 0.08`, `saturation 130`, `aberrationIntensity 1.5`, `elasticity 0.12`, `cornerRadius` selon l'usage, `mode "standard"`.
- Applique la classe `.glass` existante **en plus** (repli visuel identique à aujourd'hui sur Safari/Firefox, où le déplacement du fond n'est pas supporté).
- Surfaces : pilule du `SiteHeader`, boutons ronds (ThemeToggle, menu mobile, son/thème/reset du jeu, retour des pages secondaires), tuiles logos de `TrustBar`.
- Tiers `full` et `lite` ; `off` : `.glass` seule.

### 4.5 `FloatingGallery` — `src/components/effects/FloatingGallery.tsx`
- Canvas R3F plein cadre dans `IslandShowcase`, **entre** le relief MapLibre et l'île-cadre (z-index intermédiaire), `pointer-events: none`, **tier full uniquement**.
- 9 photos (indices fixes, distincts de celles utilisées par le hero/À la une : ex. 12, 19, 25, 31, 40, 47, 55, 63, 70) en `drei/Image` sur des plans au ratio natif, disposés sur une orbite elliptique autour du centre (rayon x 3.2, y 1.6, z ±1.2), jamais dans le disque central (l'île reste dégagée).
- Mouvement : `drei/Float` (amplitude faible), rotation lente de l'orbite (0.02 rad/s) ; parallaxe caméra selon la souris (±0.25 rad, lissée). Éclairage : ambiant + une lumière braise directionnelle.
- Textures : chargement des `/photos/photo-NN.jpg` en 512 px via `next/image` loader URL (`/_next/image?url=…&w=640&q=60`).
- Démontage quand la section sort de l'écran ; `lite`/`off` : rien.

## 5. Intégration (fichiers touchés)

- `src/components/sections/Hero.tsx` : monte `HeroGradient` (dynamic) et `LiquidName` (dynamic) ; conserve `SpotlightName` en `lite`/`off`.
- `src/components/layout/SiteHeader.tsx`, `src/components/ui/ThemeToggle.tsx`, `src/components/game/PacCV.tsx` (boutons HUD), `src/components/layout/LegalPage.tsx`, `src/app/photographie/page.tsx`, `src/app/realisations/[slug]/page.tsx` : enveloppent leurs surfaces avec `Glass`.
- `src/components/sections/TrustBar.tsx` : tuiles logos en `Glass`.
- `src/components/sections/IslandShowcase.tsx` : monte `FloatingGallery` (dynamic) au même seuil que MapLibre.
- `src/app/mentions-legales/page.tsx` : crédits.
- `package.json` : 5 dépendances.

## 6. Accessibilité et conformité

- Tous les canvas `aria-hidden="true"` ; aucun texte porté uniquement par un effet.
- `prefers-reduced-motion: reduce` → tier `off` (aucune animation WebGL).
- Contraste : le métal liquide hérite de `--ink` ; vérifier ≥ 4,5:1 des zones claires du métal sur `--paper` en clair (ajuster `colorTint` sinon).
- Aucune donnée personnelle, aucun appel réseau tiers : tout est servi depuis le site (pas de CDN de shaders).

## 7. Vérification

1. `tsc --noEmit` et `next build` sans erreur ; taille du First Load JS de `/` inchangée à ±5 Ko (tout est dynamique).
2. Build de production : les pages `/`, `/photographie`, une réalisation, `/mentions-legales` renvoient 200 ; le h1 et la nav restent dans le HTML.
3. Simulation `off` (`prefers-reduced-motion`) : aucun `<canvas>` monté, rendu identique à aujourd'hui.
4. Simulation `lite` (largeur 375) : pas de canvas ShaderGradient ni R3F ; verre et métal présents.
5. Zéro erreur console sur chaque page.
6. Rendu visuel : dans un vrai navigateur, par Meddy (Chrome, puis Safari pour le repli du verre).

## 8. Hors périmètre

Pas de refonte des sections existantes, pas de son, pas de curseur personnalisé, pas de galerie 3D sur la page `/photographie` (v2 possible).
