// Récupération des nombres d'abonnés par réseau.
// Stratégie : API officielle si les clés/identifiants sont présents dans
// l'environnement, sinon valeur de repli manuelle (variable d'env), sinon null.
// Toutes les clés vivent dans .env.local (jamais en dur, jamais commitées).

export type SocialKey =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "linkedin"
  | "github";

export type SocialStats = Record<SocialKey, number | null>;

// Cache serveur : on ne rappelle pas les APIs à chaque requête (1 h).
const REVALIDATE_SECONDS = 3600;

// Lit une valeur de repli manuelle depuis l'environnement (ex: "1200").
function manualFallback(key: SocialKey): number | null {
  const raw = process.env[`SOCIAL_${key.toUpperCase()}_FOLLOWERS`];
  if (!raw) return null;
  const n = Number(raw.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

// YouTube Data API v3 — nécessite YOUTUBE_API_KEY + YOUTUBE_CHANNEL_ID.
async function getYoutube(): Promise<number | null> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!key || !channelId) return manualFallback("youtube");

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${key}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return manualFallback("youtube");
    const data = await res.json();
    const count = data?.items?.[0]?.statistics?.subscriberCount;
    return count ? Number(count) : manualFallback("youtube");
  } catch {
    return manualFallback("youtube");
  }
}

// GitHub — API publique (pas de clé requise), nécessite GITHUB_USERNAME.
async function getGithub(): Promise<number | null> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return manualFallback("github");

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { "User-Agent": "portfolio-meddy" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return manualFallback("github");
    const data = await res.json();
    return typeof data?.followers === "number"
      ? data.followers
      : manualFallback("github");
  } catch {
    return manualFallback("github");
  }
}

// Instagram / TikTok / LinkedIn : pas d'API publique simple et fiable.
// Repli sur une valeur manuelle (variable d'env), à mettre à jour à la main
// ou via un service tiers (RapidAPI) plus tard.
export async function getSocialStats(): Promise<SocialStats> {
  const [youtube, github] = await Promise.all([getYoutube(), getGithub()]);

  return {
    youtube,
    github,
    instagram: manualFallback("instagram"),
    tiktok: manualFallback("tiktok"),
    linkedin: manualFallback("linkedin"),
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
