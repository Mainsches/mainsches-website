import { describe, expect, it } from "vitest";
import { invalidFields, pilotRequestSchema } from "@/lib/pilot/schema";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines AG",
  role: "CTO",
  interest: "pilot",
  message: "We would like to evaluate Mainsches Hub for document workflows.",
  consent: true,
  website: "",
  formStartedAt: Date.now() - 10_000,
};

describe("pilotRequestSchema", () => {
  it("accepts a valid payload", () => {
    const result = pilotRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("trims whitespace-only fields into failures", () => {
    const result = pilotRequestSchema.safeParse({
      ...validPayload,
      name: "   ",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email addresses", () => {
    for (const email of ["nope", "a@b", "a b@c.de", "@example.com"]) {
      const result = pilotRequestSchema.safeParse({ ...validPayload, email });
      expect(result.success, email).toBe(false);
      if (!result.success) {
        expect(invalidFields(result.error)).toContain("email");
      }
    }
  });

  it("requires privacy consent", () => {
    const result = pilotRequestSchema.safeParse({
      ...validPayload,
      consent: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(invalidFields(result.error)).toEqual(["consent"]);
    }
  });

  it("rejects unknown interest values", () => {
    const result = pilotRequestSchema.safeParse({
      ...validPayload,
      interest: "spam",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(invalidFields(result.error)).toEqual(["interest"]);
    }
  });

  it("rejects too-short messages", () => {
    const result = pilotRequestSchema.safeParse({
      ...validPayload,
      message: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(invalidFields(result.error)).toEqual(["message"]);
    }
  });

  it("collects multiple invalid fields at once", () => {
    const result = pilotRequestSchema.safeParse({
      ...validPayload,
      name: "",
      email: "bad",
      consent: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(invalidFields(result.error).sort()).toEqual([
        "consent",
        "email",
        "name",
      ]);
    }
  });

  it("keeps the honeypot out of user-facing field errors", () => {
    const result = pilotRequestSchema.safeParse({
      ...validPayload,
      website: "x".repeat(300),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(invalidFields(result.error)).toEqual([]);
    }
  });
});
