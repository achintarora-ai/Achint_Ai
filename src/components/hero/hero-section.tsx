"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { siteConfig } from "@/data/site-config";
import { LlmStructurePanel } from "./llm-structure-panel";

const stats = [
  { label: "MINDSET", value: "Reduce human effort" },
  { label: "FOCUS AREAS", value: "Agents · RAG · Cloud" },
  { label: "STACK CORE", value: "Python · FastAPI" },
  { label: "DEPLOYMENT", value: "GCP Cloud Run" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,var(--glow-green),transparent_42%),radial-gradient(circle_at_88%_20%,var(--glow-green),transparent_38%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-[0.82fr_1.18fr] md:gap-10 md:px-6 md:py-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)]"
          >
            {siteConfig.location.toUpperCase()} ·{" "}
            <span className="text-[var(--accent)]">AI ENGINEER</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-5xl font-medium leading-[1.05] tracking-[-0.04em] md:text-6xl"
          >
            <span className="text-[var(--foreground)]">Achint Pal Singh</span>
            <span className="mt-2 block text-[var(--accent)]">AI Engineer</span>
          </motion.h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--foreground)] md:text-xl">
            As an AI engineer, I admire automating single things that reduce
            human effort.
          </p>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
            {siteConfig.supportingText}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#06110c] hover:opacity-92"
            >
              View my work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)]"
            >
              Read the blog
            </Link>
            <a
              href="/resume"
              className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)]"
            >
              Download résumé
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
            >
              <LinkedinIcon className="h-4 w-4" /> LinkedIn
            </a>
            <Link href="/assistant" className="hover:text-[var(--accent)]">
              Ask Achint AI
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-3"
              >
                <p className="text-[10px] font-semibold tracking-[0.12em] text-[var(--muted)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <LlmStructurePanel />
      </div>

      <div className="relative border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_90%,transparent)]">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-[11px] font-semibold tracking-[0.22em] text-[var(--muted)] md:px-6">
          AUTOMATE · DESIGN · BUILD · EVALUATE · SHIP
        </p>
      </div>
    </section>
  );
}
