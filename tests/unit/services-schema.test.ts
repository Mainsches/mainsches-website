import { describe, expect, it } from "vitest";
import {
  invalidServicesFields,
  servicesRequestSchema,
} from "@/lib/services/schema";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines AG",
  phone: "+41 79 000 00 00",
  interest: "potentialAnalysis" as const,
  message: "We would like to explore AI potential in our workflows.",
  locale: "en" as const,
  website: "",
  formStartedAt: Date.now() - 10_000,
};

describe("servicesRequestSchema", () => {
  it("accepts a valid payload", () => {
    const result = servicesRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("allows empty optional company and phone", () => {
    const result = servicesRequestSchema.safeParse({
      ...validPayload,
      company: "",
      phone: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    for (const email of ["nope", "a@b", "a b@c.de", "@example.com"]) {
      const result = servicesRequestSchema.safeParse({ ...validPayload, email });
      expect(result.success, email).toBe(false);
      if (!result.success) {
        expect(invalidServicesFields(result.error)).toContain("email");
      }
    }
  });

  it("rejects unknown interest values", () => {
    const result = servicesRequestSchema.safeParse({
      ...validPayload,
      interest: "spam",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(invalidServicesFields(result.error)).toEqual(["interest"]);
    }
  });

  it("keeps the honeypot out of user-facing field errors", () => {
    const result = servicesRequestSchema.safeParse({
      ...validPayload,
      website: "x".repeat(300),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(invalidServicesFields(result.error)).toEqual([]);
    }
  });
});
