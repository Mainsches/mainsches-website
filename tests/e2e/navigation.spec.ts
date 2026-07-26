import { expect, test } from "@playwright/test";
import { de } from "../../src/lib/i18n/dictionaries/de";
import { en } from "../../src/lib/i18n/dictionaries/en";

test.describe("primary navigation (desktop)", () => {
  test("all nav links reach their pages in English", async ({ page }) => {
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: en.nav.ariaPrimary });

    const targets: [string, string][] = [
      [en.nav.product, "/en/product"],
      [en.nav.workflows, "/en/workflows"],
      [en.nav.security, "/en/security"],
      [en.nav.useCases, "/en/use-cases"],
      [en.nav.pilot, "/en/pilot-program"],
    ];

    for (const [label, url] of targets) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(url);
      await expect(page.locator("h1")).toBeVisible();
      const current = nav.getByRole("link", { name: label, exact: true });
      await expect(current).toHaveAttribute("aria-current", "page");
    }
  });

  test("the logo returns to the localized home page", async ({ page }) => {
    await page.goto("/de/security");
    await page.getByRole("link", { name: de.nav.homeAria }).click();
    await expect(page).toHaveURL("/de");
  });
});

test.describe("language switcher", () => {
  test("keeps the current subpage when switching to German", async ({
    page,
  }) => {
    await page.goto("/en/product");
    await page.getByRole("link", { name: "Deutsch" }).click();
    await expect(page).toHaveURL("/de/product");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
  });

  test("maps localized legal slugs to their twin", async ({ page }) => {
    await page.goto("/de/impressum");
    await page.getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL("/en/legal-notice");
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens as a dialog, navigates, and closes", async ({ page }) => {
    await page.goto("/en");

    await page.getByRole("button", { name: en.common.menuOpen }).click();
    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("link", { name: en.nav.security }).click();
    await expect(page).toHaveURL("/en/security");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
  });

  test("closes with the Escape key", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: en.common.menuOpen }).click();
    await expect(page.locator("dialog[open]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
  });
});

test.describe("footer and external links", () => {
  test("footer links to legal pages", async ({ page }) => {
    await page.goto("/de");
    const footer = page.getByRole("contentinfo");
    await expect(
      footer.getByRole("link", { name: de.footer.impressum }),
    ).toHaveAttribute("href", "/de/impressum");
    await expect(
      footer.getByRole("link", { name: de.footer.privacy }),
    ).toHaveAttribute("href", "/de/datenschutz");
  });

  test("other products keep their verified external targets", async ({
    page,
  }) => {
    await page.goto("/en");
    const section = page.locator("#other-products");
    await expect(section).toBeVisible();

    const swipesort = section.getByRole("link", {
      name: new RegExp(en.home.otherProducts.swipeSortCta),
    });
    await expect(swipesort).toHaveAttribute(
      "href",
      /play\.google\.com|swipesort/,
    );

    const idradar = section.getByRole("link", {
      name: new RegExp(en.home.otherProducts.idRadarCta),
    });
    await expect(idradar).toHaveAttribute("href", /idradar\.ch/);
  });

  test("every external link opens safely", async ({ page }) => {
    await page.goto("/en");
    const external = await page
      .locator('a[target="_blank"]')
      .evaluateAll((links) =>
        links.map((link) => ({
          href: link.getAttribute("href"),
          rel: link.getAttribute("rel") ?? "",
        })),
      );
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.rel, `${link.href}`).toContain("noopener");
    }
  });
});

test.describe("keyboard access", () => {
  test("skip link is the first focusable element and works", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: en.common.skipToContent });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main/);
  });

  test("interactive elements show a visible focus indicator", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // logo

    const outline = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return "";
      return window.getComputedStyle(active).outlineStyle;
    });
    expect(outline).not.toBe("none");
  });
});
