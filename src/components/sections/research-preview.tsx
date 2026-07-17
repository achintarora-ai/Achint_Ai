import { SiteImage } from "@/components/ui/site-image";
import Link from "next/link";
import { researchArticles } from "@/data/research";
import { formatDate, coverImageClass } from "@/lib/utils";

export function ResearchPreview() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--accent)]">Research</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em] md:text-4xl">
              Benchmarks, guides, and applied studies
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Vector search, cloud platforms, Fabric vs Databricks, Claude token
              economics, and agent memory — presented for recruiters and
              engineering peers.
            </p>
          </div>
          <Link
            href="/research"
            className="hidden text-sm font-semibold text-[var(--accent)] hover:underline sm:inline"
          >
            Research library
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {researchArticles.slice(0, 3).map((article) => (
            <article
              key={article.slug}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              {article.coverImage && (
                <div className="relative aspect-[16/9] border-b border-[var(--border)] bg-[var(--background)]">
                  <SiteImage
                    src={article.coverImage}
                    alt=""
                    fill
                    className={coverImageClass(article.coverImage)}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--accent)]">
                    {article.status}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {article.readingTimeMinutes} min read
                  </span>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-medium leading-snug tracking-[-0.02em]">
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
                  className="mt-4 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
