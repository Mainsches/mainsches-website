import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { breadcrumbJsonLd, faqJsonLd, jsonLdDocument } from "@/lib/jsonld";
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
    route: "security",
    locale,
    title: dict.meta.security.title,
    description: dict.meta.security.description,
  });
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.securityPage;

  return (
    <>
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        lede={page.heroLede}
        homeHref={localePath("home", locale)}
        homeLabel={dict.common.breadcrumbHome}
        currentLabel={dict.nav.security}
      />

      {/* Security model */}
      <section className="shell flex flex-col gap-10 py-16 sm:py-20">
        <Reveal>
          <SectionHeader label={page.heroLabel} title={page.principlesTitle} />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.04}>
              <article className="h-full rounded-panel border border-line bg-raised p-6">
                <Lock aria-hidden="true" className="size-4 text-gold" />
                <h3 className="mt-3 font-display text-base font-medium text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft">
                  {principle.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Data treatment */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-10 py-16 sm:py-20">
          <Reveal>
            <SectionHeader
              label={page.heroLabel}
              title={page.dataTitle}
              lede={page.dataLede}
            />
          </Reveal>
          <ol className="grid gap-4 lg:grid-cols-3">
            {page.dataPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.05}>
                <li className="flex h-full flex-col gap-3 rounded-panel border border-gold-line bg-gold-tint p-6">
                  <span className="font-mono text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-medium text-ink">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-pretty text-ink-soft">
                    {point.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="max-w-2xl text-xs leading-relaxed text-ink-faint">
            {page.disclaimer}
          </p>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-10 py-16 sm:py-20">
          <Reveal>
            <SectionHeader label="FAQ" title={page.faqTitle} />
          </Reveal>
          <Reveal>
            <FaqList items={page.faq} />
          </Reveal>
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
              name: dict.nav.security,
              url: `${SITE_URL}${localePath("security", locale)}`,
            },
          ]),
          faqJsonLd(page.faq),
        ])}
      />
    </>
  );
}
