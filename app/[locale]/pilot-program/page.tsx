import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { PilotForm } from "@/components/pilot/PilotForm";
import { JsonLd } from "@/components/JsonLd";
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
    route: "pilot",
    locale,
    title: dict.meta.pilot.title,
    description: dict.meta.pilot.description,
  });
}

export default async function PilotProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.pilotPage;

  return (
    <>
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        lede={page.heroLede}
        homeHref={localePath("home", locale)}
        homeLabel={dict.common.breadcrumbHome}
        currentLabel={dict.nav.pilot}
      />

      {/* Audiences */}
      <section className="shell flex flex-col gap-10 py-16 sm:py-20">
        <Reveal>
          <SectionHeader label={page.heroLabel} title={page.audiencesTitle} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {page.audiences.map((audience, index) => (
            <Reveal key={audience.title} delay={index * 0.05}>
              <article className="h-full rounded-panel border border-line bg-raised p-6">
                <h3 className="font-display text-lg font-medium text-ink">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft">
                  {audience.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-line">
        <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <SectionHeader
                label={page.heroLabel}
                title={page.formTitle}
                lede={page.formLede}
              />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-panel border border-line bg-raised p-6 sm:p-8">
              <PilotForm dict={page.form} locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-10 py-16 sm:py-20">
          <Reveal>
            <SectionHeader label="FAQ" title={page.faqTitle} />
          </Reveal>
          <Reveal>
            <FaqList items={page.faq} />
          </Reveal>
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
              name: dict.nav.pilot,
              url: `${SITE_URL}${localePath("pilot", locale)}`,
            },
          ]),
          faqJsonLd(page.faq),
        ])}
      />
    </>
  );
}
