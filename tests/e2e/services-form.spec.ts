import { expect, test } from "@playwright/test";
import { de } from "../../src/lib/i18n/dictionaries/de";
import { en } from "../../src/lib/i18n/dictionaries/en";

const formEn = en.servicesPage.form;
const formDe = de.servicesPage.form;

test.describe("services page routing and SEO", () => {
  test("German and English services pages have one h1 and canonicals", async ({
    page,
  }) => {
    await page.goto("/de/angebot");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://mainsches.com/de/angebot",
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", "https://mainsches.com/en/services");
    await expect(
      page.locator('link[rel="alternate"][hreflang="x-default"]'),
    ).toHaveAttribute("href", "https://mainsches.com/en/services");

    await page.goto("/en/services");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://mainsches.com/en/services",
    );
  });

  test("language switch maps angebot and services", async ({ page }) => {
    await page.goto("/de/angebot");
    await page.getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL("/en/services");

    await page.getByRole("link", { name: "Deutsch" }).click();
    await expect(page).toHaveURL("/de/angebot");
  });
});

test.describe("services form validation", () => {
  test("empty submission shows an accessible error summary", async ({
    page,
  }) => {
    await page.goto("/en/services");

    await page.getByRole("button", { name: formEn.submit }).click();

    const summary = page
      .getByRole("alert")
      .filter({ hasText: formEn.errorSummaryTitle });
    await expect(summary).toBeVisible();
    await expect(summary).toContainText(formEn.errors.name);
    await expect(summary).toBeFocused();

    const emailField = page.getByLabel(new RegExp(formEn.email));
    await expect(emailField).toHaveAttribute("aria-invalid", "true");
  });

  test("invalid email is rejected", async ({ page }) => {
    await page.goto("/en/services");
    await page.getByLabel(new RegExp(formEn.name)).fill("Test User");
    await page.getByLabel(new RegExp(formEn.email)).fill("not-an-email");
    await page.getByLabel(new RegExp(formEn.interest)).selectOption(
      "potentialAnalysis",
    );
    await page
      .getByLabel(new RegExp(formEn.message))
      .fill("We need help with AI tooling selection.");
    await page.getByRole("button", { name: formEn.submit }).click();

    await expect(
      page.getByRole("alert").filter({ hasText: formEn.errorSummaryTitle }),
    ).toContainText(formEn.errors.email);
  });

  test("German form is fully localized", async ({ page }) => {
    await page.goto("/de/angebot");
    await expect(
      page.getByRole("button", { name: formDe.submit }),
    ).toBeVisible();
    await expect(
      page.getByLabel(new RegExp(formDe.email)),
    ).toBeVisible();
  });

  test("offer card CTA scrolls to the form and preselects interest", async ({
    page,
  }) => {
    await page.goto("/en/services");
    const automationCard = page
      .getByRole("article")
      .filter({ hasText: en.servicesPage.offers[3]!.title });
    await automationCard
      .getByRole("button", { name: en.servicesPage.offers[3]!.cta })
      .click();

    await expect(page.locator("#services-enquiry")).toBeInViewport();
    await expect(page.getByLabel(new RegExp(formEn.interest))).toHaveValue(
      "automation",
    );
  });

  test("honest fallback when SMTP is not configured", async ({ page }) => {
    await page.goto("/en/services");
    await page.getByLabel(new RegExp(formEn.name)).fill("Ada Lovelace");
    await page.getByLabel(new RegExp(formEn.email)).fill("ada@example.com");
    await page.getByLabel(new RegExp(formEn.interest)).selectOption(
      "toolConsulting",
    );
    await page
      .getByLabel(new RegExp(formEn.message))
      .fill("We would like consulting on local vs cloud AI tools.");
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: formEn.submit }).click();

    await expect(page.getByText(formEn.notConfiguredTitle)).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText(formEn.success)).toBeHidden();
  });
});

test.describe("services API hardening", () => {
  test("rejects honeypot submissions", async ({ request }) => {
    const response = await request.post("/api/services", {
      data: {
        name: "Bot Bot",
        email: "bot@example.com",
        interest: "unsure",
        message: "Automated message that fills the honeypot.",
        locale: "en",
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
    const response = await request.post("/api/services", {
      data: { name: "x", locale: "en" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("validation");
    expect(body.fields).toContain("email");
  });

  test("reports not configured without SMTP", async ({ request }) => {
    const response = await request.post("/api/services", {
      data: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        interest: "potentialAnalysis",
        message: "Valid message for services enquiry testing.",
        locale: "en",
        website: "",
        formStartedAt: Date.now() - 10_000,
      },
    });
    expect([503, 500]).toContain(response.status());
    if (response.status() === 503) {
      const body = await response.json();
      expect(body.configured).toBe(false);
    }
  });
});
