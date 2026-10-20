import { describe, expect, it } from "vitest";
import { de } from "@/lib/i18n/dictionaries/de";
import { en } from "@/lib/i18n/dictionaries/en";

type Tree = Record<string, unknown>;

/** Collects "a.b.c" style paths for every leaf, treating arrays as leaves. */
function leafPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return [prefix];
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Tree).flatMap(([key, child]) =>
      leafPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function collectStrings(value: unknown, prefix = ""): [string, string][] {
  if (typeof value === "string") return [[prefix, value]];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectStrings(item, `${prefix}[${index}]`),
    );
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Tree).flatMap(([key, child]) =>
      collectStrings(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

describe("i18n dictionaries", () => {
  it("expose the same key structure in both languages", () => {
    expect(leafPaths(de).sort()).toEqual(leafPaths(en).sort());
  });

  it("contain no empty strings", () => {
    for (const dict of [de, en]) {
      for (const [path, text] of collectStrings(dict)) {
        expect(text.trim(), `${dict.locale}:${path}`).not.toHaveLength(0);
      }
    }
  });

  it("keep interactive datasets in sync across languages", () => {
    expect(de.home.console.scenarios).toHaveLength(
      en.home.console.scenarios.length,
    );
    expect(de.home.flow.steps).toHaveLength(en.home.flow.steps.length);
    expect(de.home.useCases.cases).toHaveLength(en.home.useCases.cases.length);
    expect(de.home.faq.items).toHaveLength(en.home.faq.items.length);

    // Scenario ids and routing must match so screenshots/tests stay stable.
    expect(de.home.console.scenarios.map((s) => s.id)).toEqual(
      en.home.console.scenarios.map((s) => s.id),
    );
    expect(de.home.console.scenarios.map((s) => s.routing)).toEqual(
      en.home.console.scenarios.map((s) => s.routing),
    );
    expect(de.home.flow.steps.map((s) => s.id)).toEqual(
      en.home.flow.steps.map((s) => s.id),
    );
    expect(de.home.useCases.cases.map((c) => c.id)).toEqual(
      en.home.useCases.cases.map((c) => c.id),
    );
    expect(de.servicesPage.offers.map((o) => o.id)).toEqual(
      en.servicesPage.offers.map((o) => o.id),
    );
    expect(de.home.useCases.cases.map((c) => Boolean(c.planned))).toEqual(
      en.home.useCases.cases.map((c) => Boolean(c.planned)),
    );
  });

  it("mark planned connectors as planned in the use-case switcher", () => {
    for (const dict of [de, en]) {
      const planned = dict.home.useCases.cases.filter((c) => c.planned);
      expect(planned.length, dict.locale).toBeGreaterThanOrEqual(1);
      for (const item of planned) {
        expect(item.plannedNote, `${dict.locale}:${item.id}`).toBeTruthy();
      }
    }
  });

  it("has the six-step workflow pipeline", () => {
    expect(en.home.flow.steps).toHaveLength(6);
    expect(en.home.flow.steps.map((s) => s.id)).toEqual([
      "input",
      "intent",
      "scope",
      "workflow",
      "model",
      "output",
    ]);
  });
});
