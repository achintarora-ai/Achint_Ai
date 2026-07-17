import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperiencePreview } from "@/components/sections/experience-preview";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { NeuralSkillsGraph } from "@/components/skills/neural-skills-graph";
import { blogPosts } from "@/data/blogs";
import { coverImageClass, formatDate } from "@/lib/utils";

export default function HomePage() {
  const featuredBlogs = [...blogPosts]
    .sort((a, b) => {
      if (a.slug === "benchmarking-vector-search-startup-chatbots") return -1;
      if (b.slug === "benchmarking-vector-search-startup-chatbots") return 1;
      return b.date.localeCompare(a.date);
    })
    .slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <NeuralSkillsGraph />
        </div>
      </section>

      <AboutSection />
      <EducationSection />
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:p-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--claude)]">
                · FOR LEARNERS
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em]">
                Download the Data Science Journey Handbook
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
                A practical companion from Achint’s data science path — free for
                aspiring data scientists.
              </p>
            </div>
            <Link
              href="/resources/data-science-handbook.pdf"
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#06110c]"
            >
              Download PDF
            </Link>
          </div>
        </div>
      </section>
      <ExperiencePreview />
      <ProjectsPreview />

      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-[var(--claude)]">
                · BLOGS
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em] md:text-4xl">
                Research and writing
              </h2>
            </div>
            <Link
              href="/blogs"
              className="hidden text-sm font-semibold text-[var(--claude)] hover:underline sm:inline"
            >
              All blogs
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredBlogs.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--background)]"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/9] border-b border-[var(--border)] bg-[var(--surface)]">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      className={coverImageClass(post.coverImage)}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                <p className="text-xs text-[var(--muted)]">
                  {formatDate(post.date)} · {post.readingTimeMinutes} min
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-medium leading-snug tracking-[-0.02em]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">
                  {post.summary}
                </p>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--claude)] hover:underline"
                >
                  Read post
                </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-20">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em]">
              Need systems that automate the hard parts?
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Explore automated pipelines, product case studies, research, or ask
              the portfolio assistant for recruiter-ready answers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/skills"
              className="rounded-full bg-[var(--claude)] px-4 py-2.5 text-sm font-semibold text-white"
            >
              View Skills
            </Link>
            <Link
              href="/assistant"
              className="rounded-full border border-[var(--border)] px-4 py-2.5 text-sm font-semibold"
            >
              Ask Achint AI
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[var(--border)] px-4 py-2.5 text-sm font-semibold"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
