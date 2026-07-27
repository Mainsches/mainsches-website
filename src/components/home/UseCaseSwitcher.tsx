"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRovingTabs } from "@/lib/useRovingTabs";
import { Badge } from "@/components/ui/Badge";

type UseCasesDict = Dictionary["home"]["useCases"];

/**
 * Use-case switcher without page reloads. Planned capabilities (connectors)
 * are visually separated from the existing product core via dashed borders
 * and a "planned" badge.
 */
export function UseCaseSwitcher({
  dict,
  plannedLabel,
}: {
  dict: UseCasesDict;
  plannedLabel: string;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotionSafe();
  const { setRef, onKeyDown } = useRovingTabs(dict.cases.length, setActive);

  const current = dict.cases[active] ?? dict.cases[0];
  if (!current) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <div
        role="tablist"
        aria-label={dict.tabsLabel}
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {dict.cases.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              ref={setRef(index)}
              role="tab"
              id={`usecase-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="usecase-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, active)}
              className={`flex shrink-0 items-center justify-between gap-3 rounded-card border px-4 py-3.5 text-left text-sm font-medium transition-colors duration-200 lg:w-full ${
                selected
                  ? "border-gold-line bg-gold-tint text-ink"
                  : item.planned
                    ? "border-dashed border-line-strong bg-transparent text-ink-faint hover:text-ink-soft"
                    : "border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink"
              }`}
            >
              <span>{item.title}</span>
              {item.planned ? (
                <span className="font-mono text-[0.6rem] tracking-wider text-ink-faint uppercase">
                  {plannedLabel}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <motion.div
        key={current.id}
        id="usecase-panel"
        role="tabpanel"
        aria-labelledby={`usecase-tab-${current.id}`}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`rounded-panel border p-6 sm:p-8 ${
          current.planned
            ? "border-dashed border-line-strong bg-transparent"
            : "border-line bg-raised"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
            {current.title}
          </h3>
          {current.planned ? <Badge variant="outline">{plannedLabel}</Badge> : null}
        </div>

        <p className="mt-3 max-w-xl leading-relaxed text-pretty text-ink-soft">
          {current.summary}
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {current.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-ink-soft">
              <Check
                aria-hidden="true"
                className={`mt-0.5 size-4 shrink-0 ${
                  current.planned ? "text-ink-faint" : "text-gold"
                }`}
              />
              {point}
            </li>
          ))}
        </ul>

        {current.planned && current.plannedNote ? (
          <p className="mt-6 border-t border-dashed border-line-strong pt-4 text-xs text-ink-faint">
            {current.plannedNote}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
