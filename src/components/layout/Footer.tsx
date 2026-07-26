import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import { localePath } from "@/lib/routes";
import { CONTACT_EMAIL } from "@/lib/site";

export function Footer({ dict }: { dict: Dictionary }) {
  const locale = dict.locale;
  const year = new Date().getFullYear();

  const productLinks = [
    { href: localePath("product", locale), label: dict.nav.product },
    { href: localePath("workflows", locale), label: dict.nav.workflows },
    { href: localePath("security", locale), label: dict.nav.security },
    { href: localePath("useCases", locale), label: dict.nav.useCases },
    { href: localePath("pilot", locale), label: dict.nav.pilot },
  ];

  const legalLinks = [
    { href: localePath("legal", locale), label: dict.footer.impressum },
    { href: localePath("privacy", locale), label: dict.footer.privacy },
  ];

  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link
            href={localePath("home", locale)}
            className="inline-flex items-center gap-2.5"
          >
            <Image
              src="/assets/logo.png"
              alt=""
              width={26}
              height={26}
              className="rounded-[6px]"
            />
            <span className="font-display text-lg font-medium tracking-tight">
              Mainsches <span className="text-gold">Hub</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-pretty text-ink-soft">
            {dict.footer.tagline}
          </p>
        </div>

        <nav aria-label={dict.footer.navigate}>
          <h2 className="section-label">{dict.footer.navigate}</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="section-label">{dict.footer.legal}</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="shell flex flex-col justify-between gap-2 py-5 text-xs text-ink-faint sm:flex-row">
          <p>
            © {year} {dict.footer.copyright}
          </p>
          <p className="font-mono tracking-wider uppercase">
            AI Operating System · Switzerland
          </p>
        </div>
      </div>
    </footer>
  );
}
