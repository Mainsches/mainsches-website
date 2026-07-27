import type { ReactNode } from "react";

const variants = {
  gold: "border-gold-line bg-gold-tint text-gold-soft",
  neutral: "border-line-strong bg-surface text-ink-soft",
  outline: "border-dashed border-line-strong bg-transparent text-ink-faint",
} as const;

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.68rem] font-medium tracking-wider uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
