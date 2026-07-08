// Étapes du parcours (issues du CV de Meddy) — collectées dans le jeu Pac-CV.
// L'ordre suit la progression : Bac → Licence → Master 2.

export type Milestone = {
  id: string;
  years: string;
  title: string;
  detail: string;
  place: string;
};

// Qualités (collectibles JAUNES du jeu) — issues du CV.
export type Quality = { title: string; detail: string };
export const qualities: Quality[] = [
  {
    title: "Curieux",
    detail: "Toujours en veille : nouveaux formats, nouveaux outils, nouvelles idées.",
  },
  {
    title: "Ponctuel",
    detail: "Des délais tenus et des rendez-vous honorés — la base de la confiance.",
  },
  {
    title: "Rigoureux",
    detail: "Un travail soigné, relu et cohérent, du brief à la livraison.",
  },
];

// Expériences professionnelles (collectibles ROUGES du jeu) — issues du CV.
export type Experience = { title: string; years: string; detail: string; place: string };
export const experiences: Experience[] = [
  {
    title: "Antenne Réunion / RTL Réunion",
    years: "Stages · Rédaction",
    detail: "Reportages terrain, interviews, montage audio, brèves et interventions à l'antenne.",
    place: "Saint-Denis",
  },
  {
    title: "CMA Réunion (CMAR)",
    years: "Stage · Service communication",
    detail: "Stratégie éditoriale réseaux sociaux, carrousels, affiches événementielles et publications.",
    place: "Saint-Denis",
  },
  {
    title: "EDF Réunion",
    years: "Stage · Équipe communication",
    detail: "Audit du réseau d'écrans dynamiques, projet Takamaka, plan de com mobilité électrique.",
    place: "Saint-Denis",
  },
];

export const milestones: Milestone[] = [
  {
    id: "bac",
    years: "2021",
    title: "Baccalauréat Général",
    detail: "Spécialités Sciences économiques & sociales · Géopolitique",
    place: "Lycée Jean Joly — La Rivière Saint-Louis",
  },
  {
    id: "licence",
    years: "2021 — 2024",
    title: "Licence Information-Communication",
    detail: "Diplômé en décembre 2024 · Mention Bien",
    place: "Université de La Réunion — Saint-Denis",
  },
  {
    id: "master",
    years: "2024 — 2026",
    title: "Master 2 Sciences de l'Information et de la Communication",
    detail: "Parcours Communication, Culture & Médias · Mention Bien",
    place: "Université de La Réunion — Saint-Denis",
  },
];
