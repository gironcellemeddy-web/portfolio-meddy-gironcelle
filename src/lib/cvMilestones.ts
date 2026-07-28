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
    title: "RTL Réunion",
    years: "Déc. 2024 – Jan. 2025 · Rédaction",
    detail: "Reportages terrain et interviews, montage audio (Audacity), rédaction de brèves et interventions en direct à l'antenne.",
    place: "Saint-Denis · 6 semaines",
  },
  {
    title: "Chambre de Métiers et de l'Artisanat",
    years: "Avr. – Mai 2026 · Communication",
    detail: "Stratégie éditoriale présentée devant la Commission Communication, carrousels et affiches (Canva), liste d'influenceurs et calendrier de tournage.",
    place: "Saint-Denis · 6 semaines",
  },
  {
    title: "EDF Réunion",
    years: "Mai – Juin 2026 · Communication",
    detail: "Audit du réseau d'écrans d'affichage dynamique, pilotage du projet stèle de Takamaka, plan de communication mobilité électrique.",
    place: "Saint-Denis · 6 semaines",
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
    detail: "Mention Bien",
    place: "Université de La Réunion — Saint-Denis",
  },
  {
    id: "master",
    years: "2025 — 2026",
    title: "Master 2 Sciences de l'Information et de la Communication",
    detail: "Parcours Communication, Culture & Médias · Mention Bien",
    place: "Université de La Réunion — Saint-Denis",
  },
];
