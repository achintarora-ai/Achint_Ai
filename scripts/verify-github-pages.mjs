#!/usr/bin/env node
/**
 * Post-deploy verification for GitHub Pages.
 * Usage: SITE_URL=https://achintarora-ai.github.io/Achint_Ai node scripts/verify-github-pages.mjs
 */

const siteUrl = (process.env.SITE_URL || "https://achintarora-ai.github.io/Achint_Ai").replace(
  /\/$/,
  "",
);

const routes = [
  "",
  "/skills/",
  "/experience/",
  "/projects/",
  "/projects/weknowrights/",
  "/blogs/",
  "/blogs/claude-fable-5-launch/",
  "/blogs/how-much-does-a-rag-chatbot-cost-2026/",
  "/blogs/7-compliance-mistakes-rag-healthcare/",
  "/blogs/benchmarking-vector-search-startup-chatbots/",
  "/contact/",
  "/assistant/",
  "/resume/",
  "/site-check/",
];

const assets = [
  "/images/blog/vector-search-poster.png",
  "/images/blog/claude-fable-5-poster.png",
  "/images/blog/rag-chatbot-cost-2026-poster.png",
  "/images/blog/rag-healthcare-compliance-poster.png",
  "/images/research/cloud-comparison.png",
  "/images/projects/weknowrights-logo.png",
  "/images/education/algoma-university.png",
  "/resume/achint-pal-singh-resume.pdf",
  "/resources/data-science-handbook.pdf",
];

async function check(path) {
  const url = `${siteUrl}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    return { path, url, ok: res.ok, status: res.status };
  } catch (error) {
    return {
      path,
      url,
      ok: false,
      status: error instanceof Error ? error.message : "error",
    };
  }
}

async function main() {
  console.log(`Verifying ${siteUrl}\n`);
  const targets = [...routes, ...assets];
  const results = await Promise.all(targets.map(check));
  const failures = results.filter((r) => !r.ok);

  for (const r of results) {
    console.log(`${r.ok ? "✓" : "✗"} ${r.status} ${r.path || "/"}`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} check(s) failed.`);
    process.exit(1);
  }

  console.log(`\nAll ${results.length} checks passed.`);
}

main();
