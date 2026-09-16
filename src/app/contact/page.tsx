import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Achint Pal Singh about AI engineering, RAG systems, cloud backends, and research collaboration opportunities.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-medium text-[var(--accent)]">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Let’s talk about building useful AI systems
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        {siteConfig.availability}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="font-semibold">Direct links</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 hover:text-[var(--claude)]"
                >
                  <Mail className="h-4 w-4" /> {siteConfig.email}
                </a>
              </li>
              <li className="text-[var(--muted)]">Phone: {siteConfig.phone}</li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--accent)]"
                >
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--accent)]"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-[var(--muted)]">
                <MapPin className="h-4 w-4" /> {siteConfig.location}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border)] p-5">
            <h2 className="font-semibold">Areas of interest</h2>
            <ul className="mt-3 space-y-2">
              {siteConfig.interests.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[var(--muted)] before:mr-2 before:text-[var(--accent)] before:content-['▹']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
          <h2 className="text-xl font-semibold">Start a conversation</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Tell me about your project, team, or the problem you’re working on.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
