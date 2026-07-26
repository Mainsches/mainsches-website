import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { HubConsole } from "@/components/home/HubConsole";
import { OtherProducts } from "@/components/home/OtherProducts";
import { SystemDiagram } from "@/components/home/SystemDiagram";
import { UseCaseSwitcher } from "@/components/home/UseCaseSwitcher";
import { WorkflowExplorer } from "@/components/home/WorkflowExplorer";
import { JsonLd } from "@/components/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { faqJsonLd, jsonLdDocument } from "@/lib/jsonld";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    route: "home",
    locale,
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const home = dict.home;

  return (
    <>
      {/* 1 — Hero with the interactive Hub console as its visual */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.07),transparent_55%)]"
        />
        <div className="shell relative flex flex-col gap-12 pt-16 pb-20 sm:pt-24 sm:pb-24">
          <div className="max-w-3xl">
            <p className="section-label flex items-center gap-3">
              <span className="label-rule" aria-hidden="true" />
              {home.hero.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
              {home.hero.titlePre}{" "}
              <span className="text-gold">{home.hero.titleGold}</span>{" "}
              {home.hero.titlePost}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-soft">
              {home.hero.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={localePath("product", locale)}>
                {home.hero.ctaPrimary}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink
                href={localePath("pilot", locale)}
                variant="secondary"
              >
                {home.hero.ctaSecondary}
              </ButtonLink>
            </div>
          </div>

          <Reveal>
            <HubConsole
              dict={home.console}
              conceptDemoLabel={dict.common.conceptDemo}
            />
            <p className="mt-3 text-right text-xs text-ink-faint">
              {home.console.reducedMotionNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2 — What is an AI operating system */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-12 py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              label={home.whatIsOs.label}
              title={home.whatIsOs.title}
              lede={home.whatIsOs.definition}
            />
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {home.whatIsOs.points.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.06}>
                  <article className="h-full rounded-panel border border-line bg-raised p-6">
                    <h3 className="font-display text-base font-medium text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft">
                      {point.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <SystemDiagram dict={home.whatIsOs.diagram} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Local & cloud AI */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-12 py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              label={home.localCloud.label}
              title={home.localCloud.title}
              lede={home.localCloud.lede}
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                { title: home.localCloud.localTitle, points: home.localCloud.localPoints, accent: true },
                { title: home.localCloud.cloudTitle, points: home.localCloud.cloudPoints, accent: false },
              ] as const
            ).map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <article
                  className={`h-full rounded-panel border p-7 ${
                    card.accent
                      ? "border-gold-line bg-gold-tint"
                      : "border-line bg-raised"
                  }`}
                >
                  <h3 className="font-display text-xl font-medium text-ink">
                    {card.title}
                  </h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"
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

          <Reveal>
            <p className="font-display text-lg text-balance text-ink">
              {home.localCloud.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 — Adaptive workflows */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-12 py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              label={home.adaptive.label}
              title={home.adaptive.title}
              lede={home.adaptive.lede}
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {home.adaptive.points.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.06}>
                <article className="h-full rounded-panel border border-line bg-raised p-6">
                  <p className="font-mono text-[0.66rem] tracking-wider text-gold uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-base font-medium text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft">
                    {point.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Clickable workflow pipeline */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-12 py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              label={home.flow.label}
              title={home.flow.title}
              lede={home.flow.lede}
            />
          </Reveal>
          <Reveal>
            <WorkflowExplorer dict={home.flow} />
          </Reveal>
        </div>
      </section>

      {/* 7 — Use-case switcher */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-12 py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              label={home.useCases.label}
              title={home.useCases.title}
              lede={home.useCases.lede}
            />
          </Reveal>
          <Reveal>
            <UseCaseSwitcher
              dict={home.useCases}
              plannedLabel={dict.common.planned}
            />
          </Reveal>
          <Link
            href={localePath("useCases", locale)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-soft transition-colors duration-200 hover:text-gold"
          >
            {home.useCases.moreLink}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      {/* 8 — Security & privacy by design */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-12 py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              label={home.security.label}
              title={home.security.title}
              lede={home.security.lede}
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.security.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="h-full rounded-panel border border-line bg-raised p-6">
                  <h3 className="font-display text-base font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <p className="max-w-2xl text-xs leading-relaxed text-ink-faint">
              {home.security.disclaimer}
            </p>
            <Link
              href={localePath("security", locale)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-soft transition-colors duration-200 hover:text-gold"
            >
              {home.security.moreLink}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — Product status / vision */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-12 py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              label={home.status.label}
              title={home.status.title}
              lede={home.status.lede}
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-panel border border-line bg-raised p-7">
                <Badge variant="gold">{dict.common.productDirection}</Badge>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">
                  {home.status.nowTitle}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {home.status.nowItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="h-full rounded-panel border border-dashed border-line-strong p-7">
                <Badge variant="outline">{dict.common.inDevelopment}</Badge>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">
                  {home.status.plannedTitle}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {home.status.plannedItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink-faint"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink-faint"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>

          <Reveal>
            <p className="max-w-3xl font-display text-xl leading-relaxed text-balance text-ink sm:text-2xl">
              {home.status.visionNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 10 — Pilot CTA */}
      <section className="border-t border-line">
        <div className="shell py-20 sm:py-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-panel border border-gold-line bg-raised p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_55%)]"
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <SectionHeader
                    label={home.pilotCta.label}
                    title={home.pilotCta.title}
                    lede={home.pilotCta.lede}
                  />
                  <ul className="mt-6 flex flex-col gap-3">
                    {home.pilotCta.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-gold"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <ButtonLink href={localePath("pilot", locale)}>
                  {home.pilotCta.cta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 12 — FAQ (visible; matching FAQPage JSON-LD below) */}
      <section className="border-t border-line">
        <div className="shell flex flex-col gap-10 py-20 sm:py-28">
          <Reveal>
            <SectionHeader label={home.faq.label} title={home.faq.title} />
          </Reveal>
          <Reveal>
            <FaqList items={home.faq.items} />
          </Reveal>
        </div>
      </section>

      {/* 11 — Other products by Mainsches (deliberately last before footer) */}
      <OtherProducts
        dict={home.otherProducts}
        externalHint={dict.common.externalLinkHint}
      />

      <JsonLd json={jsonLdDocument([faqJsonLd(home.faq.items)])} />
    </>
  );
}
