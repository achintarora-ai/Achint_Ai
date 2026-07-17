"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, Loader2, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { profile } from "@/data/profile";
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

export function ChatWidget({ floating = true, initiallyOpen = false }: Props) {
  const [open, setOpen] = useState(initiallyOpen);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m Ask Achint AI. Ask about Achint’s experience, WeKnowRights, RAG research, cloud skills, or availability. I’ll stick to portfolio evidence.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextHistory = [
      ...messages.filter((m) => m.role === "user" || m.role === "assistant"),
      { role: "user" as const, content: trimmed },
    ];
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
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
            "I couldn’t reach the assistant service. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  const panel = (
    <div
      className={cn(
        "flex h-[min(34rem,75vh)] w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-xl",
        floating && "sm:w-[24rem]",
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-[var(--accent)]" />
          <div>
            <p className="text-sm font-semibold">Ask Achint AI</p>
            <p className="text-xs text-[var(--muted)]">
              Portfolio-grounded answers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--background)]"
            aria-label="Reset conversation"
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  content:
                    "Conversation reset. What would you like to know about Achint’s work?",
                },
              ])
            }
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          {floating && (
            <button
              type="button"
              className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--background)]"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3" role="log" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cn(
              "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
              message.role === "user"
                ? "ml-auto bg-[var(--accent)] text-white"
                : "bg-[var(--surface)] text-[var(--foreground)]",
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.sources && message.sources.length > 0 && (
              <ul className="mt-2 space-y-1 border-t border-[var(--border)] pt-2">
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

      <div className="border-t border-[var(--border)] px-3 py-2">
        <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
          {profile.assistantSuggestedQuestions.slice(0, 4).map((question) => (
            <button
              key={question}
              type="button"
              className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              onClick={() => void sendMessage(question)}
            >
              {question}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="achint-chat-input" className="sr-only">
            Ask a question about Achint
          </label>
          <input
            id="achint-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about experience, projects, research…"
            className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
            maxLength={1000}
            disabled={loading}
          />
          <button
            type="submit"
            className="rounded-md bg-[var(--accent)] p-2 text-white disabled:opacity-50"
            aria-label="Send message"
            disabled={loading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
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
        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white shadow-lg hover:opacity-90"
        aria-expanded={open}
        aria-controls="achint-ai-panel"
      >
        <MessageCircle className="h-4 w-4" />
        Ask Achint AI
      </button>
    </div>
  );
}
