import type { Dictionary } from "../types";

export const en = {
  locale: "en",

  common: {
    brand: "Mainsches",
    skipToContent: "Skip to content",
    languageLabel: "Language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    conceptDemo: "Interactive concept demo",
    planned: "Planned",
    inDevelopment: "In development",
    productDirection: "Product direction",
    breadcrumbHome: "Home",
    externalLinkHint: "opens in a new tab",
  },

  nav: {
    ariaPrimary: "Primary navigation",
    product: "Product",
    workflows: "Workflows",
    security: "Security",
    useCases: "Use cases",
    pilot: "Pilot program",
    homeAria: "Mainsches Hub — home",
  },

  footer: {
    tagline:
      "The AI operating system that orchestrates local and cloud AI, files, and adaptive workflows — with security by design.",
    navigate: "Mainsches Hub",
    company: "Company",
    legal: "Legal",
    contact: "Contact",
    impressum: "Legal notice",
    privacy: "Privacy",
    linkedinAria: "Mainsches on LinkedIn – opens in a new tab",
    otherProductsTitle: "Other products by Mainsches",
    copyright: "Mainsches, Switzerland. All rights reserved.",
  },

  meta: {
    home: {
      title: "Mainsches Hub — The AI Operating System for Controlled AI Work",
      description:
        "Mainsches Hub orchestrates local and cloud AI models, files, and adaptive workflows in one controlled workspace. Security and privacy by design. Built in Switzerland.",
    },
    product: {
      title: "Product — What Mainsches Hub Is and How It Works",
      description:
        "Mainsches Hub is an AI operating system: one hub that coordinates AI models, files, workflows, and actions under explicit permissions. See how it is built.",
    },
    workflows: {
      title: "Adaptive AI Workflows — Create, Run, and Refine",
      description:
        "Turn real tasks into adaptive AI workflows: create them from actual work, save and manage them, and refine them over time — under full control in Mainsches Hub.",
    },
    security: {
      title: "Security & Privacy by Design — Local AI, Scopes, Traceability",
      description:
        "Local processing where it fits, explicit job boundaries, permissions and scope, traceable steps. How Mainsches Hub treats security as architecture, not marketing.",
    },
    useCases: {
      title: "Use Cases — AI Orchestration for Small and Mid-Sized Companies",
      description:
        "Evaluate documents in a controlled way, turn recurring processes into workflows, and orchestrate local and cloud AI per task. Realistic scenarios for SMEs.",
    },
    pilot: {
      title: "Pilot Program — Early Access for Companies, Partners, Investors",
      description:
        "Join the Mainsches Hub pilot program: early access for small and mid-sized companies, plus a direct line for strategic partners and investors.",
    },
    legal: {
      title: "Legal Notice",
      description:
        "Legal notice and operator information for mainsches.com, the website of Mainsches Hub and Mainsches, Switzerland.",
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "How mainsches.com handles personal data: website visits, the pilot program contact form, hosting, and your rights.",
    },
  },

  home: {
    hero: {
      eyebrow: "AI Operating System",
      titlePre: "AI, files, and workflows.",
      titleGold: "One hub",
      titlePost: "in control.",
      lede: "Mainsches Hub orchestrates local and cloud AI models, your files, and adaptive workflows in one controlled workspace. Security and privacy are part of the system — not an afterthought.",
      ctaPrimary: "Explore Mainsches Hub",
      ctaSecondary: "Pilot program",
    },

    whatIsOs: {
      label: "What is an AI operating system?",
      title: "A control layer between your work and AI.",
      definition:
        "An AI operating system coordinates AI models, files, workflows, and actions in one place. It decides — within your rules — which model runs where, what data a job may touch, and how results come back. That is what Mainsches Hub is built to be.",
      points: [
        {
          title: "One central hub",
          body: "Models, files, workflows, and actions meet in a single workspace instead of scattered tools and browser tabs.",
        },
        {
          title: "Controlled model choice",
          body: "Local and cloud AI are assigned per task. Sensitive work can stay on your own hardware.",
        },
        {
          title: "Workflows that live",
          body: "Recurring work becomes a workflow you can save, manage, and keep improving.",
        },
        {
          title: "Boundaries built in",
          body: "Permissions and scopes are system features, not policies on paper.",
        },
      ],
      diagram: {
        hub: "Mainsches Hub",
        localAi: "Local AI",
        cloudAi: "Cloud AI",
        files: "Files",
        workflows: "Workflows",
        actions: "Actions",
        connectors: "Connectors",
        connectorsPlanned: "planned",
        ariaLabel:
          "System diagram: Mainsches Hub in the center, connected to local AI, cloud AI, files, workflows, actions, and planned connectors.",
      },
    },

    console: {
      label: "The Hub in action",
      title: "From goal to verified result.",
      lede: "Pick a scenario and watch how the Hub recognizes context, proposes a workflow, assigns the right model, and returns a traceable result.",
      windowTitle: "Mainsches Hub — Console",
      scenarioGroupLabel: "Choose a scenario",
      stepLabels: {
        goal: "Goal",
        context: "Context",
        workflow: "Workflow",
        model: "Model",
        result: "Result",
      },
      routingLocal: "Local model — files stay on this machine",
      routingCloud: "Cloud model — runs within an approved scope",
      routingHybrid: "Local first — cloud only where approved",
      statusRunning: "running",
      statusDone: "done",
      replay: "Replay",
      scenarios: [
        {
          id: "contracts",
          chip: "Review contracts",
          goal: "Summarize all contracts in the Q3 folder",
          context: "14 PDF files detected · local folder",
          workflow: "Document review — summary with source references",
          routing: "local",
          routingNote: "Sensitive documents, so the job is pinned to local AI.",
          result: "Summary per contract, key clauses flagged, every step logged.",
        },
        {
          id: "report",
          chip: "Monthly report",
          goal: "Prepare the monthly management report",
          context: "Spreadsheet and meeting notes detected",
          workflow: "Recurring report — reuses last month's structure",
          routing: "cloud",
          routingNote: "Approved scope: structure and wording, no raw exports.",
          result: "Draft report ready for review, changes traceable per step.",
        },
        {
          id: "workflow",
          chip: "Build a workflow",
          goal: "Turn our onboarding checklist into a workflow",
          context: "Steps captured from your description",
          workflow: "New workflow draft — editable before first run",
          routing: "hybrid",
          routingNote: "Runs locally by default; cloud steps need approval.",
          result: "Reusable workflow saved to your library.",
        },
      ],
      reducedMotionNote: "Animations follow your system's motion preference.",
    },

    localCloud: {
      label: "Local and cloud AI",
      title: "The model follows the data — not the other way round.",
      lede: "Some work belongs on your own hardware. Some work benefits from more capacity. Mainsches Hub lets you decide per task and enforces that decision.",
      localTitle: "Local AI",
      localPoints: [
        "Files can be processed on your own hardware",
        "Suited for contracts, personnel files, and internal documents",
        "Core tasks work without any cloud dependency",
      ],
      cloudTitle: "Cloud AI",
      cloudPoints: [
        "Extra capacity for large or complex jobs",
        "Runs only within an explicitly approved scope",
        "An option you choose — never a forced default",
      ],
      note: "You set the rule once. The Hub applies it to every job.",
    },

    adaptive: {
      label: "Adaptive workflows",
      title: "Workflows that adapt to how you actually work.",
      lede: "Prompts are one-off. Workflows compound. Mainsches Hub turns recurring work into structures you own.",
      points: [
        {
          title: "Create from real tasks",
          body: "A workflow starts from actual work — a goal, a document set, a recurring routine — not from a blank canvas.",
        },
        {
          title: "Save and manage",
          body: "Your workflows live in a library: named, organized, and ready for the next run.",
        },
        {
          title: "Refine over time",
          body: "Adjust steps, tighten scopes, swap models. The workflow improves with every iteration.",
        },
      ],
    },

    flow: {
      label: "How a job runs",
      title: "Six steps. Each one accountable.",
      lede: "Select a step to see what happens, why it is controlled, and what you gain.",
      stepListLabel: "Workflow steps",
      whatLabel: "What happens",
      whyLabel: "Why it is controlled",
      benefitLabel: "What you gain",
      steps: [
        {
          id: "input",
          name: "Input",
          what: "A goal, a question, or files start the job.",
          why: "Nothing runs without an explicit start from you.",
          benefit: "You stay the trigger — always.",
        },
        {
          id: "intent",
          name: "Intent & Context",
          what: "The Hub identifies the task and gathers only the relevant context.",
          why: "Jobs see the data they need, not everything you have.",
          benefit: "No blind processing of your environment.",
        },
        {
          id: "scope",
          name: "Permission & Scope",
          what: "The job receives explicit boundaries: data, actions, and model class.",
          why: "Boundaries are enforced by the system, not by trust.",
          benefit: "Sensitive data stays inside its scope.",
        },
        {
          id: "workflow",
          name: "Workflow",
          what: "A fitting workflow is proposed — or you pick one from your library.",
          why: "Repeatable structure beats one-off prompting.",
          benefit: "Quality that compounds with every run.",
        },
        {
          id: "model",
          name: "Local or Cloud AI",
          what: "The job runs on a local model or an approved cloud model.",
          why: "Model choice follows the data's sensitivity.",
          benefit: "Privacy without giving up capability.",
        },
        {
          id: "output",
          name: "Verified Output",
          what: "Results return with status and a step-by-step history.",
          why: "Every step is traceable after the fact.",
          benefit: "Output you can defend — internally and externally.",
        },
      ],
    },

    useCases: {
      label: "Use cases",
      title: "Built for the work companies actually do.",
      lede: "Realistic scenarios for small and mid-sized companies — no science fiction.",
      tabsLabel: "Use case selection",
      cases: [
        {
          id: "documents",
          title: "Documents & files",
          summary:
            "Evaluate contracts, reports, and internal documents in a controlled way — locally where it matters.",
          points: [
            "Summaries with source references",
            "Comparisons across document sets",
            "Local processing for sensitive material",
          ],
        },
        {
          id: "processes",
          title: "Recurring processes",
          summary:
            "Monthly reports, checklists, recurring analyses: model them once as workflows, run them on demand.",
          points: [
            "Same structure, current data",
            "Steps stay visible and adjustable",
            "Less copy-paste between tools",
          ],
        },
        {
          id: "orchestration",
          title: "Local & cloud orchestration",
          summary:
            "Assign the right model to each task: local for sensitive work, cloud for heavy lifting — by rule, not by habit.",
          points: [
            "Per-task model assignment",
            "Approved scopes for cloud jobs",
            "One place to see what ran where",
          ],
        },
        {
          id: "own-workflows",
          title: "Your own workflows",
          summary:
            "Build a workflow library that matches your company: create, save, manage, and refine.",
          points: [
            "Start from real tasks",
            "Organize and reuse",
            "Improve with every iteration",
          ],
        },
        {
          id: "connectors",
          title: "Mail & service connectors",
          summary:
            "Connectors for mail and further services are in development. They will follow the same permission and scope model as everything else in the Hub.",
          points: [
            "Mail connectors — planned",
            "Connectors for further services — planned",
            "Same controlled boundaries as the core",
          ],
          planned: true,
          plannedNote:
            "In development — not part of the current product core.",
        },
      ],
      moreLink: "All use cases",
    },

    security: {
      label: "Security & privacy by design",
      title: "Security is the architecture, not a feature list.",
      lede: "Mainsches Hub is designed so that control is structural: what runs, where it runs, and what it may touch.",
      items: [
        {
          title: "Local processing where it fits",
          body: "Sensitive files can be processed on your own hardware instead of leaving the company.",
        },
        {
          title: "Explicit job boundaries",
          body: "Every job runs inside defined limits — no silent expansion of what a task may do.",
        },
        {
          title: "Permissions & scope",
          body: "Data access, actions, and model class are scoped per job and enforced by the system.",
        },
        {
          title: "Traceable steps",
          body: "Workflow steps are recorded so you can reconstruct what happened and why.",
        },
        {
          title: "Privacy by design",
          body: "Data minimization is a design principle: jobs see what they need, nothing more.",
        },
        {
          title: "Cloud as a choice",
          body: "Cloud models add capacity when you want them — they are never a forced dependency.",
        },
      ],
      disclaimer:
        "These points describe the product's architecture and design goals. Mainsches does not claim external certifications or audits at this stage.",
      moreLink: "Security in depth",
    },

    status: {
      label: "Product status",
      title: "What exists, what is planned — stated plainly.",
      lede: "Mainsches Hub is in active development. This page separates the product's direction from what is still ahead.",
      nowTitle: "Product direction — being built now",
      nowItems: [
        "Orchestration of local and cloud AI models",
        "Adaptive workflows: create, save, manage, refine",
        "Local file processing",
        "Permissions, scopes, and traceable steps",
        "Security and privacy by design",
      ],
      plannedTitle: "Planned — in development",
      plannedItems: [
        "Mail connectors",
        "Connectors for further services",
      ],
      visionNote:
        "The goal: Mainsches Hub becomes the control layer for everyday AI work in companies — one place where AI acts with permission, not by default.",
    },

    pilotCta: {
      label: "Pilot program",
      title: "Shape the Hub before everyone else uses it.",
      lede: "We are opening Mainsches Hub to a small group of pilot companies, strategic partners, and investors.",
      bullets: [
        "Early access with direct influence on the roadmap",
        "A direct line to the founder — no ticket queues",
        "For SMEs, strategic partners, and investors",
      ],
      cta: "Apply for the pilot program",
    },

    otherProducts: {
      label: "Other products by Mainsches",
      title: "Focused apps from the same workshop.",
      lede: "Independent products by Mainsches — separate from Mainsches Hub.",
      mobileAppTag: "Mobile app",
      webAppTag: "Web app",
      mainschesAi:
        "Sketch to image: upload a drawing, add a prompt, get a polished visual.",
      swipeSort:
        "Fast photo cleanup: sort, keep, and delete with simple swipes.",
      swipeSortCta: "Google Play",
      idRadar:
        "Shows how visible your identity is across public data sources.",
      idRadarCta: "idradar.ch",
    },

    faq: {
      label: "FAQ",
      title: "Short answers to the questions that matter.",
      items: [
        {
          question: "What is Mainsches Hub?",
          answer:
            "Mainsches Hub is an AI operating system for companies. It orchestrates local and cloud AI models, files, and adaptive workflows in one controlled workspace, with permissions and traceability built in.",
        },
        {
          question: "What does “AI operating system” mean?",
          answer:
            "A control layer between your work and AI models: it coordinates models, files, workflows, and actions, and enforces which model runs where, what data a job may touch, and how results come back.",
        },
        {
          question: "Local or cloud — who decides?",
          answer:
            "You do, per task. Sensitive work can be pinned to local models on your own hardware; cloud models run only within an approved scope. The Hub enforces the rule you set.",
        },
        {
          question: "Can I build my own workflows?",
          answer:
            "Yes. Workflows are created from real tasks, saved to a library, and refined over time — they are a core concept of the product, not an add-on.",
        },
        {
          question: "Is Mainsches Hub available today?",
          answer:
            "Mainsches Hub is in active development. A pilot program for small and mid-sized companies, partners, and investors is open — that is currently the way to get access.",
        },
      ],
    },
  },

  product: {
    heroLabel: "Product",
    heroTitle: "One hub that treats AI as a system, not a chat window.",
    heroLede:
      "Mainsches Hub combines model orchestration, file handling, workflows, and permissions in one workspace. This page explains the pieces and how they fit.",
    areasTitle: "The four building blocks",
    areas: [
      {
        title: "Orchestration",
        body: "The Hub assigns each job to a local or cloud model based on your rules — sensitivity, size, and task type. One decision layer instead of ad-hoc tool picking.",
      },
      {
        title: "Files",
        body: "Local files are first-class citizens: the Hub can process documents on your own hardware, keep references to sources, and return results you can check.",
      },
      {
        title: "Workflows",
        body: "Recurring work becomes a saved workflow with visible steps. Workflows are created from real tasks and refined over time — adaptivity is the point.",
      },
      {
        title: "Permissions & scope",
        body: "Every job carries explicit boundaries: which data, which actions, which model class. The system enforces them; no job silently widens its own scope.",
      },
    ],
    principlesTitle: "Design principles",
    principles: [
      {
        title: "Control before convenience",
        body: "Convenience matters, but never at the cost of knowing what runs where. Defaults are conservative; expansions are explicit.",
      },
      {
        title: "Local capability is real capability",
        body: "Local AI is not a demo mode. Core tasks are designed to work on your hardware, without a cloud account being a precondition.",
      },
      {
        title: "Traceability as a feature",
        body: "A result you cannot reconstruct is a liability. Steps, scopes, and model choices are recorded so output can be defended.",
      },
      {
        title: "Honest product communication",
        body: "What is planned is labeled as planned. Mail and service connectors are in development and communicated exactly that way.",
      },
    ],
    faqTitle: "Product FAQ",
    faq: [
      {
        question: "Is Mainsches Hub a chatbot?",
        answer:
          "No. A chat can be part of the surface, but the product is the control layer underneath: model orchestration, workflows, permissions, and traceable execution.",
      },
      {
        question: "Which AI models does Mainsches Hub use?",
        answer:
          "The architecture is model-agnostic: local models on your hardware and cloud models within approved scopes. Concrete model line-ups depend on your setup and are discussed in the pilot program.",
      },
      {
        question: "Who is Mainsches Hub for?",
        answer:
          "Primarily small and mid-sized companies that want AI leverage without losing control over their data — plus partners and investors who want to build that future with us.",
      },
    ],
    cta: "Join the pilot program",
  },

  workflowsPage: {
    heroLabel: "Workflows",
    heroTitle: "Adaptive workflows: structure that learns your work.",
    heroLede:
      "A prompt solves a task once. A workflow solves it every time — visibly, repeatably, and under your control. In Mainsches Hub, workflows are created, saved, managed, and refined.",
    lifecycleTitle: "The workflow lifecycle",
    lifecycle: [
      {
        step: "01",
        title: "Create",
        body: "Start from a real task: a goal, a folder of documents, a recurring routine. The Hub proposes a first structure — you shape it.",
      },
      {
        step: "02",
        title: "Run",
        body: "Each run assigns models within your rules and keeps every step visible. No black-box execution.",
      },
      {
        step: "03",
        title: "Manage",
        body: "Workflows live in a library: named, organized, and ready. Your operational knowledge stops living in someone's head.",
      },
      {
        step: "04",
        title: "Refine",
        body: "Tighten a scope, swap a model, adjust a step. The workflow gets better with every iteration — that is what adaptive means.",
      },
    ],
    examplesTitle: "What a workflow can look like",
    examplesLede:
      "Three examples of the kind of workflows companies can model in the Hub.",
    examples: [
      {
        title: "Document review",
        body: "Evaluate a folder of contracts locally and get summaries with source references.",
        steps: [
          "Input: contract folder (local)",
          "Scope: read-only, local model",
          "Steps: extract, compare, summarize",
          "Output: summary with references",
        ],
      },
      {
        title: "Monthly report",
        body: "Reuse last month's structure with current numbers and notes.",
        steps: [
          "Input: spreadsheet + notes",
          "Scope: approved cloud step for wording",
          "Steps: structure, draft, check",
          "Output: draft ready for review",
        ],
      },
      {
        title: "Onboarding checklist",
        body: "Turn a described routine into a repeatable, visible process.",
        steps: [
          "Input: your description",
          "Scope: local by default",
          "Steps: capture, structure, save",
          "Output: reusable workflow",
        ],
      },
    ],
    exampleNote:
      "Illustrative examples of the intended product experience — shaped together with pilot customers.",
    cta: "Bring your process to the pilot program",
  },

  securityPage: {
    heroLabel: "Security",
    heroTitle: "Security and privacy, designed in from the start.",
    heroLede:
      "Most AI tools ask for trust. Mainsches Hub is built to replace trust with structure: local processing where it fits, explicit boundaries, and traceable execution.",
    principlesTitle: "The security model",
    principles: [
      {
        title: "Local processing where it fits",
        body: "Documents and files can be processed on your own hardware. For sensitive material, the data simply does not leave.",
      },
      {
        title: "Explicit job boundaries",
        body: "A job is a contract: defined input, defined actions, defined model class. Nothing widens itself.",
      },
      {
        title: "Permissions & scope",
        body: "Scopes are enforced by the system. An approved cloud step stays exactly that — one step, one scope.",
      },
      {
        title: "Traceable workflow steps",
        body: "Every step is recorded. You can reconstruct what ran, where, and with which boundaries.",
      },
      {
        title: "Privacy by design",
        body: "Data minimization is structural: jobs receive the context they need, not your whole environment.",
      },
      {
        title: "Cloud without coercion",
        body: "Cloud capacity is available when you choose it. It is an option with a scope — never a hidden default.",
      },
    ],
    dataTitle: "How data is treated",
    dataLede:
      "Three plain rules describe the intended data path in Mainsches Hub.",
    dataPoints: [
      {
        title: "Data stays local by default",
        body: "The default path for files is your own hardware. Leaving it is an explicit, scoped decision.",
      },
      {
        title: "Cloud steps are scoped",
        body: "When a job uses cloud AI, the scope defines what is shared — and that scope is visible to you.",
      },
      {
        title: "Results are accountable",
        body: "Outputs carry their history: steps, model class, and boundaries. You can always answer “where did this come from?”",
      },
    ],
    disclaimer:
      "This page describes the product's architecture and design goals. Mainsches does not claim external certifications, audits, or compliance attestations at this stage.",
    faqTitle: "Security FAQ",
    faq: [
      {
        question: "Does my data have to go to the cloud?",
        answer:
          "No. Local processing is a core capability, not a fallback. Cloud models are used only when you approve them for a scoped step.",
      },
      {
        question: "Can I see what a workflow did?",
        answer:
          "Yes. Steps are recorded with their boundaries and model choice, so execution can be reconstructed after the fact.",
      },
      {
        question: "Is Mainsches Hub certified?",
        answer:
          "Mainsches Hub is in development and does not claim external certifications at this stage. The security model is architectural: local processing, scopes, and traceability.",
      },
    ],
    cta: "Discuss your security requirements",
  },

  useCasesPage: {
    heroLabel: "Use cases",
    heroTitle: "Where the Hub earns its place.",
    heroLede:
      "Mainsches Hub is built for small and mid-sized companies. These scenarios show what controlled AI orchestration looks like in real operations.",
    scenariosTitle: "Core scenarios",
    plannedTitle: "Planned connectors",
    plannedLede:
      "The next expansion stage connects the Hub to the tools where work arrives. In development, clearly separated from the current core:",
    plannedItems: [
      {
        title: "Mail connectors",
        body: "Draft answers from your files, summarize threads, prepare follow-ups — under the same scope model as every other job.",
      },
      {
        title: "Connectors for further services",
        body: "Additional service connectors will follow the same principle: explicit permissions, visible scopes, traceable steps.",
      },
    ],
    cta: "Bring your scenario to the pilot program",
  },

  pilotPage: {
    heroLabel: "Pilot program",
    heroTitle: "Build the AI operating system with us.",
    heroLede:
      "Mainsches Hub is in active development. We are looking for pilot companies that bring real processes, partners who extend the reach, and investors who back the vision.",
    audiencesTitle: "Who we are looking for",
    audiences: [
      {
        title: "Pilot companies",
        body: "Small and mid-sized companies with recurring document or process work. You get early access and direct influence; we get reality as feedback.",
      },
      {
        title: "Strategic partners",
        body: "Integrators, consultancies, and tool makers who want controlled AI orchestration in their offering.",
      },
      {
        title: "Investors",
        body: "Conversations about backing Mainsches Hub — a Swiss take on secure AI orchestration for the mid-market.",
      },
    ],
    formTitle: "Request access",
    formLede:
      "Tell us briefly who you are and what you are interested in. We reply personally.",
    form: {
      name: "Name",
      email: "Business email",
      emailHint: "We use this address only to answer your request.",
      company: "Company",
      role: "Role",
      interest: "I am interested as",
      interestPilot: "Pilot customer",
      interestPartner: "Partner",
      interestInvestor: "Investor",
      message: "Message",
      consentPre: "I have read the ",
      consentLinkLabel: "privacy policy",
      consentPost: " and agree to the processing of my data to handle this request.",
      submit: "Send request",
      submitting: "Sending…",
      errorSummaryTitle: "Please review the following fields:",
      errors: {
        name: "Please enter your name (at least 2 characters).",
        email: "Please enter a valid business email address.",
        company: "Please enter your company name.",
        role: "Please enter your role.",
        interest: "Please choose what you are interested in.",
        message: "Please write a short message (at least 10 characters).",
        consent: "Please agree to the privacy policy so we may process your request.",
      },
      success: "Your request has been sent.",
      successDetail:
        "Thank you — we will get back to you personally within a few days.",
      notConfiguredTitle: "Sending is not available right now",
      notConfiguredBody:
        "The form backend is not configured in this environment. Your message was not sent — please email us directly instead:",
      serverError:
        "Your request could not be sent. Please try again, or email us directly:",
      fallbackLabel: "Email us directly",
    },
    faqTitle: "Pilot FAQ",
    faq: [
      {
        question: "What does the pilot program include?",
        answer:
          "Early access to Mainsches Hub, direct exchange with the founder, and real influence on the roadmap. Scope and conditions are agreed individually per pilot.",
      },
      {
        question: "What happens after I send the form?",
        answer:
          "You get a personal reply — no automated funnel. If there is a fit, we schedule a conversation about your processes and goals.",
      },
    ],
  },

  legalPage: {
    heroLabel: "Legal notice",
    heroTitle: "Legal notice",
    heroLede:
      "This website provides information about Mainsches, Mainsches Hub, and further software products. It does not offer direct online sales.",
    cards: [
      {
        label: "Website operator",
        title: "Mainsches",
        paragraphs: [
          "Operator: Angelo S.",
          "Country of operation: Switzerland",
          "Contact email: contact@mainsches.com",
        ],
      },
      {
        label: "Current website scope",
        title: "Informational website",
        paragraphs: [
          "mainsches.com presents software products, concepts, and general information about Mainsches — in particular Mainsches Hub. No products or paid services are sold directly through this website, and no binding online orders can be placed here.",
        ],
      },
      {
        label: "Responsible for content",
        title: "Content responsibility",
        paragraphs: ["Responsible for the content of this website:", "Angelo S., Mainsches"],
      },
      {
        label: "Postal address",
        title: "Address notice",
        paragraphs: [
          "A public business correspondence address is not currently published on this website.",
        ],
      },
    ],
  },

  privacyPage: {
    heroLabel: "Privacy",
    heroTitle: "Privacy policy",
    heroLede:
      "This privacy policy explains how mainsches.com handles personal data when you visit the website or use the pilot program contact form.",
    cards: [
      {
        label: "Controller",
        title: "Responsible party",
        paragraphs: [
          "Mainsches, Switzerland.",
          "Contact: contact@mainsches.com",
        ],
      },
      {
        label: "Website visits",
        title: "Technical processing",
        paragraphs: [
          "When you visit this website, technical connection data may be processed to deliver the site securely and reliably. This can include IP-related request data, browser information, device information, and server logs that are technically necessary for operation and security.",
        ],
      },
      {
        label: "Contact form",
        title: "Messages you send voluntarily",
        paragraphs: [
          "If you use the pilot program form, the submitted data may include your name, email address, company, role, area of interest, and message content. This data is processed to handle your inquiry, reply to your message, and protect the form against spam and abuse.",
        ],
      },
      {
        label: "Anti-spam and security",
        title: "Protection of the contact form",
        paragraphs: [
          "The form uses anti-spam measures such as hidden fields, timing checks, and request limitation to detect abuse and maintain service security.",
        ],
      },
      {
        label: "Analytics",
        title: "Website analytics",
        paragraphs: [
          "This website may use Vercel Analytics to understand general website usage and improve performance and content. Analytics information is used in aggregated form to evaluate visits, page views, and overall usage patterns.",
        ],
      },
      {
        label: "Service providers",
        title: "Hosting and infrastructure",
        paragraphs: [
          "The website is hosted on Vercel. Form processing may also involve supporting infrastructure required to deliver the website and send messages.",
        ],
      },
      {
        label: "Retention",
        title: "Storage duration",
        paragraphs: [
          "Personal data is retained only for as long as necessary for the relevant purpose, such as responding to inquiries, maintaining security, and meeting legal or operational obligations.",
        ],
      },
      {
        label: "Your rights",
        title: "Questions and requests",
        paragraphs: [
          "You may contact Mainsches at any time if you have questions about personal data processing or would like to make a privacy-related request: contact@mainsches.com",
        ],
      },
      {
        label: "Updates",
        title: "Changes to this policy",
        paragraphs: [
          "This privacy policy may be updated if the website, services, or data processing activities change.",
        ],
      },
    ],
  },

  notFound: {
    code: "404",
    title: "This page does not exist.",
    body: "The address may be outdated or mistyped. The Hub, however, is exactly where it should be.",
    cta: "Back to the homepage",
  },
} satisfies Dictionary;
