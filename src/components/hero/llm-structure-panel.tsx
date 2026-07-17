"use client";

import { motion, useReducedMotion } from "framer-motion";

const stages = [
  { id: "data", label: "DATA", detail: "Corpus · PDFs · OCR" },
  { id: "embed", label: "EMBED", detail: "Vectors · FAISS" },
  { id: "train", label: "MODEL", detail: "Patterns · Weights" },
  { id: "reason", label: "REASON", detail: "RAG · Tools" },
  { id: "out", label: "OUTPUT", detail: "Cited response" },
];

export function LlmStructurePanel() {
  const reduce = useReducedMotion();

  return (
    <div className="relative md:-mr-2 lg:-mr-4">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.25rem] bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--accent)_32%,transparent),transparent_70%)]"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[color-mix(in_oklab,var(--accent)_28%,var(--border))] bg-[var(--surface)] shadow-[0_28px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--blue)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]">
            LLM STRUCTURE · LIVE
          </p>
        </div>

        <div className="p-4 md:p-5">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">
            TRAINING AN LLM
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            From raw text → embeddings → model reasoning → grounded output.
          </p>

          <div className="relative mt-5 space-y-3">
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute left-[15px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,var(--accent),var(--blue))]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2 }}
                style={{ transformOrigin: "top" }}
              />
            )}
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={reduce ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 * index }}
                className="relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5"
              >
                <span
                  className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background:
                      index % 2 === 0
                        ? "var(--accent-soft)"
                        : "color-mix(in oklab, var(--blue) 18%, transparent)",
                    color: index % 2 === 0 ? "var(--accent)" : "var(--blue)",
                    boxShadow: `0 0 0 1px ${
                      index % 2 === 0 ? "var(--accent)" : "var(--blue)"
                    }`,
                  }}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em]">
                    {stage.label}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{stage.detail}</p>
                </div>
                {!reduce && (
                  <motion.span
                    className="ml-auto h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        index % 2 === 0 ? "var(--accent)" : "var(--blue)",
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-center text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
            AUTOMATE · RETRIEVE · REASON · REVIEW · SHIP
          </p>
        </div>
      </div>
    </div>
  );
}
