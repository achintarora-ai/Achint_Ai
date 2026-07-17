"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Loader2,
  Mail,
  MessageCircle,
  MessageSquarePlus,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url: string }[];
};

type Props = {
  floating?: boolean;
  initiallyOpen?: boolean;
};

const INITIAL_MESSAGE =
  "Hi — I'm Ask Achint AI. Ask about Achint's experience, automation work, projects, or blogs. I'll recommend relevant posts and stick to portfolio evidence.";

const FEEDBACK_MAILTO = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Ask Achint AI — Feedback")}&body=${encodeURIComponent("Feedback on the portfolio assistant:\n\n")}`;

export function ChatWidget({ floating = true, initiallyOpen = false }: Props) {
  const [open, setOpen] = useState(initiallyOpen);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: INITIAL_MESSAGE },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function resetConversation() {
    setMessages([{ role: "assistant", content: INITIAL_MESSAGE }]);
    setLastUserMessage(null);
    setInput("");
  }

  async function submitWithHistory(
    text: string,
    baseMessages: ChatMessage[],
    replaceHistory = false,
  ) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setLastUserMessage(trimmed);
    const historyBase = replaceHistory ? baseMessages : messages;
    const nextHistory = [
      ...historyBase.filter((m) => m.role === "user" || m.role === "assistant"),
      { role: "user" as const, content: trimmed },
    ];
    setMessages((prev) =>
      replaceHistory
        ? [...baseMessages, { role: "user", content: trimmed }]
        : [...prev, { role: "user", content: trimmed }],
    );
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextHistory.slice(-10),
        }),
      });
      const data = (await response.json()) as {
        reply?: string;
        error?: string;
        sources?: { title: string; url: string }[];
      };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            data.error ||
            "Something went wrong. Please try again.",
          sources: data.sources,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach the assistant service. Tap Retry below or email Achint directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(text: string) {
    await submitWithHistory(text, messages);
  }

  function retryLastMessage() {
    if (!lastUserMessage || loading) return;
    const trimmed = [...messages];
    if (trimmed.at(-1)?.role === "assistant") trimmed.pop();
    if (trimmed.at(-1)?.role === "user") trimmed.pop();
    void submitWithHistory(lastUserMessage, trimmed, true);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  const panel = (
    <div
      id="achint-ai-panel"
      className={cn(
        "flex h-[min(38rem,82vh)] w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
        floating && "sm:w-[26rem] md:w-[28rem]",
      )}
    >
      <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
              <Bot className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-sm font-semibold">Ask Achint AI</p>
              <p className="text-xs text-[var(--muted)]">
                Portfolio answers · blog recommendations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)] disabled:opacity-40"
              aria-label="Retry last question"
              disabled={!lastUserMessage || loading}
              onClick={retryLastMessage}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry
            </button>
            <a
              href={FEEDBACK_MAILTO}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--accent)]"
              aria-label="Send feedback by email"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" />
              Feedback
            </a>
            {floating && (
              <button
                type="button"
                className="rounded-md p-1.5 text-[var(--muted)] hover:bg-[var(--background)]"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"
        >
          <Mail className="h-3.5 w-3.5" />
          {siteConfig.email}
        </a>
      </div>

      <div
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        role="log"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cn(
              "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
              message.role === "user"
                ? "ml-auto bg-[var(--accent)] text-[#06110c]"
                : "bg-[var(--surface)] text-[var(--foreground)]",
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.sources && message.sources.length > 0 && (
              <ul className="mt-2.5 space-y-1 border-t border-[var(--border)] pt-2">
                {message.sources.slice(0, 4).map((source) => (
                  <li key={`${source.url}-${source.title}`}>
                    {source.url.startsWith("http") ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--accent)] underline-offset-2 hover:underline"
                      >
                        {source.title}
                      </a>
                    ) : (
                      <Link
                        href={source.url}
                        className="text-xs text-[var(--accent)] underline-offset-2 hover:underline"
                      >
                        {source.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {loading && (
          <p className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
          </p>
        )}
        <div ref={endRef} />
      </div>

      <div className="space-y-3 border-t border-[var(--border)] bg-[var(--surface)] px-3 py-3">
        <div>
          <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-[var(--muted)]">
            RECOMMENDED BLOGS
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {profile.assistantBlogRecommendations.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="min-w-[11rem] shrink-0 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 hover:border-[var(--accent)]"
              >
                <p className="text-xs font-semibold leading-snug text-[var(--foreground)]">
                  {blog.title}
                </p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[var(--muted)]">
                  {blog.hook}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-[var(--muted)]">
            SUGGESTED QUESTIONS
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {profile.assistantSuggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                onClick={() => void sendMessage(question)}
                disabled={loading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="achint-chat-input" className="sr-only">
            Ask a question about Achint
          </label>
          <input
            id="achint-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about experience, blogs, automation…"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none ring-[var(--accent)] focus:ring-2"
            maxLength={1000}
            disabled={loading}
          />
          <button
            type="submit"
            className="rounded-xl bg-[var(--accent)] p-2.5 text-[#06110c] disabled:opacity-50"
            aria-label="Send message"
            disabled={loading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="flex items-center justify-between gap-2 text-[10px] text-[var(--muted)]">
          <button
            type="button"
            className="hover:text-[var(--accent)]"
            onClick={resetConversation}
          >
            New chat
          </button>
          <Link href="/blogs" className="hover:text-[var(--accent)]">
            All blogs →
          </Link>
        </div>
      </div>
    </div>
  );

  if (!floating) return panel;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && panel}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-medium text-[#06110c] shadow-lg hover:opacity-90"
        aria-expanded={open}
        aria-controls="achint-ai-panel"
      >
        <MessageCircle className="h-4 w-4" />
        Ask Achint AI
      </button>
    </div>
  );
}
