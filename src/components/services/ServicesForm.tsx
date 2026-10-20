"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import {
  invalidServicesFields,
  SERVICE_INTERESTS,
  servicesRequestSchema,
  type ServiceInterest,
  type ServicesField,
} from "@/lib/services/schema";
import { CONTACT_EMAIL } from "@/lib/site";

type FormDict = Dictionary["servicesPage"]["form"];
type Status = "idle" | "submitting" | "success" | "notConfigured" | "error";

const inputClasses =
  "w-full rounded-control border border-line-strong bg-inset px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors duration-200 hover:border-line-strong focus:border-gold-line focus:outline-2 focus:outline-offset-1 focus:outline-gold aria-[invalid=true]:border-danger";

export function ServicesForm({
  dict,
  locale,
  interest,
  onInterestChange,
}: {
  dict: FormDict;
  locale: Locale;
  interest: ServiceInterest | "";
  onInterestChange: (value: ServiceInterest | "") => void;
}) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ServicesField[]>([]);
  const startedAtRef = useRef<number>(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const fieldError = (field: ServicesField) => errors.includes(field);
  const describedBy = (field: ServicesField, extra?: string) => {
    const ids: string[] = [];
    if (extra) ids.push(extra);
    if (fieldError(field)) ids.push(`${formId}-${field}-error`);
    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  const interestLabels: Record<ServiceInterest, string> = {
    potentialAnalysis: dict.interestPotentialAnalysis,
    toolConsulting: dict.interestToolConsulting,
    starterCourses: dict.interestStarterCourses,
    automation: dict.interestAutomation,
    aiWebsites: dict.interestAiWebsites,
    unsure: dict.interestUnsure,
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const candidate = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
      locale,
      website: String(formData.get("website") ?? ""),
      formStartedAt: startedAtRef.current,
    };

    const parsed = servicesRequestSchema.safeParse(candidate);
    if (!parsed.success) {
      setErrors(invalidServicesFields(parsed.error));
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors([]);
    setStatus("submitting");

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        setStatus("success");
      } else if (response.status === 503) {
        setStatus("notConfigured");
      } else if (response.status === 400) {
        const payload = (await response.json().catch(() => null)) as {
          fields?: ServicesField[];
        } | null;
        if (payload?.fields?.length) {
          setErrors(payload.fields);
          setStatus("idle");
          requestAnimationFrame(() => summaryRef.current?.focus());
          return;
        }
        setStatus("error");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    requestAnimationFrame(() => resultRef.current?.focus());
  }

  const errorMessages: Record<ServicesField, string> = dict.errors;

  const fallbackMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Mainsches — Services enquiry",
  )}`;

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-3 rounded-panel border border-gold-line bg-gold-tint p-8"
      >
        <CheckCircle2 aria-hidden="true" className="size-6 text-gold" />
        <p className="font-display text-xl font-medium text-ink">
          {dict.success}
        </p>
        <p className="leading-relaxed text-ink-soft">{dict.successDetail}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {errors.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border border-danger/40 bg-danger-tint p-4"
        >
          <p className="font-semibold text-ink">{dict.errorSummaryTitle}</p>
          <ul className="mt-2 list-inside list-disc text-sm text-ink-soft">
            {errors.map((field) => (
              <li key={field}>
                <a href={`#${formId}-${field}`} className="underline">
                  {errorMessages[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label={dict.name}
          error={fieldError("name") ? errorMessages.name : undefined}
          errorId={`${formId}-name-error`}
        >
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={fieldError("name") || undefined}
            aria-describedby={describedBy("name")}
            className={inputClasses}
          />
        </Field>

        <Field
          id={`${formId}-email`}
          label={dict.email}
          error={fieldError("email") ? errorMessages.email : undefined}
          errorId={`${formId}-email-error`}
          hint={dict.emailHint}
          hintId={`${formId}-email-hint`}
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={fieldError("email") || undefined}
            aria-describedby={describedBy("email", `${formId}-email-hint`)}
            className={inputClasses}
          />
        </Field>

        <Field
          id={`${formId}-company`}
          label={dict.company}
          errorId={`${formId}-company-error`}
        >
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClasses}
          />
        </Field>

        <Field
          id={`${formId}-phone`}
          label={dict.phone}
          errorId={`${formId}-phone-error`}
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field
        id={`${formId}-interest`}
        label={dict.interest}
        error={fieldError("interest") ? errorMessages.interest : undefined}
        errorId={`${formId}-interest-error`}
      >
        <select
          id={`${formId}-interest`}
          name="interest"
          required
          value={interest}
          onChange={(event) =>
            onInterestChange(event.target.value as ServiceInterest | "")
          }
          aria-invalid={fieldError("interest") || undefined}
          aria-describedby={describedBy("interest")}
          className={inputClasses}
        >
          <option value="" disabled>
            —
          </option>
          {SERVICE_INTERESTS.map((value) => (
            <option key={value} value={value}>
              {interestLabels[value]}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={`${formId}-message`}
        label={dict.message}
        error={fieldError("message") ? errorMessages.message : undefined}
        errorId={`${formId}-message-error`}
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          aria-invalid={fieldError("message") || undefined}
          aria-describedby={describedBy("message")}
          className={`${inputClasses} min-h-32 resize-y`}
        />
      </Field>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center rounded-control bg-gold px-8 text-sm font-semibold text-bg-deep transition-colors duration-200 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? dict.submitting : dict.submit}
        </button>
      </div>

      {status === "notConfigured" ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border border-line-strong bg-surface p-5"
        >
          <p className="font-semibold text-ink">{dict.notConfiguredTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            {dict.notConfiguredBody}
          </p>
          <a
            href={fallbackMailto}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft hover:text-gold"
          >
            <Mail aria-hidden="true" className="size-4" />
            {CONTACT_EMAIL}
          </a>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border border-danger/40 bg-danger-tint p-5"
        >
          <p className="text-sm leading-relaxed text-ink-soft">
            {dict.serverError}
          </p>
          <a
            href={fallbackMailto}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft hover:text-gold"
          >
            <Mail aria-hidden="true" className="size-4" />
            {CONTACT_EMAIL}
          </a>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  errorId,
  hint,
  hintId,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
