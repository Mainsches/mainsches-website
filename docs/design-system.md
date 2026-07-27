# Mainsches Hub — Design System

Dark, precise, technical. Swiss restraint over effects: one warm gold accent
on near-black surfaces, three typefaces with clear roles, and motion that
only ever explains state. All tokens live in `app/globals.css` under
`@theme` and are consumed as Tailwind utilities.

## Colors

Surfaces (dark, warm-neutral ramp):

| Token             | Value     | Use                                    |
| ----------------- | --------- | -------------------------------------- |
| `bg`              | `#0b0b0c` | page background                        |
| `bg-deep`         | `#060607` | footer, deepest areas                  |
| `raised`          | `#121214` | primary cards and panels               |
| `surface`         | `#17171a` | nested surfaces (chips, console steps) |
| `surface-hover`   | `#1c1c21` | hover state for `surface`              |
| `inset`           | `#0e0e10` | form inputs, recessed wells            |

Lines: `line #232329`, `line-soft #1c1c21`, `line-strong #33333b` — borders
carry the layout; shadows are secondary.

Ink (text): `ink #f4f3ef` (headlines, key copy), `ink-soft #a7a6a0` (body),
`ink-faint #7c7b73` (captions, labels).

Gold (heritage `#D4AF37`, kept from the existing Mainsches brand):

| Token       | Value                     | Use                              |
| ----------- | ------------------------- | -------------------------------- |
| `gold`      | `#d4af37`                 | labels, icons, primary CTA       |
| `gold-soft` | `#e2c878`                 | hover on gold text               |
| `gold-deep` | `#9d8228`                 | pressed states                   |
| `gold-line` | `rgba(212,175,55,.28)`    | selected borders                 |
| `gold-tint` | `rgba(212,175,55,.08)`    | selected fills                   |

Rules for gold: it marks **selection, priority, and progress** — never large
areas, never glows. Body text is never gold. Semantic red `danger #e2695e`
(+ `danger-tint`) is reserved for form errors.

## Typography

| Role    | Face            | Used for                                    |
| ------- | --------------- | ------------------------------------------- |
| Display | Space Grotesk   | h1–h3, big statements (`font-display`)      |
| Text    | Inter           | body, UI (`font-sans`, on `<body>`)         |
| Mono    | JetBrains Mono  | section labels, console, step numbers       |

Loaded via `next/font` with `swap`. Scale in practice: hero
`text-4xl…text-6xl` + `tracking-tight`, section titles `text-3xl/4xl`, card
titles `text-lg/xl`, body `text-base`, captions `text-sm/xs`. Uppercase mono
labels use `.section-label` (0.72rem, letter-spacing 0.18em, gold).

## Layout & spacing

- Container: `.shell` — `min(100% − 2.5rem, 74rem)`, ≥768px: `100% − 4rem`.
- Section rhythm: `py-16 sm:py-20` (homepage majors `py-20 sm:py-28`).
- Card padding: `p-6`–`p-8`; grids gap `gap-4`; section header → content
  `gap-10`.

## Radii & shadows

- `rounded-control 10px` — buttons, inputs, chips
- `rounded-card 16px` — cards, list items
- `rounded-panel 24px` — hero console, large panels
- `shadow-panel` (0 24px 80px, 45 % black) only on hero-level panels;
  `shadow-card` sparingly. Borders, not shadows, define edges.

## Components

- **Buttons** (`ui/Button.tsx`): primary = gold fill, black text,
  `hover:gold-soft`; secondary = `line-strong` border on transparent;
  ghost = text only. Heights ≈ 44px (`px-5 py-2.5`), `text-sm font-semibold`.
- **Badges** (`ui/Badge.tsx`): gold (tint fill + gold text) for "Concept
  demo"; outline (dashed) for "Planned"; neutral for factual tags.
- **Cards**: `raised` fill + `line` border; hover may lift border to
  `line-strong` — no scale transforms.
- **Planned vs. existing**: planned capabilities always get dashed borders +
  "Planned"/"Geplant" badge + `ink-faint` text. Never styled equal to
  shipped capabilities.
- **Icons**: Lucide, `size-4`/`size-5`, `stroke-width` default, functional
  only — no decorative frames around product logos, no emoji.

## Motion

- Easing: `--ease-hub cubic-bezier(0.22, 1, 0.36, 1)`; durations 200 ms
  (hover), 300 ms (panel swaps), 400–650 ms (console steps, reveals).
- Only `opacity` and `translate` are animated.
- Scroll reveals (`ui/Reveal.tsx`) are progressive enhancement: SSR HTML is
  fully visible (no hidden content for crawlers/no-JS); hiding + reveal is
  applied client-side only to elements below the viewport.
- The Hub console plays max. five steps per user action (click), pulses one
  dot while running — no autoplay loops, nothing moves permanently.
- `prefers-reduced-motion`: CSS animations are neutralized globally and all
  interactive components render their end state immediately.

## Focus & accessibility

- Global `:focus-visible`: 2px gold outline, 2px offset — on dark surfaces
  this always meets contrast.
- Tab patterns (console scenarios, workflow steps, use cases) implement the
  WAI-ARIA tabs pattern with a roving tabindex (`lib/useRovingTabs.ts`):
  Arrow keys, Home/End, `aria-selected`, `aria-controls`.
- Mobile navigation is a native `<dialog>`: focus trap, `Esc`, and inert
  background come from the platform.
- State is never color-only: selection combines fill + border + text color;
  planned items combine dash + badge + text.
