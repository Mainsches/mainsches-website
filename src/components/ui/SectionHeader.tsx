export function SectionHeader({
  label,
  title,
  lede,
  align = "left",
  as: Heading = "h2",
}: {
  label: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <p className="section-label flex items-center gap-3">
        <span className="label-rule" aria-hidden="true" />
        {label}
      </p>
      <Heading className="font-display text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {title}
      </Heading>
      {lede ? (
        <p className="text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
