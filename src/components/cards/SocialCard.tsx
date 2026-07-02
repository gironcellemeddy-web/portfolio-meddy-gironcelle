import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { BentoCard } from "@/components/bento/BentoCard";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/icons/BrandIcons";

type Network = {
  key: string;
  label: string;
  handle: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  color: string;
};

// Réseaux à afficher — hrefs/handles à compléter avec tes vrais comptes.
const networks: Network[] = [
  { key: "instagram", label: "Instagram", handle: "@à-compléter", href: "#", Icon: InstagramIcon, color: "hover:text-pink-500" },
  { key: "youtube", label: "YouTube", handle: "@à-compléter", href: "#", Icon: YoutubeIcon, color: "hover:text-red-500" },
  { key: "tiktok", label: "TikTok", handle: "@à-compléter", href: "#", Icon: TiktokIcon, color: "hover:text-foreground" },
  { key: "linkedin", label: "LinkedIn", handle: "à-compléter", href: "#", Icon: LinkedinIcon, color: "hover:text-blue-500" },
  { key: "github", label: "GitHub", handle: "à-compléter", href: "#", Icon: GithubIcon, color: "hover:text-foreground" },
];

export function SocialCard({ index }: { index?: number }) {
  const t = useTranslations("social");

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
        {t("title")}
      </h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {networks.map((n) => (
          <li key={n.key}>
            <a
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 rounded-2xl border border-card-border bg-background px-3 py-2.5 text-foreground transition-colors ${n.color}`}
            >
              <n.Icon className="h-5 w-5 shrink-0" />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{n.label}</span>
                <span className="text-xs text-muted">{n.handle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
