/** Canonical production origin (existing domain, served via Vercel). */
export const SITE_URL = "https://mainsches.com";

/** Verified operator contact (from the existing legal notice). */
export const CONTACT_EMAIL = "contact@mainsches.com";

export const ORG_NAME = "Mainsches";
export const PRODUCT_NAME = "Mainsches Hub";

/** Verified public LinkedIn company profile (not the admin dashboard URL). */
export const LINKEDIN_URL = "https://www.linkedin.com/company/136038044/";

/**
 * Verified external targets for "Other products by Mainsches".
 * - SwipeSort: Google Play URL taken from the operator's own store redirect.
 * - ID Radar: external product site linked from the previous idradar page.
 * - Mainsches AI: no public store listing is verifiable, so the card carries
 *   no outbound link (no invented URLs).
 */
export const PRODUCT_LINKS = {
  swipeSortPlayStore:
    "https://play.google.com/store/apps/details?id=com.anonymous.swipesort",
  idRadarSite: "https://idradar.ch",
} as const;
