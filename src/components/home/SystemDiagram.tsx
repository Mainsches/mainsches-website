import type { CSSProperties } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import { Cloud, Cpu, FileText, GitBranch, Plug, Zap } from "lucide-react";

type DiagramDict = Dictionary["home"]["whatIsOs"]["diagram"];

interface Node {
  key: keyof Pick<
    DiagramDict,
    "localAi" | "cloudAi" | "files" | "workflows" | "actions" | "connectors"
  >;
  icon: typeof Cpu;
  planned?: boolean;
}

const NODES: Node[] = [
  { key: "localAi", icon: Cpu },
  { key: "cloudAi", icon: Cloud },
  { key: "files", icon: FileText },
  { key: "workflows", icon: GitBranch },
  { key: "actions", icon: Zap },
  { key: "connectors", icon: Plug, planned: true },
];

/**
 * Visual explanation of the AI-OS idea: the Hub in the center, resources
 * joined to it by spokes. Small screens use a vertical spine from the Hub
 * downward — same information, no tiny unreadable SVG text.
 */
export function SystemDiagram({ dict }: { dict: DiagramDict }) {
  const left = NODES.slice(0, 3);
  const right = NODES.slice(3);

  return (
    <figure aria-label={dict.ariaLabel} className="w-full">
      <div className="hidden rounded-panel border border-line bg-raised p-6 sm:block lg:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_2.75rem_auto_2.75rem_minmax(0,1fr)] grid-rows-3 items-center gap-y-3">
          {left.map((node, index) => (
            <div
              key={node.key}
              style={cell(1, index + 1)}
              className="min-w-0"
            >
              <DiagramNode node={node} dict={dict} align="right" />
            </div>
          ))}
          {left.map((node, index) => (
            <Spoke
              key={`spoke-l-${node.key}`}
              planned={node.planned}
              style={cell(2, index + 1)}
            />
          ))}
          <div
            style={{ gridColumn: 3, gridRow: "1 / span 3" }}
            className="flex items-center justify-center"
          >
            <Hub label={dict.hub} />
          </div>
          {right.map((node, index) => (
            <Spoke
              key={`spoke-r-${node.key}`}
              planned={node.planned}
              style={cell(4, index + 1)}
            />
          ))}
          {right.map((node, index) => (
            <div
              key={node.key}
              style={cell(5, index + 1)}
              className="min-w-0"
            >
              <DiagramNode node={node} dict={dict} align="left" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-panel border border-line bg-raised p-5 sm:hidden">
        <div className="flex flex-col items-center">
          <Hub label={dict.hub} />
          <span aria-hidden="true" className="h-4 w-px bg-gold-track" />
        </div>
        <ul className="flex flex-col">
          {NODES.map((node, index) => {
            const last = index === NODES.length - 1;
            return (
              <li key={node.key} className="flex items-stretch gap-3">
                <span
                  aria-hidden="true"
                  className="flex w-4 shrink-0 flex-col items-center"
                >
                  <span
                    className={`mt-[1.15rem] size-2 shrink-0 rounded-full ${
                      node.planned
                        ? "border border-dashed border-line-strong bg-transparent"
                        : "bg-gold"
                    }`}
                  />
                  {!last ? (
                    <span
                      className={`mt-1 w-px flex-1 ${
                        node.planned
                          ? "border-l border-dashed border-line-strong"
                          : "bg-gold-track"
                      }`}
                    />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1 pb-2.5">
                  <DiagramNode node={node} dict={dict} align="left" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}

function cell(column: number, row: number): CSSProperties {
  return { gridColumn: column, gridRow: row };
}

function Hub({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-panel border border-gold-line bg-gold-tint px-6 py-7 text-center sm:px-7 sm:py-9">
      <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
      <p className="font-display text-base font-medium text-balance text-ink sm:text-lg">
        {label}
      </p>
    </div>
  );
}

function Spoke({
  planned,
  style,
}: {
  planned?: boolean;
  style: CSSProperties;
}) {
  return (
    <div aria-hidden="true" style={style} className="flex items-center">
      <span
        className={`h-px w-full ${
          planned
            ? "border-t border-dashed border-line-strong"
            : "bg-gold-track"
        }`}
      />
    </div>
  );
}

function DiagramNode({
  node,
  dict,
  align,
}: {
  node: Node;
  dict: DiagramDict;
  align: "left" | "right";
}) {
  const Icon = node.icon;
  const towardHub = align === "right";
  return (
    <div
      className={`flex items-center gap-3 rounded-card border px-3.5 py-3 ${
        node.planned
          ? "border-dashed border-line-strong bg-transparent"
          : "border-line bg-surface"
      } ${towardHub ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      <Icon
        aria-hidden="true"
        className={`size-4 shrink-0 ${node.planned ? "text-ink-faint" : "text-gold"}`}
      />
      <div className="min-w-0">
        <p
          className={`text-sm font-medium ${
            node.planned ? "text-ink-faint" : "text-ink"
          }`}
        >
          {dict[node.key]}
        </p>
        {node.planned ? (
          <p className="font-mono text-[0.62rem] tracking-wider text-ink-faint uppercase">
            {dict.connectorsPlanned}
          </p>
        ) : null}
      </div>
    </div>
  );
}
