import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { BackgroundDecor } from "@/components/decor/BackgroundDecor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Kanit : typographie signature (titres géants, nav, boutons) — DA motion.
// Poids limités à ceux réellement utilisés (perf).
const kanit = Kanit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const SITE_URL = "https://portfolio-meddy-gironcelle.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const title = t("title");
  const description = t("description");
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      url: "/",
      siteName: "Meddy Gironcelle — Portfolio",
      images: [
        {
          url: "/photos/photo-01.jpg",
          width: 2000,
          height: 1500,
          alt: "Photographie de paysage — Meddy Gironcelle",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/photos/photo-01.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Thème sombre PAR DÉFAUT (DA dark-first), clair si choisi — anti-flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('site-theme')!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <BackgroundDecor />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
