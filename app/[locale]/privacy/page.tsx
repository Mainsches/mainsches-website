import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContent } from "@/components/legal/LegalContent";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/** English-only slug; the German twin lives at /de/datenschutz. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};
  const dict = getDictionary("en");
  return pageMetadata({
    route: "privacy",
    locale: "en",
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  const dict = getDictionary("en");

  return (
    <LegalContent
      dict={dict}
      locale="en"
      page={dict.privacyPage}
      route="privacy"
    />
  );
}
