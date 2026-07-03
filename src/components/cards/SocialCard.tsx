import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { BentoCard } from "@/components/bento/BentoCard";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

type Contact = {
  key: string;
  label: string;
  handle: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

// Vrais comptes de Meddy.
const contacts: Contact[] = [
  { key: "instagram", label: "Instagram", handle: "@meddy.gir_974", href: "https://www.instagram.com/meddy.gir_974/", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", handle: "Meddy Gironcelle", href: "https://www.linkedin.com/in/meddy-gironcelle-5337a02a4", Icon: LinkedinIcon },
  { key: "email", label: "Email", handle: "gironcellemeddy@gmail.com", href: "mailto:gironcellemeddy@gmail.com", Icon: Mail },
];

export function SocialCard({ index }: { index?: number }) {
  const t = useTranslations("social");

  return (
    <BentoCard index={index} className="md:col-span-2 flex flex-col">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {t("title")}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {contacts.map((c) => (
          <li key={c.key}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group/soc flex items-center gap-3 border-b-[1.5px] border-card-border/40 pb-2.5 transition-colors hover:border-card-border"
            >
              <c.Icon className="h-5 w-5 shrink-0" />
              <span className="flex min-w-0 flex-1 items-baseline gap-2">
                <span className="text-base font-semibold">{c.label}</span>
                <span className="truncate text-xs text-muted">{c.handle}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/soc:translate-x-0 group-hover/soc:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
