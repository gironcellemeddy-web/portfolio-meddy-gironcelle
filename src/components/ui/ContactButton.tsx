// Bouton contact signature : pill dégradé violet→magenta→orange (classe
// .cta-grad), texte blanc en capitales espacées, tailles fluides.
export function ContactButton({
  href = "mailto:gironcellemeddy@gmail.com",
  label = "Me contacter",
  className = "",
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`cta-grad font-display inline-block rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-300 hover:scale-[1.04] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      {label}
    </a>
  );
}
