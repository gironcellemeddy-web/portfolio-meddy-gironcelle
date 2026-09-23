import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { SpotlightName } from "@/components/interactive/SpotlightName";
import { ContactButton } from "@/components/ui/ContactButton";
// Effets WebGL du hero : chargés côté client, seulement si l'appareil les
// supporte (voir useEffectsTier). Le hero reste complet sans eux.
import { HeroEffects } from "@/components/effects/HeroEffects";

// Hero éditorial : le nom EST l'objet — typographie géante en dégradé
// métallique, révélée par un halo de studio qui suit le curseur. Accroche et
// CTA en barre basse. Contenu visible par défaut (animations non masquantes).
const delay = (ms: number): CSSProperties => ({ "--enter-delay": `${ms}ms` } as CSSProperties);

export function Hero() {
  return (
    <section
      id="top"
      className="anchor relative flex min-h-[74svh] flex-col justify-center gap-8 overflow-x-clip px-5 pb-6 pt-32 sm:px-8 sm:pt-36 md:px-10"
    >
      <HeroEffects />

      {/* Nom géant, pleine largeur, sculpté par la lumière */}
      <SpotlightName>
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
      </SpotlightName>

      {/* Barre basse : accroche + contact */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <p
          className="animate-fade-up max-w-[240px] font-light uppercase leading-snug tracking-wide text-muted sm:max-w-[300px] md:max-w-[360px]"
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
        className="animate-fade-up mx-auto hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-2 transition-colors hover:text-ink lg:inline-flex"
        style={delay(700)}
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        Défiler
      </a>
    </section>
  );
}
