import type { Metadata } from "next";
import { ResearchLibrary } from "@/components/research/research-library";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research library covering RAG, vector search, cloud platforms, data platforms, AI economics, and agent architectures by Achint Pal Singh and Predictive Tech Labs.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-medium text-[var(--accent)]">Research</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Technical research library
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        Summaries and excerpts from benchmarking studies, cloud comparisons, and
        AI economics work. Full PDFs and external articles are linked where
        available.
      </p>
      <div className="mt-10">
        <ResearchLibrary />
      </div>
    </div>
  );
}
