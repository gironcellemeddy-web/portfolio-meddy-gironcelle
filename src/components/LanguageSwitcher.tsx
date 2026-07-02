"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { setUserLocale } from "@/i18n/locale";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("controls");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next: Locale = locale === "fr" ? "en" : "fr";

  const switchTo = () => {
    startTransition(async () => {
      await setUserLocale(next);
      router.refresh();
    });
  };

  return (
    <button
      onClick={switchTo}
      disabled={isPending}
      aria-label={t("toggleLanguage")}
      title={t("toggleLanguage")}
      className="flex h-10 items-center gap-2 rounded-full border border-card-border bg-card px-3 text-sm font-medium text-foreground hover:text-accent disabled:opacity-50"
    >
      <Languages className="h-4 w-4" />
      <span className="uppercase">{next}</span>
    </button>
  );
}
