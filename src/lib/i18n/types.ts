import type { Locale } from "./config";

/** Metadata for one page in one language. */
export interface PageMeta {
  title: string;
  description: string;
}

export interface ConsoleScenario {
  id: string;
  /** Chip label the user clicks. */
  chip: string;
  /** The goal as it appears typed into the console. */
  goal: string;
  context: string;
  workflow: string;
  routing: "local" | "cloud" | "hybrid";
  routingNote: string;
  result: string;
}

export interface FlowStep {
  id: string;
  name: string;
  what: string;
  why: string;
  benefit: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  summary: string;
  points: string[];
  planned?: boolean;
  plannedNote?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LegalCard {
  label: string;
  title: string;
  /** Paragraphs; rendered as separate <p> elements. */
  paragraphs: string[];
}

/**
 * Full translation contract. Both dictionaries must satisfy this interface,
 * which makes partially translated pages a compile-time error.
 */
export interface Dictionary {
  locale: Locale;

  common: {
    brand: string;
    skipToContent: string;
    languageLabel: string;
    menuOpen: string;
    menuClose: string;
    conceptDemo: string;
    planned: string;
    inDevelopment: string;
    productDirection: string;
    breadcrumbHome: string;
    externalLinkHint: string;
  };

  nav: {
    ariaPrimary: string;
    product: string;
    workflows: string;
    security: string;
    useCases: string;
    pilot: string;
    homeAria: string;
  };

  footer: {
    tagline: string;
    navigate: string;
    company: string;
    legal: string;
    contact: string;
    impressum: string;
    privacy: string;
    /** Accessible name for the icon-only LinkedIn link. */
    linkedinAria: string;
    otherProductsTitle: string;
    copyright: string;
  };

  meta: {
    home: PageMeta;
    product: PageMeta;
    workflows: PageMeta;
    security: PageMeta;
    useCases: PageMeta;
    pilot: PageMeta;
    legal: PageMeta;
    privacy: PageMeta;
  };

  home: {
    hero: {
      eyebrow: string;
      titlePre: string;
      titleGold: string;
      titlePost: string;
      lede: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };

    whatIsOs: {
      label: string;
      title: string;
      definition: string;
      points: { title: string; body: string }[];
      diagram: {
        hub: string;
        localAi: string;
        cloudAi: string;
        files: string;
        workflows: string;
        actions: string;
        connectors: string;
        connectorsPlanned: string;
        ariaLabel: string;
      };
    };

    console: {
      label: string;
      title: string;
      lede: string;
      windowTitle: string;
      scenarioGroupLabel: string;
      stepLabels: {
        goal: string;
        context: string;
        workflow: string;
        model: string;
        result: string;
      };
      routingLocal: string;
      routingCloud: string;
      routingHybrid: string;
      statusRunning: string;
      statusDone: string;
      replay: string;
      scenarios: ConsoleScenario[];
      reducedMotionNote: string;
    };

    localCloud: {
      label: string;
      title: string;
      lede: string;
      localTitle: string;
      localPoints: string[];
      cloudTitle: string;
      cloudPoints: string[];
      note: string;
    };

    adaptive: {
      label: string;
      title: string;
      lede: string;
      points: { title: string; body: string }[];
      moreLink: string;
    };

    flow: {
      label: string;
      title: string;
      lede: string;
      stepListLabel: string;
      whatLabel: string;
      whyLabel: string;
      benefitLabel: string;
      steps: FlowStep[];
    };

    useCases: {
      label: string;
      title: string;
      lede: string;
      tabsLabel: string;
      cases: UseCaseItem[];
      moreLink: string;
    };

    security: {
      label: string;
      title: string;
      lede: string;
      items: { title: string; body: string }[];
      disclaimer: string;
      moreLink: string;
    };

    status: {
      label: string;
      title: string;
      lede: string;
      nowTitle: string;
      nowItems: string[];
      plannedTitle: string;
      plannedItems: string[];
      visionNote: string;
    };

    pilotCta: {
      label: string;
      title: string;
      lede: string;
      bullets: string[];
      cta: string;
    };

    otherProducts: {
      label: string;
      title: string;
      lede: string;
      mobileAppTag: string;
      webAppTag: string;
      mainschesAi: string;
      swipeSort: string;
      swipeSortCta: string;
      idRadar: string;
      idRadarCta: string;
    };

    faq: {
      label: string;
      title: string;
      items: FaqItem[];
    };
  };

  product: {
    heroLabel: string;
    heroTitle: string;
    heroLede: string;
    areasTitle: string;
    areas: { title: string; body: string }[];
    /** Contextual deep links from the building blocks to their detail pages. */
    workflowsLink: string;
    securityLink: string;
    principlesTitle: string;
    principles: { title: string; body: string }[];
    faq: FaqItem[];
    faqTitle: string;
    cta: string;
  };

  workflowsPage: {
    heroLabel: string;
    heroTitle: string;
    heroLede: string;
    lifecycleTitle: string;
    lifecycle: { step: string; title: string; body: string }[];
    examplesTitle: string;
    examplesLede: string;
    examples: { title: string; body: string; steps: string[] }[];
    exampleNote: string;
    cta: string;
    useCasesLink: string;
  };

  securityPage: {
    heroLabel: string;
    heroTitle: string;
    heroLede: string;
    principlesTitle: string;
    principles: { title: string; body: string }[];
    dataTitle: string;
    dataLede: string;
    dataPoints: { title: string; body: string }[];
    disclaimer: string;
    faqTitle: string;
    faq: FaqItem[];
    cta: string;
  };

  useCasesPage: {
    heroLabel: string;
    heroTitle: string;
    heroLede: string;
    scenariosTitle: string;
    productLink: string;
    plannedTitle: string;
    plannedLede: string;
    plannedItems: { title: string; body: string }[];
    cta: string;
  };

  pilotPage: {
    heroLabel: string;
    heroTitle: string;
    heroLede: string;
    audiencesTitle: string;
    audiences: { title: string; body: string }[];
    formTitle: string;
    formLede: string;
    form: {
      name: string;
      email: string;
      emailHint: string;
      company: string;
      role: string;
      interest: string;
      interestPilot: string;
      interestPartner: string;
      interestInvestor: string;
      message: string;
      consentPre: string;
      consentLinkLabel: string;
      consentPost: string;
      submit: string;
      submitting: string;
      errorSummaryTitle: string;
      errors: {
        name: string;
        email: string;
        company: string;
        role: string;
        interest: string;
        message: string;
        consent: string;
      };
      success: string;
      successDetail: string;
      notConfiguredTitle: string;
      notConfiguredBody: string;
      serverError: string;
      fallbackLabel: string;
    };
    faqTitle: string;
    faq: FaqItem[];
  };

  legalPage: {
    heroLabel: string;
    heroTitle: string;
    heroLede: string;
    cards: LegalCard[];
  };

  privacyPage: {
    heroLabel: string;
    heroTitle: string;
    heroLede: string;
    cards: LegalCard[];
  };

  notFound: {
    code: string;
    title: string;
    body: string;
    cta: string;
  };
}
