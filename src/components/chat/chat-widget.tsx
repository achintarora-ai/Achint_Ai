"use client";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowUp, X, Plus, MessageCircle, Loader2, Square } from "lucide-react";
import { apiPath, publicPath } from "@/lib/paths";
type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url: string }[];
  mode?: string;
};
const prompts = [
  "What has Achint built?",
  "Explain overfitting from the handbook",
  "How does the two-tower project work?",
  "What’s new in AI today?",
];
export function ChatWidget({
  floating = true,
  initiallyOpen = false,
}: {
  floating?: boolean;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen),
    [input, setInput] = useState(""),
    [messages, setMessages] = useState<Message[]>([]),
    [loading, setLoading] = useState(false);
  const inputId = useId(),
    panelId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);
  useEffect(() => () => controller.current?.abort(), []);
  function reset() {
    controller.current?.abort();
    setMessages([]);
    setLoading(false);
    setInput("");
  }
  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;
    const prior = messages;
    setMessages([...prior, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    const abort = new AbortController();
    controller.current = abort;
    const timeout = setTimeout(() => abort.abort(), 35000);
    try {
      const response = await fetch(apiPath("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: prior
            .slice(-8)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) })),
        }),
        signal: abort.signal,
      });
      if (response.status === 429)
        throw new Error("Please wait a minute before asking another question.");
      if (!response.ok)
        throw new Error(
          "The assistant service is unavailable. Please try again.",
        );
      const data = await response.json();
      if (!abort.signal.aborted)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply || data.error || "No answer available.",
            sources: data.sources,
            mode: data.mode,
          },
        ]);
    } catch (error) {
      if (!abort.signal.aborted)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              error instanceof Error
                ? error.message
                : "Unable to reach the assistant.",
          },
        ]);
    } finally {
      clearTimeout(timeout);
      if (controller.current === abort) {
        setLoading(false);
        controller.current = null;
      }
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }
  const panel = (
    <section
      id={panelId}
      aria-label="Ask Achint AI conversation"
      className={floating ? "chat-panel chat-floating" : "chat-panel chat-full"}
    >
      <header className="chat-header">
        <div>
          <span className="chat-monogram">a.</span>
          <span>
            Ask Achint <small>Portfolio companion</small>
          </span>
        </div>
        <div>
          <button onClick={reset} title="New chat" aria-label="New chat">
            <Plus size={19} />
          </button>
          {floating && (
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={19} />
            </button>
          )}
        </div>
      </header>
      <div
        ref={scrollRef}
        className="chat-messages"
        role="log"
        aria-live="polite"
      >
        {!messages.length && (
          <div className="chat-welcome">
            <p className="eyebrow">A LITTLE CURIOSITY GOES A LONG WAY</p>
            <h2>
              What would you
              <br />
              <em>like to discover?</em>
            </h2>
            <p>
              Explore my work, unpack a data science idea,
              <br className="hidden sm:block" /> or find your next interesting
              read.
            </p>
            <div className="chat-prompts">
              {prompts.map((q) => (
                <button key={q} onClick={() => void send(q)}>
                  {q}
                  <span>↗</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message, i) => (
          <div
            key={i}
            className={message.role === "user" ? "chat-user" : "chat-answer"}
          >
            {message.role === "assistant" && (
              <p className="chat-answer-label">
                ACHINT AI{" "}
                {message.mode === "reference" ||
                message.mode === "degraded" ||
                message.mode === "local-fallback"
                  ? "· SOURCE EXCERPTS"
                  : message.mode === "news"
                    ? "· LIVE HEADLINES"
                    : ""}
              </p>
            )}
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href?.startsWith("/") ? publicPath(href) : href}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            {message.sources?.length ? (
              <div className="chat-sources">
                {message.sources.slice(0, 4).map((source) => (
                  <a
                    key={source.url + source.title}
                    href={
                      source.url.startsWith("/")
                        ? publicPath(source.url)
                        : source.url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.title} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {loading && (
          <p className="chat-thinking">
            <Loader2 size={15} className="animate-spin" /> Looking through the
            references…
          </p>
        )}
      </div>
      <div className="chat-composer">
        <form onSubmit={submit}>
          <label htmlFor={inputId} className="sr-only">
            Message Ask Achint
          </label>
          <textarea
            id={inputId}
            rows={2}
            value={input}
            maxLength={1000}
            placeholder="Ask anything about my work or the handbook…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                void send(input);
              }
            }}
          />
          {loading ? (
            <button
              type="button"
              aria-label="Stop response"
              onClick={() => {
                controller.current?.abort();
                setLoading(false);
              }}
            >
              <Square size={15} />
            </button>
          ) : (
            <button aria-label="Send message" disabled={!input.trim()}>
              <ArrowUp size={20} />
            </button>
          )}
        </form>
        <p>
          Grounded in portfolio references. Check sources.{" "}
          <Link href="/handbook">Read the handbook ↗</Link>
        </p>
      </div>
    </section>
  );
  if (!floating) return panel;
  return (
    <div className="chat-anchor">
      {open && panel}
      <button
        className="chat-launcher"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <MessageCircle size={18} /> Ask Achint
      </button>
    </div>
  );
}
