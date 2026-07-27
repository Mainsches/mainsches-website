import { expect, test } from "@playwright/test";
import { de } from "../../src/lib/i18n/dictionaries/de";
import { en } from "../../src/lib/i18n/dictionaries/en";

test.describe("root locale negotiation", () => {
  test("redirects German browsers to /de", async ({ request }) => {
    const response = await request.get("/", {
      maxRedirects: 0,
      headers: { "accept-language": "de-CH,de;q=0.9,en;q=0.6" },
    });
    expect(response.status()).toBe(307);
    expect(response.headers()["location"]).toContain("/de");
  });

  test("redirects everyone else to /en", async ({ request }) => {
    const response = await request.get("/", {
      maxRedirects: 0,
      headers: { "accept-language": "fr-CH,fr;q=0.9" },
    });
    expect(response.status()).toBe(307);
    expect(response.headers()["location"]).toContain("/en");
  });

  test("prefixes locale-less paths instead of breaking them", async ({
    request,
  }) => {
    const response = await request.get("/product", { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers()["location"]).toContain("/en/product");
  });
});

test.describe("legacy URL redirects", () => {
  const cases: [string, string][] = [
    ["/index.html", "/en"],
    ["/contact.html", "/en/pilot-program"],
    ["/sketchit.html", "/en#other-products"],
    ["/swipesort.html", "/en#other-products"],
    ["/idradar.html", "/en#other-products"],
    ["/id-radar.html", "/en#other-products"],
    ["/impressum.html", "/de/impressum"],
    ["/privacy.html", "/en/privacy"],
  ];

  for (const [source, destination] of cases) {
    test(`${source} → ${destination}`, async ({ request }) => {
      const response = await request.get(source, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers()["location"]).toContain(destination);
    });
  }

  test("redirect targets resolve without chains", async ({ request }) => {
    for (const [, destination] of cases) {
      const target = destination.split("#")[0]!;
      const response = await request.get(target, { maxRedirects: 0 });
      expect(response.status(), target).toBe(200);
    }
  });
});

test.describe("preserved public files", () => {
  for (const file of [
    "/AI-privacy.html",
    "/app-ads.txt",
    "/googled32fd2521a5125c6.html",
  ]) {
    test(`${file} keeps serving`, async ({ request }) => {
      const response = await request.get(file);
      expect(response.status()).toBe(200);
    });
  }
});

test.describe("404 handling", () => {
  test("unknown English route shows the branded 404", async ({ page }) => {
    const response = await page.goto("/en/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: en.notFound.title }),
    ).toBeVisible();
    // Global chrome stays intact.
    await expect(
      page.getByRole("navigation", { name: en.nav.ariaPrimary }),
    ).toBeVisible();
  });

  test("unknown German route shows the German 404", async ({ page }) => {
    const response = await page.goto("/de/gibt-es-nicht");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: de.notFound.title }),
    ).toBeVisible();
  });

  test("legal slugs are locale-guarded", async ({ request }) => {
    for (const path of [
      "/en/impressum",
      "/en/datenschutz",
      "/de/legal-notice",
      "/de/privacy",
    ]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }
  });
});
