import { Download } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactButton } from "@/components/ui/ContactButton";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function Contact() {
  return (
    <section id="contact" className="anchor relative mx-auto w-full max-w-6xl px-5 pb-16 pt-24 sm:pt-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-ink px-6 py-16 text-paper shadow-lift sm:px-14 sm:py-24">
          {/* Lueur d'ambiance */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--ember) 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--cobalt) 0%, transparent 70%)" }}
          />

          <p className="eyebrow mb-5 text-paper/60">/ 05 — Contact</p>
          <h2 className="font-display max-w-2xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            Un projet, un poste, une collaboration ?
          </h2>
          <p className="mt-5 max-w-md text-paper/70">
            Disponible pour un poste en communication et marketing digital. Parlons-en.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ContactButton />
            <a
              href="/cv-meddy-gironcelle.pdf"
              download
              className="font-display inline-flex items-center gap-2 rounded-full border-2 border-paper/40 px-8 py-3 text-xs font-medium uppercase tracking-widest text-paper transition-colors hover:bg-paper/10 sm:px-10 sm:py-3.5 sm:text-sm"
            >
              Le CV <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-paper/15 pt-8">
            <a
              href="https://www.instagram.com/meddy.gir_974/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition-colors hover:border-ember hover:text-ember"
            >
              <InstagramIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/meddy-gironcelle-5337a02a4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition-colors hover:border-ember hover:text-ember"
            >
              <LinkedinIcon className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
