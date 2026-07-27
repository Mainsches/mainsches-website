import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { breadcrumbJsonLd, jsonLdDocument } from "@/lib/jsonld";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    route: "useCases",
    locale,
    title: dict.meta.useCases.title,
    description: dict.meta.useCases.description,
  });
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.useCasesPage;
  const cases = dict.home.useCases.cases.filter((item) => !item.planned);

  return (
    <>
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        lede={page.heroLede}
        homeHref={localePath("home", locale)}
        homeLabel={dict.common.breadcrumbHome}
        currentLabel={dict.nav.useCases}
      />

      {/* Core scenarios */}
      <section className="shell flex flex-col gap-10 py-16 sm:py-20">
        <Reveal>
          <SectionHeader label={page.heroLabel} title={page.scenariosTitle} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="flex h-full flex-col gap-4 rounded-panel border border-line bg-raised p-7">
                <h3 className="font-display text-xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-pretty text-ink-soft">
                  {item.summary}
                </p>
                <ul className="mt-auto flex flex-col gap-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-ink-soft"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-gold"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Link
          href={localePath("product", locale)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold-soft transition-colors duration-200 hover:text-gold"
        >
          {page.productLink}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </section>

      {/* Planned connectors — clearly separated */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-10 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <SectionHeader label={page.heroLabel} title={page.plannedTitle} />
              </div>
              <Badge variant="outline" className="w-fit">
                {dict.common.inDevelopment}
              </Badge>
              <p className="max-w-2xl leading-relaxed text-pretty text-ink-soft">
                {page.plannedLede}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {page.plannedItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-panel border border-dashed border-line-strong p-7">
                  <h3 className="font-display text-lg font-medium text-ink-soft">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-faint">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div>
            <ButtonLink href={localePath("pilot", locale)}>
              {page.cta}
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <JsonLd
        json={jsonLdDocument([
          breadcrumbJsonLd([
            {
              name: dict.common.breadcrumbHome,
              url: `${SITE_URL}${localePath("home", locale)}`,
            },
            {
              name: dict.nav.useCases,
              url: `${SITE_URL}${localePath("useCases", locale)}`,
            },
          ]),
        ])}
      />
    </>
  );
}
