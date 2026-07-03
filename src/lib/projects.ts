// Manifeste des réalisations — partagé entre la galerie d'accueil et les pages
// de détail /realisations/[slug]. Chaque réalisation regroupe toutes ses images
// (ex: les 6 slides d'un carrousel), avec leurs dimensions réelles pour que le
// cadre épouse le format de chaque image (aucun rognage).

export type ProjectImage = { src: string; width: number; height: number };

export type Project = {
  slug: string;
  type: string;
  fr: string;
  en: string;
  images: ProjectImage[];
};

// Fabrique les entrées d'images d'une réalisation à partir d'une liste de
// dimensions [largeur, hauteur] (fichiers 1.png … N.png).
function imgs(slug: string, dims: [number, number][]): ProjectImage[] {
  return dims.map(([width, height], i) => ({
    src: `/projets/${slug}/${i + 1}.png`,
    width,
    height,
  }));
}

const SQUARE_6: [number, number][] = Array.from({ length: 6 }, () => [1080, 1080]);

export const projects: Project[] = [
  { slug: "carrousel-ia", type: "Carrousel Instagram", fr: "L'IA ne te remplacera pas", en: "AI won't replace you", images: imgs("carrousel-ia", SQUARE_6) },
  { slug: "carrousel-boulangerie", type: "Carrousel Instagram", fr: "Boulangerie", en: "Bakery", images: imgs("carrousel-boulangerie", SQUARE_6) },
  { slug: "carrousel-maconnerie", type: "Carrousel Instagram", fr: "Maçonnerie", en: "Masonry", images: imgs("carrousel-maconnerie", SQUARE_6) },
  { slug: "carrousel-carrosserie", type: "Carrousel Instagram", fr: "Carrosserie", en: "Bodywork", images: imgs("carrousel-carrosserie", SQUARE_6) },
  { slug: "carrousel-coiffure", type: "Carrousel Instagram", fr: "Coiffure", en: "Hairdressing", images: imgs("carrousel-coiffure", SQUARE_6) },
  { slug: "carrousel-ambulancier", type: "Carrousel Instagram", fr: "Ambulancier", en: "Ambulance driver", images: imgs("carrousel-ambulancier", SQUARE_6) },
  { slug: "carrousel-fleuriste", type: "Carrousel Instagram", fr: "Fleuriste", en: "Florist", images: imgs("carrousel-fleuriste", SQUARE_6) },
  { slug: "carrousel-poissonnerie", type: "Carrousel Instagram", fr: "Poissonnerie", en: "Fishmonger", images: imgs("carrousel-poissonnerie", SQUARE_6) },
  { slug: "fete-du-pain", type: "Affiche", fr: "Fête du Pain 2026", en: "Bread Festival 2026", images: imgs("fete-du-pain", [[1414, 2000]]) },
  { slug: "metisse", type: "Magazine Métisse", fr: "Pages magazine", en: "Magazine pages", images: imgs("metisse", [[1414, 2000], [1414, 2000]]) },
  { slug: "bras-panon", type: "Foire de Bras-Panon", fr: "Foire agricole", en: "Agricultural fair", images: imgs("bras-panon", [[1080, 1080], [1080, 1920]]) },
  { slug: "couverture-facebook", type: "Facebook CMAR", fr: "Couverture 2026", en: "2026 cover", images: imgs("couverture-facebook", [[851, 315]]) },
  { slug: "publications-facebook", type: "Facebook CMAR", fr: "Publications", en: "Posts", images: imgs("publications-facebook", [[1080, 1350], [1080, 1080]]) },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Image de garde (première image).
export function projectCover(p: Project): ProjectImage {
  return p.images[0];
}

export function projectTitle(p: Project, locale: string): string {
  return locale === "en" ? p.en : p.fr;
}
