import { ChatWidget } from "@/components/chat/chat-widget";
import Link from "next/link";
export const metadata = {
  title: "Ask Achint AI",
  description:
    "Explore Achint's work, public research, and the data science handbook with source-linked answers.",
};
export default function AssistantPage() {
  return (
    <div className="assistant-workspace">
      <aside className="assistant-sidebar">
        <p className="eyebrow">ASK ACHINT / YOUR READING ROOM</p>
        <h1>
          A conversation
          <br />
          <em>with the work.</em>
        </h1>
        <p>Projects, research, and the ideas behind them.</p>
        <nav>
          <Link href="/resume">For recruiters ↗</Link>
          <Link href="/projects/civicmatch">
            Two-tower recommendation lab ↗
          </Link>
          <Link href="/handbook">Data science handbook ↗</Link>
          <Link href="/daily">Daily AI dispatch ↗</Link>
          <Link href="/blogs">Original writing ↗</Link>
        </nav>
        <p className="mt-10 text-xs">
          AI-assisted answers can be imperfect. Source links let you check the
          evidence. Without a model connection, the assistant returns clearly
          labeled reference excerpts.
        </p>
      </aside>
      <ChatWidget floating={false} initiallyOpen />
    </div>
  );
}
