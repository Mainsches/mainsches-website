import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import { localePath } from "@/lib/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { NavLinks, type NavItem } from "./NavLinks";

export function Header({ dict }: { dict: Dictionary }) {
  const locale = dict.locale;

  const items: NavItem[] = [
    { href: localePath("product", locale), label: dict.nav.product },
    { href: localePath("workflows", locale), label: dict.nav.workflows },
    { href: localePath("security", locale), label: dict.nav.security },
    { href: localePath("useCases", locale), label: dict.nav.useCases },
    { href: localePath("pilot", locale), label: dict.nav.pilot },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href={localePath("home", locale)}
          aria-label={dict.nav.homeAria}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/assets/logo.png"
            alt=""
            width={28}
            height={28}
            className="rounded-[6px]"
            priority
          />
          <span className="font-display text-lg font-medium tracking-tight">
            Mainsches <span className="text-gold">Hub</span>
          </span>
        </Link>

        <nav
          aria-label={dict.nav.ariaPrimary}
          className="hidden lg:block"
        >
          <NavLinks
            items={items}
            className="flex items-center gap-1"
            linkClassName="rounded-control px-3 py-2 text-sm font-medium"
          />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher current={locale} label={dict.common.languageLabel} />
        </div>

        <MobileNav
          items={items}
          locale={locale}
          openLabel={dict.common.menuOpen}
          closeLabel={dict.common.menuClose}
          languageLabel={dict.common.languageLabel}
          navLabel={dict.nav.ariaPrimary}
        />
      </div>
    </header>
  );
}
