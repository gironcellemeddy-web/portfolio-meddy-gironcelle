import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { Magnet } from "@/components/interactive/Magnet";
import { PortfolioBook } from "@/components/interactive/PortfolioBook";
import { ContactButton } from "@/components/ui/ContactButton";

// Hero façon motion : nom géant en dégradé métallique pleine largeur,
// barre basse (accroche à gauche, bouton contact à droite), LIVRE PORTFOLIO
// 3D feuilletable au centre. Contenu visible par défaut (animations qui ne
// masquent jamais — léger décalage uniquement).
const delay = (ms: number): CSSProperties => ({ "--enter-delay": `${ms}ms` } as CSSProperties);

export function Hero() {
  return (
    <section
      id="top"
      className="anchor relative flex h-svh min-h-[640px] flex-col justify-between overflow-x-clip px-5 pt-24 sm:px-8 md:px-10"
    >
      {/* Nom géant, pleine largeur (déborde du padding de section).
          Le dégradé est appliqué directement sur le span de texte (pas sur le
          h1 parent) : le clip `background-clip:text` reste fiable partout. */}
      <div className="-mx-5 overflow-hidden sm:-mx-8 md:-mx-10">
        <h1
          className="font-display line-mask w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(2.4rem, 9vw, 10.5rem)" }}
        >
          <span
            className="line-inner hero-grad"
            style={{ "--line-delay": "120ms" } as CSSProperties}
          >
            Meddy Gironcelle
          </span>
        </h1>
      </div>

      {/* Livre portfolio 3D : centré verticalement sur mobile, posé plus bas
          dès sm — magnétique et feuilletable au clic. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center sm:top-auto sm:bottom-16 sm:translate-y-0">
        <Magnet padding={150} strength={3} className="pointer-events-auto">
          <div className="animate-fade-up" style={delay(500)}>
            <PortfolioBook />
          </div>
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

      <a
        href="#travaux"
        className="animate-fade-up absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-2 transition-colors hover:text-ink lg:inline-flex"
        style={delay(700)}
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        Défiler
      </a>
    </section>
  );
}

