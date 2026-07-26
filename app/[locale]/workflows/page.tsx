import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/JsonLd";
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
    route: "workflows",
    locale,
    title: dict.meta.workflows.title,
    description: dict.meta.workflows.description,
  });
}

export default async function WorkflowsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.workflowsPage;

  return (
    <>
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        lede={page.heroLede}
        homeHref={localePath("home", locale)}
        homeLabel={dict.common.breadcrumbHome}
        currentLabel={dict.nav.workflows}
      />

      {/* Lifecycle */}
      <section className="shell flex flex-col gap-10 py-16 sm:py-20">
        <Reveal>
          <SectionHeader label={page.heroLabel} title={page.lifecycleTitle} />
        </Reveal>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.lifecycle.map((phase, index) => (
            <Reveal key={phase.step} delay={index * 0.05}>
              <li className="flex h-full flex-col gap-3 rounded-panel border border-line bg-raised p-6">
                <span className="font-mono text-sm text-gold">{phase.step}</span>
                <h3 className="font-display text-lg font-medium text-ink">
                  {phase.title}
                </h3>
                <p className="text-sm leading-relaxed text-pretty text-ink-soft">
                  {phase.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Examples */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-10 py-16 sm:py-20">
          <Reveal>
            <SectionHeader
              label={page.heroLabel}
              title={page.examplesTitle}
              lede={page.examplesLede}
            />
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-3">
            {page.examples.map((example, index) => (
              <Reveal key={example.title} delay={index * 0.05}>
                <article className="flex h-full flex-col gap-4 rounded-panel border border-line bg-raised p-6">
                  <h3 className="font-display text-lg font-medium text-ink">
                    {example.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-pretty text-ink-soft">
                    {example.body}
                  </p>
                  <ul className="mt-auto flex flex-col gap-2 rounded-card border border-line bg-inset p-4">
                    {example.steps.map((step) => (
                      <li
                        key={step}
                        className="font-mono text-xs leading-relaxed text-ink-soft"
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="max-w-2xl text-xs leading-relaxed text-ink-faint">
            {page.exampleNote}
          </p>
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
              name: dict.nav.workflows,
              url: `${SITE_URL}${localePath("workflows", locale)}`,
            },
          ]),
        ])}
      />
    </>
  );
}
