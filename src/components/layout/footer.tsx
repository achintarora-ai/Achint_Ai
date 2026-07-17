import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-semibold text-[var(--foreground)]">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {siteConfig.title} · {siteConfig.location}
          </p>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
            Computer Science graduate → AI/ML intern → AI System Engineer →
            product builder and technical researcher.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex gap-3">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            >
              <LinkedinIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <Link href="/research" className="hover:text-[var(--accent)]">
              Research
            </Link>
            <Link href="/projects" className="hover:text-[var(--accent)]">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-[var(--accent)]">
              Contact
            </Link>
            <Link href="/assistant" className="hover:text-[var(--accent)]">
              Ask Achint AI
            </Link>
          </div>
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
