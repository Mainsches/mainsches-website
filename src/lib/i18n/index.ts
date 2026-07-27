import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { de } from "./dictionaries/de";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary } from "./types";
export { locales, defaultLocale, isLocale, type Locale } from "./config";
