import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { ChatWidget } from "@/components/chat/chat-widget";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Ask Achint AI — a portfolio assistant that answers questions about Achint Pal Singh’s experience, projects, blogs, and skills.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-medium text-[var(--accent)]">AI Assistant</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.03em]">
        Ask Achint AI
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        Portfolio-grounded answers with blog recommendations first. Optional web
        search is used only when it adds genuine public value.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
      >
        <Mail className="h-4 w-4" />
        {siteConfig.email}
      </a>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ChatWidget floating={false} initiallyOpen />
        <aside className="space-y-5">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="font-semibold">Recommended blogs</h2>
            <ul className="mt-4 space-y-3">
              {profile.assistantBlogRecommendations.map((blog) => (
                <li key={blog.slug}>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="block rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 hover:border-[var(--accent)]"
                  >
                    <p className="text-sm font-medium">{blog.title}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {blog.hook}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blogs"
              className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              View all blogs
            </Link>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="font-semibold">Suggested questions</h2>
            <ul className="mt-4 space-y-3">
              {profile.assistantSuggestedQuestions.map((question) => (
                <li
                  key={question}
                  className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--muted)]"
                >
                  {question}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="font-semibold">Feedback</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Something off? Email Achint with feedback on the assistant.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Ask Achint AI — Feedback")}`}
              className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Send feedback
            </a>
            <p className="mt-5 text-xs text-[var(--muted)]">
              Secrets stay on the server. Without an OpenRouter key, the
              assistant still answers from local portfolio retrieval.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
