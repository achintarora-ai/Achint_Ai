import type { Metadata } from "next";
import { AssetLink } from "@/components/ui/asset-link";
import { SiteImage } from "@/components/ui/site-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleMarkdown } from "@/components/markdown/article-markdown";
import { ResearchVisuals } from "@/components/research/research-charts";
import { blogPosts, getAdjacentBlog, getBlogBySlug } from "@/data/blogs";
import { formatDate, coverImageClass, isBlogPoster } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();
  const { prev, next } = getAdjacentBlog(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <Link
        href="/blogs"
        className="text-sm font-semibold text-[var(--claude)] hover:underline"
      >
        ← All blogs
      </Link>

      {post.coverImage && (
        <div
          className={`relative mt-6 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] ${
            isBlogPoster(post.coverImage) ? "aspect-[16/9] bg-[var(--background)]" : "aspect-[16/7]"
          }`}
        >
          <SiteImage
            src={post.coverImage}
            alt=""
            fill
            priority
            className={coverImageClass(post.coverImage)}
            sizes="100vw"
            unoptimized={post.coverImage.startsWith("http")}
          />
        </div>
      )}

      <article className="mx-auto mt-8 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)]">
          WRITTEN BY ACHINT PAL SINGH
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.03em] md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {post.author} · {formatDate(post.date)} · {post.readingTimeMinutes}{" "}
          min read
        </p>
        <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
          {post.summary}
        </p>

        <div className="mt-8">
          <ResearchVisuals slug={post.slug} />
        </div>

        <div className="mt-8">
          <ArticleMarkdown content={post.excerptMarkdown} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {post.pdfPath && (
            <AssetLink
              href={post.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--claude)] px-4 py-2 text-sm font-semibold text-white"
            >
              Download PDF
            </AssetLink>
          )}
        </div>
      </article>

      <nav className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--border)] pt-6">
        {prev ? (
          <Link
            href={`/blogs/${prev.slug}`}
            className="max-w-sm text-sm text-[var(--muted)] hover:text-[var(--claude)]"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/blogs/${next.slug}`}
            className="max-w-sm text-right text-sm text-[var(--muted)] hover:text-[var(--claude)]"
          >
            {next.title} →
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
