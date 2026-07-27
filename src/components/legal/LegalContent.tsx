import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { breadcrumbJsonLd, jsonLdDocument } from "@/lib/jsonld";
import { localePath, type RouteKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

/** Shared renderer for legal notice and privacy policy pages. */
export function LegalContent({
  dict,
  locale,
  page,
  route,
}: {
  dict: Dictionary;
  locale: Locale;
  page: Dictionary["legalPage"] | Dictionary["privacyPage"];
  route: Extract<RouteKey, "legal" | "privacy">;
}) {
  const currentLabel =
    route === "legal" ? dict.footer.impressum : dict.footer.privacy;

  return (
    <>
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        lede={page.heroLede}
        homeHref={localePath("home", locale)}
        homeLabel={dict.common.breadcrumbHome}
        currentLabel={currentLabel}
      />

      <section className="shell py-14 sm:py-16">
        <div className="flex max-w-3xl flex-col gap-4">
          {page.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-panel border border-line bg-raised p-6 sm:p-7"
            >
              <p className="section-label">{card.label}</p>
              <h2 className="mt-3 font-display text-lg font-medium text-ink">
                {card.title}
              </h2>
              {card.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
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
              name: currentLabel,
              url: `${SITE_URL}${localePath(route, locale)}`,
            },
          ]),
        ])}
      />
    </>
  );
}
