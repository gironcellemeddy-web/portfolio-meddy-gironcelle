import { getTranslations, getLocale } from "next-intl/server";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/BrandIcons";
import { getSocialStats, formatCount, type SocialKey } from "@/lib/socialStats";

type Network = {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

// Réseaux à afficher — hrefs/handles à compléter avec tes vrais comptes.
const networks: Network[] = [
  { key: "instagram", label: "Instagram", handle: "@à-compléter", href: "#", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", handle: "à-compléter", href: "#", Icon: LinkedinIcon },
  { key: "facebook", label: "Facebook", handle: "à-compléter", href: "#", Icon: FacebookIcon },
];

export async function SocialCard({ index }: { index?: number }) {
  const t = await getTranslations("social");
  const locale = await getLocale();
  const stats = await getSocialStats();

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {t("title")}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {networks.map((n) => {
          const count = formatCount(stats[n.key], locale);
          return (
            <li key={n.key}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/soc flex items-center gap-3 border-b-[1.5px] border-card-border/40 pb-2.5 transition-colors hover:border-card-border"
              >
                <n.Icon className="h-5 w-5 shrink-0" />
                <span className="flex min-w-0 flex-1 items-baseline gap-2">
                  <span className="text-base font-semibold">{n.label}</span>
                  <span className="truncate text-xs text-muted">
                    {count ? `${count} ${t("followersLabel")}` : n.handle}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/soc:translate-x-0 group-hover/soc:opacity-100" />
              </a>
            </li>
          );
        })}
      </ul>
    </BentoCard>
  );
}
