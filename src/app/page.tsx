import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperiencePreview } from "@/components/sections/experience-preview";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { ResearchPreview } from "@/components/sections/research-preview";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperiencePreview />
      <ProjectsPreview />
      <ResearchPreview />
      <section className="bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-20">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Looking for evidence, not buzzwords?
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Explore skills by capability, ask the portfolio assistant, or reach
              out directly about AI engineering opportunities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/skills"
              className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white"
            >
              View Skills
            </Link>
            <Link
              href="/assistant"
              className="rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-medium"
            >
              Ask Achint AI
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
