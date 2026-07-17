import type { Metadata } from "next";
import { SiteImage } from "@/components/ui/site-image";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured projects by Achint Pal Singh including WeKnowRights and 1AI — AI products spanning RAG, agents, backends, and cloud deployment.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-medium text-[var(--accent)]">Projects</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Product case studies
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        Selected work that shows product development, applied research, cloud
        deployment, RAG engineering, and backend ownership.
      </p>

      <div className="mt-10 grid gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="grid gap-6 rounded-2xl border border-[var(--border)] p-6 md:grid-cols-[120px_1fr] md:p-8"
          >
            <div className="flex items-start">
              {project.image ? (
                <SiteImage
                  src={project.image}
                  alt={`${project.name} logo`}
                  width={96}
                  height={96}
                  className="rounded-full border border-[var(--border)] bg-white object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent-soft)] text-lg font-semibold text-[var(--accent)]">
                  1AI
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold">{project.name}</h2>
                <span className="rounded-md bg-[var(--surface)] px-2 py-1 text-xs text-[var(--muted)]">
                  {project.status}
                </span>
              </div>
              {project.formerly && (
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Formerly {project.formerly}
                </p>
              )}
              <p className="mt-3 text-[var(--muted)]">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--border)] px-2 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-5 inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Open case study
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
