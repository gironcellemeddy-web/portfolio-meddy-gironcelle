import { getTranslations, getLocale } from "next-intl/server";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/icons/BrandIcons";
import { getSocialStats, formatCount, type SocialKey } from "@/lib/socialStats";

type Network = {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  tile: string;
};

// Réseaux à afficher — hrefs/handles à compléter avec tes vrais comptes.
const networks: Network[] = [
  { key: "instagram", label: "Instagram", handle: "@à-compléter", href: "#", Icon: InstagramIcon, tile: "bg-gradient-to-br from-fuchsia-500 to-amber-500" },
  { key: "youtube", label: "YouTube", handle: "@à-compléter", href: "#", Icon: YoutubeIcon, tile: "bg-red-500" },
  { key: "tiktok", label: "TikTok", handle: "@à-compléter", href: "#", Icon: TiktokIcon, tile: "bg-zinc-900 dark:bg-zinc-700" },
  { key: "linkedin", label: "LinkedIn", handle: "à-compléter", href: "#", Icon: LinkedinIcon, tile: "bg-blue-600" },
  { key: "github", label: "GitHub", handle: "à-compléter", href: "#", Icon: GithubIcon, tile: "bg-zinc-800 dark:bg-zinc-600" },
];

export async function SocialCard({ index }: { index?: number }) {
  const t = await getTranslations("social");
  const locale = await getLocale();
  const stats = await getSocialStats();

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
        {t("title")}
      </h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {networks.map((n) => {
          const count = formatCount(stats[n.key], locale);
          return (
            <li key={n.key}>
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/soc flex items-center gap-3 rounded-2xl border border-card-border bg-background px-3 py-2.5 transition-colors hover:border-accent"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${n.tile}`}>
                  <n.Icon className="h-4.5 w-4.5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate text-sm font-semibold">{n.label}</span>
                  <span className="truncate text-xs text-muted">
                    {count ? `${count} ${t("followersLabel")}` : n.handle}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover/soc:opacity-100" />
              </a>
            </li>
          );
        })}
      </ul>
    </BentoCard>
  );
}
