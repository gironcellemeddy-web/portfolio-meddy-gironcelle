import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Camera, Download } from "lucide-react";
import { Magnetic } from "@/components/interactive/Magnetic";
import { heroPhoto } from "@/lib/photos";

// Délai d'entrée (animation CSS). Le contenu est rendu côté serveur et VISIBLE
// par défaut : aucune dépendance au JS pour l'affichage.
const delay = (ms: number): CSSProperties => ({ "--enter-delay": `${ms}ms` } as CSSProperties);

export function Hero() {
  return (
    <section id="top" className="anchor relative mx-auto w-full max-w-6xl px-5 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Colonne texte */}
        <div>
          <p className="eyebrow animate-fade-up mb-6" style={delay(80)}>
            Communication &amp; marketing digital — La Réunion
          </p>

          <h1 className="font-display text-[15vw] font-bold leading-[0.86] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="line-mask">
              <span className="line-inner" style={{ "--line-delay": "120ms" } as CSSProperties}>
                Meddy
              </span>
            </span>
            <span className="line-mask">
              <span
                className="line-inner text-gradient"
                style={{ "--line-delay": "220ms" } as CSSProperties}
              >
                Gironcelle
              </span>
            </span>
          </h1>

          <p className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(360)}>
            J&apos;imagine des <span className="font-medium text-ink">contenus</span> et des{" "}
            <span className="font-medium text-ink">stratégies de marque</span>{" "}
            qui captent l&apos;attention et installent la confiance.
          </p>

          <p className="animate-fade-up mt-3 text-sm text-muted-2" style={delay(440)}>
            Master 2 Information–Communication · Expériences CMA Réunion &amp; EDF.
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3" style={delay(540)}>
            <Magnetic strength={0.4}>
              <a
                href="#travaux"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(239,90,23,0.75)] transition-colors hover:bg-ink"
              >
                Voir mes travaux
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="/cv-meddy-gironcelle.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Télécharger le CV
                <Download className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Photo signature (une de mes photographies) */}
        <div className="animate-fade-up relative hidden justify-center lg:flex" style={delay(300)}>
          <HeroPhoto />
        </div>
      </div>

      <a
        href="#travaux"
        className="animate-fade-up mt-20 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-2 transition-colors hover:text-ink"
        style={delay(700)}
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        Défiler
      </a>
    </section>
  );
}

// Photographie mise en avant, encadrée avec profondeur, + accès à la galerie.
function HeroPhoto() {
  return (
    <Link
      href="/photographie"
      className="group relative block w-full max-w-md overflow-hidden rounded-[var(--radius-xl2)] border border-line shadow-lift"
      aria-label="Voir mes photographies"
    >
      <Image
        src={heroPhoto.src}
        alt="Photographie de paysage — Meddy Gironcelle"
        width={heroPhoto.width}
        height={heroPhoto.height}
        priority
        sizes="(max-width: 1024px) 0px, 40vw"
        className="h-auto w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-semibold">
        <Camera className="h-3.5 w-3.5 text-ember" />
        Ma photographie
      </span>

      <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
        <span className="text-sm font-semibold">Photographie de paysage</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Voir la galerie <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}
