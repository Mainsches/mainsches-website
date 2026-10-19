"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRovingTabs } from "@/lib/useRovingTabs";

type FlowDict = Dictionary["home"]["flow"];

const WIDE_QUERY = "(min-width: 1024px)";

function subscribeWide(callback: () => void) {
  const media = window.matchMedia(WIDE_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** Horizontal rail from the `lg` breakpoint up; a vertical spine below it. */
function useWideRail(): boolean {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}

/**
 * Clickable pipeline: Input → Intent/Context → Permission & Scope → Workflow
 * → Local or Cloud AI → Verified Output. Selecting a step explains what
 * happens, why it is controlled, and what the user gains.
 */
export function WorkflowExplorer({ dict }: { dict: FlowDict }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotionSafe();
  const wide = useWideRail();
  const { setRef, onKeyDown } = useRovingTabs(dict.steps.length, setActive);

  const step = dict.steps[active] ?? dict.steps[0];
  if (!step) return null;

  const panels = [
    { label: dict.whatLabel, text: step.what, tone: "primary" as const },
    { label: dict.whyLabel, text: step.why, tone: "reason" as const },
    { label: dict.benefitLabel, text: step.benefit, tone: "gain" as const },
  ];

  return (
    <div className="rounded-panel border border-line bg-raised p-4 shadow-panel sm:p-6">
      <div
        role="tablist"
        aria-label={dict.stepListLabel}
        aria-orientation={wide ? "horizontal" : "vertical"}
        className="flex flex-col lg:flex-row lg:items-start"
      >
        {dict.steps.map((item, index) => {
          const selected = index === active;
          const passed = index < active;
          const last = index === dict.steps.length - 1;
          return (
            <button
              key={item.id}
              ref={setRef(index)}
              type="button"
              role="tab"
              id={`flow-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="flow-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, active)}
              className={`relative flex min-h-11 flex-1 items-stretch gap-3 rounded-card py-0 text-left lg:flex-col lg:items-center lg:gap-0 lg:px-1 lg:text-center ${
                selected ? "bg-gold-tint lg:bg-transparent" : ""
              }`}
            >
              <span className="flex w-8 shrink-0 flex-col items-center lg:w-full lg:flex-row lg:justify-center">
                <span
                  aria-hidden="true"
                  className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-[0.62rem] ${
                    selected
                      ? "border-gold bg-gold text-bg"
                      : passed
                        ? "border-gold bg-raised text-gold"
                        : "border-line-strong bg-raised text-ink-soft"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {!last ? (
                  <span
                    aria-hidden="true"
                    className={`w-px flex-1 lg:hidden ${
                      passed ? "bg-gold" : "bg-line-strong"
                    }`}
                  />
                ) : null}
              </span>
              {!last ? (
                <span
                  aria-hidden="true"
                  className={`absolute top-[15px] left-[calc(50%+16px)] hidden h-px w-[calc(100%-32px)] lg:block ${
                    passed ? "bg-gold" : "bg-line-strong"
                  }`}
                />
              ) : null}
              <span
                className={`pt-1.5 pr-2 pb-3 pl-1 text-sm leading-snug font-medium lg:min-h-11 lg:px-1 lg:pt-3 lg:pb-0 ${
                  selected ? "text-ink" : "text-ink-soft"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={step.id}
        id="flow-panel"
        role="tabpanel"
        aria-labelledby={`flow-tab-${step.id}`}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2 rounded-card border border-line bg-surface p-5 lg:mt-6"
      >
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold bg-gold font-mono text-[0.62rem] text-bg"
          >
            {String(active + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-lg font-medium tracking-tight text-ink">
            {step.name}
          </h3>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3 md:gap-6">
          {panels.map((panel) => (
            <div
              key={panel.label}
              className={
                panel.tone === "gain"
                  ? "border-t border-gold-line pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-5"
                  : ""
              }
            >
              <p className="font-mono text-[0.66rem] tracking-wider text-gold uppercase">
                {panel.label}
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed text-pretty ${
                  panel.tone === "reason" ? "text-ink-soft" : "text-ink"
                }`}
              >
                {panel.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
