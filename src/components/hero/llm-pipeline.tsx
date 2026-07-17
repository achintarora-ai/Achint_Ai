import { BrainCircuit, Database, MessageSquareText, Sparkles } from "lucide-react";

const steps = [
  {
    label: "INPUT",
    detail: "Text Prompt (User Query)",
    icon: MessageSquareText,
  },
  {
    label: "MODEL (LLM)",
    detail: "GPT-4 · Llama 3 · Claude",
    icon: BrainCircuit,
  },
  {
    label: "PROCESSING",
    detail: "Patterns & Knowledge",
    icon: Database,
  },
  {
    label: "OUTPUT",
    detail: "Generated Response",
    icon: Sparkles,
  },
];

export function LlmPipeline() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--accent)]">
            Explaining LLMs
          </p>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-[var(--muted)]">
            LLMs are AI models trained on vast amounts of text data to
            understand, learn, and generate human-like text.
          </p>
        </div>
      </div>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.label}
              className="relative rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold tracking-wide text-[var(--muted)]">
                  {index + 1}. {step.label}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium leading-snug">
                {step.detail}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
