import type { Metadata } from "next";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { ArrowLeft, Download } from "lucide-react";
import { PacCV } from "@/components/game/PacCV";
import { Reveal } from "@/components/ui/Reveal";

// Police pixel-art du jeu, chargée uniquement sur cette page.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "CV interactif — Meddy Gironcelle",
  description:
    "Découvrez le parcours de Meddy Gironcelle en jouant : un mini-jeu arcade où l'on collecte ses diplômes dans un labyrinthe néon. Bac, Licence Info-Com, Master 2 SIC.",
};

export default function CvInteractifPage() {
  return (
    <main className={`${pressStart.variable} mx-auto w-full max-w-4xl flex-1 px-5 py-6 sm:py-10`}>
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

      <div className="mb-10 max-w-2xl">
        <Reveal>
          <p className="eyebrow mb-4">Insert coin — découvrez mon parcours en jouant</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            CV <span className="text-ember">interactif</span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Guidez la sphère dans le labyrinthe, évitez les fantômes et collectez les{" "}
            <span className="font-medium text-ink">3 diplômes</span> de mon parcours — du Bac au
            Master 2. Chaque diplôme ramassé dévoile une étape de ma formation.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 text-sm text-muted-2">
            Pas le temps de jouer ?{" "}
            <a
              href="/cv-meddy-gironcelle.pdf"
              download
              className="inline-flex items-center gap-1 font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-ember"
            >
              Téléchargez la version classique <Download className="h-3.5 w-3.5" />
            </a>
          </p>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <PacCV pixelFont="font-[family-name:var(--font-pixel)]" />
      </Reveal>

      <footer className="mt-12 flex flex-col items-center gap-1 text-center text-xs text-muted-2">
        <p>© {new Date().getFullYear()} Meddy Gironcelle — clavier (flèches / ZQSD), tactile (glisser ou d-pad).</p>
      </footer>
    </main>
  );
}
