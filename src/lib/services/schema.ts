import { z } from "zod";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

/** Deliberately simple, dependency-stable email check (same as legacy API). */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SERVICE_INTERESTS = [
  "potentialAnalysis",
  "toolConsulting",
  "starterCourses",
  "automation",
  "aiWebsites",
  "unsure",
] as const;

export type ServiceInterest = (typeof SERVICE_INTERESTS)[number];

export const servicesRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().min(5).max(200).regex(EMAIL_REGEX),
  company: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  interest: z.enum(SERVICE_INTERESTS),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(locales),
  /** Honeypot — must stay empty. Evaluated server-side. */
  website: z.string().max(200).optional().default(""),
  /** Client timestamp for the minimum-fill-time check. */
  formStartedAt: z.number().optional(),
});

export type ServicesRequest = z.infer<typeof servicesRequestSchema>;

export type ServicesField = Exclude<
  keyof ServicesRequest,
  "website" | "formStartedAt" | "locale" | "company" | "phone"
>;

/** Extracts the set of invalid form fields from a Zod error. */
export function invalidServicesFields(error: z.ZodError): ServicesField[] {
  const fields = new Set<ServicesField>();
  for (const issue of error.issues) {
    const first = issue.path[0];
    if (
      first === "name" ||
      first === "email" ||
      first === "interest" ||
      first === "message"
    ) {
      fields.add(first);
    }
  }
  return [...fields];
}

/** Human-readable interest labels for outbound mail (by form locale). */
export function serviceInterestMailLabel(
  interest: ServiceInterest,
  locale: Locale,
): string {
  const de: Record<ServiceInterest, string> = {
    potentialAnalysis: "KI-Potenzialanalyse",
    toolConsulting: "KI- & Tool-Beratung",
    starterCourses: "KI-Einsteigerkurs für Unternehmen",
    automation: "Automatisierung wiederkehrender Aufgaben",
    aiWebsites: "KI-gestützte Webseite",
    unsure: "Noch unsicher / Beratung gewünscht",
  };
  const en: Record<ServiceInterest, string> = {
    potentialAnalysis: "AI potential analysis",
    toolConsulting: "AI & tool consulting",
    starterCourses: "AI starter courses for teams",
    automation: "Automating recurring tasks",
    aiWebsites: "AI-supported website",
    unsure: "Not sure yet / general consultation",
  };
  return locale === "de" ? de[interest] : en[interest];
}
