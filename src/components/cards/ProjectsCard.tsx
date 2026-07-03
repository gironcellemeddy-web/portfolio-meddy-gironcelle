import { useTranslations } from "next-intl";
import { BentoCard } from "@/components/bento/BentoCard";
import { ProjectsGallery } from "./ProjectsGallery";

export function ProjectsCard({ index }: { index?: number }) {
  const t = useTranslations("projects");

  return (
    <BentoCard index={index} tilt={false} className="md:col-span-4">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
            {t("subtitle")}
          </p>
        </div>
        <span className="hidden shrink-0 text-sm font-medium text-muted sm:block">
          {t("count")}
        </span>
      </div>

      <ProjectsGallery />
    </BentoCard>
  );
}
