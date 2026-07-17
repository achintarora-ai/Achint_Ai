"use client";

import { SiteImage } from "@/components/ui/site-image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blogPosts } from "@/data/blogs";
import { AssetLink } from "@/components/ui/asset-link";
import { cn, coverImageClass, formatDate } from "@/lib/utils";

const filters = ["All", "Achint", "RAG", "Cloud", "Agents", "Economics"] as const;

export function BlogLibrary() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const posts = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
    if (active === "All") return sorted;
    if (active === "Achint") {
      return sorted.filter((p) => p.author.includes("Achint"));
    }
    const key = active.toLowerCase();
    return sorted.filter(
      (p) =>
        p.tags.some((t) => t.toLowerCase().includes(key)) ||
        p.title.toLowerCase().includes(key) ||
        p.summary.toLowerCase().includes(key),
    );
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition",
              active === filter
                ? "bg-[var(--claude)] text-white"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--claude)]",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_10px_40px_color-mix(in_oklab,var(--foreground)_5%,transparent)] transition hover:-translate-y-0.5"
          >
            {post.coverImage && (
              <div className="relative aspect-[16/9] border-b border-[var(--border)] bg-[var(--background)]">
                <SiteImage
                  src={post.coverImage}
                  alt=""
                  fill
                  className={cn(
                    coverImageClass(post.coverImage),
                    "transition duration-500 group-hover:scale-[1.02]",
                  )}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={post.coverImage.startsWith("http")}
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[color-mix(in_oklab,var(--claude)_14%,transparent)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--foreground)]">
                  Written by Achint Pal Singh
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {post.readingTimeMinutes} min
                </span>
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium leading-snug tracking-[-0.02em]">
                {post.title}
              </h2>
              <p className="mt-2 text-xs text-[var(--muted)]">
                {formatDate(post.date)} · {post.author}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {post.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-sm font-semibold text-[var(--claude)] hover:underline"
                >
                  Read post
                </Link>
                {post.pdfPath && (
                  <AssetLink
                    href={post.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--muted)] hover:text-[var(--claude)]"
                  >
                    PDF
                  </AssetLink>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
