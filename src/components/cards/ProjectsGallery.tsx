import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowUpRight, Layers } from "lucide-react";
import { projects, projectCover, projectTitle } from "@/lib/projects";
import { Reveal } from "@/components/ui/Reveal";

// Grille éditoriale premium : chaque réalisation est un LIEN vers son étude
// dédiée (/realisations/<slug>). Masonry (formats natifs), survol immersif.
export function ProjectsGallery() {
  const locale = useLocale();

  return (
    <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-5">
      {projects.map((p, i) => {
        const cover = projectCover(p);
        return (
          <Reveal key={p.slug} delay={(i % 2) * 90} className="break-inside-avoid">
            <Link
              href={`/realisations/${p.slug}`}
              className="group/card relative block overflow-hidden rounded-[var(--radius-xl2)] border border-line bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={cover.src}
                  alt={projectTitle(p, locale)}
                  width={cover.width}
                  height={cover.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.05]"
                />
                {/* Voile qui apparaît au survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
                {p.images.length > 1 && (
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[11px] font-semibold">
                    <Layers className="h-3 w-3" />
                    {p.images.length}
                  </span>
                )}
                {/* Appel à l'action révélé */}
                <span className="absolute bottom-3 left-3 flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                  Voir l&apos;étude
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="eyebrow">{p.type}</p>
                  <p className="mt-1 truncate font-display text-lg font-semibold tracking-tight">
                    {projectTitle(p, locale)}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover/card:border-ember group-hover/card:bg-ember group-hover/card:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
