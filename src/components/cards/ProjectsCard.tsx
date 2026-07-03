import { useTranslations } from "next-intl";
import { FolderGit2 } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { ProjectsGallery } from "./ProjectsGallery";

export function ProjectsCard({ index }: { index?: number }) {
  const t = useTranslations("projects");

  return (
    <BentoCard index={index} className="md:col-span-4">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <FolderGit2 className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-tight">{t("title")}</h2>
          <p className="text-xs text-muted">{t("subtitle")}</p>
        </div>
      </div>

      <ProjectsGallery />
    </BentoCard>
  );
}
