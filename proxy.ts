import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["de", "en"] as const;

/**
 * Picks the best locale from the Accept-Language header.
 * German (any region) wins if it has the highest preference, everything else
 * falls back to English. Deliberately dependency-free.
 */
function negotiateLocale(acceptLanguage: string | null): "de" | "en" {
  if (!acceptLanguage) return "en";

  let bestLocale: "de" | "en" = "en";
  let bestQuality = -1;

  for (const part of acceptLanguage.split(",")) {
    const [rawTag, ...params] = part.trim().split(";");
    const tag = (rawTag ?? "").trim().toLowerCase();
    if (!tag) continue;

    let quality = 1;
    for (const param of params) {
      const [key, value] = param.trim().split("=");
      if (key === "q" && value) {
        const parsed = Number.parseFloat(value);
        if (!Number.isNaN(parsed)) quality = parsed;
      }
    }

    const matched: "de" | "en" | null = tag.startsWith("de")
      ? "de"
      : tag.startsWith("en") || tag === "*"
        ? "en"
        : null;

    if (matched && quality > bestQuality) {
      bestQuality = quality;
      bestLocale = matched;
    }
  }

  return bestLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root: single-hop language negotiation (documented in docs/deployment.md).
  if (pathname === "/") {
    const locale = negotiateLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url, 307);
  }

  // Any other path without a supported locale prefix is sent to the English
  // tree so the branded, localized 404 page can handle it.
  const firstSegment = pathname.split("/")[1] ?? "";
  if (!(LOCALES as readonly string[]).includes(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals and any path containing a file extension
  // (public assets like /assets/logo.png, /app-ads.txt, /AI-privacy.html).
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
