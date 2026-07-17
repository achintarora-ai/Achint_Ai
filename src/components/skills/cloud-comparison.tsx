"use client";

import { useState } from "react";
import { cloudProviders } from "@/data/skills";
import { cn } from "@/lib/utils";

export function CloudComparison() {
  const [active, setActive] = useState(cloudProviders[0].id);
  const provider =
    cloudProviders.find((item) => item.id === active) ?? cloudProviders[0];

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Cloud providers"
      >
        {cloudProviders.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium",
              active === item.id
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
            onClick={() => setActive(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold">{provider.name}</h3>
          <p className="text-sm text-[var(--muted)]">{provider.knowledgeLevel}</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {provider.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h4 className="font-semibold text-[var(--accent)]">
                {group.title}
              </h4>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-[var(--foreground)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {cloudProviders.map((item) => (
          <article
            key={`summary-${item.id}`}
            className="rounded-xl border border-[var(--border)] p-4"
          >
            <h4 className="font-semibold">{item.name}</h4>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {item.knowledgeLevel}
            </p>
            <p className="mt-3 text-xs text-[var(--muted)]">
              {item.groups.reduce((sum, group) => sum + group.items.length, 0)}{" "}
              services listed
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
