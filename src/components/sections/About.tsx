import { Download } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";

const BIO =
  "Diplômé d'un Master 2 en Sciences de l'Information et de la Communication à l'Université de La Réunion, je conçois des lignes éditoriales, des contenus et des campagnes qui donnent de la voix aux marques. Créatif, rigoureux et curieux, j'aspire à accompagner les organisations qui veulent se démarquer. Construisons quelque chose de mémorable ensemble !";

const CHIPS = ["Éditorial", "Réseaux sociaux", "Création de contenu", "Français · Créole · Anglais B1"];

export function About() {
  return (
    <section
      id="a-propos"
      className="anchor relative flex min-h-screen flex-col items-center justify-center gap-10 px-5 py-20 sm:gap-14 sm:px-8 md:gap-16 md:px-10"
    >
      <Reveal>
        <h2
          className="hero-grad font-display text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          À propos
        </h2>
      </Reveal>

      <AnimatedText
        text={BIO}
        className="max-w-[620px] text-center text-[clamp(1rem,2vw,1.3rem)] font-medium leading-relaxed text-ink"
      />

      <Reveal delay={80}>
        <div className="flex flex-wrap justify-center gap-2">
          {CHIPS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <a
          href="/cv-meddy-gironcelle.pdf"
          download
          className="font-display inline-flex items-center gap-2 rounded-full border-2 border-ink px-8 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink/10 sm:px-10 sm:py-3.5 sm:text-sm"
        >
          Télécharger le CV <Download className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
}
