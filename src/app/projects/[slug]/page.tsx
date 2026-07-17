import type { Metadata } from "next";
import { SiteImage } from "@/components/ui/site-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { getProjectBySlug, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.description,
  };
}

const statusLabel: Record<string, string> = {
  implemented: "Implemented",
  prototype: "Prototype",
  experimental: "Experimental",
  "in-development": "In development",
};

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "BusinessApplication",
    url: project.website,
    creator: {
      "@type": "Person",
      name: "Achint Pal Singh",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/projects"
        className="text-sm font-medium text-[var(--accent)] hover:underline"
      >
        ← All projects
      </Link>

      <div className="mt-6 flex flex-wrap items-start gap-5">
        {project.image ? (
          <SiteImage
            src={project.image}
            alt={`${project.name} logo`}
            width={88}
            height={88}
            className="rounded-full border border-[var(--border)] bg-white object-cover"
          />
        ) : null}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            {project.name}
          </h1>
          {project.formerly && (
            <p className="mt-1 text-[var(--muted)]">
              Formerly {project.formerly}
            </p>
          )}
          <p className="mt-3 max-w-3xl text-lg text-[var(--muted)]">
            {project.description}
          </p>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Visit {project.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold">Problem</h2>
          <p className="mt-3 text-[var(--muted)]">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Solution</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.solution.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">My contribution</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {project.contributions.map((item) => (
            <li
              key={item}
              className="text-sm leading-relaxed before:mr-2 before:text-[var(--accent)] before:content-['▹']"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Architecture</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Logical system flow. Labels describe architecture layers used in the
          product work and do not imply every capability is identically live in
          every environment.
        </p>
        <div className="mt-5">
          <ArchitectureDiagram steps={project.architecture} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Capabilities</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.capabilities.map((capability) => (
            <li
              key={capability.name}
              className="rounded-xl border border-[var(--border)] px-4 py-3"
            >
              <p className="font-medium">{capability.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-[var(--muted)]">
                {statusLabel[capability.status]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {project.disclaimer && (
        <p className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
          {project.disclaimer}
        </p>
      )}
    </div>
  );
}
