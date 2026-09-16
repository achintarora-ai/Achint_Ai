import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { AssetLink } from "@/components/ui/asset-link";
import { siteConfig } from "@/data/site-config";
import { publicPath } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Download or view ${siteConfig.name}'s résumé — AI Engineer, Toronto.`,
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)]">
        · RÉSUMÉ
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.03em] md:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="mt-2 text-lg text-[var(--muted)]">{siteConfig.title}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {siteConfig.resumeRoleSummary}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <AssetLink
          href={siteConfig.resumePath}
          download
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#06110c] hover:opacity-92"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </AssetLink>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)]"
        >
          Contact
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)]">
          PDF preview
        </div>
        <iframe
          title={`${siteConfig.name} résumé`}
          src={`${publicPath(siteConfig.resumePath)}#view=FitH`}
          className="h-[min(80vh,920px)] w-full bg-white"
        />
      </div>
    </div>
  );
}
