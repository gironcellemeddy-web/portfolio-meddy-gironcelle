import { useTranslations } from "next-intl";
import {
  BarChart3,
  PenTool,
  Share2,
  Video,
  FileSpreadsheet,
} from "lucide-react";
import type { ComponentType } from "react";
import { BentoCard } from "@/components/bento/BentoCard";

type SkillGroup = {
  Icon: ComponentType<{ className?: string }>;
  tools: string[];
};

// Compétences déduites des réalisations de stage — à ajuster librement.
const groups: SkillGroup[] = [
  { Icon: PenTool, tools: ["Canva", "Photoshop", "Illustrator"] },
  { Icon: Share2, tools: ["Instagram", "Meta Business", "TikTok"] },
  { Icon: Video, tools: ["Premiere Pro", "CapCut"] },
  { Icon: BarChart3, tools: ["Google Ads", "Analytics", "Trends"] },
  { Icon: FileSpreadsheet, tools: ["Excel", "Notion"] },
];

export function StackCard({ index }: { index?: number }) {
  const t = useTranslations("stack");

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        {t("title")}
      </h2>
      <p className="mb-4 mt-1 text-xs text-muted">{t("subtitle")}</p>
      <div className="flex flex-col gap-3">
        {groups.map((g, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <g.Icon className="h-4 w-4" />
            </span>
            <div className="flex flex-wrap gap-1.5">
              {g.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg bg-background px-2 py-1 text-xs font-medium text-foreground ring-1 ring-card-border transition-colors hover:ring-accent hover:text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
