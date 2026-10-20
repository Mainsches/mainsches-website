import { PageHero } from "@/components/layout/PageHero";
import { ServicesMainContent } from "@/components/services/ServicesMainContent";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { breadcrumbJsonLd, jsonLdDocument } from "@/lib/jsonld";
import { localePath } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export function ServicesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const page = dict.servicesPage;

  return (
    <>
      <PageHero
        label={page.heroLabel}
        title={page.heroTitle}
        lede={page.heroLede}
        homeHref={localePath("home", locale)}
        homeLabel={dict.common.breadcrumbHome}
        currentLabel={dict.nav.services}
      />

      <ServicesMainContent dict={dict} locale={locale} />

      <JsonLd
        json={jsonLdDocument([
          breadcrumbJsonLd([
            {
              name: dict.common.breadcrumbHome,
              url: `${SITE_URL}${localePath("home", locale)}`,
            },
            {
              name: dict.nav.services,
              url: `${SITE_URL}${localePath("services", locale)}`,
            },
          ]),
        ])}
      />
    </>
  );
}
