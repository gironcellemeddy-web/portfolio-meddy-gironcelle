import Link from "next/link";

// Pied de page UNIQUE, présent sur toutes les pages : navigation, contact,
// réseaux et liens légaux (LCEN / RGPD). Les ancres (#travaux…) sont
// préfixées par "/" pour fonctionner depuis n'importe quelle page.
const NAV = [
  { href: "/#travaux", label: "Travaux" },
  { href: "/#a-propos", label: "À propos" },
  { href: "/photographie", label: "Photographie" },
  { href: "/#jeu", label: "Arcade" },
  { href: "/cv-meddy-gironcelle.pdf", label: "CV", download: true },
];

const LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/confidentialite#cookies", label: "Cookies" },
];

export function SiteFooter() {
  return (
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
          {NAV.map((n) =>
            n.download ? (
              <a key={n.href} href={n.href} download className="text-muted transition-colors hover:text-ink">
                {n.label}
              </a>
            ) : (
              <Link key={n.href} href={n.href} className="text-muted transition-colors hover:text-ink">
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-col items-center gap-1 text-xs text-muted-2 sm:items-end">
          <a href="mailto:gironcellemeddy@gmail.com" className="transition-colors hover:text-ink">
            gironcellemeddy@gmail.com
          </a>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/meddy.gir_974/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/meddy-gironcelle-5337a02a4" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Liens légaux : obligatoires depuis toutes les pages (LCEN art. 6 ; RGPD art. 13) */}
      <nav
        aria-label="Informations légales"
        className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-line pt-5 text-[11px] uppercase tracking-wider text-muted-2"
      >
        {LEGAL.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
            {l.label}
          </Link>
        ))}
        <span aria-hidden>·</span>
        <p>© {new Date().getFullYear()} Meddy Gironcelle — Tous droits réservés</p>
      </nav>
    </footer>
  );
}
