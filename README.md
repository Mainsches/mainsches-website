# mainsches.com — Mainsches Hub

Marketing website for **Mainsches Hub**, the AI operating system by Mainsches
(Switzerland). Fully bilingual (German / English), built with the Next.js App
Router and deployed on Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack, `proxy.ts` for locale negotiation)
- **TypeScript** in strict mode (`noUncheckedIndexedAccess` enabled)
- **Tailwind CSS 4** with `@theme` design tokens (see `docs/design-system.md`)
- **Motion** for the two tab-panel transitions; everything else is CSS
- **Zod 4** for pilot-form validation (shared client/server schema)
- **Nodemailer** for the pilot-form mail adapter
- **Vitest + Testing Library** (unit) and **Playwright** (end-to-end)

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # production build
npm start          # serve the production build
```

### Scripts

| Script              | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `npm run lint`      | ESLint (flat config, eslint-config-next)             |
| `npm run typecheck` | `tsc --noEmit`                                       |
| `npm test`          | Vitest unit/component tests (`tests/unit`)           |
| `npm run test:e2e`  | Playwright E2E (`tests/e2e`), needs a build first    |

E2E tests boot the production server on port 3100 automatically:

```bash
npm run build && npm run test:e2e
```

## Project structure

```
app/
  [locale]/            # de | en — every page exists in both languages
    page.tsx           # homepage (hero + hub console + all sections)
    product/ workflows/ security/ use-cases/ pilot-program/
    impressum/ datenschutz/       # German-only slugs (404 under /en)
    legal-notice/ privacy/        # English-only slugs (404 under /de)
    [...rest]/         # locale-aware 404
    opengraph-image.tsx
  api/pilot/route.ts   # mail adapter for the pilot form
  robots.ts sitemap.ts globals.css
proxy.ts               # root locale negotiation (Accept-Language → /de | /en)
src/
  lib/i18n/            # typed dictionaries; both languages satisfy one interface
  lib/routes.ts        # single source of truth for slugs + hreflang
  lib/seo.ts           # canonical/hreflang/OG/Twitter builder
  lib/jsonld.ts        # Organization, WebSite, SoftwareApplication, FAQ, breadcrumbs
  components/          # layout, home (interactive), pilot form, ui primitives
public/                # logo + product assets, AI-privacy.html, app-ads.txt,
                       # Google Search Console verification file
```

## Internationalization

- Routes are prefixed (`/de/...`, `/en/...`); the root `/` negotiates the
  locale from `Accept-Language` (307, no chains).
- All copy lives in `src/lib/i18n/dictionaries/{de,en}.ts`. Both files must
  satisfy the `Dictionary` interface — a missing translation is a compile
  error, so partially translated pages cannot ship.
- The language switcher maps the current page to its twin, including the
  localized legal slugs (`/de/impressum` ↔ `/en/legal-notice`,
  `/de/datenschutz` ↔ `/en/privacy`) via `src/lib/routes.ts`.

## Pilot form (SMTP)

`app/api/pilot/route.ts` reuses the environment variables of the previous
`api/contact.js` Vercel function — an already-configured Vercel project keeps
working without changes:

```
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
```

See `.env.example`. Behaviour without configuration is honest: the API
returns `503 { configured: false }` and the UI shows a mailto fallback —
never a fake success message. The route also validates with Zod, checks a
honeypot field, enforces a minimum fill time, and rate-limits per IP.

## Deployment (Vercel)

The site deploys as a standard Next.js app. After merging this rebuild:

1. Vercel project → **Framework Preset** must be **Next.js** (the previous
   deployment was a static HTML site; if the preset was "Other", change it).
2. **Node.js version**: 20.9+ (required by Next 16).
3. Keep the existing `SMTP_*` / `CONTACT_TO` environment variables.
4. No `vercel.json` is needed; headers and redirects live in
   `next.config.ts`.

Legacy URLs (`/index.html`, `/contact.html`, `/sketchit.html`,
`/swipesort.html`, `/idradar.html`, `/id-radar.html`, `/impressum.html`,
`/privacy.html`) are permanently redirected. `/AI-privacy.html` (published
app-store privacy URL), `/app-ads.txt`, and the Google verification file are
served unchanged from `public/`.
