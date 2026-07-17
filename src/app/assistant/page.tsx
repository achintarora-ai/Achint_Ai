import type { Metadata } from "next";
import { ChatWidget } from "@/components/chat/chat-widget";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Ask Achint AI — a portfolio assistant that answers questions about Achint Pal Singh’s experience, projects, research, and skills.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-medium text-[var(--accent)]">AI Assistant</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Ask Achint AI
      </h1>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">
        A recruiter-friendly assistant grounded in portfolio knowledge first.
        Optional web search is used only when it adds genuine public value.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ChatWidget floating={false} initiallyOpen />
        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
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
          <p className="mt-5 text-xs text-[var(--muted)]">
            Secrets stay on the server. Without an OpenRouter key, the assistant
            still answers from local portfolio retrieval.
          </p>
        </aside>
      </div>
    </div>
  );
}
