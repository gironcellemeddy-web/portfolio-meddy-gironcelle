import { Press_Start_2P } from "next/font/google";
import { Download } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FeaturedStack } from "@/components/sections/FeaturedStack";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { PacCV } from "@/components/game/PacCV";
import { Reveal } from "@/components/ui/Reveal";

// Police pixel-art du mini-jeu (chargée avec la page d'accueil).
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <FeaturedStack />
        <Work />
        <Contact />

        {/* Bonus arcade — mon parcours en jeu, tout en bas de page */}
        <section
          id="jeu"
          className={`${pressStart.variable} anchor mx-auto w-full max-w-4xl px-5 pb-16 pt-8 sm:pt-12`}
        >
          <Reveal>
            <p className="eyebrow mb-3">/ 06 — Bonus arcade</p>
          </Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <Reveal delay={60}>
              <h2
                className="hero-grad font-display max-w-xl font-black uppercase leading-[1.02] tracking-tight"
                style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
              >
                Mon parcours, version arcade
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Guidez la sphère, évitez les fantômes et collectez mes diplômes, qualités et
                expériences pro — chaque losange dévoile un pan de mon CV. Pas le temps ?{" "}
                <a
                  href="/cv-meddy-gironcelle.pdf"
                  download
                  className="inline-flex items-center gap-1 font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-ember"
                >
                  la version classique <Download className="h-3 w-3" />
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <PacCV pixelFont="font-[family-name:var(--font-pixel)]" />
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-6xl border-t border-line px-5 pb-8 pt-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              Meddy<span className="text-ember">.</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-2">
              Communication &amp; Marketing digital · La Réunion
            </p>
          </div>
          <nav aria-label="Pied de page" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs uppercase tracking-wider">
            <a href="#travaux" className="text-muted transition-colors hover:text-ink">Travaux</a>
            <a href="#a-propos" className="text-muted transition-colors hover:text-ink">À propos</a>
            <a href="/photographie" className="text-muted transition-colors hover:text-ink">Photographie</a>
            <a href="#jeu" className="text-muted transition-colors hover:text-ink">Arcade</a>
            <a href="/cv-meddy-gironcelle.pdf" download className="text-muted transition-colors hover:text-ink">CV</a>
          </nav>
          <div className="flex flex-col items-center gap-1 text-xs text-muted-2 sm:items-end">
            <a href="mailto:gironcellemeddy@gmail.com" className="transition-colors hover:text-ink">
              gironcellemeddy@gmail.com
            </a>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/meddy.gir_974/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">Instagram</a>
              <a href="https://www.linkedin.com/in/meddy-gironcelle-5337a02a4" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">LinkedIn</a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-[11px] uppercase tracking-wider text-muted-2">
          © {new Date().getFullYear()} Meddy Gironcelle — Tous droits réservés
        </p>
      </footer>
    </>
  );
}
