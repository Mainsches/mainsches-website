import type { Locale } from "@/lib/i18n/config";
import type { FaqItem } from "@/lib/i18n/types";
import { CONTACT_EMAIL, ORG_NAME, PRODUCT_NAME, SITE_URL } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.png`,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
  };
}

export function webSiteJsonLd(locale: Locale): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: PRODUCT_NAME,
    url: SITE_URL,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function softwareApplicationJsonLd(locale: Locale): JsonLd {
  const description =
    locale === "de"
      ? "AI Operating System für die sichere Orchestrierung lokaler und cloudbasierter KI-Modelle, Dateien und adaptiver Workflows. In aktiver Entwicklung; Zugang über das Pilotprogramm."
      : "AI operating system for the secure orchestration of local and cloud AI models, files, and adaptive workflows. In active development; access via the pilot program.";

  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: PRODUCT_NAME,
    applicationCategory: "BusinessApplication",
    description,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqJsonLd(items: FaqItem[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  entries: { name: string; url: string }[],
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.url,
    })),
  };
}

/** Wraps one or more JSON-LD nodes into a single @graph document. */
export function jsonLdDocument(nodes: JsonLd[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}
