"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ServicesForm } from "@/components/services/ServicesForm";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import type { ServiceInterest } from "@/lib/services/schema";

type PageDict = Dictionary["servicesPage"];

export function ServicesEnquiryDialog({
  page,
  locale,
  interest,
  onInterestChange,
  selectedServiceTitle,
  formSessionKey,
  onClosed,
}: {
  page: PageDict;
  locale: Locale;
  interest: ServiceInterest | "";
  onInterestChange: (value: ServiceInterest | "") => void;
  selectedServiceTitle: string;
  formSessionKey: number;
  onClosed: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClosed();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClosed]);

  useEffect(() => {
    if (formSessionKey === 0) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
    }
    requestAnimationFrame(() => closeButtonRef.current?.focus());
  }, [formSessionKey]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="services-enquiry-dialog-title"
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg max-h-[min(90dvh,720px)] overflow-hidden rounded-panel border border-line bg-raised p-0 text-ink backdrop:bg-black/60"
    >
      <div className="flex max-h-[inherit] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div className="min-w-0 pr-2">
            <h2
              id="services-enquiry-dialog-title"
              className="font-display text-lg font-medium text-ink"
            >
              {page.formTitle}
            </h2>
            {selectedServiceTitle ? (
              <p className="mt-1 text-sm leading-relaxed text-pretty text-ink-soft">
                {selectedServiceTitle}
              </p>
            ) : null}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={page.dialogClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-control border border-line-strong text-ink transition-colors duration-200 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <ServicesForm
            key={formSessionKey}
            dict={page.form}
            locale={locale}
            interest={interest}
            onInterestChange={onInterestChange}
          />
        </div>
      </div>
    </dialog>
  );
}
