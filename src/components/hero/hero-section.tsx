"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { siteConfig } from "@/data/site-config";
import { PortraitParallax } from "./portrait-parallax";
import { SpecialtyRotator } from "./specialty-rotator";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--surface)_80%,transparent),transparent),radial-gradient(circle_at_15%_20%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_40%),radial-gradient(circle_at_85%_10%,color-mix(in_oklab,var(--blue)_12%,transparent),transparent_35%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-wide text-[var(--muted)]"
          >
            {siteConfig.name} · {siteConfig.location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl"
          >
            {siteConfig.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
          >
            {siteConfig.supportingText}
          </motion.p>

          <div className="mt-5">
            <SpecialtyRotator items={siteConfig.specialties} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/assistant"
              className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)]"
            >
              Ask My AI Assistant
            </Link>
            <a
              href={siteConfig.resumePath}
              className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)]"
            >
              Download Résumé
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
            <Link href="/research" className="hover:text-[var(--accent)]">
              Research
            </Link>
          </div>
        </div>

        <PortraitParallax alt={`${siteConfig.name}, ${siteConfig.title}`} />
      </div>

      <div className="relative border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_70%,transparent)]">
        <ul className="mx-auto grid max-w-6xl gap-3 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
          {siteConfig.credibility.map((item) => (
            <li
              key={item}
              className="text-sm leading-snug text-[var(--muted)]"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] align-middle" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
