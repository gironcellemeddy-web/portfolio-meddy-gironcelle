# Portfolio — Meddy Gironcelle

Portfolio professionnel de **Meddy Gironcelle** — Communication & Marketing digital
(La Réunion). Direction éditoriale premium, décor « île de La Réunion » en
parallaxe, objet 3D signature, études de projet dédiées.

**Stack :** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion ·
Lucide · next-intl.

## Démarrage local

> Node.js ≥ 20.9 requis. Node est géré par **nvm** (version dans `.nvmrc`) :

```bash
nvm use            # active la bonne version de Node
npm install        # installe les dépendances
npm run dev        # dev  -> http://localhost:3000
npm run build      # build de production
npm run start      # sert le build de production
```

## Structure

```
src/
  app/
    layout.tsx            layout racine (fonts, décor, métadonnées)
    page.tsx              page d'accueil (Header + Hero + About + Work + Contact)
    realisations/[slug]/  page d'étude par réalisation (13 slugs)
  components/
    sections/   Hero (+ sphère 3D), About, Work, Contact
    layout/     SiteHeader (nav verre sticky)
    cards/      ProjectsGallery (grille éditoriale)
    projects/   ProjectDetailGallery (lightbox d'une étude)
    decor/      BackgroundDecor (motifs La Réunion + parallaxe)
    ui/         Reveal (apparition au scroll)
    interactive/ Magnetic (boutons magnétiques)
    icons/      icônes de marque (SVG)
  lib/          projects.ts (manifeste des réalisations + dimensions)
  messages/     fr.json, en.json (i18n, défaut FR)
public/
  projets/<slug>/N.png   toutes les images des réalisations
  cv-meddy-gironcelle.pdf CV téléchargeable
```

## Déploiement — GitHub + Vercel (gratuit, recommandé)

Ce choix garde le site **en ligne 24/7**, **sauvegarde le code** sur GitHub et
**redéploie automatiquement** à chaque modification. Aucune variable
d'environnement n'est nécessaire.

### 1. Publier le code sur GitHub
Option simple (sans terminal) — **GitHub Desktop** :
1. Installer *GitHub Desktop* et se connecter (compte GitHub gratuit).
2. *File › Add Local Repository* → choisir ce dossier `portfolio-meddy`.
3. *Publish repository* (décocher « Keep this code private » si tu veux un dépôt public).

Option terminal :
```bash
git remote add origin https://github.com/<ton-user>/portfolio-meddy.git
git push -u origin main
```

### 2. Déployer sur Vercel
1. Aller sur **vercel.com** → se connecter avec **GitHub** (gratuit).
2. *Add New… › Project* → importer le dépôt `portfolio-meddy`.
3. Vercel détecte **Next.js** automatiquement → cliquer **Deploy**.
4. Après ~1 min : URL publique `https://portfolio-meddy-xxxx.vercel.app`.

À chaque `git push` sur `main`, Vercel redéploie tout seul.

### Alternative rapide — Vercel CLI (sans GitHub)
```bash
npx vercel          # 1re fois : connexion (email/GitHub)
npx vercel --prod   # publie l'URL de production
```

### (Optionnel) Nom de domaine
Pour une adresse permanente et pro (ex. `meddygironcelle.com`) : l'ajouter dans
Vercel → *Settings › Domains*. On garde alors la même URL même en changeant
d'hébergeur.

## Notes techniques
- Rendu **SSR** (Server Components + i18n par cookie) → hébergeur Node requis ;
  Vercel le gère nativement.
- Accessibilité : contenus **visibles sans JavaScript**, `prefers-reduced-motion`
  respecté, focus visibles.
- Responsive mobile-first (testé 375 px / 768 px / desktop).
