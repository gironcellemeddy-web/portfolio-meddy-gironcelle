import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";

// Réalisations de stage — visuels issus du dossier Annexes (copiés dans /public/projets).
const projects = [
  { key: "carrousels", img: "/projets/carrousel-ia.png" },
  { key: "pain", img: "/projets/fete-du-pain.png" },
  { key: "metisse", img: "/projets/metisse.png" },
  { key: "brasPanon", img: "/projets/bras-panon.png" },
  { key: "mode", img: "/projets/projet-mode.png" },
  { key: "ligne", img: "/projets/couverture-facebook.png" },
] as const;

export function ProjectsCard({ index }: { index?: number }) {
  const t = useTranslations("projects");

  return (
    <BentoCard index={index} className="md:col-span-4">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">{t("title")}</h2>
          <p className="text-xs text-muted">{t("subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {projects.map((p) => (
          <figure
            key={p.key}
            className="group/tile relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-card-border"
          >
            <Image
              src={p.img}
              alt={t(`${p.key}.title`)}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover/tile:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 text-white/0 transition-colors group-hover/tile:text-white" />
            <figcaption className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-sm font-semibold text-white">{t(`${p.key}.title`)}</p>
              <p className="mt-0.5 text-xs leading-snug text-white/80">
                {t(`${p.key}.description`)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </BentoCard>
  );
}
