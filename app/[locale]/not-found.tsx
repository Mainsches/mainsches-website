"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

/**
 * Localized 404. As a client component it derives the locale from the
 * current URL, since not-found boundaries receive no route params.
 */
export default function NotFound() {
  const pathname = usePathname();
  const first = pathname.split("/")[1] ?? "";
  const locale = isLocale(first) ? first : "en";
  const dict = getDictionary(locale);

  return (
    <section className="shell flex flex-col items-start gap-6 py-28 sm:py-36">
      <p className="font-mono text-sm tracking-[0.3em] text-gold uppercase">
        {dict.notFound.code}
      </p>
      <h1 className="font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
        {dict.notFound.title}
      </h1>
      <p className="max-w-md leading-relaxed text-pretty text-ink-soft">
        {dict.notFound.body}
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex min-h-12 items-center rounded-control bg-gold px-6 text-sm font-semibold text-bg-deep transition-colors duration-200 hover:bg-gold-soft"
      >
        {dict.notFound.cta}
      </Link>
    </section>
  );
}
