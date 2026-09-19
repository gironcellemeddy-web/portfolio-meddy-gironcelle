import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLeft, Images, SlidersHorizontal, Smartphone } from "lucide-react";
import { photos } from "@/lib/photos";
import { PhotoGallery } from "@/components/photography/PhotoGallery";
import { Reveal } from "@/components/ui/Reveal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata: Metadata = {
  title: "Photographie — Meddy Gironcelle",
  description:
    "Photographie de paysage par Meddy Gironcelle : 78 clichés pris à l'iPhone 17 Pro et au Galaxy S22 Ultra, retouchés sous Lightroom.",
  alternates: { canonical: "/photographie" },
  openGraph: {
    title: "Photographie — Meddy Gironcelle",
    description: "78 photographies de paysage, iPhone 17 Pro & Galaxy S22 Ultra, retouche Lightroom.",
    url: "/photographie",
    type: "website",
    images: [{ url: "/photos/photo-01.jpg", width: 2000, height: 1500, alt: "Photographie de paysage — Meddy Gironcelle" }],
  },
};

export default function PhotographiePage() {
  return (
    <>
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 sm:py-10">
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
          <Link href="/" className="font-display text-base font-bold tracking-tight">
            Meddy<span className="text-ember">.</span>
          </Link>
        </div>
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
            cadrage, lumière, matière et retouche. Mes clichés les plus récents sont
            réalisés à l&apos;<span className="font-medium text-ink">iPhone 17 Pro</span>,
            les précédents au Galaxy S22 Ultra — tous retouchés sous Lightroom.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember-soft px-3.5 py-1.5 text-xs font-medium text-ember">
              <Smartphone className="h-3.5 w-3.5" /> iPhone 17 Pro
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
              <Smartphone className="h-3.5 w-3.5" /> Galaxy S22 Ultra
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
              <SlidersHorizontal className="h-3.5 w-3.5 text-ember" /> Adobe Lightroom
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
              <Images className="h-3.5 w-3.5 text-ember" /> {photos.length} clichés
            </span>
          </div>
        </Reveal>
      </div>

      <PhotoGallery photos={photos} />

    </main>
      <SiteFooter />
    </>
  );
}
