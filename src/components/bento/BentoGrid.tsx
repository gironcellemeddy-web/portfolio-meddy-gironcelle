import type { ReactNode } from "react";

// Grille Bento : 1 colonne sur mobile, 4 colonnes sur desktop.
export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(11rem,auto)]">
      {children}
    </div>
  );
}
