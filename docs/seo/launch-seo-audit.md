# Launch SEO Audit — Mainsches Hub (mainsches.com)

- **Audit-Datum:** 2026-07-28
- **Geprüfter Ausgangs-Commit:** `d60748d` (feat: add LinkedIn link to global footer)
- **Branch:** `rebuild/mainsches-hub-website`
- **Scope:** Finaler SEO-/AEO-/Launch-Readiness-Pass. Kein Redesign, kein Rebuild.
  Pilotformular, Mailrouting, LinkedIn-Footer, Navigation, Design-System und
  interaktive Komponenten wurden nicht verändert.

## 1. Route-/Intent-Matrix

| Route | Sprache | Suchintention | Primäres Thema | H1 |
| --- | --- | --- | --- | --- |
| `/de` | de | Marke + Kategorie verstehen | Mainsches Hub als AI Operating System | „KI, Dateien und Workflows. Ein Hub mit Kontrolle." |
| `/en` | en | Brand + category understanding | Mainsches Hub as AI Operating System | "AI, files, and workflows. One hub in control." |
| `/de/product` | de | Produktarchitektur verstehen | Bausteine: Orchestrierung, Dateien, Workflows, Berechtigungen | „Ein Hub, der KI als System versteht — nicht als Chatfenster." |
| `/en/product` | en | Understand product architecture | Building blocks: orchestration, files, workflows, permissions | "One hub that treats AI as a system, not a chat window." |
| `/de/workflows` | de | Adaptive Workflows erstellen/verwalten | Workflow-Lebenszyklus, eigene Workflow-Bibliothek | „Adaptive Workflows: Struktur, die Ihre Arbeit lernt." |
| `/en/workflows` | en | Create/manage adaptive workflows | Workflow lifecycle, own workflow library | "Adaptive workflows: structure that learns your work." |
| `/de/security` | de | Sicherheitsmodell prüfen | Lokale Verarbeitung, Scopes, Nachvollziehbarkeit, Privacy by Design | „Sicherheit und Datenschutz — von Anfang an eingebaut." |
| `/en/security` | en | Evaluate the security model | Local processing, scopes, traceability, privacy by design | "Security and privacy, designed in from the start." |
| `/de/use-cases` | de | Konkrete KMU-Einsatzszenarien | KI-Orchestrierung für kleine und mittlere Unternehmen | „Wo sich der Hub seinen Platz verdient." |
| `/en/use-cases` | en | Concrete SME scenarios | AI orchestration for small and mid-sized companies | "Where the Hub earns its place." |
| `/de/pilot-program` | de | Kontakt/Bewerbung (kommerziell + Partner/Investoren) | Pilotprogramm, früher Zugang | „Bauen Sie das AI Operating System mit." |
| `/en/pilot-program` | en | Contact/apply (commercial + partners/investors) | Pilot program, early access | "Build the AI operating system with us." |
| `/de/impressum` | de | Rechtsinformation | Impressum (nicht kommerziell optimiert) | „Impressum" |
| `/en/legal-notice` | en | Legal information | Legal notice (not commercially optimized) | "Legal notice" |
| `/de/datenschutz` | de | Rechtsinformation | Datenschutzerklärung (nicht kommerziell optimiert) | „Datenschutzerklärung" |
| `/en/privacy` | en | Legal information | Privacy policy (not commercially optimized) | "Privacy policy" |

Keyword-Kannibalisierung wird durch klare Themen-Trennung vermieden: Kategorie
(Home), Architektur (Product), Workflows (Workflows), Sicherheit (Security),
Szenarien (Use Cases), Conversion (Pilot Program).

## 2. Finale Titles und Descriptions

Quelle: `src/lib/i18n/dictionaries/de.ts` / `en.ts` (`meta`-Block). Alle 16
Titles sind global eindeutig, tragen die Marke und sind ≤ 70 Zeichen
(abgesichert durch `tests/unit/seo.test.ts`).

### Deutsch

| Route | Title | Description |
| --- | --- | --- |
| `/de` | Mainsches Hub — AI Operating System für kontrollierte KI-Arbeit | Mainsches Hub orchestriert lokale und Cloud-KI, Dateien und adaptive Workflows in einer kontrollierten Arbeitsoberfläche. Security und Privacy by Design, aus der Schweiz. |
| `/de/product` | Produkt — Was Mainsches Hub ist und wie es funktioniert | Mainsches Hub ist ein KI-Betriebssystem: ein Hub, der KI-Modelle, Dateien, Workflows und Aktionen unter expliziten Berechtigungen koordiniert. So ist es aufgebaut. |
| `/de/workflows` | Adaptive KI-Workflows erstellen und verwalten — Mainsches Hub | Wiederkehrende Arbeit wird zum adaptiven KI-Workflow: aus echten Aufgaben erstellen, speichern, verwalten und laufend verbessern — unter voller Kontrolle im Mainsches Hub. |
| `/de/security` | Sicherheit & Privacy by Design — Mainsches Hub | Lokale Verarbeitung, wo sie passt, explizite Auftragsgrenzen, Berechtigungen und Scope, nachvollziehbare Schritte. Sicherheit als Architektur statt Marketing. |
| `/de/use-cases` | Use Cases: KI-Orchestrierung für KMU — Mainsches Hub | Dokumente kontrolliert auswerten, wiederkehrende Abläufe als Workflows abbilden, lokale und Cloud-KI je Aufgabe orchestrieren. Realistische Szenarien für KMU. |
| `/de/pilot-program` | Pilotprogramm — früher Zugang zu Mainsches Hub | Jetzt am Mainsches-Hub-Pilotprogramm teilnehmen: früher Zugang für kleine und mittlere Unternehmen sowie ein direkter Draht für strategische Partner und Investoren. |
| `/de/impressum` | Impressum — Mainsches | Impressum und Betreiberangaben für mainsches.com, die Website von Mainsches Hub und Mainsches, Schweiz. |
| `/de/datenschutz` | Datenschutzerklärung — Mainsches | Wie mainsches.com mit personenbezogenen Daten umgeht: Websitebesuche, Pilotprogramm-Formular, Hosting und Ihre Rechte. |

### Englisch

| Route | Title | Description |
| --- | --- | --- |
| `/en` | Mainsches Hub — AI Operating System for Controlled AI Work | Mainsches Hub orchestrates local and cloud AI models, files, and adaptive workflows in one controlled workspace. Security and privacy by design. Built in Switzerland. |
| `/en/product` | Product — What Mainsches Hub Is and How It Works | Mainsches Hub is an AI operating system: one hub that coordinates AI models, files, workflows, and actions under explicit permissions. See how it is built. |
| `/en/workflows` | Create and Manage Adaptive AI Workflows — Mainsches Hub | Turn real tasks into adaptive AI workflows: create them from actual work, save and manage them, and refine them over time — under full control in Mainsches Hub. |
| `/en/security` | Security & Privacy by Design — Mainsches Hub | Local processing where it fits, explicit job boundaries, permissions and scope, traceable steps. How Mainsches Hub treats security as architecture, not marketing. |
| `/en/use-cases` | Use Cases: AI Orchestration for SMEs — Mainsches Hub | Evaluate documents in a controlled way, turn recurring processes into workflows, and orchestrate local and cloud AI per task. Realistic scenarios for SMEs. |
| `/en/pilot-program` | Pilot Program — Early Access to Mainsches Hub | Join the Mainsches Hub pilot program: early access for small and mid-sized companies, plus a direct line for strategic partners and investors. |
| `/en/legal-notice` | Legal Notice — Mainsches | Legal notice and operator information for mainsches.com, the website of Mainsches Hub and Mainsches, Switzerland. |
| `/en/privacy` | Privacy Policy — Mainsches | How mainsches.com handles personal data: website visits, the pilot program contact form, hosting, and your rights. |

## 3. Canonical-/hreflang-/x-default-Strategie

- `metadataBase` = `https://mainsches.com` (`app/[locale]/layout.tsx`).
- Jede Seite trägt einen absoluten, selbstreferenzierenden Canonical auf die
  endgültige 200-URL (kein Redirect-Ziel), erzeugt zentral in `src/lib/seo.ts`
  aus der Route-Map `src/lib/routes.ts`.
- hreflang: vollständige `de`/`en`-Paare inklusive lokalisierter Legal-Slugs
  (`/de/impressum` ↔ `/en/legal-notice`, `/de/datenschutz` ↔ `/en/privacy`).
- **x-default zeigt pro Route auf die englische Variante** (definiert über
  `defaultLocale = "en"` in `src/lib/i18n/config.ts`). Das Ziel ist immer eine
  direkte 200-Seite — keine Redirect-Kette. Die Root-URL `/` verhandelt die
  Sprache per `Accept-Language` mit genau einem 307-Hop (`proxy.ts`) und ist
  bewusst **nicht** das x-default-Ziel.
- Canonicals sind hostunabhängig fest auf `https://mainsches.com` gesetzt;
  Preview-Deployments können daher keine Preview-URLs in Canonicals, Sitemap
  oder JSON-LD einschleusen.

## 4. Sitemap und Robots

- `app/sitemap.ts`: genau die 16 indexierbaren Produktionsseiten, mit
  `de`/`en`/`x-default`-hreflang-Annotationen (konsistent zu den
  On-Page-Metadaten). Keine Legacy-`.html`-URLs, keine API-Routen, keine
  Preview-Domains.
- **Kein `lastModified`:** bewusst weggelassen, damit nicht bei jedem Build
  künstlich „jetzt" als Änderungsdatum signalisiert wird.
- `app/robots.ts`: `User-Agent: *`, `Allow: /`, Sitemap-Verweis auf
  `https://mainsches.com/sitemap.xml`. Kein `noindex` auf Production-Seiten.

## 5. Strukturierte Daten (JSON-LD, `src/lib/jsonld.ts`)

Auf jeder Seite (Layout): ein `@graph` mit
- **Organization** — Name „Mainsches", URL, Logo, E-Mail, `addressCountry: CH`,
  `sameAs: ["https://www.linkedin.com/company/136038044/"]` (bestätigtes
  öffentliches LinkedIn-Profil, in diesem Pass ergänzt).
- **WebSite** — Name „Mainsches Hub", `alternateName: "Mainsches"`, ohne
  SearchAction (keine echte Website-Suche vorhanden).
- **SoftwareApplication** — nur belegte Angaben (Kategorie
  BusinessApplication, Beschreibung mit „in aktiver Entwicklung; Zugang über
  das Pilotprogramm"). Keine Preise, Bewertungen, Nutzerzahlen, OS-Angaben
  oder Offers.

Pro Unterseite zusätzlich:
- **BreadcrumbList** — lokalisiert, mit absoluten URLs (Home → Seite).
- **FAQPage** — nur auf Seiten mit sichtbaren FAQs (Home, Product, Security,
  Pilot Program); Fragen/Antworten sind wortgleich mit dem sichtbaren
  `<details>`-Markup (per E2E-Test abgesichert).

## 6. Interne Linkstrategie

Header und Footer verlinken alle sechs Hauptseiten in beiden Sprachen. Im
Content ergänzen kontextuelle Links den thematischen Pfad (in diesem Pass
vervollständigt):

- Homepage → Product (Hero-CTA), Workflows (Abschnitt „Adaptive Workflows"),
  Security („Sicherheit im Detail"), Use Cases („Alle Use Cases"),
  Pilot Program (Hero + CTA-Panel)
- Product → Workflows („Mehr zu adaptiven Workflows"), Security („Zum
  Sicherheitsmodell"), Pilot Program (CTA)
- Workflows → Use Cases („Realistische Use Cases ansehen"), Pilot Program (CTA)
- Security → Pilot Program (CTA)
- Use Cases → Product („Zur Produktarchitektur"), Pilot Program (CTA)

Alle Linktexte sind beschreibend (keine „Hier klicken"-Links). Die alten
Produkte (Mainsches AI, SwipeSort, ID Radar) bleiben bewusst untergeordnet in
einer einzigen Sektion am Ende der Homepage.

## 7. AEO — sichtbare Antworten auf Kernfragen

Alle Kernfragen werden im statisch gerenderten HTML (SSG, ohne JavaScript
crawlbar) kurz und direkt beantwortet, u. a. über die Home-FAQ (7 Einträge,
in diesem Pass um „Wie verarbeitet Mainsches Hub Dateien?" und „Wie werden
Berechtigungen und Scope kontrolliert?" ergänzt — jeweils in beiden Sprachen),
die Definitionssektion „Was ist ein AI Operating System?" und die
Statussektion (vorhanden vs. geplant). Mail- und Service-Connectoren sind
durchgängig als „geplant / in Entwicklung" gekennzeichnet (Statussektion,
Use-Case-Switcher, Use-Cases-Seite, SystemDiagram).

## 8. Bekannte bewusste Entscheidungen

1. **x-default → Englisch**, nicht `/` — vermeidet Redirect-Ketten im
   hreflang-Cluster; `/` bleibt reine Sprachweiche (307, ein Hop).
2. **Kein `lastModified` in der Sitemap** — keine künstlichen Frische-Signale.
3. **Kein Title-Template** — Titles liegen vollständig in den typisierten
   Dictionaries; Markenzuordnung ist Teil des jeweiligen Title-Strings.
4. **`og:locale` = `de_CH`** — Betreiber ist in der Schweiz; Copy nutzt
   Schweizer Orthografie („ss" statt „ß").
5. **Legal-Slugs sind sprachexklusiv** (`/en/impressum` → 404 etc.), mit
   korrekten hreflang-Querverweisen; Rechtsseiten sind nicht auf kommerzielle
   Keywords optimiert.
6. **„KI-Betriebssystem"** wird als erklärender Begriff genutzt (Product-
   Description), „AI Operating System" bleibt die primäre Kategoriebezeichnung.
7. **SoftwareApplication ohne Offers/Ratings/OS** — es existieren keine
   belegbaren Angaben; nichts wird erfunden.
8. **Interaktive Komponenten (HubConsole, WorkflowExplorer, UseCaseSwitcher)**
   bleiben unverändert; alle zentralen Produktaussagen stehen zusätzlich als
   statischer Text im SSR-HTML (FAQ, Sektionstexte, Use-Cases-Seite).
9. **Vercel-Preview-Indexierung** wird plattformseitig durch Vercels
   `X-Robots-Tag: noindex` auf Preview-Domains verhindert; der Code setzt
   bewusst kein eigenes env-abhängiges noindex, damit Production nie
   versehentlich deindexiert werden kann.

## 9. Legacy-URLs und veröffentlichte Dateien

Permanente Redirects (308, ohne Ketten, Ziele antworten 200) in
`next.config.ts`: `/index.html → /en`, `/contact.html → /en/pilot-program`,
`/sketchit.html`, `/swipesort.html`, `/idradar.html`, `/id-radar.html`
→ `/en#other-products`, `/impressum.html → /de/impressum`,
`/privacy.html → /en/privacy`.

Unverändert mit HTTP 200 ausgeliefert: `/AI-privacy.html` (veröffentlichte
App-Datenschutz-URL), `/app-ads.txt`, `/googled32fd2521a5125c6.html`
(Google-Verifikation). Keine dieser URLs steht in der Sitemap.

## 10. Post-Launch-Checkliste (Search Console & Indexierung)

1. Property `https://mainsches.com` in der Google Search Console bestätigen
   (Verifikationsdatei liegt bereits unter `/googled32fd2521a5125c6.html`).
2. Sitemap `https://mainsches.com/sitemap.xml` einreichen.
3. `/de` und `/en` per URL-Prüfung manuell zur Indexierung anstoßen.
4. Nach einigen Tagen prüfen: Abdeckung (16 indexierte URLs erwartet),
   hreflang-Fehlerberichte, Ausschluss der Legacy-`.html`-URLs als
   „Seite mit Weiterleitung".
5. Rich-Results-Test für `/de` und `/en` (Organization, WebSite,
   SoftwareApplication, FAQPage) sowie eine Unterseite (BreadcrumbList).
6. Social-Preview validieren (LinkedIn Post Inspector, da LinkedIn der
   primäre Kanal ist): OG-Bild 1200×630 wird pro Sprache generiert.
7. Bing Webmaster Tools optional anbinden (Import aus GSC möglich).
8. Beobachten, dass Vercel-Preview-Domains nicht im Index auftauchen
   (site:-Abfrage); Preview trägt plattformseitig `X-Robots-Tag: noindex`.
