import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

// Section services : fond inversé (encre/papier selon le thème), coins
// supérieurs arrondis, liste numérotée. Chaque service est adossé à une
// preuve VISIBLE dans le portfolio et renvoie vers elle (cohérence
// promesse ↔ démonstration).
const SERVICES = [
  {
    name: "Réseaux sociaux",
    desc: "Animation de communautés et formats natifs (Meta Business) : carrousels, stories et publications pensés pour l'engagement.",
    proofLabel: "Voir les carrousels & publications",
    href: "#travaux",
  },
  {
    name: "Création graphique",
    desc: "Affiches, pages magazine et supports print ou digitaux conçus sur Canva et Illustrator, toujours au service du message.",
    proofLabel: "Voir les affiches & pages magazine",
    href: "#travaux",
  },
  {
    name: "Stratégie éditoriale",
    desc: "Ligne éditoriale et planning digital 2026 conçus en stage pour la CMA Réunion : un cap clair, décliné en contenus.",
    proofLabel: "Voir les contenus qui en découlent",
    href: "#a-la-une",
  },
  {
    name: "Photographie",
    desc: "Prises de vue de paysage au Galaxy S22 Ultra et retouche Lightroom : un œil entraîné à cadrer, exposer et raconter.",
    proofLabel: "Voir la galerie (36 clichés)",
    href: "/photographie",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="anchor relative bg-ink px-5 py-20 text-paper sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32 rounded-t-[40px]"
    >
      <Reveal>
        <h2
          className="font-display mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>
      </Reveal>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((s, i) => (
          <Reveal key={s.name} delay={i * 90}>
            <div
              className="flex items-start gap-6 border-b py-8 last:border-0 sm:gap-10 sm:py-10 md:py-12"
              style={{ borderColor: "color-mix(in srgb, var(--paper) 18%, transparent)" }}
            >
              <span
                className="font-display shrink-0 font-black leading-none"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2 sm:pt-3">
                <h3
                  className="font-display font-medium uppercase tracking-wide"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {s.name}
                </h3>
                <p
                  className="mt-2 max-w-2xl font-light leading-relaxed opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest underline decoration-current/30 underline-offset-4 transition-opacity hover:opacity-70 sm:text-sm"
                >
                  {s.proofLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
