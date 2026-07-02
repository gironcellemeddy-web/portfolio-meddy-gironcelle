export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

// Nom du cookie utilisé pour mémoriser la langue choisie par le visiteur.
export const LOCALE_COOKIE = "NEXT_LOCALE";
