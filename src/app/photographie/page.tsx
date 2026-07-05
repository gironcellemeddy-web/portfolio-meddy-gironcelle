import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { photos } from "@/lib/photos";
import { PhotoGallery } from "@/components/photography/PhotoGallery";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Photographie — Meddy Gironcelle",
  description:
    "Photographie de paysage par Meddy Gironcelle : une passion et un terrain d'expérimentation, au Samsung Galaxy S22 Ultra et retouché sous Lightroom.",
};

export default function PhotographiePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 sm:py-10">
      <header className="mb-12 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Retour au portfolio
        </Link>
        <Link href="/" className="font-display text-base font-bold tracking-tight">
          Meddy<span className="text-ember">.</span>
        </Link>
      </header>

      {/* Intro */}
      <div className="mb-14 max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-4">Hors des sentiers du marketing</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            Photo<span className="text-ember">graphie</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Amateur et passionné de <span className="font-medium text-ink">photographie de
            paysage</span>. J&apos;en fais un véritable terrain d&apos;expérimentation :
            cadrage, lumière, matière et retouche.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
              📷 Samsung Galaxy S22 Ultra
            </span>
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
              🎛️ Adobe Lightroom
            </span>
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
              {photos.length} clichés
            </span>
          </div>
        </Reveal>
      </div>

      <PhotoGallery photos={photos} />

      <footer className="mt-16 flex flex-col items-center gap-1 text-center text-xs text-muted-2">
        <p>© {new Date().getFullYear()} Meddy Gironcelle — toutes les photos sont les miennes.</p>
      </footer>
    </main>
  );
}
