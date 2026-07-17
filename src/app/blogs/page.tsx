import type { Metadata } from "next";
import { BlogLibrary } from "@/components/blog/blog-library";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Technical blogs and research by Achint Pal Singh — RAG, vector search, token economics, cloud platforms, agents, and AI governance.",
};

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--claude)]">
        · WRITING & RESEARCH
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.03em] md:text-5xl">
        Blogs that show how I think
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        Original research and technical writing on RAG cost, compliance,
        agents, cloud platforms, and model economics — written for recruiters
        and engineering peers.
      </p>
      <div className="mt-10">
        <BlogLibrary />
      </div>
    </div>
  );
}
