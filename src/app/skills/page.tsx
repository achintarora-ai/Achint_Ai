import type { Metadata } from "next";
import { CloudComparison } from "@/components/skills/cloud-comparison";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "AI engineering skills grouped by capability: backend, data science, machine learning, generative AI, MLOps, and cloud platforms.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-medium text-[var(--accent)]">Skills</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Capabilities over buzzword lists
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        Skills are grouped by how they show up in real systems work—building,
        evaluating, deploying, and improving AI products.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section
            key={group.id}
            className="rounded-2xl border border-[var(--border)] p-6"
          >
            <h2 className="text-xl font-semibold">{group.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {group.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--foreground)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section id="cloud" className="mt-16 scroll-mt-24">
        <h2 className="text-3xl font-semibold tracking-tight">
          Cloud platforms
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">
          Interactive comparison across Google Cloud, Microsoft Azure, and AWS.
          Knowledge levels are labeled honestly based on portfolio evidence.
        </p>
        <div className="mt-8">
          <CloudComparison />
        </div>
      </section>
    </div>
  );
}
