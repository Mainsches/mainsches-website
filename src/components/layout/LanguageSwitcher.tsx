"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/routes";

/** Native language names, announced to assistive technology. */
const NATIVE_NAMES: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
};

/**
 * DE / EN switcher. Keeps the user on the equivalent subpage in the other
 * language (via the central route map).
 */
export function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="flex items-center overflow-hidden rounded-control border border-line-strong">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={switchLocalePath(pathname, locale)}
                hrefLang={locale}
                lang={locale}
                aria-label={NATIVE_NAMES[locale]}
                aria-current={active ? "true" : undefined}
                className={`block px-3 py-1.5 font-mono text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                  active
                    ? "bg-surface text-gold"
                    : "text-ink-faint hover:bg-surface hover:text-ink"
                }`}
              >
                {locale.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
