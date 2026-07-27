import type { FaqItem } from "@/lib/i18n/types";
import { ChevronDown } from "lucide-react";

/**
 * Progressive-disclosure FAQ built on native <details>/<summary>:
 * keyboard accessible and crawlable without any client JavaScript.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-panel border border-line bg-raised">
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span className="text-pretty">{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-ink-soft">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
