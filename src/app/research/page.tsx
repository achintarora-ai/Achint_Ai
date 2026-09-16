import Link from "next/link";
import type { Metadata } from "next";
import { researchArticles } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Independent technical studies, benchmark methods, and referenced engineering articles.",
};

export default function ResearchPage() {
  return (
    <div className="editorial-home">
      <section className="editorial-section">
        <p className="eyebrow">RESEARCH / TECHNICAL STUDIES</p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl tracking-tight md:text-6xl">
          Questions worth testing.
        </h1>
        <p className="muted-copy max-w-2xl">
          Independent work on retrieval, agent reliability, and AI economics.
          New studies include an abstract, methods, limitations, and numbered
          references. These are portfolio publications, not claims of IEEE
          publication or peer review.
        </p>
      </section>
      <div className="writing-list">
        {researchArticles.map((a, i) => (
          <Link href={`/blogs/${a.slug}`} className="writing-row" key={a.slug}>
            <span className="writing-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow">
                {a.status} · {a.readingTimeMinutes} MIN
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl">
                {a.title}
              </h2>
              <p className="mt-3">{a.summary}</p>
            </div>
            <span>↗</span>
          </Link>
        ))}
      </div>
      <p className="muted-copy pb-8">
        Existing benchmark documents are author-provided materials. New articles
        explicitly distinguish proposed experiments from measured results.
      </p>
    </div>
  );
}
