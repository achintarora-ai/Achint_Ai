import Link from "next/link";
import { experience } from "@/data/experience";

export function ExperiencePreview() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Experience</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Product work with real systems ownership
            </h2>
          </div>
          <Link
            href="/experience"
            className="hidden text-sm font-medium text-[var(--accent)] hover:underline sm:inline"
          >
            Full timeline
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {experience.map((job) => (
            <article
              key={job.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold">
                  {job.role}{" "}
                  <span className="text-[var(--muted)]">· {job.company}</span>
                </h3>
                <p className="text-sm text-[var(--muted)]">{job.range}</p>
              </div>
              <p className="mt-3 text-[var(--muted)]">{job.summary}</p>
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {job.highlights.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-[var(--foreground)] before:mr-2 before:text-[var(--accent)] before:content-['▹']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
