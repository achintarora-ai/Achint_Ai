import Image from "next/image";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-b border-[var(--border)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--claude)]">
          · EDUCATION
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em] md:text-4xl">
          Education
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Academic path aligned with Achint’s LinkedIn profile — Computer
          Science at Algoma University, grounded in science foundations.
        </p>

        <div className="mt-8 space-y-5">
          {education.map((item) => (
            <article
              key={item.id}
              className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start gap-4">
                {item.logo ? (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-white p-1.5">
                    <Image
                      src={item.logo}
                      alt={`${item.school} logo`}
                      width={48}
                      height={48}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-xs font-semibold text-[var(--muted)]">
                    EDU
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em]">
                      {item.school}
                    </h3>
                    <p className="text-sm text-[var(--accent)]">{item.range}</p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                    {item.degree}
                  </p>
                  {item.grade && (
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Grade: {item.grade}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>

                  {item.activities && item.activities.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold tracking-[0.12em] text-[var(--claude)]">
                        ACTIVITIES & SOCIETIES
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {item.activities.map((activity) => (
                          <li
                            key={activity}
                            className="rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-xs text-[var(--muted)]"
                          >
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.skills && item.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-[var(--accent-soft)] px-2 py-1 text-xs font-medium text-[var(--accent)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
