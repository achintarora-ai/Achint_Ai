import { SiteImage } from "@/components/ui/site-image";
import Link from "next/link";
import { projects } from "@/data/projects";

export function ProjectsPreview() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Projects</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Featured product work
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-[var(--accent)] hover:underline sm:inline"
          >
            All projects
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]"
            >
              <div className="flex items-center gap-4 border-b border-[var(--border)] p-5">
                {project.image ? (
                  <SiteImage
                    src={project.image}
                    alt={`${project.name} logo`}
                    width={56}
                    height={56}
                    className="rounded-full border border-[var(--border)] bg-white object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
                    1AI
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  {project.formerly && (
                    <p className="text-xs text-[var(--muted)]">
                      Formerly {project.formerly}
                    </p>
                  )}
                  <p className="text-sm text-[var(--muted)]">{project.status}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[var(--muted)]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[var(--surface)] px-2 py-1 text-xs text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-5 inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  Read case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
