import { useTranslations } from "next-intl";
import { Download, MapPin } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { Magnetic } from "@/components/interactive/Magnetic";

// Carte profil (hero) : nom en grotesk, statut, bio, CV magnétique.
export function ProfileCard({ index }: { index?: number }) {
  const t = useTranslations("profile");

  return (
    <BentoCard index={index} className="md:col-span-2 md:row-span-2 flex flex-col">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
          {t("statusAvailable")}
        </span>
      </div>

      <h1 className="font-display mt-4 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
        {t("firstName")}
        <br />
        <span className="text-accent">{t("lastName")}</span>
        <span className="text-accent-2">.</span>
      </h1>

      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em]">
        {t("role")}
      </p>

      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        {t("bio")}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
        <Magnetic strength={0.45}>
          <a
            href="/cv-meddy-gironcelle.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent-2 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(242,101,34,0.7)] transition-colors hover:bg-[#e05716]"
          >
            {t("cv")}
            <Download className="h-4 w-4" />
          </a>
        </Magnetic>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-card-border px-3 py-1.5 text-xs font-medium text-muted">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          La Réunion (974)
        </span>
      </div>
    </BentoCard>
  );
}
