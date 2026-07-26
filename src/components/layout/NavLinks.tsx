"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
}

export function NavLinks({
  items,
  className = "",
  linkClassName = "",
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={`${linkClassName} ${
                active ? "text-ink" : "text-ink-soft hover:text-ink"
              } transition-colors duration-200`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
