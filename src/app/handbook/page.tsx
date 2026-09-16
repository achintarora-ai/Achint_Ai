import { AssetLink } from "@/components/ui/asset-link";
import { publicPath } from "@/lib/paths";
import Link from "next/link";
export const metadata = { title: "Data Science Handbook" };
export default function HandbookPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="eyebrow">THE LEARNING ROOM</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl">
        A little more understanding,
        <br />
        <em>one page at a time.</em>
      </h1>
      <p className="my-6 max-w-2xl text-[var(--muted)]">
        Read the 434-page data science reference in the portfolio. Ask Achint AI
        can find relevant passages and link to their page numbers.
      </p>
      <div className="mb-8 flex gap-5">
        <AssetLink
          href="/resources/data-science-handbook.pdf"
          className="text-link"
        >
          Open handbook ↗
        </AssetLink>
        <Link href="/assistant" className="text-link">
          Ask about a concept ↗
        </Link>
      </div>
      <iframe
        title="Data Science Journey Handbook"
        src={publicPath("/resources/data-science-handbook.pdf")}
        className="h-[75vh] w-full rounded-xl border border-[var(--border)] bg-white"
      />
      <p className="mt-4 text-xs text-[var(--muted)]">
        User-provided learning reference. Ownership and original author credits
        remain with the source document.
      </p>
    </div>
  );
}
