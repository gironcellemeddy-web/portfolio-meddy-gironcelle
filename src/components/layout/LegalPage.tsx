import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SiteFooter } from "@/components/layout/SiteFooter";

// Gabarit des pages légales : en-tête de retour, titre, date de mise à jour,
// contenu en prose lisible (largeur limitée, interlignage confortable).
export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-5 pb-16 pt-8 sm:pt-10">
        <header className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Retour au portfolio
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="font-display text-base font-bold tracking-tight">
              Meddy<span className="text-ember-text">.</span>
            </span>
          </div>
        </header>

        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1
          className="font-display font-black leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
        >
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">Dernière mise à jour : {updated}</p>

        <article className="legal-prose mt-10">{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}
