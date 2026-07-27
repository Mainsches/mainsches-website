import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Shared subpage header: visible breadcrumb (Home → page) plus label,
 * H1, and lede. The matching BreadcrumbList JSON-LD is emitted per page.
 */
export function PageHero({
  label,
  title,
  lede,
  homeHref,
  homeLabel,
  currentLabel,
}: {
  label: string;
  title: string;
  lede: string;
  homeHref: string;
  homeLabel: string;
  currentLabel: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_50%)]"
      />
      <div className="shell relative flex flex-col gap-6 pt-10 pb-14 sm:pt-12 sm:pb-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs text-ink-faint">
            <li>
              <Link
                href={homeHref}
                className="transition-colors duration-200 hover:text-ink"
              >
                {homeLabel}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="text-ink-soft">
              {currentLabel}
            </li>
          </ol>
        </nav>

        <div className="flex max-w-3xl flex-col gap-4">
          <p className="section-label flex items-center gap-3">
            <span className="label-rule" aria-hidden="true" />
            {label}
          </p>
          <h1 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
            {lede}
          </p>
        </div>
      </div>
    </section>
  );
}
