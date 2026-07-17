"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  externalResearchLinks,
  researchArticles,
  researchCategories,
  type ResearchCategory,
} from "@/data/research";
import { cn, coverImageClass, formatDate } from "@/lib/utils";

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
              "rounded-full px-3 py-1.5 text-sm transition-colors",
              active === category
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filtered.map((article) => (
          <article
            key={article.slug}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_30px_rgba(20,20,19,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(20,20,19,0.08)]"
          >
            {article.coverImage && (
              <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border)] bg-[var(--background)]">
                <Image
                  src={article.coverImage}
                  alt=""
                  fill
                  className={cn(
                    coverImageClass(article.coverImage),
                    "transition duration-500 group-hover:scale-[1.03]",
                  )}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                  {article.status}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {article.readingTimeMinutes} min
                </span>
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium leading-snug tracking-[-0.02em]">
                {article.title}
              </h2>
              <p className="mt-2 text-xs text-[var(--muted)]">
                {formatDate(article.date)} · {article.author}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {article.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {article.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[var(--background)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/research/${article.slug}`}
                  className="text-sm font-semibold text-[var(--accent)] hover:underline"
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
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em]">
          Predictive Tech Labs links
        </h2>
        <ul className="mt-4 space-y-2">
          {externalResearchLinks.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--accent)] hover:underline"
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
