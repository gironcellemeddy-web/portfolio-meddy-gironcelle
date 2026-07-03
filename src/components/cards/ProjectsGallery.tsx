import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Layers, ArrowUpRight } from "lucide-react";
import { projects, projectCover, projectTitle } from "@/lib/projects";

// Galerie d'accueil : chaque réalisation est un LIEN vers sa page dédiée
// (/realisations/<slug>). Mise en page masonry (colonnes) : chaque garde garde
// son format natif, aucune image n'est rognée. Navigation réelle, robuste sans JS.
export function ProjectsGallery() {
  const locale = useLocale();

  return (
    <div className="columns-2 gap-3 md:columns-3 [&>a]:mb-3">
      {projects.map((p) => {
        const cover = projectCover(p);
        return (
          <Link
            key={p.slug}
            href={`/realisations/${p.slug}`}
            className="group/tile relative block break-inside-avoid overflow-hidden rounded-[var(--radius-bento)] border-[1.5px] border-card-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={cover.src}
              alt={projectTitle(p, locale)}
              width={cover.width}
              height={cover.height}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-500 group-hover/tile:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity group-hover/tile:opacity-100" />

            {p.images.length > 1 && (
              <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <Layers className="h-3 w-3" />
                {p.images.length}
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
                  {p.type}
                </p>
                <p className="truncate text-sm font-semibold text-white">
                  {projectTitle(p, locale)}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white opacity-0 transition-opacity group-hover/tile:opacity-100" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
