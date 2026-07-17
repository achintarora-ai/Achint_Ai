import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleMarkdown } from "@/components/markdown/article-markdown";
import {
  getAdjacentResearch,
  getResearchBySlug,
  researchArticles,
} from "@/data/research";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return researchArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchBySlug(slug);
  if (!article) return { title: "Research" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ResearchArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getResearchBySlug(slug);
  if (!article) notFound();
  const { prev, next } = getAdjacentResearch(slug);

  const headings = article.excerptMarkdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace(/^##\s+/, ""));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <Link
        href="/research"
        className="text-sm font-medium text-[var(--accent)] hover:underline"
      >
        ← Research library
      </Link>

      <article className="mt-6 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Contents
          </p>
          <ul className="mt-3 space-y-2">
            {headings.map((heading) => (
              <li key={heading}>
                <a
                  href={`#${heading
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")}`}
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
                >
                  {heading}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 text-sm">
            {article.pdfPath && (
              <a
                href={article.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--accent)] hover:underline"
              >
                Download PDF
              </a>
            )}
            {article.externalUrl && (
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--accent)] hover:underline"
              >
                Open external article
              </a>
            )}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_SITE_URL || ""}/research/${article.slug}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Share on LinkedIn
            </a>
          </div>
        </aside>

        <div>
          <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
            {article.status}
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {article.author} · {formatDate(article.date)} ·{" "}
            {article.readingTimeMinutes} min read
          </p>
          <p className="mt-5 text-lg text-[var(--muted)]">{article.summary}</p>
          <div className="mt-8">
            <ArticleMarkdown content={article.excerptMarkdown} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      <nav className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--border)] pt-6">
        {prev ? (
          <Link
            href={`/research/${prev.slug}`}
            className="max-w-sm text-sm text-[var(--muted)] hover:text-[var(--accent)]"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/research/${next.slug}`}
            className="max-w-sm text-right text-sm text-[var(--muted)] hover:text-[var(--accent)]"
          >
            {next.title} →
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
