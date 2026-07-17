import type { Metadata } from "next";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "AI System Engineer and AI/ML Intern experience at Predictive Tech Labs, including WeKnowRights product work, RAG systems, and cloud deployment.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-medium text-[var(--accent)]">Experience</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Career timeline
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        A clear path from Computer Science study into applied AI engineering,
        product ownership, and technical research.
      </p>

      <div className="mt-10 space-y-6">
        {experience.map((job) => (
          <article
            key={job.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 md:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">{job.role}</h2>
                <p className="mt-1 text-[var(--muted)]">
                  {job.company} · {job.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--accent)]">
                  {job.range}
                </p>
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  {job.type}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[var(--muted)]">{job.summary}</p>
            <ul className="mt-6 space-y-3">
              {job.highlights.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed before:mr-2 before:text-[var(--accent)] before:content-['▹']"
                >
                  {item}
                </li>
              ))}
            </ul>
            {job.id === "ptl-engineer" && (
              <p className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
                Note: WeKnowRights provides legal information and workflow
                support and is not a substitute for advice from a qualified legal
                professional.
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
