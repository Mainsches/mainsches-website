import { Reveal } from "@/components/ui/Reveal";

export interface Stage {
  key: string;
  marker: string;
  title: string;
  body: string;
}

/**
 * Equal-weight sequence. Every stage is visible at once — nothing is
 * "current" — so the track explains order without implying a live run.
 * Narrow screens use a vertical spine; wider screens a horizontal rule
 * through the markers.
 */
export function StageTrack({
  stages,
  columns = 3,
}: {
  stages: Stage[];
  columns?: 3 | 4;
}) {
  const wide = columns === 4;
  const grid = wide
    ? "lg:grid lg:grid-cols-4 lg:gap-0"
    : "md:grid md:grid-cols-3 md:gap-0";
  const hideSpine = wide ? "lg:hidden" : "md:hidden";
  const showRule = wide ? "hidden lg:block" : "hidden md:block";
  const spineRow = wide ? "lg:w-auto lg:flex-row" : "md:w-auto md:flex-row";
  const cardRest = wide ? "lg:mb-0" : "md:mb-0";

  return (
    <ol className={`grid grid-cols-1 ${grid}`}>
      {stages.map((stage, index) => {
        const last = index === stages.length - 1;
        const row = wide
          ? `lg:flex-col lg:gap-4 ${last ? "" : "lg:pr-5"}`
          : `md:flex-col md:gap-4 ${last ? "" : "md:pr-5"}`;
        return (
          <li key={stage.key} className="relative">
            {!last ? (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-[15px] left-8 right-0 h-px bg-gold-track ${showRule}`}
              />
            ) : null}
            <Reveal delay={index * 0.05} className="h-full">
              <div className={`flex h-full items-stretch gap-4 ${row}`}>
                <div
                  className={`flex w-8 shrink-0 flex-col items-center ${spineRow}`}
                >
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold-line bg-bg font-mono text-[0.65rem] text-gold">
                    {stage.marker}
                  </span>
                  {!last ? (
                    <span
                      aria-hidden="true"
                      className={`w-px flex-1 bg-gold-track ${hideSpine}`}
                    />
                  ) : null}
                </div>
                <article
                  className={`mb-5 min-w-0 flex-1 rounded-panel border border-line bg-raised p-5 ${cardRest}`}
                >
                  <h3 className="font-display text-lg font-medium text-ink">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft">
                    {stage.body}
                  </p>
                </article>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
