import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

/**
 * Central route map. Shared marketing pages use identical slugs in both
 * languages (per site architecture); only the legal pages carry localized
 * slugs. The language switcher and hreflang generation both derive from this
 * single source of truth.
 */
export const routeDefs = {
  home: { de: "/de", en: "/en" },
  product: { de: "/de/product", en: "/en/product" },
  workflows: { de: "/de/workflows", en: "/en/workflows" },
  security: { de: "/de/security", en: "/en/security" },
  useCases: { de: "/de/use-cases", en: "/en/use-cases" },
  pilot: { de: "/de/pilot-program", en: "/en/pilot-program" },
  legal: { de: "/de/impressum", en: "/en/legal-notice" },
  privacy: { de: "/de/datenschutz", en: "/en/privacy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routeDefs;

export function localePath(key: RouteKey, locale: Locale): string {
  return routeDefs[key][locale];
}

/** hreflang alternates for a route, used by metadata and the sitemap. */
export function routeAlternates(key: RouteKey): Record<Locale, string> {
  return routeDefs[key];
}

/**
 * Maps the current pathname to its equivalent in the target locale.
 * Falls back to the target home page when the path is unknown.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  for (const key of Object.keys(routeDefs) as RouteKey[]) {
    for (const locale of locales) {
      if (routeDefs[key][locale] === normalized) {
        return routeDefs[key][target];
      }
    }
  }

  return routeDefs.home[target];
}
