import Image from "next/image";
import { Download } from "lucide-react";
import {
  dataScienceHandbook,
  learningPlatforms,
} from "@/data/skills";

export function LearningResources() {
  return (
    <section id="learning" className="mt-16 scroll-mt-24">
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em]">
        Learning platforms & handbook
      </h2>
      <p className="mt-3 max-w-3xl text-[var(--muted)]">
        Platforms Achint used while building CS and data science foundations —
        plus a downloadable handbook from his data science journey for learners
        getting started.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {learningPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--claude)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <Image
                  src={`https://cdn.simpleicons.org/${platform.iconSlug}`}
                  alt=""
                  width={22}
                  height={22}
                  className="h-5 w-5"
                  unoptimized
                />
              </span>
              <h3 className="font-semibold">{platform.name}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {platform.description}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-6 rounded-[1.35rem] border border-[var(--border)] bg-[linear-gradient(135deg,var(--surface),var(--surface-2))] p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--claude)]">
              · FREE DOWNLOAD
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em]">
              {dataScienceHandbook.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {dataScienceHandbook.description}
            </p>
          </div>
          <a
            href={dataScienceHandbook.path}
            download={dataScienceHandbook.filename}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#06110c] hover:opacity-92"
          >
            <Download className="h-4 w-4" />
            Download handbook (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
