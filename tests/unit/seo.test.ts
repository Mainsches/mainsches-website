import { describe, expect, it } from "vitest";
import { de } from "@/lib/i18n/dictionaries/de";
import { en } from "@/lib/i18n/dictionaries/en";
import {
  faqJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
import { routeDefs, type RouteKey } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { LINKEDIN_URL, SITE_URL } from "@/lib/site";

const routeKeys = Object.keys(routeDefs) as RouteKey[];

describe("page meta (titles and descriptions)", () => {
  it("titles are unique across all localized pages", () => {
    const titles = [de, en].flatMap((dict) =>
      routeKeys.map((key) => dict.meta[key].title),
    );
    expect(new Set(titles).size).toBe(titles.length);
  });

  for (const dict of [de, en]) {
    it(`${dict.locale}: every page has a unique title and description`, () => {
      const titles = routeKeys.map((key) => dict.meta[key].title);
      const descriptions = routeKeys.map((key) => dict.meta[key].description);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descriptions).size).toBe(descriptions.length);
    });

    it(`${dict.locale}: every title carries the brand`, () => {
      for (const key of routeKeys) {
        expect(dict.meta[key].title, `${dict.locale}:${key}`).toMatch(
          /Mainsches/,
        );
      }
    });

    it(`${dict.locale}: titles and descriptions stay within SERP-friendly bounds`, () => {
      for (const key of routeKeys) {
        const { title, description } = dict.meta[key];
        expect(title.length, `${dict.locale}:${key} title`).toBeLessThanOrEqual(
          70,
        );
        expect(
          description.length,
          `${dict.locale}:${key} description`,
        ).toBeGreaterThanOrEqual(50);
        expect(
          description.length,
          `${dict.locale}:${key} description`,
        ).toBeLessThanOrEqual(180);
      }
    });
  }
});

describe("pageMetadata", () => {
  it("builds absolute canonical, hreflang pair, and x-default", () => {
    const meta = pageMetadata({
      route: "home",
      locale: "de",
      title: de.meta.home.title,
      description: de.meta.home.description,
    });

    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/de`);
    expect(meta.alternates?.languages).toEqual({
      de: `${SITE_URL}/de`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/en`,
    });
    expect(meta.openGraph?.url).toBe(`${SITE_URL}/de`);
    expect(meta.openGraph && "locale" in meta.openGraph
      ? meta.openGraph.locale
      : undefined).toBe("de_CH");
  });

  it("cross-references localized legal slugs", () => {
    const meta = pageMetadata({
      route: "legal",
      locale: "de",
      title: de.meta.legal.title,
      description: de.meta.legal.description,
    });

    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/de/impressum`);
    expect(meta.alternates?.languages).toEqual({
      de: `${SITE_URL}/de/impressum`,
      en: `${SITE_URL}/en/legal-notice`,
      "x-default": `${SITE_URL}/en/legal-notice`,
    });
  });
});

describe("structured data builders", () => {
  it("Organization links the verified LinkedIn profile via sameAs", () => {
    const org = organizationJsonLd();
    expect(org.sameAs).toEqual([LINKEDIN_URL]);
    expect(org.url).toBe(SITE_URL);
    expect(org.logo).toBe(`${SITE_URL}/assets/logo.png`);
  });

  it("WebSite names the product and brand without a SearchAction", () => {
    const site = webSiteJsonLd("en");
    expect(site.name).toBe("Mainsches Hub");
    expect(site.alternateName).toBe("Mainsches");
    expect(site.url).toBe(SITE_URL);
    expect(site).not.toHaveProperty("potentialAction");
  });

  it("FAQPage mirrors the given items one-to-one", () => {
    const items = en.home.faq.items;
    const faq = faqJsonLd(items) as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(faq.mainEntity).toHaveLength(items.length);
    expect(faq.mainEntity.map((entry) => entry.name)).toEqual(
      items.map((item) => item.question),
    );
    expect(faq.mainEntity.map((entry) => entry.acceptedAnswer.text)).toEqual(
      items.map((item) => item.answer),
    );
  });
});
