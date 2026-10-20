import { expect, test } from "@playwright/test";
import { de } from "../../src/lib/i18n/dictionaries/de";
import { en } from "../../src/lib/i18n/dictionaries/en";

const formEn = en.servicesPage.form;
const formDe = de.servicesPage.form;

function openEnquiryFromOffer(
  page: import("@playwright/test").Page,
  offerIndex: number,
  locale: "de" | "en",
) {
  const dict = locale === "de" ? de : en;
  const offer = dict.servicesPage.offers[offerIndex]!;
  const card = page
    .getByRole("article")
    .filter({ hasText: offer.title });
  return card.getByRole("button", { name: offer.cta }).click();
}

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

test.describe("services offers layout", () => {
  test("shows five offers in order without inline enquiry form", async ({
    page,
  }) => {
    await page.goto("/en/services");
    const articles = page.locator("main article");
    await expect(articles).toHaveCount(5);

    const titles = await articles.locator("h3").allTextContents();
    expect(titles).toEqual(en.servicesPage.offers.map((offer) => offer.title));

    await expect(page.locator("dialog[open]")).toHaveCount(0);
    await expect(page.getByLabel(new RegExp(formEn.email))).toBeHidden();
    await expect(page.getByRole("button", { name: formEn.submit })).toBeHidden();
  });
});

test.describe("services enquiry dialog", () => {
  test("CTA opens dialog with preselected interest", async ({ page }) => {
    await page.goto("/en/services");
    await openEnquiryFromOffer(page, 3, "en");

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: en.servicesPage.formTitle }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("paragraph").filter({
        hasText: en.servicesPage.offers[3]!.title,
      }),
    ).toBeVisible();
    await expect(page.getByLabel(new RegExp(formEn.interest))).toHaveValue(
      "automation",
    );
  });

  for (const [index, offer] of en.servicesPage.offers.entries()) {
    test(`offer ${offer.number} opens dialog with ${offer.id} selected`, async ({
      page,
    }) => {
      await page.goto("/en/services");
      await openEnquiryFromOffer(page, index, "en");
      await expect(page.locator("dialog[open]")).toBeVisible();
      await expect(page.getByLabel(new RegExp(formEn.interest))).toHaveValue(
        offer.id,
      );
    });
  }

  test("close button dismisses dialog and returns focus to CTA", async ({
    page,
  }) => {
    await page.goto("/en/services");
    const cta = page
      .getByRole("article")
      .filter({ hasText: en.servicesPage.offers[0]!.title })
      .getByRole("button", { name: en.servicesPage.offers[0]!.cta });
    await cta.click();
    await expect(page.locator("dialog[open]")).toBeVisible();

    await page
      .getByRole("button", { name: en.servicesPage.dialogClose })
      .click();
    await expect(page.locator("dialog[open]")).toHaveCount(0);
    await expect(cta).toBeFocused();
  });

  test("Escape closes the dialog", async ({ page }) => {
    await page.goto("/en/services");
    await openEnquiryFromOffer(page, 1, "en");
    await expect(page.locator("dialog[open]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
  });
});

test.describe("services form validation", () => {
  async function openDialog(page: import("@playwright/test").Page) {
    await page.goto("/en/services");
    await openEnquiryFromOffer(page, 0, "en");
    await expect(page.locator("dialog[open]")).toBeVisible();
  }

  test("empty submission shows an accessible error summary", async ({
    page,
  }) => {
    await openDialog(page);
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
    await openDialog(page);
    await page.getByLabel(new RegExp(formEn.name)).fill("Test User");
    await page.getByLabel(new RegExp(formEn.email)).fill("not-an-email");
    await page
      .getByLabel(new RegExp(formEn.message))
      .fill("We need help with AI tooling selection.");
    await page.getByRole("button", { name: formEn.submit }).click();

    await expect(
      page.getByRole("alert").filter({ hasText: formEn.errorSummaryTitle }),
    ).toContainText(formEn.errors.email);
  });

  test("German form is fully localized in the dialog", async ({ page }) => {
    await page.goto("/de/angebot");
    await openEnquiryFromOffer(page, 0, "de");
    await expect(page.locator("dialog[open]")).toBeVisible();
    await expect(
      page.getByRole("button", { name: formDe.submit }),
    ).toBeVisible();
    await expect(page.getByLabel(new RegExp(formDe.email))).toBeVisible();
  });

  test("honest fallback when SMTP is not configured", async ({ page }) => {
    await openDialog(page);
    await page.getByLabel(new RegExp(formEn.name)).fill("Ada Lovelace");
    await page.getByLabel(new RegExp(formEn.email)).fill("ada@example.com");
    await page
      .getByLabel(new RegExp(formEn.message))
      .fill("We would like consulting on local vs cloud AI tools.");
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: formEn.submit }).click();

    await expect(page.getByText(formEn.notConfiguredTitle)).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText(formEn.success)).toBeHidden();
    await expect(page.locator("dialog[open]")).toBeVisible();
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
