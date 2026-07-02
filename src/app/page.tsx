import { useTranslations } from "next-intl";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { SocialCard } from "@/components/cards/SocialCard";
import { StackCard } from "@/components/cards/StackCard";
import { LocationCard } from "@/components/cards/LocationCard";
import { ProjectsCard } from "@/components/cards/ProjectsCard";
import { LinksCard } from "@/components/cards/LinksCard";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations("footer");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-6 flex items-center justify-end gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>

      <BentoGrid>
        <ProfileCard index={0} />
        <SocialCard index={1} />
        <StackCard index={2} />
        <LocationCard index={3} />
        <ProjectsCard index={4} />
        <LinksCard index={5} />
      </BentoGrid>

      <footer className="mt-10 flex flex-col items-center gap-1 text-center text-xs text-muted">
        <p>
          © {new Date().getFullYear()} Meddy Gironcelle. {t("rights")}
        </p>
        <p>{t("builtWith")}</p>
      </footer>
    </main>
  );
}
