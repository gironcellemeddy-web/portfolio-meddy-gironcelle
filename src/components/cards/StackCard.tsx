import { useTranslations } from "next-intl";
import { BentoCard } from "@/components/bento/BentoCard";

// Compétences réelles issues du CV de Meddy.
const skills: { name: string; level: "Avancé" | "Intermédiaire" }[] = [
  { name: "Canva", level: "Avancé" },
  { name: "Réseaux sociaux", level: "Avancé" },
  { name: "Rédaction", level: "Avancé" },
  { name: "Suite Office", level: "Avancé" },
  { name: "Google Ads & Trends", level: "Intermédiaire" },
  { name: "Montage vidéo", level: "Intermédiaire" },
];

const languages = ["Français", "Créole réunionnais", "Anglais (B1)"];

export function StackCard({ index }: { index?: number }) {
  const t = useTranslations("stack");

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {t("title")}
      </h2>
      <p className="mb-4 mt-1 text-xs text-muted">{t("subtitle")}</p>

      <ul className="flex flex-col">
        {skills.map((s) => (
          <li
            key={s.name}
            className="flex items-center justify-between border-b border-card-border py-2"
          >
            <span className="text-sm font-semibold">{s.name}</span>
            <span
              className={`text-[11px] font-semibold uppercase tracking-wide ${
                s.level === "Avancé" ? "text-accent-2" : "text-accent"
              }`}
            >
              {s.level}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          {t("languages")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {languages.map((l) => (
            <span
              key={l}
              className="rounded-full border border-card-border px-2.5 py-1 text-xs font-medium transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
