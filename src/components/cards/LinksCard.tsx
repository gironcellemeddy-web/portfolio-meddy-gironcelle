import { useTranslations } from "next-intl";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";

type UsefulLink = {
  key: "cma" | "edf" | "resume";
  href: string;
  download?: boolean;
};

// Liens externes pertinents (SEO). Le CV est un placeholder à déposer dans /public.
const links: UsefulLink[] = [
  { key: "cma", href: "https://www.artisanat974.re" },
  { key: "edf", href: "https://reunion.edf.fr" },
  { key: "resume", href: "#", download: true },
];

export function LinksCard({ index }: { index?: number }) {
  const t = useTranslations("links");

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
        {t("title")}
      </h2>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.key}>
            <a
              href={l.href}
              target={l.download ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group/link flex items-center justify-between rounded-2xl border border-card-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {l.download ? (
                    <Download className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                </span>
                {t(l.key)}
              </span>
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
