import { Reveal } from "@/components/ui/Reveal";
import { ProjectsGallery } from "@/components/cards/ProjectsGallery";
import { projects } from "@/lib/projects";

export function Work() {
  return (
    <section id="travaux" className="anchor mx-auto w-full max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-3">/ 02 — Réalisations</p>
      </Reveal>

      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={60}>
          <h2 className="font-display max-w-2xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            Une sélection de <span className="text-gradient">travaux</span> réalisés en stage.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Carrousels, affiches, lignes éditoriales et publications conçus pour la CMA Réunion et
            EDF. {projects.length} réalisations — cliquez pour ouvrir l&apos;étude complète.
          </p>
        </Reveal>
      </div>

      <ProjectsGallery />
    </section>
  );
}
