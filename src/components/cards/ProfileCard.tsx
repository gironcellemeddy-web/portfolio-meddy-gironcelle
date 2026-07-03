import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";

// Carte profil (hero) : photo ronde, nom, badge de statut, courte bio.
// La photo est un placeholder (initiales) tant qu'aucun fichier n'est fourni.
export function ProfileCard({ index }: { index?: number }) {
  const t = useTranslations("profile");

  return (
    <BentoCard index={index} className="md:col-span-2 md:row-span-2 flex flex-col">
      <div className="flex items-center gap-5">
        {/* Placeholder photo — remplacer par une vraie image dans /public */}
        <div className="relative shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent-soft text-3xl font-bold text-accent ring-1 ring-card-border">
            MG
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-card px-2 py-0.5 text-[9px] font-medium text-muted ring-1 ring-card-border">
            {t("photoPlaceholder")}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("statusAvailable")}
          </span>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-[2.75rem]">
            {t("name")}
          </h1>
          <p className="text-sm font-medium text-accent">{t("role")}</p>
        </div>
      </div>

      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
        {t("bio")}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-background px-3 py-1.5 text-xs font-medium text-muted">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          La Réunion (974)
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-background px-3 py-1.5 text-xs font-medium text-muted">
          FR · EN
        </span>
      </div>
    </BentoCard>
  );
}
