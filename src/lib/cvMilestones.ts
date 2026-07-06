// Étapes du parcours (issues du CV de Meddy) — collectées dans le jeu Pac-CV.
// L'ordre suit la progression : Bac → Licence → Master 2.

export type Milestone = {
  id: string;
  years: string;
  title: string;
  detail: string;
  place: string;
};

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
