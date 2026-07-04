import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Magnetic } from "@/components/interactive/Magnetic";

// Délai d'entrée (animation CSS). Le contenu est rendu côté serveur et VISIBLE
// par défaut : aucune dépendance au JS pour l'affichage.
const delay = (ms: number): CSSProperties => ({ "--enter-delay": `${ms}ms` } as CSSProperties);

export function Hero() {
  return (
    <section id="top" className="anchor relative mx-auto w-full max-w-6xl px-5 pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
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

        {/* Objet signature */}
        <div className="animate-fade-up relative hidden justify-center lg:flex" style={delay(300)}>
          <SignatureOrb />
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

// Sphère de verre sculptée + anneau en orbite. Profondeur premium en CSS/SVG,
// sans WebGL : léger, performant, dégradé naturel si les animations sont coupées.
function SignatureOrb() {
  return (
    <div className="relative aspect-square w-full max-w-sm">
      <div className="absolute inset-x-10 bottom-4 h-10 rounded-[100%] bg-ink/25 blur-2xl" />

      <svg
        className="absolute inset-[-10%] animate-[spin_30s_linear_infinite]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="49"
          ry="17"
          stroke="var(--ink)"
          strokeOpacity="0.14"
          strokeWidth="0.5"
          transform="rotate(-20 50 50)"
        />
      </svg>

      <div
        className="animate-floaty absolute inset-0 rounded-full shadow-lift"
        style={{
          background:
            "radial-gradient(120% 120% at 32% 24%, #ffffff 0%, var(--ember-2) 20%, var(--ember) 50%, var(--cobalt) 108%)",
        }}
      >
        <div className="absolute left-[16%] top-[12%] h-1/3 w-1/3 rounded-full bg-white/55 blur-2xl" />
        <div className="absolute inset-4 rounded-full border border-white/20" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 0 -34px 66px rgba(12,12,14,0.28), inset 0 22px 44px rgba(255,255,255,0.28)",
          }}
        />
      </div>
    </div>
  );
}
