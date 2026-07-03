import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Layers, ArrowUpRight } from "lucide-react";
import { projects, projectCover, projectTitle } from "@/lib/projects";

// Galerie d'accueil : chaque réalisation est un LIEN vers sa page dédiée
// (/realisations/<slug>), qui montre toutes ses images. Navigation réelle,
// robuste même sans JS.
export function ProjectsGallery() {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <div className="grid grid-cols-2 gap-3 md:auto-rows-[8.5rem] md:grid-cols-3">
      {projects.map((p, i) => (
        <Link
          key={p.slug}
          href={`/realisations/${p.slug}`}
          className={`group/tile relative block overflow-hidden rounded-[var(--radius-bento)] border-[1.5px] border-card-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square md:aspect-auto"
          }`}
        >
          <Image
            src={projectCover(p)}
            alt={projectTitle(p, locale)}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/tile:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity group-hover/tile:opacity-100" />

          {/* Badge nombre d'images (si plusieurs) */}
          {p.count > 1 && (
            <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <Layers className="h-3 w-3" />
              {p.count}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
                {p.type}
              </p>
              <p className={`truncate font-semibold text-white ${i === 0 ? "text-base" : "text-xs"}`}>
                {projectTitle(p, locale)}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white opacity-0 transition-opacity group-hover/tile:opacity-100" />
          </div>
        </Link>
      ))}
    </div>
  );
}
