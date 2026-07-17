export function ArchitectureDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
      <ol className="flex min-w-[640px] flex-col gap-3 md:min-w-0">
        {steps.map((step, index) => (
          <li key={step} className="flex items-stretch gap-3">
            <div className="flex w-10 flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                {index + 1}
              </span>
              {index < steps.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-[var(--border)]" />
              )}
            </div>
            <div className="mb-1 flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm font-medium">
              {step}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
