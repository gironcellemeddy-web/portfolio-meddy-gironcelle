import { useTranslations } from "next-intl";
import { Download, MapPin } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";

// Carte profil (hero éditorial) : nom en serif géant, statut, bio, CV.
export function ProfileCard({ index }: { index?: number }) {
  const t = useTranslations("profile");

  return (
    <BentoCard index={index} className="md:col-span-2 md:row-span-2 flex flex-col">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
          {t("statusAvailable")}
        </span>
      </div>

      <h1 className="font-display mt-4 text-[15vw] font-black leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
        {t("firstName")}
        <br />
        {t("lastName")}
      </h1>

      <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-accent">
        {t("role")}
      </p>

      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        {t("bio")}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <a
          href="/cv-meddy-gironcelle.pdf"
          download
          className="group/cv inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          {t("cv")}
          <Download className="h-4 w-4" />
        </a>
        <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-card-border px-3 py-1.5 text-xs font-medium text-muted">
          <MapPin className="h-3.5 w-3.5" />
          La Réunion (974)
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-card-border px-3 py-1.5 text-xs font-medium text-muted">
          FR · EN
        </span>
      </div>
    </BentoCard>
  );
}
