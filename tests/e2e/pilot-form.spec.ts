import { expect, test } from "@playwright/test";
import { de } from "../../src/lib/i18n/dictionaries/de";
import { en } from "../../src/lib/i18n/dictionaries/en";

const form = en.pilotPage.form;

test.describe("pilot form validation", () => {
  test("empty submission shows an accessible error summary", async ({
    page,
  }) => {
    await page.goto("/en/pilot-program");

    await page.getByRole("button", { name: form.submit }).click();

    // Filter out Next.js' own route announcer, which also has role=alert.
    const summary = page
      .getByRole("alert")
      .filter({ hasText: form.errorSummaryTitle });
    await expect(summary).toBeVisible();
    await expect(summary).toContainText(form.errors.name);
    await expect(summary).toContainText(form.errors.consent);
    await expect(summary).toBeFocused();

    // Fields carry aria-invalid + a linked error message.
    const nameField = page.getByLabel(new RegExp(form.name));
    await expect(nameField).toHaveAttribute("aria-invalid", "true");
  });

  test("errors clear once the data is valid", async ({ page }) => {
    await page.goto("/en/pilot-program");
    await page.getByRole("button", { name: form.submit }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: form.errorSummaryTitle }),
    ).toBeVisible();

    await page.getByLabel(new RegExp(form.name)).fill("Ada Lovelace");
    await page.getByLabel(new RegExp(form.email)).fill("ada@example.com");
    await page.getByLabel(new RegExp(form.company)).fill("Analytical AG");
    await page.getByLabel(new RegExp(form.role)).fill("CTO");
    await page.getByLabel(new RegExp(form.interestPilot)).check();
    await page
      .getByLabel(new RegExp(form.message))
      .fill("We would like to join the pilot program.");
    await page.getByRole("checkbox").check();

    // Give the minimum-fill-time spam check its three seconds.
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: form.submit }).click();

    // Local runs have no SMTP configuration → the honest fallback appears,
    // never a fake success message.
    await expect(page.getByText(form.notConfiguredTitle)).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText(form.success)).toBeHidden();

    const mailto = page.locator('a[href^="mailto:"]').first();
    await expect(mailto).toBeVisible();
  });

  test("German form is fully localized", async ({ page }) => {
    await page.goto("/de/pilot-program");
    await expect(
      page.getByRole("button", { name: de.pilotPage.form.submit }),
    ).toBeVisible();
    await expect(
      page.getByLabel(new RegExp(de.pilotPage.form.email)),
    ).toBeVisible();
  });
});

test.describe("pilot API hardening", () => {
  test("rejects honeypot submissions", async ({ request }) => {
    const response = await request.post("/api/pilot", {
      data: {
        name: "Bot Bot",
        email: "bot@example.com",
        company: "Botfarm",
        role: "Bot",
        interest: "pilot",
        message: "Automated message that fills the honeypot.",
        consent: true,
        website: "https://spam.example.com",
        formStartedAt: Date.now() - 10_000,
      },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
  });

  test("rejects invalid payloads with field information", async ({
    request,
  }) => {
    const response = await request.post("/api/pilot", {
      data: { name: "x" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("validation");
    expect(body.fields).toContain("email");
  });
});
