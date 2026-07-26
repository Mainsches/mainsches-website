import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
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
    route: "product",
    locale,
    title: dict.meta.product.title,
    description: dict.meta.product.description,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.product;

  return (
    <>
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        lede={page.heroLede}
        homeHref={localePath("home", locale)}
        homeLabel={dict.common.breadcrumbHome}
        currentLabel={dict.nav.product}
      />

      <section className="shell flex flex-col gap-10 py-16 sm:py-20">
        <Reveal>
          <SectionHeader label={page.heroLabel} title={page.areasTitle} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {page.areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.05}>
              <article className="h-full rounded-panel border border-line bg-raised p-7">
                <p className="font-mono text-[0.66rem] tracking-wider text-gold uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-medium text-ink">
                  {area.title}
                </h3>
                <p className="mt-2 leading-relaxed text-pretty text-ink-soft">
                  {area.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell flex flex-col gap-10 py-16 sm:py-20">
          <Reveal>
            <SectionHeader label={page.heroLabel} title={page.principlesTitle} />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.05}>
                <article className="h-full rounded-panel border border-line bg-raised p-6">
                  <h3 className="font-display text-base font-medium text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft">
                    {principle.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
              name: dict.nav.product,
              url: `${SITE_URL}${localePath("product", locale)}`,
            },
          ]),
          faqJsonLd(page.faq),
        ])}
      />
    </>
  );
}
