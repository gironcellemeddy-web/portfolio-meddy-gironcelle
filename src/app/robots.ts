import type { MetadataRoute } from "next";

// Indexation ouverte à tous, robots des moteurs IA compris (choix de Meddy :
// être lisible et cité par les assistants). Rien de sensible à exclure : le
// site n'a ni espace privé ni données utilisateur.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: "https://portfolio-meddy-gironcelle.vercel.app/sitemap.xml",
  };
}
