import { z } from "zod";

/** Deliberately simple, dependency-stable email check (same as legacy API). */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INTERESTS = ["pilot", "partner", "investor"] as const;
export type Interest = (typeof INTERESTS)[number];

/**
 * Shared between the client form and the API route. Field-level error texts
 * are NOT part of the schema; the UI maps issue paths to localized messages.
 */
export const pilotRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().min(5).max(200).regex(EMAIL_REGEX),
  company: z.string().trim().min(2).max(200),
  role: z.string().trim().min(2).max(120),
  interest: z.enum(INTERESTS),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  /** Honeypot — must stay empty. Evaluated server-side. */
  website: z.string().max(200).optional().default(""),
  /** Client timestamp for the minimum-fill-time check. */
  formStartedAt: z.number().optional(),
});

export type PilotRequest = z.infer<typeof pilotRequestSchema>;

export type PilotField = Exclude<
  keyof PilotRequest,
  "website" | "formStartedAt"
>;

/** Extracts the set of invalid form fields from a Zod error. */
export function invalidFields(error: z.ZodError): PilotField[] {
  const fields = new Set<PilotField>();
  for (const issue of error.issues) {
    const first = issue.path[0];
    if (
      first === "name" ||
      first === "email" ||
      first === "company" ||
      first === "role" ||
      first === "interest" ||
      first === "message" ||
      first === "consent"
    ) {
      fields.add(first);
    }
  }
  return [...fields];
}
