import { describe, expect, it } from "vitest";
import {
  localePath,
  routeAlternates,
  routeDefs,
  switchLocalePath,
} from "@/lib/routes";

describe("route map", () => {
  it("covers the full site architecture for both locales", () => {
    expect(Object.keys(routeDefs).sort()).toEqual(
      [
        "home",
        "legal",
        "pilot",
        "privacy",
        "product",
        "security",
        "services",
        "useCases",
        "workflows",
      ].sort(),
    );
    for (const paths of Object.values(routeDefs)) {
      expect(paths.de.startsWith("/de")).toBe(true);
      expect(paths.en.startsWith("/en")).toBe(true);
    }
  });

  it("uses localized slugs for legal pages", () => {
    expect(localePath("legal", "de")).toBe("/de/impressum");
    expect(localePath("legal", "en")).toBe("/en/legal-notice");
    expect(localePath("privacy", "de")).toBe("/de/datenschutz");
    expect(localePath("privacy", "en")).toBe("/en/privacy");
  });

  it("uses localized slugs for the services page", () => {
    expect(localePath("services", "de")).toBe("/de/angebot");
    expect(localePath("services", "en")).toBe("/en/services");
  });

  it("returns hreflang alternates for a route", () => {
    expect(routeAlternates("pilot")).toEqual({
      de: "/de/pilot-program",
      en: "/en/pilot-program",
    });
  });

  describe("switchLocalePath", () => {
    it("keeps the current subpage when switching language", () => {
      expect(switchLocalePath("/en/product", "de")).toBe("/de/product");
      expect(switchLocalePath("/de/workflows", "en")).toBe("/en/workflows");
      expect(switchLocalePath("/en/pilot-program", "de")).toBe(
        "/de/pilot-program",
      );
    });

    it("maps localized legal slugs to their twin", () => {
      expect(switchLocalePath("/de/impressum", "en")).toBe("/en/legal-notice");
      expect(switchLocalePath("/en/legal-notice", "de")).toBe("/de/impressum");
      expect(switchLocalePath("/de/datenschutz", "en")).toBe("/en/privacy");
      expect(switchLocalePath("/en/privacy", "de")).toBe("/de/datenschutz");
    });

    it("maps localized services slugs to their twin", () => {
      expect(switchLocalePath("/de/angebot", "en")).toBe("/en/services");
      expect(switchLocalePath("/en/services", "de")).toBe("/de/angebot");
    });

    it("handles trailing slashes", () => {
      expect(switchLocalePath("/en/product/", "de")).toBe("/de/product");
    });

    it("falls back to the target home page for unknown paths", () => {
      expect(switchLocalePath("/en/does-not-exist", "de")).toBe("/de");
      expect(switchLocalePath("/", "en")).toBe("/en");
    });
  });
});
