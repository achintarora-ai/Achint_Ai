"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  externalResearchLinks,
  researchArticles,
  researchCategories,
  type ResearchCategory,
} from "@/data/research";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ResearchLibrary() {
  const [active, setActive] = useState<ResearchCategory | "All">("All");

  const filtered = useMemo(() => {
    if (active === "All") return researchArticles;
    return researchArticles.filter((article) =>
      article.categories.includes(active),
    );
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="list" aria-label="Filters">
        {(["All", ...researchCategories] as const).map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm",
              active === category
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((article) => (
          <article
            key={article.slug}
            className="flex h-full flex-col rounded-2xl border border-[var(--border)] p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                {article.status}
              </span>
              <span className="text-xs text-[var(--muted)]">
                {article.readingTimeMinutes} min
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug">
              {article.title}
            </h2>
            <p className="mt-2 text-xs text-[var(--muted)]">
              {formatDate(article.date)} · {article.author}
            </p>
            <p className="mt-3 flex-1 text-sm text-[var(--muted)]">
              {article.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[var(--surface)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/research/${article.slug}`}
                className="text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Read article
              </Link>
              {article.pdfPath && (
                <a
                  href={article.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  PDF
                </a>
              )}
              {article.externalUrl && (
                <a
                  href={article.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  External
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl font-semibold">Predictive Tech Labs links</h2>
        <ul className="mt-4 space-y-2">
          {externalResearchLinks.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
