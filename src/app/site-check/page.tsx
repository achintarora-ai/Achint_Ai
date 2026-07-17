"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogPosts } from "@/data/blogs";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { publicPath, absoluteUrl } from "@/lib/paths";

type CheckResult = {
  label: string;
  url: string;
  status: "pending" | "pass" | "fail";
  detail?: string;
};

const routes = [
  "/",
  "/skills/",
  "/experience/",
  "/projects/",
  "/blogs/",
  "/contact/",
  "/assistant/",
  "/resume/",
  "/site-check/",
];

const assets = [
  siteConfig.resumePath,
  siteConfig.resumeDocxPath,
  "/images/blog/vector-search-poster.png",
  "/images/blog/claude-fable-5-poster.png",
  "/images/blog/rag-chatbot-cost-2026-poster.png",
  "/images/blog/rag-healthcare-compliance-poster.png",
  "/images/research/cloud-comparison.png",
  "/images/research/fabric-databricks.png",
  "/images/research/token-economics.png",
  "/images/research/hermes-agents.png",
  "/images/projects/weknowrights-logo.png",
  "/images/education/algoma-university.png",
  "/images/achint/banner-green.png",
  "/resources/data-science-handbook.pdf",
  ...blogPosts.filter((p) => p.pdfPath).map((p) => p.pdfPath!),
  ...projects.filter((p) => p.image).map((p) => p.image!),
];

async function probe(url: string): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (res.ok) return { ok: true, detail: `${res.status}` };
    const getRes = await fetch(url, { method: "GET", cache: "no-store" });
    return { ok: getRes.ok, detail: `${getRes.status}` };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message : "Request failed",
    };
  }
}

export default function SiteCheckPage() {
  const [routeResults, setRouteResults] = useState<CheckResult[]>([]);
  const [assetResults, setAssetResults] = useState<CheckResult[]>([]);
  const [running, setRunning] = useState(false);

  const runChecks = async () => {
    setRunning(true);
    const routeChecks: CheckResult[] = routes.map((route) => ({
      label: route,
      url: publicPath(route),
      status: "pending",
    }));
    const assetChecks: CheckResult[] = assets.map((asset) => ({
      label: asset,
      url: publicPath(asset),
      status: "pending",
    }));
    setRouteResults(routeChecks);
    setAssetResults(assetChecks);

    for (let i = 0; i < routeChecks.length; i++) {
      const result = await probe(routeChecks[i].url);
      routeChecks[i] = {
        ...routeChecks[i],
        status: result.ok ? "pass" : "fail",
        detail: result.detail,
      };
      setRouteResults([...routeChecks]);
    }

    for (let i = 0; i < assetChecks.length; i++) {
      const result = await probe(assetChecks[i].url);
      assetChecks[i] = {
        ...assetChecks[i],
        status: result.ok ? "pass" : "fail",
        detail: result.detail,
      };
      setAssetResults([...assetChecks]);
    }

    setRunning(false);
  };

  useEffect(() => {
    void runChecks();
  }, []);

  const passCount =
    routeResults.filter((r) => r.status === "pass").length +
    assetResults.filter((r) => r.status === "pass").length;
  const failCount =
    routeResults.filter((r) => r.status === "fail").length +
    assetResults.filter((r) => r.status === "fail").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)]">
        · SITE HEALTH
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.03em]">
        Deployment check
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Automated probes for routes and static assets. Base path:{" "}
        <code className="text-[var(--foreground)]">
          {process.env.NEXT_PUBLIC_BASE_PATH || "(none)"}
        </code>
        . Site URL:{" "}
        <code className="text-[var(--foreground)]">{absoluteUrl("/")}</code>
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void runChecks()}
          disabled={running}
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[#06110c] disabled:opacity-60"
        >
          {running ? "Running…" : "Re-run checks"}
        </button>
        <Link
          href="/"
          className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold"
        >
          Home
        </Link>
      </div>

      {!running && (passCount > 0 || failCount > 0) && (
        <p className="mt-4 text-sm">
          <span className="text-[var(--accent)]">{passCount} passed</span>
          {" · "}
          <span className={failCount ? "text-red-400" : "text-[var(--muted)]"}>
            {failCount} failed
          </span>
        </p>
      )}

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium">
          Routes
        </h2>
        <ul className="mt-4 space-y-2">
          {routeResults.map((item) => (
            <li
              key={item.url}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm"
            >
              <span>{item.label}</span>
              <span
                className={
                  item.status === "pass"
                    ? "text-[var(--accent)]"
                    : item.status === "fail"
                      ? "text-red-400"
                      : "text-[var(--muted)]"
                }
              >
                {item.status.toUpperCase()}
                {item.detail ? ` (${item.detail})` : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium">
          Assets
        </h2>
        <ul className="mt-4 space-y-2">
          {assetResults.map((item) => (
            <li
              key={item.url}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm"
            >
              <span className="break-all">{item.label}</span>
              <span
                className={
                  item.status === "pass"
                    ? "text-[var(--accent)]"
                    : item.status === "fail"
                      ? "text-red-400"
                      : "text-[var(--muted)]"
                }
              >
                {item.status.toUpperCase()}
                {item.detail ? ` (${item.detail})` : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-medium">
          Manual smoke test
        </h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
          <li>Open each blog post and confirm cover image + article body render</li>
          <li>Resume page: PDF preview and download buttons</li>
          <li>Projects: WeKnowRights logo and detail page</li>
          <li>Navbar Résumé link and mobile menu navigation</li>
          <li>Chat widget opens (API requires Vercel; static Pages = UI only)</li>
        </ul>
      </section>
    </div>
  );
}
