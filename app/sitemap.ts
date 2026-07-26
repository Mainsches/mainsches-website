import type { MetadataRoute } from "next";
import { routeDefs, type RouteKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

const PRIORITIES: Record<RouteKey, number> = {
  home: 1,
  product: 0.9,
  workflows: 0.8,
  security: 0.8,
  useCases: 0.8,
  pilot: 0.9,
  legal: 0.3,
  privacy: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const key of Object.keys(routeDefs) as RouteKey[]) {
    const paths = routeDefs[key];

    for (const locale of ["de", "en"] as const) {
      entries.push({
        url: `${SITE_URL}${paths[locale]}`,
        changeFrequency: "monthly",
        priority: PRIORITIES[key],
        alternates: {
          languages: {
            de: `${SITE_URL}${paths.de}`,
            en: `${SITE_URL}${paths.en}`,
          },
        },
      });
    }
  }

  return entries;
}
