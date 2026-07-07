import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE = "https://portfolio-meddy-gironcelle.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/photographie`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${BASE}/realisations/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
