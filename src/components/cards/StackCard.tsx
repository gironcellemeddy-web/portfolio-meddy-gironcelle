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
  { Icon: PenTool, tools: ["Canva", "Illustrator"] },
  { Icon: Share2, tools: ["Instagram", "Meta Business", "TikTok"] },
  { Icon: Video, tools: ["CapCut"] },
  { Icon: BarChart3, tools: ["Google Ads", "Analytics", "Trends"] },
  { Icon: FileSpreadsheet, tools: ["Excel", "Notion"] },
];

export function StackCard({ index }: { index?: number }) {
  const t = useTranslations("stack");

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {t("title")}
      </h2>
      <p className="mb-4 mt-1 text-xs text-muted">{t("subtitle")}</p>
      <div className="flex flex-col gap-3">
        {groups.map((g, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-card-border">
              <g.Icon className="h-4 w-4" />
            </span>
            <div className="flex flex-wrap gap-1.5">
              {g.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border-[1.5px] border-card-border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-foreground hover:text-background"
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
