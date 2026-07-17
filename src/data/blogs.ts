import { researchArticles, type ResearchArticle } from "./research";

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  readingTimeMinutes: number;
  summary: string;
  tags: string[];
  coverImage?: string;
  pdfPath?: string;
  externalUrl?: string;
  source: "achint" | "predictive-tech-labs";
  excerptMarkdown: string;
  featured?: boolean;
};

function fromResearch(article: ResearchArticle): BlogPost {
  return {
    slug: article.slug,
    title: article.title,
    author: "Achint Pal Singh",
    date: article.date,
    readingTimeMinutes: article.readingTimeMinutes,
    summary: article.summary,
    tags: article.tags,
    coverImage: article.coverImage,
    pdfPath: article.pdfPath,
    externalUrl: article.externalUrl,
    source: "achint",
    excerptMarkdown: article.excerptMarkdown,
    featured: true,
  };
}

/** Scraped from predictivetechlabs.com/blog + Achint PDF research library */
export const blogPosts: BlogPost[] = [
  ...researchArticles.map(fromResearch),
  {
    slug: "claude-fable-5-launch",
    title: "Claude Fable 5 & Mythos 5: Anthropic Splits the Frontier Into Two Products",
    author: "Achint Pal Singh",
    date: "2026-06-09",
    readingTimeMinutes: 16,
    summary:
      "One frontier model, two products. Benchmark matrix, safety-routing split, pricing, and a practical guide for when to use Fable 5 over Opus 4.8.",
    tags: ["Claude Fable 5", "Anthropic", "Benchmarks", "AI Models"],
    coverImage: "/images/blog/claude-fable-5-poster.png",
    externalUrl: "https://www.predictivetechlabs.com/blog/claude-fable-5-launch",
    source: "achint",
    excerptMarkdown: `
## Overview

Anthropic split frontier capability into two product tracks. This post summarizes the practical differences for builders choosing between Fable 5, Mythos 5, and Opus 4.8.

## Why it matters

Model selection is now a product decision: safety routing, benchmark trade-offs, and cost profiles change which model belongs in chat, research, or agent workflows.

## Read the full article

Open the original post for the full benchmark matrix and usage guide.
`.trim(),
  },
  {
    slug: "how-much-does-a-rag-chatbot-cost-2026",
    title: "How Much Does a RAG Chatbot Cost in 2026?",
    author: "Achint Pal Singh",
    date: "2026-06-11",
    readingTimeMinutes: 14,
    summary:
      "A procurement-ready cost breakdown with low/medium/high budget tables, controllable cost levers, and a five-step vendor checklist for RAG chatbots.",
    tags: ["Cost", "Procurement", "RAG"],
    coverImage: "/images/blog/rag-chatbot-cost-2026-poster.png",
    externalUrl:
      "https://www.predictivetechlabs.com/blog/how-much-does-a-rag-chatbot-cost-2026",
    source: "achint",
    excerptMarkdown: `
## Focus

Budgeting a RAG chatbot for 2026 requires separating model, retrieval, hosting, and operations spend — then stress-testing vendor claims.

## Themes

- Sample low / medium / high budget profiles
- Cost levers teams actually control
- Vendor checklist for procurement conversations
`.trim(),
  },
  {
    slug: "7-compliance-mistakes-rag-healthcare",
    title: "7 Compliance Mistakes That Make RAG Chatbots Dangerous for Healthcare",
    author: "Achint Pal Singh",
    date: "2026-06-12",
    readingTimeMinutes: 12,
    summary:
      "Seven common HIPAA pitfalls in healthcare RAG deployments, mitigations for each, and a practical readiness checklist.",
    tags: ["Healthcare", "HIPAA", "Compliance", "RAG"],
    coverImage: "/images/blog/rag-healthcare-compliance-poster.png",
    externalUrl:
      "https://www.predictivetechlabs.com/blog/7-compliance-mistakes-rag-healthcare",
    source: "achint",
    excerptMarkdown: `
## Focus

Healthcare RAG systems fail when retrieval, logging, or memory ignore compliance boundaries. This post catalogs seven high-risk mistakes and how to mitigate them.

## Portfolio note

Useful governance reading alongside Achint’s agent-memory and RAG engineering work.
`.trim(),
  },
];

export function getBlogBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentBlog(slug: string) {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const index = sorted.findIndex((post) => post.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? sorted[index - 1] : undefined,
    next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}

export const blogSources = [
  {
    title: "Claude Opus Token Economics",
    url: "https://www.predictivetechlabs.com/blog/claude-opus-4-8-token-economics",
  },
  {
    title: "Hermes Agents and Memory",
    url: "https://www.predictivetechlabs.com/blog/hermes-agents-memory",
  },
  {
    title: "Practical AI Vector Search Benchmarking",
    url: "https://www.predictivetechlabs.com/blog/practical-ai-vector-search-benchmarking",
  },
];
