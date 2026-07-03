// Manifeste des réalisations — partagé entre la galerie d'accueil et les pages
// de détail /realisations/[slug]. Chaque réalisation regroupe toutes ses images
// (ex: les 6 slides d'un carrousel), issues du dossier Annexes (public/projets).

export type Project = {
  slug: string;
  type: string;
  fr: string;
  en: string;
  /** Nombre d'images (fichiers 1.png … N.png dans /public/projets/<slug>/). */
  count: number;
};

export const projects: Project[] = [
  { slug: "carrousel-ia", type: "Carrousel Instagram", fr: "L'IA ne te remplacera pas", en: "AI won't replace you", count: 6 },
  { slug: "carrousel-boulangerie", type: "Carrousel Instagram", fr: "Boulangerie", en: "Bakery", count: 6 },
  { slug: "carrousel-maconnerie", type: "Carrousel Instagram", fr: "Maçonnerie", en: "Masonry", count: 6 },
  { slug: "carrousel-carrosserie", type: "Carrousel Instagram", fr: "Carrosserie", en: "Bodywork", count: 6 },
  { slug: "carrousel-coiffure", type: "Carrousel Instagram", fr: "Coiffure", en: "Hairdressing", count: 6 },
  { slug: "carrousel-ambulancier", type: "Carrousel Instagram", fr: "Ambulancier", en: "Ambulance driver", count: 6 },
  { slug: "carrousel-fleuriste", type: "Carrousel Instagram", fr: "Fleuriste", en: "Florist", count: 6 },
  { slug: "carrousel-poissonnerie", type: "Carrousel Instagram", fr: "Poissonnerie", en: "Fishmonger", count: 6 },
  { slug: "fete-du-pain", type: "Affiche", fr: "Fête du Pain 2026", en: "Bread Festival 2026", count: 1 },
  { slug: "metisse", type: "Magazine Métisse", fr: "Pages magazine", en: "Magazine pages", count: 2 },
  { slug: "bras-panon", type: "Foire de Bras-Panon", fr: "Foire agricole", en: "Agricultural fair", count: 2 },
  { slug: "couverture-facebook", type: "Facebook CMAR", fr: "Couverture 2026", en: "2026 cover", count: 1 },
  { slug: "publications-facebook", type: "Facebook CMAR", fr: "Publications", en: "Posts", count: 2 },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Chemins des images d'une réalisation : /projets/<slug>/1.png … N.png
export function projectImages(p: Project): string[] {
  return Array.from({ length: p.count }, (_, i) => `/projets/${p.slug}/${i + 1}.png`);
}

// Image de garde (première image).
export function projectCover(p: Project): string {
  return `/projets/${p.slug}/1.png`;
}

export function projectTitle(p: Project, locale: string): string {
  return locale === "en" ? p.en : p.fr;
}
