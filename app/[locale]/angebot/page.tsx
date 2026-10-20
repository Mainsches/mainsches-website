import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesPage } from "@/components/services/ServicesPage";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/** German-only slug; the English twin lives at /en/services. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") return {};
  const dict = getDictionary("de");
  return pageMetadata({
    route: "services",
    locale: "de",
    title: dict.meta.services.title,
    description: dict.meta.services.description,
  });
}

export default async function AngebotPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();

  return <ServicesPage locale="de" />;
}
