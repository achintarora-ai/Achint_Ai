"use client";

import { useState } from "react";
import { publicPath } from "@/lib/paths";

type Item = {
  title: string;
  description: string;
  url: string;
  category: string;
  note?: string;
};
type Model = {
  vocabulary: string[];
  categories: string[];
  userWeights: number[][];
  itemVectors: number[][];
  items: Item[];
};
const tracks = [
  {
    id: "recreation",
    name: "Community & recreation",
    example: "arts dance adult",
  },
  {
    id: "climate",
    name: "Climate & energy data",
    example: "energy emissions renewable",
  },
  {
    id: "skills",
    name: "Jobs & skills data",
    example: "employment education training",
  },
];

export function CivicMatchDemo() {
  const [track, setTrack] = useState("recreation");
  const [query, setQuery] = useState("arts dance adult");
  const [results, setResults] = useState<(Item & { score: number })[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  async function recommend() {
    setLoading(true);
    setNotice("");
    setResults([]);
    try {
      const response = await fetch(publicPath(`/lab/${track}-retrieval.json`));
      if (!response.ok)
        throw new Error("The model could not be loaded. Please try again.");
      const model: Model = await response.json();
      const tokens = query.toLowerCase().match(/[a-z]{3,}/g) || [];
      const x = [
        ...model.vocabulary.map((t) =>
          Math.log1p(tokens.filter((w) => w === t).length),
        ),
        ...model.categories.map(() => 0),
      ];
      const norm = Math.hypot(...x);
      if (!norm) {
        setNotice(
          `Try a catalog term such as ${model.vocabulary.slice(0, 8).join(", ")}. This small model does not understand every word.`,
        );
        return;
      }
      const user = model.userWeights[0].map((_, j) =>
        Math.tanh(
          x.reduce(
            (sum, v, i) => sum + (v / norm) * model.userWeights[i][j],
            0,
          ),
        ),
      );
      setResults(
        model.items
          .map((item, i) => ({
            ...item,
            score: user.reduce(
              (sum, v, j) => sum + v * model.itemVectors[i][j],
              0,
            ),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 5),
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-9">
      <p className="eyebrow">CIVICMATCH / WORKING EXPERIMENT</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl">
        Two perspectives.
        <br />
        <em>One useful connection.</em>
      </h2>
      <p className="my-5 max-w-2xl text-[var(--muted)]">
        Your interests become a user vector. A trained model compares it with
        saved item vectors from public government catalogs. All ranking runs in
        your browser.
      </p>
      <div
        className="mb-6 flex flex-wrap gap-2"
        aria-label="Recommendation catalog"
      >
        {tracks.map((t) => (
          <button
            disabled={loading}
            aria-pressed={track === t.id}
            className={`rounded-full border px-4 py-2 text-sm ${track === t.id ? "bg-[var(--foreground)] text-[var(--background)]" : "border-[var(--border)]"}`}
            key={t.id}
            onClick={() => {
              setTrack(t.id);
              setQuery(t.example);
              setResults([]);
              setNotice("");
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void recommend();
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label className="flex-1 text-sm">
          What interests you?
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={240}
            required
            disabled={loading}
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3"
          />
        </label>
        <button
          disabled={loading}
          className="self-end rounded-xl bg-[var(--foreground)] px-6 py-3 text-[var(--background)] disabled:opacity-60"
        >
          {loading ? "Finding connections…" : "Find connections ↗"}
        </button>
      </form>
      <div className="mt-6" aria-live="polite">
        {notice && <p>{notice}</p>}
        {results.length > 0 && (
          <p className="mb-4 text-sm text-[var(--muted)]">
            Five matches · similarity is a ranking score, not a probability or
            eligibility decision.
          </p>
        )}
        <ol className="space-y-3">
          {results.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="rounded-xl border border-[var(--border)] p-4"
            >
              <div className="flex justify-between gap-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  {item.title} ↗
                </a>
                <span className="shrink-0 font-mono text-xs">
                  {item.score.toFixed(3)}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.description.slice(0, 240)}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">
        Research prototype · September 2026 catalog snapshot. Training
        preferences are simulated. Climate and skills tracks recommend datasets,
        not live jobs or personal energy advice. Recreation availability,
        eligibility and accessibility must be checked with the provider. No
        claim that these public datasets have never been used before.
      </p>
    </section>
  );
}
