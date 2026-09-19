import { Press_Start_2P } from "next/font/google";
import { Download } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Marquee } from "@/components/sections/Marquee";
import { IslandShowcase } from "@/components/sections/IslandShowcase";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FeaturedStack } from "@/components/sections/FeaturedStack";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { PacCV } from "@/components/game/PacCV";
import { Reveal } from "@/components/ui/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";

// Police pixel-art du mini-jeu (chargée avec la page d'accueil).
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

// Données structurées schema.org (Person) : permettent aux moteurs et aux
// assistants IA d'identifier sans ambiguïté l'auteur du site.
const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meddy Gironcelle",
  url: "https://portfolio-meddy-gironcelle.vercel.app/",
  email: "mailto:gironcellemeddy@gmail.com",
  jobTitle: "Communication & marketing digital",
  description:
    "Diplômé d'un Master 2 en Sciences de l'Information et de la Communication (Université de La Réunion). Réseaux sociaux, création graphique, photographie de paysage.",
  address: { "@type": "PostalAddress", addressRegion: "La Réunion", addressCountry: "FR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Université de La Réunion" },
  knowsLanguage: ["fr", "en"],
  sameAs: [
    "https://www.linkedin.com/in/meddy-gironcelle-5337a02a4",
    "https://www.instagram.com/meddy.gir_974/",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
      />
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <TrustBar />
        <Marquee />
        <About />
        <IslandShowcase />
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

      <SiteFooter />
    </>
  );
}
