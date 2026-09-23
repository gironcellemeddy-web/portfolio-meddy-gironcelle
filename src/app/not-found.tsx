import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
      <h1
        className="hero-grad font-display font-black uppercase leading-none tracking-tight t-display"
        aria-label="Erreur 404 — page introuvable"
      >
        404
      </h1>
      <p className="max-w-sm text-muted">
        Cette page n&apos;existe pas (ou plus). Le portfolio, lui, est bien là.
      </p>
      <Link
        href="/"
        className="btn btn-secondary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l&apos;accueil
      </Link>
    </main>
      <SiteFooter />
    </>
  );
}
