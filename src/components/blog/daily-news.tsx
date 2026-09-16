"use client";
import { useEffect, useState } from "react";
import { apiPath } from "@/lib/paths";
import type { NewsFeed } from "@/lib/news";
export function DailyNews() {
  const [feed, setFeed] = useState<NewsFeed | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const abort = new AbortController();
    async function load() {
      try {
        const response = await fetch(apiPath("/api/news"), {
          signal: abort.signal,
        });
        if (!response.ok)
          throw new Error(
            "The live feed is temporarily unavailable. You can still visit the publishers below.",
          );
        setFeed(await response.json());
        setError("");
      } catch (e) {
        if (!abort.signal.aborted)
          setError(e instanceof Error ? e.message : "Unable to load updates.");
      } finally {
        if (!abort.signal.aborted) setLoading(false);
      }
    }
    void load();
    const timer = setInterval(() => {
      if (!document.hidden) void load();
    }, 15 * 60_000);
    return () => {
      abort.abort();
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <div className="my-8 flex flex-wrap gap-2">
        {["All", "OpenAI", "NVIDIA", "Microsoft"].map((name) => (
          <button
            key={name}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
            className={`rounded-full border px-4 py-2 text-sm ${filter === name ? "bg-[var(--foreground)] text-white" : "border-[var(--border)]"}`}
          >
            {name}
          </button>
        ))}
      </div>
      {loading && <p role="status">Checking the publishers’ latest updates…</p>}
      {error && (
        <p role="status" className="rounded-xl border p-5">
          {error}
        </p>
      )}
      {feed && (
        <>
          <p className="mb-5 text-xs text-[var(--muted)]">
            Checked {new Date(feed.checkedAt).toLocaleString()} ·{" "}
            {feed.stale
              ? "Some publishers unavailable; retained entries may be older."
              : "Updates refresh automatically."}
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {feed.items
              .filter((x) => filter === "All" || x.publisher === filter)
              .map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-60 flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <p className="eyebrow">
                    {item.publisher} / {item.topic}
                  </p>
                  <h2 className="my-5 font-[family-name:var(--font-display)] text-2xl leading-tight group-hover:underline">
                    {item.title}
                  </h2>
                  <p className="mt-auto text-xs text-[var(--muted)]">
                    {new Date(item.publishedAt).toLocaleDateString()} · Read at
                    source ↗
                  </p>
                </a>
              ))}
          </div>
          {feed.items.filter((x) => filter === "All" || x.publisher === filter)
            .length === 0 && (
            <p>No recent items available for this publisher.</p>
          )}
        </>
      )}
      <div className="mt-10 flex flex-wrap gap-5 text-sm">
        <a href="https://openai.com/news/" target="_blank" rel="noreferrer">
          OpenAI News ↗
        </a>
        <a
          href="https://developer.nvidia.com/blog/"
          target="_blank"
          rel="noreferrer"
        >
          NVIDIA Developer ↗
        </a>
        <a
          href="https://www.microsoft.com/en-us/research/blog/"
          target="_blank"
          rel="noreferrer"
        >
          Microsoft Research ↗
        </a>
      </div>
    </div>
  );
}
