import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
      <p
        className="hero-grad font-display font-black uppercase leading-none tracking-tight"
        style={{ fontSize: "clamp(6rem, 24vw, 18rem)" }}
      >
        404
      </p>
      <p className="max-w-sm text-muted">
        Cette page n&apos;existe pas (ou plus). Le portfolio, lui, est bien là.
      </p>
      <Link
        href="/"
        className="font-display inline-flex items-center gap-2 rounded-full border-2 border-ink px-8 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink/10 sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
