"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ServicesForm } from "@/components/services/ServicesForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import type { ServiceInterest } from "@/lib/services/schema";
import { localePath } from "@/lib/routes";

export function ServicesMainContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const page = dict.servicesPage;
  const [interest, setInterest] = useState<ServiceInterest | "">("");
  const enquiryRef = useRef<HTMLElement>(null);

  function scrollToEnquiry(next: ServiceInterest) {
    setInterest(next);
    enquiryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLSelectElement>(
          "#services-enquiry select[name='interest']",
        )
        ?.focus();
    });
  }

  return (
    <>
      <section className="shell flex flex-col gap-10 py-16 sm:py-20">
        <Reveal>
          <SectionHeader label={page.heroLabel} title={page.offersTitle} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {page.offers.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 0.05}>
              <article className="flex h-full flex-col gap-4 rounded-panel border border-line bg-raised p-7">
                <p className="font-mono text-xs tracking-wider text-ink-faint">
                  {offer.number}
                </p>
                <h3 className="font-display text-xl font-medium text-ink">
                  {offer.title}
                </h3>
                <p className="leading-relaxed text-pretty text-ink-soft">
                  {offer.purpose}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {offer.points.map((point) => (
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
                <button
                  type="button"
                  onClick={() =>
                    scrollToEnquiry(offer.id as ServiceInterest)
                  }
                  className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-gold-soft transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {offer.cta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        ref={enquiryRef}
        id="services-enquiry"
        className="border-t border-line scroll-mt-20"
      >
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
              <ServicesForm
                dict={page.form}
                locale={locale}
                interest={interest}
                onInterestChange={setInterest}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell py-16 sm:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-panel border border-gold-line bg-raised p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_55%)]"
              />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-xl">
                  <SectionHeader
                    label={page.heroLabel}
                    title={page.pilotPanelTitle}
                    lede={page.pilotPanelLede}
                  />
                </div>
                <ButtonLink href={localePath("pilot", locale)}>
                  {page.pilotPanelCta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
