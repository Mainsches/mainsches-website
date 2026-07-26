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
 * around it. Desktop gets an SVG-connected layout, small screens a compact
 * grid — same information, no tiny unreadable SVG text.
 */
export function SystemDiagram({ dict }: { dict: DiagramDict }) {
  return (
    <figure aria-label={dict.ariaLabel} className="w-full">
      {/* Desktop: hub row with connector lines */}
      <div className="relative hidden rounded-panel border border-line bg-raised p-10 sm:block">
        <svg
          aria-hidden="true"
          viewBox="0 0 600 40"
          className="absolute inset-x-10 top-1/2 h-10 w-[calc(100%-5rem)] -translate-y-1/2"
          preserveAspectRatio="none"
        >
          {[50, 150, 250, 350, 450, 550].map((x) => (
            <line
              key={x}
              x1="300"
              y1="20"
              x2={x}
              y2="20"
              stroke="rgba(212,175,55,0.16)"
              strokeWidth="1"
            />
          ))}
        </svg>

        <div className="relative grid grid-cols-3 items-center gap-6">
          <div className="flex flex-col gap-4">
            {NODES.slice(0, 3).map((node) => (
              <DiagramNode key={node.key} node={node} dict={dict} align="left" />
            ))}
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2 rounded-panel border border-gold-line bg-gold-tint px-8 py-10 text-center shadow-panel">
              <span className="size-2.5 rounded-full bg-gold" aria-hidden="true" />
              <p className="font-display text-lg font-medium text-ink">
                {dict.hub}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {NODES.slice(3).map((node) => (
              <DiagramNode key={node.key} node={node} dict={dict} align="right" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: compact grid */}
      <div className="rounded-panel border border-line bg-raised p-5 sm:hidden">
        <div className="mb-4 flex items-center justify-center gap-2 rounded-card border border-gold-line bg-gold-tint px-4 py-4">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          <p className="font-display font-medium text-ink">{dict.hub}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {NODES.map((node) => (
            <DiagramNode key={node.key} node={node} dict={dict} align="left" />
          ))}
        </div>
      </div>
    </figure>
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
  return (
    <div
      className={`flex items-center gap-3 rounded-card border px-4 py-3 ${
        node.planned
          ? "border-dashed border-line-strong bg-transparent"
          : "border-line bg-surface"
      } ${align === "right" ? "sm:flex-row-reverse sm:text-right" : ""}`}
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
