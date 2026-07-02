import { useTranslations } from "next-intl";
import { BentoCard } from "@/components/bento/BentoCard";

// Carte profil : photo ronde, nom, badge de statut, courte bio.
// La photo est un placeholder (initiales) tant qu'aucun fichier n'est fourni.
export function ProfileCard({ index }: { index?: number }) {
  const t = useTranslations("profile");

  return (
    <BentoCard index={index} className="md:col-span-2 md:row-span-2 flex flex-col">
      <div className="flex items-start gap-4">
        {/* Placeholder photo — remplacer par une vraie image dans /public */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-accent text-2xl font-semibold text-accent-foreground ring-2 ring-card-border">
          MG
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-2 py-0.5 text-[9px] font-medium text-muted ring-1 ring-card-border">
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
          <h1 className="text-2xl font-bold tracking-tight">{t("name")}</h1>
          <p className="text-sm font-medium text-accent">{t("role")}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">{t("bio")}</p>
    </BentoCard>
  );
}
