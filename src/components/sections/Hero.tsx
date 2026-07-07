import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Magnet } from "@/components/interactive/Magnet";
import { ContactButton } from "@/components/ui/ContactButton";
import { heroPhoto } from "@/lib/photos";

// Hero façon motion : nom géant en dégradé métallique pleine largeur,
// barre basse (accroche à gauche, bouton contact à droite), photo signature
// magnétique en bas au centre. Contenu visible par défaut (animations qui ne
// masquent jamais — léger décalage uniquement).
const delay = (ms: number): CSSProperties => ({ "--enter-delay": `${ms}ms` } as CSSProperties);

export function Hero() {
  return (
    <section
      id="top"
      className="anchor relative flex h-svh min-h-[560px] flex-col justify-between overflow-x-clip px-5 pt-24 sm:px-8 md:px-10"
    >
      {/* Nom géant, pleine largeur (déborde du padding de section) */}
      <div className="-mx-5 overflow-hidden sm:-mx-8 md:-mx-10">
        <h1
          className="hero-grad font-display line-mask w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(2.4rem, 9vw, 10.5rem)" }}
        >
          <span className="line-inner" style={{ "--line-delay": "120ms" } as CSSProperties}>
            Meddy Gironcelle
          </span>
        </h1>
      </div>

      {/* Photo signature magnétique, ancrée en bas au centre */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
        <Magnet padding={150} strength={3} className="pointer-events-auto">
          <Link href="/photographie" aria-label="Voir mes photographies" className="group block">
            <div
              className="animate-fade-up relative w-[260px] overflow-hidden rounded-t-[28px] border border-line shadow-lift sm:w-[360px] md:w-[440px] lg:w-[500px]"
              style={delay(500)}
            >
              <Image
                src={heroPhoto.src}
                alt="Photographie de paysage — Meddy Gironcelle"
                width={heroPhoto.width}
                height={heroPhoto.height}
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 440px, 500px"
                className="h-auto w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <span className="eyebrow absolute bottom-3 left-4 !text-white/80">
                Ma photographie — voir plus
              </span>
              <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
          </Link>
        </Magnet>
      </div>

      {/* Barre basse : accroche + contact */}
      <div className="relative z-20 flex items-end justify-between pb-7 sm:pb-8 md:pb-10">
        <p
          className="animate-fade-up max-w-[170px] font-light uppercase leading-snug tracking-wide text-muted sm:max-w-[240px] md:max-w-[280px]"
          style={{ ...delay(300), fontSize: "clamp(0.75rem, 1.4vw, 1.4rem)" }}
        >
          Un créatif en communication &amp; marketing digital, basé à La Réunion
        </p>
        <div className="animate-fade-up" style={delay(420)}>
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
