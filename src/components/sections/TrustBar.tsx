import Image from "next/image";
import { projects } from "@/lib/projects";
import { photos } from "@/lib/photos";
import { Reveal } from "@/components/ui/Reveal";
import { Glass } from "@/components/effects/Glass";

// Bandeau de confiance sous le hero : les organisations qui m'ont formé ou
// accueilli en stage (seul contenu qui n'existe nulle part ailleurs sur la
// page) + quelques chiffres tirés des données réelles du portfolio.
const LOGOS = [
  { src: "/logos/universite-reunion.png", alt: "Université de La Réunion" },
  { src: "/logos/edf.png", alt: "EDF" },
  { src: "/logos/cma-reunion.png", alt: "Chambre de Métiers et de l'Artisanat de La Réunion" },
  { src: "/logos/antenne-reunion.png", alt: "Antenne Réunion" },
  { src: "/logos/rtl-reunion.png", alt: "RTL Réunion" },
];

export function TrustBar() {
  const STATS = [
    { value: `${projects.length}`, label: "Réalisations" },
    { value: `${photos.length}`, label: "Photographies" },
    { value: "3", label: "Stages en communication" },
    { value: "Bac +5", label: "Master 2 Info-Com" },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-4 pt-10 sm:px-8 md:px-10">
      <Reveal>
        <p className="eyebrow mb-6 text-center">Ils m&apos;ont formé et fait confiance</p>
      </Reveal>

      {/* Logos : niveaux de gris au repos, couleur au survol */}
      <Reveal delay={80}>
        {/* Tuiles claires : les logos gardent leurs couleurs officielles
            (aucune inversion, conforme aux chartes) et restent lisibles sur
            fond sombre comme sur fond clair. */}
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {LOGOS.map((l) => (
            <li key={l.src} className="transition-transform duration-500 hover:-translate-y-0.5">
              <Glass radius={12} className="h-16 w-32 sm:h-20 sm:w-40">
                <span className="flex h-full w-full items-center justify-center rounded-xl bg-white/95 px-3 ring-1 ring-black/5 sm:px-4">
                  <span className="relative h-10 w-full sm:h-12">
                    <Image src={l.src} alt={l.alt} fill sizes="160px" className="object-contain" />
                  </span>
                </span>
              </Glass>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Chiffres-clés */}
      <Reveal delay={140}>
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display block text-3xl font-black leading-none tracking-tight sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.15em] text-muted">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
