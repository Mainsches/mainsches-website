import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 * - 'unsafe-inline' for scripts is required by Next.js bootstrap inline scripts
 *   (no nonce setup, pages are statically prerendered).
 * - 'unsafe-eval' is only added in development for React Refresh.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  /**
   * Legacy URL preservation.
   * The previous static site lived on flat .html routes; all of them are
   * permanently redirected so existing links and search entries keep working.
   * /AI-privacy.html is intentionally NOT redirected: it is the published
   * privacy policy URL of the "Mainsches AI" mobile app and is served
   * byte-identical from /public.
   */
  async redirects() {
    return [
      { source: "/index.html", destination: "/en", permanent: true },
      {
        source: "/contact.html",
        destination: "/en/pilot-program",
        permanent: true,
      },
      {
        source: "/sketchit.html",
        destination: "/en#other-products",
        permanent: true,
      },
      {
        source: "/swipesort.html",
        destination: "/en#other-products",
        permanent: true,
      },
      {
        source: "/idradar.html",
        destination: "/en#other-products",
        permanent: true,
      },
      {
        source: "/id-radar.html",
        destination: "/en#other-products",
        permanent: true,
      },
      {
        source: "/impressum.html",
        destination: "/de/impressum",
        permanent: true,
      },
      { source: "/privacy.html", destination: "/en/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
