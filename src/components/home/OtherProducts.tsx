import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";
import { PRODUCT_LINKS } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

type OtherDict = Dictionary["home"]["otherProducts"];

/** The existing ID Radar mark (adapted from the previous idradar page). */
function IdRadarMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="size-12"
    >
      <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,.16)" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="18" stroke="rgba(255,255,255,.11)" strokeWidth="1" />
      <circle cx="32" cy="32" r="8" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
      <line x1="32" y1="4" x2="32" y2="60" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
      <line x1="4" y1="32" x2="60" y2="32" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
      <line
        x1="32"
        y1="32"
        x2="32"
        y2="8"
        stroke="rgba(212,175,55,.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="2.2" fill="rgba(212,175,55,.7)" />
      <circle cx="32" cy="32" r="1" fill="rgba(255,252,248,.9)" />
    </svg>
  );
}

/**
 * Deliberately subordinate section: the three legacy products appear only
 * here, with logo, one-liner, and their verified existing target links.
 */
export function OtherProducts({
  dict,
  externalHint,
}: {
  dict: OtherDict;
  externalHint: string;
}) {
  const cards = [
    {
      name: "Mainsches AI",
      description: dict.mainschesAi,
      tag: dict.mobileAppTag,
      logo: (
        <Image
          src="/assets/mainsches-ai-logo.png"
          alt=""
          width={72}
          height={48}
          className="h-12 w-auto object-contain"
        />
      ),
      link: null,
    },
    {
      name: "SwipeSort",
      description: dict.swipeSort,
      tag: dict.mobileAppTag,
      logo: (
        <Image
          src="/assets/swipesort-logo.png"
          alt=""
          width={48}
          height={48}
          className="size-12 rounded-card object-cover"
        />
      ),
      link: { href: PRODUCT_LINKS.swipeSortPlayStore, label: dict.swipeSortCta },
    },
    {
      name: "ID Radar",
      description: dict.idRadar,
      tag: dict.webAppTag,
      logo: <IdRadarMark />,
      link: { href: PRODUCT_LINKS.idRadarSite, label: dict.idRadarCta },
    },
  ];

  return (
    <section id="other-products" className="border-t border-line bg-bg-deep">
      <div className="shell flex flex-col gap-10 py-20 sm:py-24">
        <SectionHeader label={dict.label} title={dict.title} lede={dict.lede} />

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.name}
              className="flex flex-col gap-4 rounded-panel border border-line bg-raised p-6"
            >
              <div className="flex h-12 items-center">{card.logo}</div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-lg font-medium text-ink">
                  {card.name}
                </h3>
                <span className="font-mono text-[0.62rem] tracking-wider text-ink-faint uppercase">
                  {card.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-pretty text-ink-soft">
                {card.description}
              </p>
              {card.link ? (
                <a
                  href={card.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-soft transition-colors duration-200 hover:text-gold"
                >
                  {card.link.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> ({externalHint})</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}