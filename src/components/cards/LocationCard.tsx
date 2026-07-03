import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";

// Remplacer par ton adresse exacte quand tu me la donnes.
const MAP_QUERY = "La Réunion";

export function LocationCard({ index }: { index?: number }) {
  const t = useTranslations("location");

  return (
    <BentoCard index={index} className="md:col-span-2 md:row-span-2 flex flex-col p-0">
      <div className="relative flex-1 min-h-[16rem]">
        <iframe
          title={t("title")}
          src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=9&output=embed`}
          className="absolute inset-0 h-full w-full grayscale-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-card/90 px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur ring-1 ring-card-border">
          <MapPin className="h-4 w-4 text-accent" />
          {t("region")}
        </div>
      </div>
      <p className="px-5 py-3 text-xs text-muted">{t("placeholder")}</p>
    </BentoCard>
  );
}
