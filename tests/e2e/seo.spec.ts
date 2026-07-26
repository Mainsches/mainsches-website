import { expect, test, type Page } from "@playwright/test";

const SITE = "https://mainsches.com";

async function jsonLdTypes(page: Page): Promise<string[]> {
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const types: string[] = [];
  for (const raw of scripts) {
    const parsed = JSON.parse(raw) as
      | { "@graph"?: { "@type": string }[] }
      | { "@type": string };
    if ("@graph" in parsed && parsed["@graph"]) {
      for (const node of parsed["@graph"]) types.push(node["@type"]);
    } else if ("@type" in parsed) {
      types.push(parsed["@type"]);
    }
  }
  return types;
}

test.describe("metadata", () => {
  test("English home has canonical, hreflang, OG and Twitter tags", async ({
    page,
  }) => {
    await page.goto("/en");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle(/Mainsches Hub/);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE}/en`,
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="de"]'),
    ).toHaveAttribute("href", `${SITE}/de`);
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", `${SITE}/en`);
    await expect(
      page.locator('link[rel="alternate"][hreflang="x-default"]'),
    ).toHaveAttribute("href", `${SITE}/en`);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.{50,}/);

    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /^https:\/\/mainsches\.com\/.+/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });

  test("German home is fully localized", async ({ page }) => {
    await page.goto("/de");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE}/de`,
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "de_CH",
    );
  });

  test("subpages carry route-specific canonicals and alternates", async ({
    page,
  }) => {
    await page.goto("/en/product");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE}/en/product`,
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="de"]'),
    ).toHaveAttribute("href", `${SITE}/de/product`);
  });

  test("legal twins cross-reference localized slugs", async ({ page }) => {
    await page.goto("/de/impressum");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${SITE}/de/impressum`,
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", `${SITE}/en/legal-notice`);
  });

  test("every core page has exactly one h1", async ({ page }) => {
    for (const path of ["/en", "/en/product", "/en/security", "/de"]) {
      await page.goto(path);
      await expect(page.locator("h1"), path).toHaveCount(1);
    }
  });
});

test.describe("structured data", () => {
  test("home exposes Organization, WebSite, SoftwareApplication and FAQPage", async ({
    page,
  }) => {
    await page.goto("/en");
    const types = await jsonLdTypes(page);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    expect(types).toContain("SoftwareApplication");
    expect(types).toContain("FAQPage");
  });

  test("subpages expose BreadcrumbList", async ({ page }) => {
    await page.goto("/en/product");
    const types = await jsonLdTypes(page);
    expect(types).toContain("BreadcrumbList");
  });
});

test.describe("sitemap and robots", () => {
  test("sitemap lists all 16 localized URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();

    const expected = [
      "/de",
      "/en",
      "/de/product",
      "/en/product",
      "/de/workflows",
      "/en/workflows",
      "/de/security",
      "/en/security",
      "/de/use-cases",
      "/en/use-cases",
      "/de/pilot-program",
      "/en/pilot-program",
      "/de/impressum",
      "/en/legal-notice",
      "/de/datenschutz",
      "/en/privacy",
    ];
    for (const path of expected) {
      expect(xml).toContain(`<loc>${SITE}${path}</loc>`);
    }
    expect(xml.match(/<loc>/g)).toHaveLength(16);
  });

  test("robots.txt allows crawling and references the sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain("User-Agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });
});

test.describe("security headers", () => {
  test("CSP and hardening headers are set", async ({ request }) => {
    const response = await request.get("/en");
    const headers = response.headers();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
  });
});
