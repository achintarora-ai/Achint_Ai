"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type SkillNode = {
  id: string;
  label: string;
  group: "core" | "ds" | "ai" | "eng" | "cloud";
  x: number;
  y: number;
  detail: string;
};

const nodes: SkillNode[] = [
  {
    id: "core",
    label: "AI System Engineer",
    group: "core",
    x: 50,
    y: 48,
    detail: "Production AI systems, RAG, agents, backends, and cloud delivery.",
  },
  {
    id: "ds",
    label: "Data Science",
    group: "ds",
    x: 18,
    y: 28,
    detail: "Pandas, NumPy, EDA, feature engineering, stats, Power BI.",
  },
  {
    id: "ml",
    label: "Machine Learning",
    group: "ds",
    x: 22,
    y: 68,
    detail: "Supervised/unsupervised learning, scikit-learn, evaluation, inference.",
  },
  {
    id: "genai",
    label: "Generative AI",
    group: "ai",
    x: 78,
    y: 24,
    detail: "LLMs, prompt engineering, model routing, GPT / Claude / Gemini.",
  },
  {
    id: "rag",
    label: "RAG & Search",
    group: "ai",
    x: 84,
    y: 58,
    detail: "Embeddings, vector DBs, semantic retrieval, ranking quality.",
  },
  {
    id: "agents",
    label: "AI Agents",
    group: "ai",
    x: 70,
    y: 78,
    detail: "Agent workflows, tool use, orchestration, durable memory patterns.",
  },
  {
    id: "backend",
    label: "Python Backend",
    group: "eng",
    x: 38,
    y: 18,
    detail: "FastAPI, REST APIs, OOP, secure integrations, service design.",
  },
  {
    id: "mlops",
    label: "MLOps",
    group: "eng",
    x: 50,
    y: 84,
    detail: "Docker, Git, CI/CD concepts, monitoring, deployment workflows.",
  },
  {
    id: "gcp",
    label: "GCP",
    group: "cloud",
    x: 12,
    y: 50,
    detail: "Cloud Run, Secret Manager, IAM, storage, monitoring — hands-on.",
  },
  {
    id: "azure",
    label: "Azure / Databricks",
    group: "cloud",
    x: 58,
    y: 12,
    detail: "Azure ML, Databricks, Fabric research, data platform comparison.",
  },
];

const edges: [string, string][] = [
  ["core", "ds"],
  ["core", "ml"],
  ["core", "genai"],
  ["core", "rag"],
  ["core", "agents"],
  ["core", "backend"],
  ["core", "mlops"],
  ["core", "gcp"],
  ["core", "azure"],
  ["genai", "rag"],
  ["rag", "agents"],
  ["ds", "ml"],
  ["backend", "mlops"],
  ["gcp", "mlops"],
];

const groupTone: Record<SkillNode["group"], string> = {
  core: "var(--claude)",
  ds: "var(--blue)",
  ai: "var(--accent)",
  eng: "var(--foreground)",
  cloud: "var(--blue)",
};

export function NeuralSkillsGraph() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("core");
  const activeNode = nodes.find((n) => n.id === active) ?? nodes[0];
  const nodeMap = useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [],
  );

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_color-mix(in_oklab,var(--foreground)_8%,transparent)]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] px-5 py-4 md:px-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--claude)]">
            · SKILL GRAPH · LIVE MAP
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.03em] md:text-3xl">
            What I’m strong at
          </h2>
        </div>
        <p className="max-w-md text-sm text-[var(--muted)]">
          Hover or tap a node. The graph connects data science, AI engineering,
          backends, and cloud work the way real systems connect.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_0.8fr]">
        <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Animated neural skill network"
          >
            <defs>
              <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--claude)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#neuralGlow)" />

            {edges.map(([from, to], index) => {
              const a = nodeMap[from];
              const b = nodeMap[to];
              const lit = active === from || active === to;
              return (
                <g key={`${from}-${to}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={lit ? "var(--claude)" : "var(--border)"}
                    strokeWidth={lit ? 0.55 : 0.28}
                    opacity={lit ? 0.95 : 0.7}
                  />
                  {!reduce && (
                    <motion.circle
                      r={0.55}
                      fill="var(--claude)"
                      initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                      animate={{
                        cx: [a.x, b.x],
                        cy: [a.y, b.y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.8 + (index % 3) * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.25,
                      }}
                    />
                  )}
                </g>
              );
            })}

            {nodes.map((node) => {
              const selected = active === node.id;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(node.id)}
                  onClick={() => setActive(node.id)}
                >
                  {!reduce && selected && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.group === "core" ? 7.5 : 5.8}
                      fill="none"
                      stroke={groupTone[node.group]}
                      strokeWidth={0.35}
                      initial={{ opacity: 0.8, scale: 0.9 }}
                      animate={{ opacity: [0.7, 0.15, 0.7], scale: [1, 1.25, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.group === "core" ? 4.2 : 3.1}
                    fill={
                      selected
                        ? groupTone[node.group]
                        : "color-mix(in oklab, var(--surface) 70%, var(--background))"
                    }
                    stroke={groupTone[node.group]}
                    strokeWidth={0.45}
                  />
                  <text
                    x={node.x}
                    y={node.y + (node.group === "core" ? 7.8 : 6.4)}
                    textAnchor="middle"
                    fontSize={node.group === "core" ? 2.6 : 2.2}
                    fill="var(--foreground)"
                    style={{ fontWeight: 600 }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="border-t border-[var(--border)] p-5 lg:border-l lg:border-t-0 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Focus node
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em]">
                {activeNode.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {activeNode.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                ["ds", "Data Science"],
                ["ai", "AI Engineering"],
                ["eng", "Backend / MLOps"],
                ["cloud", "Cloud"],
              ] as const
            ).map(([group, label]) => (
              <button
                key={group}
                type="button"
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  activeNode.group === group ||
                    (group === "ai" &&
                      ["genai", "rag", "agents"].includes(activeNode.id))
                    ? "border-[var(--claude)] bg-[color-mix(in_oklab,var(--claude)_14%,transparent)] text-[var(--foreground)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--claude)]",
                )}
                onClick={() => {
                  const next = nodes.find((n) => n.group === group && n.id !== "core");
                  if (next) setActive(next.id);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
