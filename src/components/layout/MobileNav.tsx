"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks, type NavItem } from "./NavLinks";

/**
 * Mobile navigation using the native <dialog> element: focus trapping,
 * Escape handling, and inert background come from the platform.
 */
export function MobileNav({
  items,
  locale,
  openLabel,
  closeLabel,
  languageLabel,
  navLabel,
}: {
  items: NavItem[];
  locale: Locale;
  openLabel: string;
  closeLabel: string;
  languageLabel: string;
  navLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Keep state in sync when the dialog closes itself (Escape key).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={show}
        aria-expanded={open}
        aria-label={openLabel}
        className="flex size-10 items-center justify-center rounded-control border border-line-strong text-ink"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={navLabel}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg text-ink backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-medium">
              Mainsches <span className="text-gold">Hub</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="flex size-10 items-center justify-center rounded-control border border-line-strong text-ink"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <nav aria-label={navLabel} className="mt-10">
            <NavLinks
              items={items}
              onNavigate={close}
              className="flex flex-col gap-2"
              linkClassName="block rounded-card px-4 py-3 font-display text-2xl font-medium"
            />
          </nav>

          <div className="mt-auto border-t border-line pt-6">
            <LanguageSwitcher current={locale} label={languageLabel} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
