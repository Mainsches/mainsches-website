"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Cloud, Cpu, RotateCcw, Shuffle } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRovingTabs } from "@/lib/useRovingTabs";
import { Badge } from "@/components/ui/Badge";

type ConsoleDict = Dictionary["home"]["console"];

const STEP_ORDER = ["goal", "context", "workflow", "model", "result"] as const;
const STEP_DELAY_MS = 650;

const routingIcon = {
  local: Cpu,
  cloud: Cloud,
  hybrid: Shuffle,
} as const;

/**
 * Interactive concept demo of the Hub console. The user picks a scenario;
 * the five pipeline steps then appear in a controlled sequence. With reduced
 * motion enabled, all steps render immediately.
 */
export function HubConsole({
  dict,
  conceptDemoLabel,
}: {
  dict: ConsoleDict;
  conceptDemoLabel: string;
}) {
  const reduceMotion = useReducedMotionSafe();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(1);
  // Restart token: bumping it re-arms the timer effect even when
  // visibleSteps itself does not change (e.g. switching scenarios during
  // the very first step).
  const [run, setRun] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = dict.scenarios[scenarioIndex] ?? dict.scenarios[0];

  // Derived at render: reduced-motion users always see the full sequence.
  const shownSteps = reduceMotion ? STEP_ORDER.length : visibleSteps;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback((fromStep: number) => {
    setVisibleSteps(fromStep);
    setRun((token) => token + 1);
  }, []);

  // Advance the sequence one step at a time while it is running.
  useEffect(() => {
    if (reduceMotion || visibleSteps >= STEP_ORDER.length) return;

    timerRef.current = setTimeout(() => {
      setVisibleSteps((current) => Math.min(current + 1, STEP_ORDER.length));
    }, STEP_DELAY_MS);

    return clearTimer;
  }, [visibleSteps, run, reduceMotion, clearTimer]);

  const selectScenario = useCallback(
    (index: number) => {
      setScenarioIndex(index);
      play(1);
    },
    [play],
  );

  const { setRef, onKeyDown } = useRovingTabs(
    dict.scenarios.length,
    selectScenario,
  );

  if (!scenario) return null;

  const done = shownSteps >= STEP_ORDER.length;
  const RoutingIcon = routingIcon[scenario.routing];
  const routingLabel =
    scenario.routing === "local"
      ? dict.routingLocal
      : scenario.routing === "cloud"
        ? dict.routingCloud
        : dict.routingHybrid;

  const stepContent: Record<(typeof STEP_ORDER)[number], React.ReactNode> = {
    goal: <span className="text-ink">{scenario.goal}</span>,
    context: <span>{scenario.context}</span>,
    workflow: <span>{scenario.workflow}</span>,
    model: (
      <span className="flex flex-wrap items-center gap-2">
        <RoutingIcon aria-hidden="true" className="size-3.5 text-gold" />
        {routingLabel}
      </span>
    ),
    result: <span className="text-ink">{scenario.result}</span>,
  };

  return (
    <div className="overflow-hidden rounded-panel border border-line bg-raised shadow-panel">
      {/* Window chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <p className="font-mono text-xs text-ink-soft">{dict.windowTitle}</p>
        </div>
        <Badge variant="gold">{conceptDemoLabel}</Badge>
      </div>

      <div className="grid gap-0 lg:grid-cols-[240px_1fr]">
        {/* Scenario chips */}
        <div className="border-b border-line p-4 lg:border-r lg:border-b-0">
          <p
            id="hub-console-scenarios"
            className="px-1 pb-3 font-mono text-[0.68rem] tracking-wider text-ink-faint uppercase"
          >
            {dict.scenarioGroupLabel}
          </p>
          <div
            role="tablist"
            aria-labelledby="hub-console-scenarios"
            aria-orientation="vertical"
            className="flex flex-row gap-2 overflow-x-auto lg:flex-col"
          >
            {dict.scenarios.map((item, index) => {
              const selected = index === scenarioIndex;
              return (
                <button
                  key={item.id}
                  ref={setRef(index)}
                  role="tab"
                  id={`hub-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="hub-console-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectScenario(index)}
                  onKeyDown={(event) => onKeyDown(event, scenarioIndex)}
                  className={`shrink-0 rounded-control border px-3.5 py-2.5 text-left text-sm font-medium transition-colors duration-200 lg:w-full ${
                    selected
                      ? "border-gold-line bg-gold-tint text-ink"
                      : "border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink"
                  }`}
                >
                  {item.chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step stream */}
        <div
          id="hub-console-panel"
          role="tabpanel"
          aria-labelledby={`hub-tab-${scenario.id}`}
          className="flex min-h-[320px] flex-col p-5"
        >
          <ol aria-live="polite" className="flex flex-1 flex-col gap-3">
            {STEP_ORDER.map((stepKey, index) => {
              const visible = index < shownSteps;
              const isLast = index === shownSteps - 1;
              const running = isLast && !done;

              if (!visible) {
                return (
                  <li
                    key={stepKey}
                    aria-hidden="true"
                    className="h-[52px] rounded-card border border-dashed border-line-soft"
                  />
                );
              }

              return (
                <li
                  key={`${scenario.id}-${stepKey}`}
                  className="flex min-h-[52px] items-center gap-4 rounded-card border border-line bg-surface px-4 py-3 motion-safe:animate-console-in"
                >
                  <span className="w-20 shrink-0 font-mono text-[0.68rem] tracking-wider text-gold uppercase">
                    {dict.stepLabels[stepKey]}
                  </span>
                  <span className="flex-1 text-sm leading-snug text-ink-soft">
                    {stepContent[stepKey]}
                  </span>
                  <span className="shrink-0" aria-hidden="true">
                    {running ? (
                      <span className="block size-2 rounded-full bg-gold motion-safe:animate-pulse-dot" />
                    ) : (
                      <Check className="size-4 text-gold" />
                    )}
                  </span>
                  <span className="sr-only">
                    {running ? dict.statusRunning : dict.statusDone}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="max-w-md text-xs leading-relaxed text-ink-faint">
              {scenario.routingNote}
            </p>
            <button
              type="button"
              onClick={() => play(1)}
              className="inline-flex items-center gap-2 rounded-control border border-line-strong px-3.5 py-2 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:border-gold-line hover:text-ink"
            >
              <RotateCcw aria-hidden="true" className="size-3.5" />
              {dict.replay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
