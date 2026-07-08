// Manifeste des photographies (paysages de Meddy Gironcelle, Galaxy S22 Ultra +
// Lightroom). Images optimisées dans public/photos/photo-NN.jpg avec leurs
// dimensions réelles → cadres au format natif (masonry sans rognage).

export type Photo = { src: string; width: number; height: number };

// [largeur, hauteur] de chaque photo, dans l'ordre photo-01 … photo-36.
const DIMS: [number, number][] = [
  [2000, 1500], [2000, 1500], [2000, 1500], [2000, 1250], [1500, 2000],
  [1500, 2000], [1250, 2000], [1500, 2000], [2000, 1500], [2000, 1250],
  [2000, 1250], [1500, 2000], [1499, 2000], [2000, 1250], [1499, 2000],
  [1500, 2000], [2000, 1500], [2000, 1500], [1500, 2000], [1500, 2000],
  [2000, 1125], [1388, 2000], [1500, 2000], [1500, 2000], [1500, 2000],
  [1500, 2000], [1500, 2000], [1250, 2000], [1504, 2000], [1249, 2000],
  [1498, 2000], [1500, 2000], [1500, 2000], [1599, 2000], [1599, 2000],
  [2000, 1249],
  // Série « Photos Part 2 » (37 → 71)
  [2000, 1500], [2000, 1500], [2000, 1500], [2000, 1502], [2000, 1500],
  [1600, 2000], [1600, 2000], [1600, 2000], [1600, 2000], [2000, 1500],
  [1600, 2000], [1600, 2000], [1600, 2000], [1600, 2000], [2000, 1500],
  [1600, 2000], [1600, 2000], [1600, 2000], [1600, 2000], [1600, 2000],
  [1600, 2000], [1600, 2000], [2000, 1125], [2000, 1500], [2000, 1500],
  [2000, 2000], [2000, 2000], [2000, 1552], [2000, 1552], [2000, 1552],
  [2000, 1554], [2000, 1500], [2000, 1500], [2000, 1500], [2000, 1500],
];

export const photos: Photo[] = DIMS.map(([width, height], i) => ({
  src: `/photos/photo-${String(i + 1).padStart(2, "0")}.jpg`,
  width,
  height,
}));

// Photo mise en avant dans le hero (paysage de montagne au coucher de soleil).
export const heroPhoto: Photo = photos[0];
