import type { Dictionary } from "../types";

export const de = {
  locale: "de",

  common: {
    brand: "Mainsches",
    skipToContent: "Zum Inhalt springen",
    languageLabel: "Sprache",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schliessen",
    conceptDemo: "Interaktive Konzept-Demo",
    planned: "Geplant",
    inDevelopment: "In Entwicklung",
    productDirection: "Produktausrichtung",
    breadcrumbHome: "Startseite",
    externalLinkHint: "öffnet in neuem Tab",
  },

  nav: {
    ariaPrimary: "Hauptnavigation",
    product: "Produkt",
    workflows: "Workflows",
    security: "Sicherheit",
    useCases: "Use Cases",
    pilot: "Pilotprogramm",
    homeAria: "Mainsches Hub — Startseite",
  },

  footer: {
    tagline:
      "Das AI Operating System, das lokale und cloudbasierte KI, Dateien und adaptive Workflows orchestriert — mit Sicherheit ab Werk.",
    navigate: "Mainsches Hub",
    company: "Unternehmen",
    legal: "Rechtliches",
    contact: "Kontakt",
    impressum: "Impressum",
    privacy: "Datenschutz",
    otherProductsTitle: "Weitere Produkte von Mainsches",
    copyright: "Mainsches, Schweiz. Alle Rechte vorbehalten.",
  },

  meta: {
    home: {
      title: "Mainsches Hub — Das AI Operating System für kontrollierte KI-Arbeit",
      description:
        "Mainsches Hub orchestriert lokale und cloudbasierte KI-Modelle, Dateien und adaptive Workflows in einer kontrollierten Arbeitsoberfläche. Security und Privacy by Design. Aus der Schweiz.",
    },
    product: {
      title: "Produkt — Was Mainsches Hub ist und wie es funktioniert",
      description:
        "Mainsches Hub ist ein KI-Betriebssystem: ein Hub, der KI-Modelle, Dateien, Workflows und Aktionen unter expliziten Berechtigungen koordiniert. So ist es aufgebaut.",
    },
    workflows: {
      title: "Adaptive KI-Workflows — erstellen, ausführen, verfeinern",
      description:
        "Wiederkehrende Arbeit wird zum adaptiven KI-Workflow: aus echten Aufgaben erstellen, speichern, verwalten und laufend verbessern — unter voller Kontrolle im Mainsches Hub.",
    },
    security: {
      title: "Security & Privacy by Design — lokale KI, Scopes, Nachvollziehbarkeit",
      description:
        "Lokale Verarbeitung, wo sie passt, explizite Auftragsgrenzen, Berechtigungen und Scope, nachvollziehbare Schritte. Sicherheit als Architektur statt Marketing.",
    },
    useCases: {
      title: "Use Cases — KI-Orchestrierung für kleine und mittlere Unternehmen",
      description:
        "Dokumente kontrolliert auswerten, wiederkehrende Abläufe als Workflows abbilden, lokale und Cloud-KI je Aufgabe orchestrieren. Realistische Szenarien für KMU.",
    },
    pilot: {
      title: "Pilotprogramm — früher Zugang für Unternehmen, Partner, Investoren",
      description:
        "Jetzt am Mainsches-Hub-Pilotprogramm teilnehmen: früher Zugang für kleine und mittlere Unternehmen sowie ein direkter Draht für strategische Partner und Investoren.",
    },
    legal: {
      title: "Impressum",
      description:
        "Impressum und Betreiberangaben für mainsches.com, die Website von Mainsches Hub und Mainsches, Schweiz.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Wie mainsches.com mit personenbezogenen Daten umgeht: Websitebesuche, Pilotprogramm-Formular, Hosting und Ihre Rechte.",
    },
  },

  home: {
    hero: {
      eyebrow: "AI Operating System",
      titlePre: "KI, Dateien und Workflows.",
      titleGold: "Ein Hub",
      titlePost: "mit Kontrolle.",
      lede: "Mainsches Hub orchestriert lokale und cloudbasierte KI-Modelle, Ihre Dateien und adaptive Workflows in einer kontrollierten Arbeitsoberfläche. Sicherheit und Datenschutz sind Teil des Systems — nicht nachgerüstet.",
      ctaPrimary: "Mainsches Hub entdecken",
      ctaSecondary: "Pilotprogramm",
    },

    whatIsOs: {
      label: "Was ist ein AI Operating System?",
      title: "Eine Kontrollschicht zwischen Ihrer Arbeit und der KI.",
      definition:
        "Ein AI Operating System koordiniert KI-Modelle, Dateien, Workflows und Aktionen an einem Ort. Es entscheidet — innerhalb Ihrer Regeln —, welches Modell wo läuft, welche Daten ein Auftrag berühren darf und wie Ergebnisse zurückkommen. Genau dafür wird Mainsches Hub gebaut.",
      points: [
        {
          title: "Ein zentraler Hub",
          body: "Modelle, Dateien, Workflows und Aktionen treffen sich in einer Oberfläche — statt in verstreuten Tools und Browser-Tabs.",
        },
        {
          title: "Kontrollierte Modellwahl",
          body: "Lokale und Cloud-KI werden pro Aufgabe zugewiesen. Sensible Arbeit kann auf der eigenen Hardware bleiben.",
        },
        {
          title: "Workflows, die leben",
          body: "Wiederkehrende Arbeit wird zum Workflow, den Sie speichern, verwalten und laufend verbessern.",
        },
        {
          title: "Grenzen ab Werk",
          body: "Berechtigungen und Scopes sind Systemfunktionen — keine Richtlinien auf Papier.",
        },
      ],
      diagram: {
        hub: "Mainsches Hub",
        localAi: "Lokale KI",
        cloudAi: "Cloud-KI",
        files: "Dateien",
        workflows: "Workflows",
        actions: "Aktionen",
        connectors: "Connectoren",
        connectorsPlanned: "geplant",
        ariaLabel:
          "Systemdiagramm: Mainsches Hub im Zentrum, verbunden mit lokaler KI, Cloud-KI, Dateien, Workflows, Aktionen und geplanten Connectoren.",
      },
    },

    console: {
      label: "Der Hub in Aktion",
      title: "Vom Ziel zum nachvollziehbaren Ergebnis.",
      lede: "Wählen Sie ein Szenario und sehen Sie, wie der Hub Kontext erkennt, einen Workflow vorschlägt, das passende Modell zuweist und ein nachvollziehbares Ergebnis liefert.",
      windowTitle: "Mainsches Hub — Console",
      scenarioGroupLabel: "Szenario wählen",
      stepLabels: {
        goal: "Ziel",
        context: "Kontext",
        workflow: "Workflow",
        model: "Modell",
        result: "Ergebnis",
      },
      routingLocal: "Lokales Modell — Dateien bleiben auf diesem Gerät",
      routingCloud: "Cloud-Modell — läuft innerhalb eines freigegebenen Scopes",
      routingHybrid: "Lokal zuerst — Cloud nur mit Freigabe",
      statusRunning: "läuft",
      statusDone: "fertig",
      replay: "Erneut abspielen",
      scenarios: [
        {
          id: "contracts",
          chip: "Verträge prüfen",
          goal: "Alle Verträge im Ordner Q3 zusammenfassen",
          context: "14 PDF-Dateien erkannt · lokaler Ordner",
          workflow: "Dokumentenprüfung — Zusammenfassung mit Quellenbezug",
          routing: "local",
          routingNote:
            "Sensible Dokumente — der Auftrag ist fest an lokale KI gebunden.",
          result:
            "Zusammenfassung pro Vertrag, zentrale Klauseln markiert, jeder Schritt protokolliert.",
        },
        {
          id: "report",
          chip: "Monatsreport",
          goal: "Den monatlichen Management-Report vorbereiten",
          context: "Tabelle und Sitzungsnotizen erkannt",
          workflow: "Wiederkehrender Report — nutzt die Struktur des Vormonats",
          routing: "cloud",
          routingNote:
            "Freigegebener Scope: Struktur und Formulierung, keine Rohdaten-Exporte.",
          result:
            "Report-Entwurf bereit zur Durchsicht, Änderungen pro Schritt nachvollziehbar.",
        },
        {
          id: "workflow",
          chip: "Workflow erstellen",
          goal: "Unsere Onboarding-Checkliste als Workflow abbilden",
          context: "Schritte aus Ihrer Beschreibung erfasst",
          workflow: "Neuer Workflow-Entwurf — vor dem ersten Lauf anpassbar",
          routing: "hybrid",
          routingNote:
            "Läuft standardmässig lokal; Cloud-Schritte brauchen eine Freigabe.",
          result: "Wiederverwendbarer Workflow, gespeichert in Ihrer Bibliothek.",
        },
      ],
      reducedMotionNote:
        "Animationen richten sich nach Ihrer Systemeinstellung für Bewegung.",
    },

    localCloud: {
      label: "Lokale und Cloud-KI",
      title: "Das Modell folgt den Daten — nicht umgekehrt.",
      lede: "Manche Arbeit gehört auf die eigene Hardware. Andere profitiert von mehr Rechenleistung. Mainsches Hub lässt Sie das pro Aufgabe entscheiden — und setzt die Entscheidung durch.",
      localTitle: "Lokale KI",
      localPoints: [
        "Dateien können auf der eigenen Hardware verarbeitet werden",
        "Geeignet für Verträge, Personaldossiers und interne Dokumente",
        "Kernaufgaben funktionieren ohne Cloud-Abhängigkeit",
      ],
      cloudTitle: "Cloud-KI",
      cloudPoints: [
        "Zusätzliche Kapazität für grosse oder komplexe Aufträge",
        "Läuft nur innerhalb eines explizit freigegebenen Scopes",
        "Eine Option, die Sie wählen — nie ein erzwungener Standard",
      ],
      note: "Sie definieren die Regel einmal. Der Hub wendet sie auf jeden Auftrag an.",
    },

    adaptive: {
      label: "Adaptive Workflows",
      title: "Workflows, die sich Ihrer Arbeit anpassen.",
      lede: "Prompts sind Einwegartikel. Workflows verzinsen sich. Mainsches Hub macht aus wiederkehrender Arbeit Strukturen, die Ihnen gehören.",
      points: [
        {
          title: "Aus echten Aufgaben erstellen",
          body: "Ein Workflow entsteht aus tatsächlicher Arbeit — einem Ziel, einem Dokumentenbestand, einer Routine. Nicht auf dem Reissbrett.",
        },
        {
          title: "Speichern und verwalten",
          body: "Ihre Workflows liegen in einer Bibliothek: benannt, geordnet, bereit für den nächsten Lauf.",
        },
        {
          title: "Laufend verfeinern",
          body: "Schritte anpassen, Scopes schärfen, Modelle tauschen. Der Workflow wird mit jeder Iteration besser.",
        },
      ],
    },

    flow: {
      label: "So läuft ein Auftrag",
      title: "Sechs Schritte. Jeder rechenschaftspflichtig.",
      lede: "Wählen Sie einen Schritt und sehen Sie, was passiert, warum es kontrolliert wird und was Sie davon haben.",
      stepListLabel: "Workflow-Schritte",
      whatLabel: "Was passiert",
      whyLabel: "Warum kontrolliert",
      benefitLabel: "Ihr Nutzen",
      steps: [
        {
          id: "input",
          name: "Input",
          what: "Ein Ziel, eine Frage oder Dateien starten den Auftrag.",
          why: "Ohne Ihren expliziten Start läuft nichts.",
          benefit: "Sie bleiben der Auslöser — immer.",
        },
        {
          id: "intent",
          name: "Intent & Kontext",
          what: "Der Hub erkennt die Aufgabe und sammelt nur den relevanten Kontext.",
          why: "Aufträge sehen die Daten, die sie brauchen — nicht alles, was Sie haben.",
          benefit: "Keine blinde Verarbeitung Ihrer Umgebung.",
        },
        {
          id: "scope",
          name: "Berechtigung & Scope",
          what: "Der Auftrag erhält explizite Grenzen: Daten, Aktionen, Modellklasse.",
          why: "Grenzen setzt das System durch — nicht das Vertrauen.",
          benefit: "Sensible Daten bleiben in ihrem Scope.",
        },
        {
          id: "workflow",
          name: "Workflow",
          what: "Ein passender Workflow wird vorgeschlagen — oder Sie wählen einen aus Ihrer Bibliothek.",
          why: "Wiederholbare Struktur schlägt einmaliges Prompten.",
          benefit: "Qualität, die sich mit jedem Lauf aufbaut.",
        },
        {
          id: "model",
          name: "Lokale oder Cloud-KI",
          what: "Der Auftrag läuft auf einem lokalen Modell oder einem freigegebenen Cloud-Modell.",
          why: "Die Modellwahl folgt der Sensibilität der Daten.",
          benefit: "Datenschutz ohne Verzicht auf Leistung.",
        },
        {
          id: "output",
          name: "Verifizierter Output",
          what: "Ergebnisse kommen mit Status und Schritt-für-Schritt-Historie zurück.",
          why: "Jeder Schritt bleibt im Nachhinein nachvollziehbar.",
          benefit: "Ergebnisse, die Sie vertreten können — intern wie extern.",
        },
      ],
    },

    useCases: {
      label: "Use Cases",
      title: "Gebaut für die Arbeit, die in Unternehmen wirklich anfällt.",
      lede: "Realistische Szenarien für kleine und mittlere Unternehmen — keine Science-Fiction.",
      tabsLabel: "Use-Case-Auswahl",
      cases: [
        {
          id: "documents",
          title: "Dokumente & Dateien",
          summary:
            "Verträge, Berichte und interne Dokumente kontrolliert auswerten — lokal, wo es darauf ankommt.",
          points: [
            "Zusammenfassungen mit Quellenbezug",
            "Vergleiche über Dokumentbestände",
            "Lokale Verarbeitung für sensibles Material",
          ],
        },
        {
          id: "processes",
          title: "Wiederkehrende Abläufe",
          summary:
            "Monatsreports, Checklisten, wiederkehrende Analysen: einmal als Workflow abbilden, bei Bedarf ausführen.",
          points: [
            "Gleiche Struktur, aktuelle Daten",
            "Schritte bleiben sichtbar und anpassbar",
            "Weniger Copy-Paste zwischen Tools",
          ],
        },
        {
          id: "orchestration",
          title: "Lokal & Cloud orchestrieren",
          summary:
            "Jede Aufgabe bekommt das passende Modell: lokal für Sensibles, Cloud für Rechenintensives — per Regel, nicht per Gewohnheit.",
          points: [
            "Modellzuweisung pro Aufgabe",
            "Freigegebene Scopes für Cloud-Aufträge",
            "Ein Ort zeigt, was wo lief",
          ],
        },
        {
          id: "own-workflows",
          title: "Eigene Workflows",
          summary:
            "Eine Workflow-Bibliothek, die zu Ihrem Unternehmen passt: erstellen, speichern, verwalten, verfeinern.",
          points: [
            "Aus echten Aufgaben starten",
            "Ordnen und wiederverwenden",
            "Mit jeder Iteration besser",
          ],
        },
        {
          id: "connectors",
          title: "Mail- & Service-Connectoren",
          summary:
            "Connectoren für Mail und weitere Dienste sind in Entwicklung. Sie folgen demselben Berechtigungs- und Scope-Modell wie alles andere im Hub.",
          points: [
            "Mail-Connectoren — geplant",
            "Connectoren für weitere Dienste — geplant",
            "Dieselben kontrollierten Grenzen wie im Kern",
          ],
          planned: true,
          plannedNote: "In Entwicklung — nicht Teil des aktuellen Produktkerns.",
        },
      ],
      moreLink: "Alle Use Cases",
    },

    security: {
      label: "Security & Privacy by Design",
      title: "Sicherheit ist die Architektur, nicht die Feature-Liste.",
      lede: "Mainsches Hub ist so entworfen, dass Kontrolle strukturell ist: was läuft, wo es läuft und was es berühren darf.",
      items: [
        {
          title: "Lokale Verarbeitung, wo sie passt",
          body: "Sensible Dateien können auf der eigenen Hardware verarbeitet werden, statt das Unternehmen zu verlassen.",
        },
        {
          title: "Explizite Auftragsgrenzen",
          body: "Jeder Auftrag läuft innerhalb definierter Grenzen — keine stille Ausweitung dessen, was eine Aufgabe darf.",
        },
        {
          title: "Berechtigungen & Scope",
          body: "Datenzugriff, Aktionen und Modellklasse sind pro Auftrag begrenzt und werden vom System durchgesetzt.",
        },
        {
          title: "Nachvollziehbare Schritte",
          body: "Workflow-Schritte werden aufgezeichnet — Sie können rekonstruieren, was passiert ist und warum.",
        },
        {
          title: "Privacy by Design",
          body: "Datenminimierung ist Konstruktionsprinzip: Aufträge sehen, was sie brauchen. Nicht mehr.",
        },
        {
          title: "Cloud als Wahl",
          body: "Cloud-Modelle liefern Kapazität, wenn Sie es wollen — sie sind nie eine erzwungene Abhängigkeit.",
        },
      ],
      disclaimer:
        "Diese Punkte beschreiben Architektur und Designziele des Produkts. Mainsches beansprucht zum jetzigen Zeitpunkt keine externen Zertifizierungen oder Audits.",
      moreLink: "Sicherheit im Detail",
    },

    status: {
      label: "Produktstatus",
      title: "Was es gibt, was geplant ist — klar getrennt.",
      lede: "Mainsches Hub ist in aktiver Entwicklung. Hier steht, wofür das Produkt gebaut wird — und was noch vor uns liegt.",
      nowTitle: "Produktausrichtung — daran wird gebaut",
      nowItems: [
        "Orchestrierung lokaler und cloudbasierter KI-Modelle",
        "Adaptive Workflows: erstellen, speichern, verwalten, verfeinern",
        "Lokale Dateiverarbeitung",
        "Berechtigungen, Scopes und nachvollziehbare Schritte",
        "Security und Privacy by Design",
      ],
      plannedTitle: "Geplant — in Entwicklung",
      plannedItems: ["Mail-Connectoren", "Connectoren für weitere Dienste"],
      visionNote:
        "Das Ziel: Mainsches Hub wird die Kontrollschicht für die tägliche KI-Arbeit in Unternehmen — ein Ort, an dem KI mit Erlaubnis handelt, nicht aus Voreinstellung.",
    },

    pilotCta: {
      label: "Pilotprogramm",
      title: "Gestalten Sie den Hub, bevor ihn alle nutzen.",
      lede: "Wir öffnen Mainsches Hub für eine kleine Gruppe von Pilotunternehmen, strategischen Partnern und Investoren.",
      bullets: [
        "Früher Zugang mit direktem Einfluss auf die Roadmap",
        "Direkter Draht zum Gründer — keine Ticket-Warteschlangen",
        "Für KMU, strategische Partner und Investoren",
      ],
      cta: "Für das Pilotprogramm bewerben",
    },

    otherProducts: {
      label: "Weitere Produkte von Mainsches",
      title: "Fokussierte Apps aus derselben Werkstatt.",
      lede: "Eigenständige Produkte von Mainsches — unabhängig von Mainsches Hub.",
      mobileAppTag: "Mobile App",
      webAppTag: "Web-App",
      mainschesAi:
        "Sketch to Image: Zeichnung hochladen, Prompt ergänzen, fertiges Bild erhalten.",
      swipeSort:
        "Schnelles Foto-Aufräumen: sortieren, behalten, löschen — per Swipe.",
      swipeSortCta: "Google Play",
      idRadar:
        "Zeigt, wie sichtbar Ihre Identität in öffentlichen Datenquellen ist.",
      idRadarCta: "idradar.ch",
    },

    faq: {
      label: "FAQ",
      title: "Kurze Antworten auf die wichtigen Fragen.",
      items: [
        {
          question: "Was ist Mainsches Hub?",
          answer:
            "Mainsches Hub ist ein AI Operating System für Unternehmen. Es orchestriert lokale und cloudbasierte KI-Modelle, Dateien und adaptive Workflows in einer kontrollierten Arbeitsoberfläche — mit Berechtigungen und Nachvollziehbarkeit ab Werk.",
        },
        {
          question: "Was bedeutet „AI Operating System“?",
          answer:
            "Eine Kontrollschicht zwischen Ihrer Arbeit und den KI-Modellen: Sie koordiniert Modelle, Dateien, Workflows und Aktionen und setzt durch, welches Modell wo läuft, welche Daten ein Auftrag berühren darf und wie Ergebnisse zurückkommen.",
        },
        {
          question: "Lokal oder Cloud — wer entscheidet?",
          answer:
            "Sie, pro Aufgabe. Sensible Arbeit kann fest an lokale Modelle auf eigener Hardware gebunden werden; Cloud-Modelle laufen nur innerhalb eines freigegebenen Scopes. Der Hub setzt Ihre Regel durch.",
        },
        {
          question: "Kann ich eigene Workflows erstellen?",
          answer:
            "Ja. Workflows entstehen aus echten Aufgaben, werden in einer Bibliothek gespeichert und laufend verfeinert — sie sind Kernkonzept des Produkts, kein Zusatzmodul.",
        },
        {
          question: "Ist Mainsches Hub heute verfügbar?",
          answer:
            "Mainsches Hub ist in aktiver Entwicklung. Der Zugang läuft aktuell über das Pilotprogramm für kleine und mittlere Unternehmen, Partner und Investoren.",
        },
      ],
    },
  },

  product: {
    heroLabel: "Produkt",
    heroTitle: "Ein Hub, der KI als System versteht — nicht als Chatfenster.",
    heroLede:
      "Mainsches Hub verbindet Modell-Orchestrierung, Dateiverarbeitung, Workflows und Berechtigungen in einer Arbeitsoberfläche. Diese Seite erklärt die Bausteine und ihr Zusammenspiel.",
    areasTitle: "Die vier Bausteine",
    areas: [
      {
        title: "Orchestrierung",
        body: "Der Hub weist jeden Auftrag einem lokalen oder Cloud-Modell zu — nach Ihren Regeln zu Sensibilität, Umfang und Aufgabentyp. Eine Entscheidungsschicht statt Tool-Bauchgefühl.",
      },
      {
        title: "Dateien",
        body: "Lokale Dateien sind erstklassige Bürger: Der Hub kann Dokumente auf der eigenen Hardware verarbeiten, Quellenbezüge behalten und prüfbare Ergebnisse liefern.",
      },
      {
        title: "Workflows",
        body: "Wiederkehrende Arbeit wird zum gespeicherten Workflow mit sichtbaren Schritten. Workflows entstehen aus echten Aufgaben und werden laufend verfeinert — Adaptivität ist der Kern.",
      },
      {
        title: "Berechtigungen & Scope",
        body: "Jeder Auftrag trägt explizite Grenzen: welche Daten, welche Aktionen, welche Modellklasse. Das System setzt sie durch; kein Auftrag erweitert sich stillschweigend selbst.",
      },
    ],
    principlesTitle: "Designprinzipien",
    principles: [
      {
        title: "Kontrolle vor Bequemlichkeit",
        body: "Komfort zählt — aber nie auf Kosten des Wissens, was wo läuft. Voreinstellungen sind konservativ; Erweiterungen sind explizit.",
      },
      {
        title: "Lokal ist vollwertig",
        body: "Lokale KI ist kein Demo-Modus. Kernaufgaben sind dafür ausgelegt, auf Ihrer Hardware zu funktionieren — ohne Cloud-Konto als Voraussetzung.",
      },
      {
        title: "Nachvollziehbarkeit als Funktion",
        body: "Ein Ergebnis, das sich nicht rekonstruieren lässt, ist ein Risiko. Schritte, Scopes und Modellwahl werden festgehalten, damit Output vertretbar bleibt.",
      },
      {
        title: "Ehrliche Produktkommunikation",
        body: "Was geplant ist, heisst geplant. Mail- und Service-Connectoren sind in Entwicklung und werden genau so kommuniziert.",
      },
    ],
    faqTitle: "Produkt-FAQ",
    faq: [
      {
        question: "Ist Mainsches Hub ein Chatbot?",
        answer:
          "Nein. Ein Chat kann Teil der Oberfläche sein, aber das Produkt ist die Kontrollschicht darunter: Modell-Orchestrierung, Workflows, Berechtigungen und nachvollziehbare Ausführung.",
      },
      {
        question: "Welche KI-Modelle nutzt Mainsches Hub?",
        answer:
          "Die Architektur ist modell-agnostisch: lokale Modelle auf Ihrer Hardware und Cloud-Modelle innerhalb freigegebener Scopes. Konkrete Modell-Setups hängen von Ihrer Umgebung ab und werden im Pilotprogramm besprochen.",
      },
      {
        question: "Für wen ist Mainsches Hub gedacht?",
        answer:
          "Primär für kleine und mittlere Unternehmen, die KI-Hebel wollen, ohne die Kontrolle über ihre Daten abzugeben — sowie für Partner und Investoren, die diese Zukunft mitbauen wollen.",
      },
    ],
    cta: "Zum Pilotprogramm",
  },

  workflowsPage: {
    heroLabel: "Workflows",
    heroTitle: "Adaptive Workflows: Struktur, die Ihre Arbeit lernt.",
    heroLede:
      "Ein Prompt löst eine Aufgabe einmal. Ein Workflow löst sie jedes Mal — sichtbar, wiederholbar und unter Ihrer Kontrolle. Im Mainsches Hub werden Workflows erstellt, gespeichert, verwaltet und verfeinert.",
    lifecycleTitle: "Der Workflow-Lebenszyklus",
    lifecycle: [
      {
        step: "01",
        title: "Erstellen",
        body: "Ausgangspunkt ist eine echte Aufgabe: ein Ziel, ein Dokumentenordner, eine Routine. Der Hub schlägt eine erste Struktur vor — Sie formen sie.",
      },
      {
        step: "02",
        title: "Ausführen",
        body: "Jeder Lauf weist Modelle innerhalb Ihrer Regeln zu und hält jeden Schritt sichtbar. Keine Blackbox-Ausführung.",
      },
      {
        step: "03",
        title: "Verwalten",
        body: "Workflows liegen in einer Bibliothek: benannt, geordnet, einsatzbereit. Ihr Prozesswissen wohnt nicht länger nur in Köpfen.",
      },
      {
        step: "04",
        title: "Verfeinern",
        body: "Einen Scope schärfen, ein Modell tauschen, einen Schritt anpassen. Der Workflow wird mit jeder Iteration besser — das heisst adaptiv.",
      },
    ],
    examplesTitle: "Wie ein Workflow aussehen kann",
    examplesLede:
      "Drei Beispiele für Workflows, die Unternehmen im Hub abbilden können.",
    examples: [
      {
        title: "Dokumentenprüfung",
        body: "Einen Vertragsordner lokal auswerten und Zusammenfassungen mit Quellenbezug erhalten.",
        steps: [
          "Input: Vertragsordner (lokal)",
          "Scope: nur Lesen, lokales Modell",
          "Schritte: extrahieren, vergleichen, zusammenfassen",
          "Output: Zusammenfassung mit Quellenbezug",
        ],
      },
      {
        title: "Monatsreport",
        body: "Die Struktur des Vormonats mit aktuellen Zahlen und Notizen wiederverwenden.",
        steps: [
          "Input: Tabelle + Notizen",
          "Scope: freigegebener Cloud-Schritt für Formulierung",
          "Schritte: strukturieren, entwerfen, prüfen",
          "Output: Entwurf bereit zur Durchsicht",
        ],
      },
      {
        title: "Onboarding-Checkliste",
        body: "Eine beschriebene Routine in einen wiederholbaren, sichtbaren Prozess verwandeln.",
        steps: [
          "Input: Ihre Beschreibung",
          "Scope: standardmässig lokal",
          "Schritte: erfassen, strukturieren, speichern",
          "Output: wiederverwendbarer Workflow",
        ],
      },
    ],
    exampleNote:
      "Illustrative Beispiele für das angestrebte Produkterlebnis — gemeinsam mit Pilotkunden geformt.",
    cta: "Bringen Sie Ihren Prozess ins Pilotprogramm",
  },

  securityPage: {
    heroLabel: "Sicherheit",
    heroTitle: "Sicherheit und Datenschutz — von Anfang an eingebaut.",
    heroLede:
      "Die meisten KI-Tools verlangen Vertrauen. Mainsches Hub ist so gebaut, dass Struktur das Vertrauen ersetzt: lokale Verarbeitung, wo sie passt, explizite Grenzen und nachvollziehbare Ausführung.",
    principlesTitle: "Das Sicherheitsmodell",
    principles: [
      {
        title: "Lokale Verarbeitung, wo sie passt",
        body: "Dokumente und Dateien können auf der eigenen Hardware verarbeitet werden. Sensibles Material verlässt das Unternehmen erst gar nicht.",
      },
      {
        title: "Explizite Auftragsgrenzen",
        body: "Ein Auftrag ist ein Vertrag: definierter Input, definierte Aktionen, definierte Modellklasse. Nichts erweitert sich selbst.",
      },
      {
        title: "Berechtigungen & Scope",
        body: "Scopes werden vom System durchgesetzt. Ein freigegebener Cloud-Schritt bleibt genau das — ein Schritt, ein Scope.",
      },
      {
        title: "Nachvollziehbare Workflow-Schritte",
        body: "Jeder Schritt wird festgehalten. Sie können rekonstruieren, was wo und mit welchen Grenzen lief.",
      },
      {
        title: "Privacy by Design",
        body: "Datenminimierung ist strukturell: Aufträge erhalten den Kontext, den sie brauchen — nicht Ihre gesamte Umgebung.",
      },
      {
        title: "Cloud ohne Zwang",
        body: "Cloud-Kapazität steht bereit, wenn Sie sie wählen. Eine Option mit Scope — nie ein versteckter Standard.",
      },
    ],
    dataTitle: "Wie mit Daten umgegangen wird",
    dataLede: "Drei einfache Regeln beschreiben den vorgesehenen Datenpfad im Mainsches Hub.",
    dataPoints: [
      {
        title: "Daten bleiben standardmässig lokal",
        body: "Der Standardpfad für Dateien ist die eigene Hardware. Ihn zu verlassen ist eine explizite, begrenzte Entscheidung.",
      },
      {
        title: "Cloud-Schritte sind begrenzt",
        body: "Nutzt ein Auftrag Cloud-KI, definiert der Scope, was geteilt wird — und dieser Scope ist für Sie sichtbar.",
      },
      {
        title: "Ergebnisse sind rechenschaftsfähig",
        body: "Outputs tragen ihre Historie: Schritte, Modellklasse, Grenzen. Die Frage „Woher kommt das?“ bleibt beantwortbar.",
      },
    ],
    disclaimer:
      "Diese Seite beschreibt Architektur und Designziele des Produkts. Mainsches beansprucht zum jetzigen Zeitpunkt keine externen Zertifizierungen, Audits oder Compliance-Nachweise.",
    faqTitle: "Sicherheits-FAQ",
    faq: [
      {
        question: "Müssen meine Daten in die Cloud?",
        answer:
          "Nein. Lokale Verarbeitung ist eine Kernfähigkeit, kein Notbehelf. Cloud-Modelle kommen nur zum Einsatz, wenn Sie sie für einen begrenzten Schritt freigeben.",
        },
      {
        question: "Kann ich sehen, was ein Workflow getan hat?",
        answer:
          "Ja. Schritte werden mit ihren Grenzen und der Modellwahl aufgezeichnet, sodass sich die Ausführung im Nachhinein rekonstruieren lässt.",
      },
      {
        question: "Ist Mainsches Hub zertifiziert?",
        answer:
          "Mainsches Hub ist in Entwicklung und beansprucht derzeit keine externen Zertifizierungen. Das Sicherheitsmodell ist architektonisch: lokale Verarbeitung, Scopes, Nachvollziehbarkeit.",
      },
    ],
    cta: "Ihre Sicherheitsanforderungen besprechen",
  },

  useCasesPage: {
    heroLabel: "Use Cases",
    heroTitle: "Wo sich der Hub seinen Platz verdient.",
    heroLede:
      "Mainsches Hub wird für kleine und mittlere Unternehmen gebaut. Diese Szenarien zeigen, wie kontrollierte KI-Orchestrierung im Alltag aussieht.",
    scenariosTitle: "Kernszenarien",
    plannedTitle: "Geplante Connectoren",
    plannedLede:
      "Die nächste Ausbaustufe verbindet den Hub mit den Werkzeugen, in denen Arbeit ankommt. In Entwicklung, klar vom heutigen Kern getrennt:",
    plannedItems: [
      {
        title: "Mail-Connectoren",
        body: "Antworten aus Ihren Dateien entwerfen, Threads zusammenfassen, Follow-ups vorbereiten — unter demselben Scope-Modell wie jeder andere Auftrag.",
      },
      {
        title: "Connectoren für weitere Dienste",
        body: "Weitere Service-Connectoren folgen demselben Prinzip: explizite Berechtigungen, sichtbare Scopes, nachvollziehbare Schritte.",
      },
    ],
    cta: "Bringen Sie Ihr Szenario ins Pilotprogramm",
  },

  pilotPage: {
    heroLabel: "Pilotprogramm",
    heroTitle: "Bauen Sie das AI Operating System mit.",
    heroLede:
      "Mainsches Hub ist in aktiver Entwicklung. Wir suchen Pilotunternehmen mit echten Prozessen, Partner mit Reichweite und Investoren, die die Vision mittragen.",
    audiencesTitle: "Wen wir suchen",
    audiences: [
      {
        title: "Pilotunternehmen",
        body: "Kleine und mittlere Unternehmen mit wiederkehrender Dokumenten- oder Prozessarbeit. Sie erhalten frühen Zugang und direkten Einfluss; wir erhalten Realität als Feedback.",
      },
      {
        title: "Strategische Partner",
        body: "Integratoren, Beratungen und Tool-Anbieter, die kontrollierte KI-Orchestrierung in ihr Angebot holen wollen.",
      },
      {
        title: "Investoren",
        body: "Gespräche über ein Investment in Mainsches Hub — ein Schweizer Ansatz für sichere KI-Orchestrierung im Mittelstand.",
      },
    ],
    formTitle: "Zugang anfragen",
    formLede:
      "Sagen Sie uns kurz, wer Sie sind und was Sie interessiert. Wir antworten persönlich.",
    form: {
      name: "Name",
      email: "Geschäftliche E-Mail",
      emailHint: "Wir verwenden diese Adresse nur zur Beantwortung Ihrer Anfrage.",
      company: "Unternehmen",
      role: "Rolle",
      interest: "Ich interessiere mich als",
      interestPilot: "Pilotkunde",
      interestPartner: "Partner",
      interestInvestor: "Investor",
      message: "Nachricht",
      consentPre: "Ich habe die ",
      consentLinkLabel: "Datenschutzerklärung",
      consentPost:
        " gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung dieser Anfrage einverstanden.",
      submit: "Anfrage senden",
      submitting: "Wird gesendet…",
      errorSummaryTitle: "Bitte prüfen Sie folgende Felder:",
      errors: {
        name: "Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).",
        email: "Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse ein.",
        company: "Bitte geben Sie Ihr Unternehmen an.",
        role: "Bitte geben Sie Ihre Rolle an.",
        interest: "Bitte wählen Sie, als was Sie sich interessieren.",
        message: "Bitte schreiben Sie eine kurze Nachricht (mindestens 10 Zeichen).",
        consent:
          "Bitte stimmen Sie der Datenschutzerklärung zu, damit wir Ihre Anfrage bearbeiten dürfen.",
      },
      success: "Ihre Anfrage wurde gesendet.",
      successDetail:
        "Vielen Dank — wir melden uns innerhalb weniger Tage persönlich bei Ihnen.",
      notConfiguredTitle: "Senden ist derzeit nicht verfügbar",
      notConfiguredBody:
        "Das Formular-Backend ist in dieser Umgebung nicht konfiguriert. Ihre Nachricht wurde nicht gesendet — schreiben Sie uns bitte direkt:",
      serverError:
        "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt:",
      fallbackLabel: "Direkt per E-Mail schreiben",
    },
    faqTitle: "Pilot-FAQ",
    faq: [
      {
        question: "Was umfasst das Pilotprogramm?",
        answer:
          "Frühen Zugang zu Mainsches Hub, direkten Austausch mit dem Gründer und echten Einfluss auf die Roadmap. Umfang und Konditionen werden pro Pilot individuell vereinbart.",
      },
      {
        question: "Was passiert nach dem Absenden des Formulars?",
        answer:
          "Sie erhalten eine persönliche Antwort — keinen automatisierten Funnel. Passt es, vereinbaren wir ein Gespräch über Ihre Prozesse und Ziele.",
      },
    ],
  },

  legalPage: {
    heroLabel: "Impressum",
    heroTitle: "Impressum",
    heroLede:
      "Diese Website informiert über Mainsches, Mainsches Hub und weitere Softwareprodukte. Ein direkter Online-Verkauf findet nicht statt.",
    cards: [
      {
        label: "Betreiber der Website",
        title: "Mainsches",
        paragraphs: [
          "Betreiber: Angelo S.",
          "Sitz: Schweiz",
          "Kontakt: contact@mainsches.com",
        ],
      },
      {
        label: "Aktueller Umfang der Website",
        title: "Informationswebsite",
        paragraphs: [
          "mainsches.com stellt Softwareprodukte, Konzepte und allgemeine Informationen über Mainsches vor — insbesondere Mainsches Hub. Über diese Website werden derzeit keine Produkte oder kostenpflichtigen Dienstleistungen direkt verkauft; verbindliche Online-Bestellungen sind hier nicht möglich.",
        ],
      },
      {
        label: "Verantwortlich für den Inhalt",
        title: "Inhaltliche Verantwortung",
        paragraphs: ["Verantwortlich für den Inhalt dieser Website:", "Angelo S., Mainsches"],
      },
      {
        label: "Postanschrift",
        title: "Hinweis zur Adresse",
        paragraphs: [
          "Eine öffentliche Korrespondenzadresse wird auf dieser Website derzeit nicht veröffentlicht.",
        ],
      },
    ],
  },

  privacyPage: {
    heroLabel: "Datenschutz",
    heroTitle: "Datenschutzerklärung",
    heroLede:
      "Diese Datenschutzerklärung erläutert, wie mainsches.com mit personenbezogenen Daten umgeht, wenn Sie die Website besuchen oder das Pilotprogramm-Formular nutzen.",
    cards: [
      {
        label: "Verantwortliche Stelle",
        title: "Verantwortlich",
        paragraphs: ["Mainsches, Schweiz.", "Kontakt: contact@mainsches.com"],
      },
      {
        label: "Websitebesuche",
        title: "Technische Verarbeitung",
        paragraphs: [
          "Beim Besuch dieser Website können technische Verbindungsdaten verarbeitet werden, um die Seite sicher und zuverlässig auszuliefern. Dazu können IP-bezogene Anfragedaten, Browser-Informationen, Geräteinformationen und Server-Logs gehören, die für Betrieb und Sicherheit technisch notwendig sind.",
        ],
      },
      {
        label: "Kontaktformular",
        title: "Freiwillig übermittelte Nachrichten",
        paragraphs: [
          "Wenn Sie das Pilotprogramm-Formular nutzen, können die übermittelten Daten Ihren Namen, Ihre E-Mail-Adresse, Ihr Unternehmen, Ihre Rolle, Ihr Interesse sowie den Nachrichteninhalt umfassen. Diese Daten werden verarbeitet, um Ihre Anfrage zu bearbeiten, Ihnen zu antworten und das Formular vor Spam und Missbrauch zu schützen.",
        ],
      },
      {
        label: "Spam-Schutz und Sicherheit",
        title: "Schutz des Formulars",
        paragraphs: [
          "Das Formular nutzt Schutzmassnahmen wie versteckte Felder, Zeitprüfungen und Anfragebegrenzung, um Missbrauch zu erkennen und den sicheren Betrieb zu gewährleisten.",
        ],
      },
      {
        label: "Analyse",
        title: "Website-Analyse",
        paragraphs: [
          "Diese Website kann Vercel Analytics einsetzen, um die allgemeine Nutzung zu verstehen und Leistung sowie Inhalte zu verbessern. Analysedaten werden in aggregierter Form ausgewertet (Besuche, Seitenaufrufe, allgemeine Nutzungsmuster).",
        ],
      },
      {
        label: "Dienstleister",
        title: "Hosting und Infrastruktur",
        paragraphs: [
          "Die Website wird bei Vercel gehostet. Für die Formularverarbeitung kann zudem unterstützende Infrastruktur zum Einsatz kommen, die für Auslieferung der Website und Versand von Nachrichten erforderlich ist.",
        ],
      },
      {
        label: "Speicherdauer",
        title: "Aufbewahrung",
        paragraphs: [
          "Personenbezogene Daten werden nur so lange aufbewahrt, wie es für den jeweiligen Zweck erforderlich ist — etwa zur Beantwortung von Anfragen, zur Gewährleistung der Sicherheit und zur Erfüllung rechtlicher oder betrieblicher Pflichten.",
        ],
      },
      {
        label: "Ihre Rechte",
        title: "Fragen und Anliegen",
        paragraphs: [
          "Bei Fragen zur Verarbeitung personenbezogener Daten oder für datenschutzbezogene Anliegen können Sie Mainsches jederzeit kontaktieren: contact@mainsches.com",
        ],
      },
      {
        label: "Änderungen",
        title: "Anpassungen dieser Erklärung",
        paragraphs: [
          "Diese Datenschutzerklärung kann angepasst werden, wenn sich Website, Dienste oder Datenverarbeitungen ändern.",
        ],
      },
    ],
  },

  notFound: {
    code: "404",
    title: "Diese Seite gibt es nicht.",
    body: "Die Adresse ist möglicherweise veraltet oder vertippt. Der Hub dagegen ist genau da, wo er sein soll.",
    cta: "Zur Startseite",
  },
} satisfies Dictionary;
