# Portfolio — Meddy Gironcelle

Portfolio personnel au style **Bento** (grille de cartes modulaires), orienté
**Communication & Marketing digital**.

**Stack :** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion ·
Lucide · next-intl (FR/EN).

## Démarrage

> Node.js ≥ 20.9 requis. Sur cette machine, Node est géré par **nvm** :
> ```bash
> nvm use            # lit la version dans .nvmrc (24)
> ```

```bash
npm install       # installer les dépendances
npm run dev       # serveur de dev -> http://localhost:3000
npm run build     # build de production
npm run start     # servir le build de production
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner les valeurs.
`.env.local` n'est **jamais** commité (voir `.gitignore`).

| Variable | Rôle | Requis |
|---|---|---|
| `YOUTUBE_API_KEY` | Clé YouTube Data API v3 | Compteur YouTube en direct |
| `YOUTUBE_CHANNEL_ID` | ID de la chaîne YouTube | Compteur YouTube en direct |
| `GITHUB_USERNAME` | Pseudo GitHub (API publique) | Compteur GitHub en direct |
| `SOCIAL_*_FOLLOWERS` | Replis manuels (Instagram, TikTok, LinkedIn…) | Facultatif |

Sans clé, l'app fonctionne : les compteurs indisponibles affichent le pseudo
au lieu du nombre d'abonnés (dégradation propre).

## Structure

```
src/
  app/            layout, page, api/social (route de stats réseaux)
  components/
    bento/        grille + carte de base animée
    cards/        Profil, Réseaux, Stack, Localisation, Projets, Liens
    theme/        provider + bouton clair/sombre
    icons/        icônes de marque (SVG)
  i18n/           config, cookie de langue, request next-intl
  messages/       fr.json, en.json
  lib/            socialStats (récupération des abonnés)
public/projets/   visuels des réalisations
```

## Déploiement (Hostinger via GitHub)

1. Pousser le dépôt sur GitHub (branche `main`).
2. Connecter le dépôt à Hostinger et activer le déploiement automatique à
   chaque push.
3. **Node.js SSR requis** : ce projet utilise des Server Components, une API
   route et des cookies (i18n) — il ne peut pas être exporté en statique.
   Choisir une offre Hostinger supportant une app **Node.js** (build
   `npm run build`, démarrage `npm run start`), version Node **≥ 20.9**.
4. Renseigner les variables d'environnement (tableau ci-dessus) côté hébergeur
   avant le premier build.
