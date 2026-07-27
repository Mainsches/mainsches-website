"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n/types";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRovingTabs } from "@/lib/useRovingTabs";

type FlowDict = Dictionary["home"]["flow"];

/**
 * Clickable pipeline: Input → Intent/Context → Permission & Scope → Workflow
 * → Local or Cloud AI → Verified Output. Selecting a step explains what
 * happens, why it is controlled, and what the user gains.
 */
export function WorkflowExplorer({ dict }: { dict: FlowDict }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotionSafe();
  const { setRef, onKeyDown } = useRovingTabs(dict.steps.length, setActive);

  const step = dict.steps[active] ?? dict.steps[0];
  if (!step) return null;

  const panels = [
    { label: dict.whatLabel, text: step.what },
    { label: dict.whyLabel, text: step.why },
    { label: dict.benefitLabel, text: step.benefit },
  ];

  return (
    <div className="rounded-panel border border-line bg-raised p-4 shadow-panel sm:p-6">
      {/* Step rail */}
      <div
        role="tablist"
        aria-label={dict.stepListLabel}
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {dict.steps.map((item, index) => {
          const selected = index === active;
          const passed = index <= active;
          return (
            <button
              key={item.id}
              ref={setRef(index)}
              role="tab"
              id={`flow-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="flow-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, active)}
              className={`group relative flex flex-col gap-2 rounded-card border p-3 text-left transition-colors duration-200 ${
                selected
                  ? "border-gold-line bg-gold-tint"
                  : "border-line bg-surface hover:border-line-strong"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-0.5 w-full rounded-full transition-colors duration-300 ${
                  passed ? "bg-gold" : "bg-line-strong"
                }`}
              />
              <span className="font-mono text-[0.62rem] tracking-wider text-ink-faint uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-sm leading-tight font-medium ${
                  selected ? "text-ink" : "text-ink-soft group-hover:text-ink"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <motion.div
        key={step.id}
        id="flow-panel"
        role="tabpanel"
        aria-labelledby={`flow-tab-${step.id}`}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 grid gap-4 rounded-card border border-line bg-surface p-5 sm:grid-cols-3"
      >
        {panels.map((panel) => (
          <div key={panel.label} className="flex flex-col gap-2">
            <p className="font-mono text-[0.66rem] tracking-wider text-gold uppercase">
              {panel.label}
            </p>
            <p className="text-sm leading-relaxed text-pretty text-ink-soft">
              {panel.text}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
