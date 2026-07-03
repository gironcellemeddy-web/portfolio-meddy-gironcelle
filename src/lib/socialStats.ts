// Récupération des nombres d'abonnés par réseau.
// Instagram / LinkedIn / Facebook n'ont pas d'API publique simple : on lit une
// valeur de repli manuelle depuis l'environnement (jamais en dur dans le code),
// sinon null. Les clés vivent dans .env.local (jamais commitées).

export type SocialKey = "instagram" | "linkedin" | "facebook";

export type SocialStats = Record<SocialKey, number | null>;

// Lit une valeur de repli manuelle depuis l'environnement (ex: "1200").
function manualFallback(key: SocialKey): number | null {
  const raw = process.env[`SOCIAL_${key.toUpperCase()}_FOLLOWERS`];
  if (!raw) return null;
  const n = Number(raw.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function getSocialStats(): Promise<SocialStats> {
  return {
    instagram: manualFallback("instagram"),
    linkedin: manualFallback("linkedin"),
    facebook: manualFallback("facebook"),
  };
}

// Formatage compact : 1200 -> "1,2 k", 1500000 -> "1,5 M".
export function formatCount(n: number | null, locale: string): string | null {
  if (n === null) return null;
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}
