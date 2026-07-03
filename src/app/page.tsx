import { useTranslations } from "next-intl";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { ProfileCard } from "@/components/cards/ProfileCard";
import { SocialCard } from "@/components/cards/SocialCard";
import { StackCard } from "@/components/cards/StackCard";
import { ProjectsCard } from "@/components/cards/ProjectsCard";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations("footer");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-8 flex items-center justify-between">
        <span className="font-display text-lg font-black tracking-tight">MG</span>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <BentoGrid>
        <ProfileCard index={0} />
        <SocialCard index={1} />
        <StackCard index={2} />
        <ProjectsCard index={3} />
      </BentoGrid>

      <footer className="mt-10 flex flex-col items-center gap-1 text-center text-xs text-muted">
        <p>
          © {new Date().getFullYear()} Meddy Gironcelle. {t("rights")}
        </p>
      </footer>
    </main>
  );
}
