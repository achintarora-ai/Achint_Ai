import Link from "next/link";
import { researchArticles } from "@/data/research";
import { formatDate } from "@/lib/utils";

export function ResearchPreview() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Research</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Benchmarks, guides, and applied studies
            </h2>
          </div>
          <Link
            href="/research"
            className="hidden text-sm font-medium text-[var(--accent)] hover:underline sm:inline"
          >
            Research library
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {researchArticles.slice(0, 3).map((article) => (
            <article
              key={article.slug}
              className="flex h-full flex-col rounded-2xl border border-[var(--border)] p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                  {article.status}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {article.readingTimeMinutes} min read
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--muted)]">
                {formatDate(article.date)} · {article.author}
              </p>
              <p className="mt-3 flex-1 text-sm text-[var(--muted)]">
                {article.summary}
              </p>
              <Link
                href={`/research/${article.slug}`}
                className="mt-4 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Read article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
