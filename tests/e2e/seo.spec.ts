import { expect, test, type Page } from "@playwright/test";
import { de } from "../../src/lib/i18n/dictionaries/de";
import { en } from "../../src/lib/i18n/dictionaries/en";

const SITE = "https://mainsches.com";

type JsonLdNode = { "@type": string } & Record<string, unknown>;

async function jsonLdNodes(page: Page): Promise<JsonLdNode[]> {
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const nodes: JsonLdNode[] = [];
  for (const raw of scripts) {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const graph = parsed["@graph"];
    if (Array.isArray(graph)) {
      nodes.push(...(graph as JsonLdNode[]));
    } else if (typeof parsed["@type"] === "string") {
      nodes.push(parsed as JsonLdNode);
    }
  }
  return nodes;
}

async function jsonLdTypes(page: Page): Promise<string[]> {
  return (await jsonLdNodes(page)).map((node) => node["@type"]);
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

  test("Organization carries the verified LinkedIn profile as sameAs", async ({
    page,
  }) => {
    await page.goto("/en");
    const nodes = await jsonLdNodes(page);
    const organization = nodes.find((node) => node["@type"] === "Organization");
    expect(organization).toBeDefined();
    expect(organization?.sameAs).toEqual([
      "https://www.linkedin.com/company/136038044/",
    ]);
  });

  test("FAQPage JSON-LD only contains questions that are visible on the page", async ({
    page,
  }) => {
    for (const path of ["/en", "/de", "/en/product", "/de/security"]) {
      await page.goto(path);
      const nodes = await jsonLdNodes(page);
      const faqPages = nodes.filter((node) => node["@type"] === "FAQPage");
      expect(faqPages.length, path).toBeGreaterThan(0);

      const visibleQuestions = (
        await page.locator("details summary").allTextContents()
      ).map((text) => text.trim());
      const visibleAnswers = (
        await page.locator("details > p").allTextContents()
      ).map((text) => text.trim());

      for (const faq of faqPages) {
        const mainEntity = faq.mainEntity as {
          name: string;
          acceptedAnswer: { text: string };
        }[];
        for (const entry of mainEntity) {
          expect(visibleQuestions, `${path}: ${entry.name}`).toContain(
            entry.name,
          );
          expect(visibleAnswers, `${path}: ${entry.name}`).toContain(
            entry.acceptedAnswer.text,
          );
        }
      }
    }
  });
});

test.describe("contextual internal links", () => {
  test("home links to the workflows page from the adaptive section", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(
      page
        .locator("main")
        .getByRole("link", { name: en.home.adaptive.moreLink }),
    ).toHaveAttribute("href", "/en/workflows");
  });

  test("product page deep-links to workflows and security", async ({
    page,
  }) => {
    await page.goto("/en/product");
    const main = page.locator("main");
    await expect(
      main.getByRole("link", { name: en.product.workflowsLink }),
    ).toHaveAttribute("href", "/en/workflows");
    await expect(
      main.getByRole("link", { name: en.product.securityLink }),
    ).toHaveAttribute("href", "/en/security");
  });

  test("workflows page links to use cases; use cases page links to product", async ({
    page,
  }) => {
    await page.goto("/de/workflows");
    await expect(
      page
        .locator("main")
        .getByRole("link", { name: de.workflowsPage.useCasesLink }),
    ).toHaveAttribute("href", "/de/use-cases");

    await page.goto("/de/use-cases");
    await expect(
      page
        .locator("main")
        .getByRole("link", { name: de.useCasesPage.productLink }),
    ).toHaveAttribute("href", "/de/product");
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

    // hreflang annotations match the on-page metadata, including x-default.
    expect(xml).toContain(`hreflang="x-default"`);
    expect(xml).not.toContain("vercel.app");
    expect(xml).not.toContain(".html");
    expect(xml).not.toContain("/api/");
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
