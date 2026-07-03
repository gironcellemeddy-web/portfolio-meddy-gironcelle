import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const skills = [
  { name: "Canva", level: "Avancé" },
  { name: "Réseaux sociaux", level: "Avancé" },
  { name: "Rédaction", level: "Avancé" },
  { name: "Suite Office", level: "Avancé" },
  { name: "Google Ads & Trends", level: "Intermédiaire" },
  { name: "Montage vidéo", level: "Intermédiaire" },
];

const focus = ["Éditorial", "Réseaux sociaux", "Création de contenu", "Stratégie de marque"];
const languages = ["Français", "Créole réunionnais", "Anglais · B1"];

const contacts = [
  { label: "Instagram", href: "https://www.instagram.com/meddy.gir_974/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/meddy-gironcelle-5337a02a4", Icon: LinkedinIcon },
  { label: "Email", href: "mailto:gironcellemeddy@gmail.com", Icon: Mail },
];

export function About() {
  return (
    <section id="a-propos" className="anchor mx-auto w-full max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-3">/ 01 — Le profil</p>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Statement */}
        <div>
          <Reveal delay={60}>
            <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-[2.6rem]">
              Diplômé d&apos;un <span className="text-ember">Master 2</span> en communication,
              j&apos;aspire à accompagner les organisations dans leur stratégie de contenu.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
              Formé en Sciences de l&apos;Information et de la Communication à l&apos;Université de
              La Réunion. Créatif, rigoureux et curieux, je conçois des lignes éditoriales, des
              contenus et des campagnes qui donnent de la voix aux marques.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-7 flex flex-wrap gap-2">
              {focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Panneau compétences / langues / contact */}
        <Reveal delay={120}>
          <div className="rounded-[var(--radius-xl2)] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <p className="eyebrow mb-4">Compétences</p>
            <ul className="flex flex-col">
              {skills.map((s) => (
                <li
                  key={s.name}
                  className="group flex items-center justify-between border-b border-line py-2.5 last:border-0"
                >
                  <span className="text-sm font-semibold">{s.name}</span>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wide ${
                      s.level === "Avancé" ? "text-ember" : "text-cobalt"
                    }`}
                  >
                    {s.level}
                  </span>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3 mt-7">Langues</p>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {l}
                </span>
              ))}
            </div>

            <p className="eyebrow mb-3 mt-7">Réseaux</p>
            <div className="flex flex-col gap-1">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-cobalt-soft"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink transition-colors group-hover:border-cobalt group-hover:text-cobalt">
                    <c.Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium transition-colors group-hover:text-cobalt">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
