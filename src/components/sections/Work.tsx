import { Reveal } from "@/components/ui/Reveal";
import { ProjectsGallery } from "@/components/cards/ProjectsGallery";
import { projects } from "@/lib/projects";

export function Work() {
  return (
    <section id="travaux" className="anchor mx-auto w-full max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-3">/ 04 — Réalisations</p>
      </Reveal>

      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={60}>
          <h2
            className="hero-grad font-display max-w-2xl font-black uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
          >
            Toutes les réalisations
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Carrousels, affiches, pages magazine et publications conçus en stage pour la CMA
            Réunion. {projects.length} réalisations — cliquez sur un projet pour voir plus.
          </p>
        </Reveal>
      </div>

      <ProjectsGallery />
    </section>
  );
}
