import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContent } from "@/components/legal/LegalContent";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/** German-only slug; the English twin lives at /en/privacy. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") return {};
  const dict = getDictionary("de");
  return pageMetadata({
    route: "privacy",
    locale: "de",
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  });
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "de") notFound();
  const dict = getDictionary("de");

  return (
    <LegalContent
      dict={dict}
      locale="de"
      page={dict.privacyPage}
      route="privacy"
    />
  );
}
