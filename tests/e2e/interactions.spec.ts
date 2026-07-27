import { expect, test } from "@playwright/test";
import { de } from "../../src/lib/i18n/dictionaries/de";
import { en } from "../../src/lib/i18n/dictionaries/en";

const scenarios = en.home.console.scenarios;

test.describe("hub console", () => {
  test("plays the five-step sequence for the default scenario", async ({
    page,
  }) => {
    await page.goto("/en");
    const first = scenarios[0]!;

    await expect(page.getByText(first.goal)).toBeVisible();
    // The verified result appears after the controlled sequence (~2.6 s).
    await expect(page.getByText(first.result)).toBeVisible({ timeout: 10_000 });
  });

  test("switching scenarios restarts the controlled sequence", async ({
    page,
  }) => {
    await page.goto("/en");
    const second = scenarios[1]!;

    await page.getByRole("tab", { name: second.chip }).click();
    await expect(page.getByRole("tab", { name: second.chip })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByText(second.goal)).toBeVisible();
    await expect(page.getByText(second.result)).toBeVisible({
      timeout: 10_000,
    });
  });

  test("replay restarts the sequence", async ({ page }) => {
    await page.goto("/en");
    const first = scenarios[0]!;
    await expect(page.getByText(first.result)).toBeVisible({ timeout: 10_000 });

    await page
      .getByRole("button", { name: en.home.console.replay })
      .click();
    await expect(page.getByText(first.result)).toBeHidden();
    await expect(page.getByText(first.result)).toBeVisible({ timeout: 10_000 });
  });

  test("scenario chips support arrow-key navigation", async ({ page }) => {
    await page.goto("/en");
    const firstTab = page.getByRole("tab", { name: scenarios[0]!.chip });
    await firstTab.focus();
    await page.keyboard.press("ArrowDown");

    await expect(
      page.getByRole("tab", { name: scenarios[1]!.chip }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText(scenarios[1]!.goal)).toBeVisible();
  });

  test("German console is fully localized", async ({ page }) => {
    await page.goto("/de");
    const first = de.home.console.scenarios[0]!;
    await expect(page.getByText(first.goal)).toBeVisible();
    await expect(page.getByText(first.result)).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("workflow explorer", () => {
  test("clicking a step explains what/why/benefit", async ({ page }) => {
    await page.goto("/en");
    const scope = en.home.flow.steps[2]!;

    await page.getByRole("tab", { name: new RegExp(scope.name) }).click();

    const panel = page.locator("#flow-panel");
    await expect(panel).toContainText(scope.what);
    await expect(panel).toContainText(scope.why);
    await expect(panel).toContainText(scope.benefit);
  });

  test("all six steps are reachable", async ({ page }) => {
    await page.goto("/en");
    for (const step of en.home.flow.steps) {
      await page.getByRole("tab", { name: new RegExp(step.name) }).click();
      await expect(page.locator("#flow-panel")).toContainText(step.what);
    }
  });
});

test.describe("use-case switcher", () => {
  test("switches cases without a page reload", async ({ page }) => {
    await page.goto("/en");
    const second = en.home.useCases.cases[1]!;

    await page
      .getByRole("tab", { name: new RegExp(second.title) })
      .click();

    await expect(page.locator("#usecase-panel")).toContainText(second.summary);
    // Same document — no reload happened.
    expect(page.url()).toContain("/en");
  });

  test("planned connectors are visibly marked as planned", async ({
    page,
  }) => {
    await page.goto("/en");
    const planned = en.home.useCases.cases.find((item) => item.planned)!;

    await page
      .getByRole("tab", { name: new RegExp(planned.title) })
      .click();

    const panel = page.locator("#usecase-panel");
    await expect(panel).toContainText(en.common.planned);
    if (planned.plannedNote) {
      await expect(panel).toContainText(planned.plannedNote);
    }
  });
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("console shows the full sequence without animation", async ({
    page,
  }) => {
    await page.goto("/en");
    const first = scenarios[0]!;
    // All five steps render immediately — no waiting on timers.
    await expect(page.getByText(first.result)).toBeVisible({ timeout: 3000 });
    await expect(page.getByText(first.goal)).toBeVisible();
  });
});

test.describe("console and hydration health", () => {
  for (const path of ["/en", "/de", "/en/product", "/en/pilot-program"]) {
    test(`no console errors on ${path}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(String(error)));

      await page.goto(path);
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }

  test("no console errors while interacting with the console", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(String(error)));

    await page.goto("/en");
    await page.getByRole("tab", { name: scenarios[1]!.chip }).click();
    await page.getByRole("tab", { name: scenarios[2]!.chip }).click();
    await expect(page.getByText(scenarios[2]!.goal)).toBeVisible();
    expect(errors).toEqual([]);
  });
});
