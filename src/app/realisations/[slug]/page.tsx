import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { getProject, projectTitle, projects } from "@/lib/projects";
import { ProjectDetailGallery } from "@/components/projects/ProjectDetailGallery";

type Params = { params: Promise<{ slug: string }> };

// Génère une page statique par réalisation.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const locale = await getLocale();
  return { title: `${projectTitle(p, locale)} — Meddy Gironcelle` };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const locale = await getLocale();
  const t = await getTranslations("projects");
  const images = p.images;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-10 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {t("back")}
        </Link>
        <span className="font-display text-lg font-black tracking-tight">MG</span>
      </header>

      <div className="mb-8 border-b-[1.5px] border-line pb-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
          {p.type} · {images.length} {t("imagesLabel")}
        </p>
        <h1 className="font-display mt-2 text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl">
          {projectTitle(p, locale)}
        </h1>
      </div>

      <ProjectDetailGallery images={images} title={projectTitle(p, locale)} />
    </main>
  );
}
