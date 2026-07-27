"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Progressive-enhancement scroll reveal.
 *
 * The server-rendered HTML is fully visible (no opacity:0 for crawlers or
 * no-JS visitors). After hydration, elements still below the viewport are
 * hidden and transitioned in once they scroll into view. Elements already
 * on screen and reduced-motion users never see any animation.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "static": SSR/no-JS/reduced-motion — visible, no transition classes.
  // "hidden": below the fold after hydration — invisible, waiting for scroll.
  // "shown": revealed with a transition.
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The observer callback always fires asynchronously with the initial
    // intersection state, so no synchronous setState is needed here.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase((current) => (current === "hidden" ? "shown" : current));
            observer.disconnect();
          } else {
            setPhase((current) => (current === "static" ? "hidden" : current));
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const motionClasses =
    phase === "hidden"
      ? "opacity-0 translate-y-4"
      : phase === "shown"
        ? "opacity-100 translate-y-0 transition-[opacity,translate] duration-500 ease-out"
        : "";

  return (
    <div
      ref={ref}
      className={`${motionClasses} ${className}`.trim()}
      style={phase === "shown" && delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
