import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./locale";

// next-intl : charge la langue (via cookie) et les messages correspondants
// pour chaque requête. Pas de préfixe de langue dans l'URL.
export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
