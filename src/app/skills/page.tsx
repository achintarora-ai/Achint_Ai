import type { Metadata } from "next";
import { CloudComparison } from "@/components/skills/cloud-comparison";
import { LearningResources } from "@/components/skills/learning-resources";
import { NeuralSkillsGraph } from "@/components/skills/neural-skills-graph";
import { SkillBadges } from "@/components/skills/skill-badges";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Interactive neural skill graph, official tech logos, learning platforms, and a free data science handbook from Achint Pal Singh.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--claude)]">
        · CAPABILITIES
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.03em] md:text-5xl">
        Skills mapped like a system, not a laundry list
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        Data science, AI engineering, backends, and cloud work — with official
        logos where available, plus the platforms and handbook behind the
        journey.
      </p>

      <div className="mt-10">
        <NeuralSkillsGraph />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section
            key={group.id}
            className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em]">
              {group.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {group.description}
            </p>
            <SkillBadges items={group.items} />
          </section>
        ))}
      </div>

      <LearningResources />

      <section id="cloud" className="mt-16 scroll-mt-24">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em]">
          Cloud platforms
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">
          Interactive comparison across Google Cloud, Microsoft Azure, and AWS —
          with honest knowledge-level labels.
        </p>
        <div className="mt-8">
          <CloudComparison />
        </div>
      </section>
    </div>
  );
}
