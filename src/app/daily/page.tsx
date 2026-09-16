import Link from "next/link";
import { DailyNews } from "@/components/blog/daily-news";
export const metadata = {
  title: "Daily AI Dispatch",
  description:
    "Automatically refreshed, attributed updates from OpenAI, NVIDIA and Microsoft Research.",
};
export default function DailyPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="eyebrow">THE DAILY DISPATCH / AI & DATA SCIENCE</p>
      <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl md:text-7xl">
        Stay curious.
        <br />
        <em>Keep current.</em>
      </h1>
      <p className="mt-6 max-w-2xl text-[var(--muted)]">
        A live reading desk from OpenAI, NVIDIA, and Microsoft Research.
        Publisher headlines update automatically; each story links to its
        original source.
      </p>
      <div className="mt-7 flex gap-6">
        <Link href="/blogs" className="text-link">
          Achint’s original writing ↗
        </Link>
        <Link href="/assistant" className="text-link">
          Explore with Ask Achint ↗
        </Link>
      </div>
      <DailyNews />
      <p className="mt-10 text-xs text-[var(--muted)]">
        Automatically collected publisher updates, not articles authored by
        Achint. Publication times belong to the source. No full articles are
        republished.
      </p>
    </div>
  );
}
