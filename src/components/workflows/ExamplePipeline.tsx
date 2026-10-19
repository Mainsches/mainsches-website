/** Split "Label: detail" copy for display. The words stay intact. */
export function splitLabeledStep(step: string): {
  label: string;
  detail: string;
} {
  const index = step.indexOf(":");
  if (index === -1) return { label: step, detail: "" };
  return {
    label: step.slice(0, index).trim(),
    detail: step.slice(index + 1).trim(),
  };
}

/**
 * Compact vertical pipeline for an illustrative workflow example.
 * A spine joins the steps so the list reads as an order, not a paragraph.
 */
export function ExamplePipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-auto flex flex-col rounded-card border border-line bg-inset px-4 py-3.5">
      {steps.map((step, index) => {
        const { label, detail } = splitLabeledStep(step);
        const last = index === steps.length - 1;
        return (
          <li key={step} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex w-3 shrink-0 flex-col items-center"
            >
              <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-gold" />
              {!last ? <span className="mt-1 w-px flex-1 bg-gold-track" /> : null}
            </span>
            <p className={`min-w-0 text-xs leading-relaxed ${last ? "pb-0.5" : "pb-3.5"}`}>
              <span className="font-mono tracking-[0.14em] text-gold uppercase">
                {label}
              </span>
              {detail ? (
                <span className="mt-0.5 block text-pretty text-ink-soft">
                  {detail}
                </span>
              ) : null}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
