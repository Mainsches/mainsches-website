import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesPage } from "@/components/services/ServicesPage";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/** English-only slug; the German twin lives at /de/angebot. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  const dict = getDictionary("en");
  return pageMetadata({
    route: "services",
    locale: "en",
    title: dict.meta.services.title,
    description: dict.meta.services.description,
  });
}

export default async function ServicesRoutePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  return <ServicesPage locale="en" />;
}
