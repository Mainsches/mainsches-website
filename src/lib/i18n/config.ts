export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

/** Target of hreflang x-default and of unknown-language visitors. */
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
