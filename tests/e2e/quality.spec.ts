import { expect, test } from "@playwright/test";

const BREAKPOINTS = [360, 430, 768, 1024, 1440, 1920];

test.describe("responsive layout", () => {
  for (const width of BREAKPOINTS) {
    test(`no horizontal scrollbar at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ["/en", "/de", "/en/pilot-program"]) {
        await page.goto(path);
        const overflow = await page.evaluate(() => {
          const root = document.documentElement;
          return root.scrollWidth - root.clientWidth;
        });
        expect(overflow, `${path} @ ${width}px`).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe("content accessibility", () => {
  test("all images provide alt attributes", async ({ page }) => {
    await page.goto("/en");
    const missing = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((img) => img.getAttribute("alt") === null)
          .map((img) => img.getAttribute("src")),
      );
    expect(missing).toEqual([]);
  });

  test("all buttons expose an accessible name", async ({ page }) => {
    await page.goto("/en");
    const unnamed = await page.locator("button").evaluateAll((buttons) =>
      buttons
        .filter((button) => {
          const label =
            button.getAttribute("aria-label") ??
            button.textContent?.trim() ??
            "";
          return label.length === 0;
        })
        .map((button) => button.outerHTML.slice(0, 120)),
    );
    expect(unnamed).toEqual([]);
  });

  test("landmarks are present on every core page", async ({ page }) => {
    for (const path of ["/en", "/de", "/en/product"]) {
      await page.goto(path);
      await expect(page.locator("header"), path).toHaveCount(1);
      await expect(page.locator("main"), path).toHaveCount(1);
      await expect(page.locator("footer"), path).toHaveCount(1);
    }
  });
});
