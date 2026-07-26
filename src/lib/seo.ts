import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { defaultLocale } from "@/lib/i18n/config";
import { routeAlternates, type RouteKey } from "@/lib/routes";
import { SITE_URL, PRODUCT_NAME } from "@/lib/site";

const OG_LOCALE: Record<Locale, string> = {
  de: "de_CH",
  en: "en_US",
};

/**
 * Builds complete page metadata: canonical, hreflang alternates (de, en,
 * x-default), Open Graph, and Twitter cards — from the central route map.
 */
export function pageMetadata(options: {
  route: RouteKey;
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const { route, locale, title, description } = options;
  const paths = routeAlternates(route);
  const canonical = `${SITE_URL}${paths[locale]}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        de: `${SITE_URL}${paths.de}`,
        en: `${SITE_URL}${paths.en}`,
        "x-default": `${SITE_URL}${paths[defaultLocale]}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: PRODUCT_NAME,
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[locale],
      alternateLocale: Object.values(OG_LOCALE).filter(
        (value) => value !== OG_LOCALE[locale],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
