export type ResearchStatus =
  | "Published"
  | "Research"
  | "Benchmark"
  | "Guide"
  | "Work in Progress";

export type ResearchCategory =
  | "RAG"
  | "Vector Search"
  | "AI Economics"
  | "Cloud Platforms"
  | "Data Platforms"
  | "Agents"
  | "Governance"
  | "Compliance"
  | "AI Models";

export type ResearchArticle = {
  slug: string;
  title: string;
  author: string;
  date: string;
  readingTimeMinutes: number;
  summary: string;
  tags: string[];
  categories: ResearchCategory[];
  status: ResearchStatus;
  coverImage?: string;
  pdfPath?: string;
  excerptMarkdown: string;
};

export const researchArticles: ResearchArticle[] = [
  {
    slug: "benchmarking-vector-search-startup-chatbots",
    title:
      "Practical AI for Search, RAG, and Automation: Benchmarking Vector Search for Startup Chatbots",
    author: "Achint Pal Singh",
    date: "2025-12-01",
    readingTimeMinutes: 12,
    summary:
      "A 20-configuration benchmark of embedding and vector-database combinations for startup RAG chatbots, evaluating latency, Recall@5, nDCG@5, and operating cost under tight budget constraints.",
    tags: [
      "RAG",
      "embeddings",
      "FAISS",
      "Qdrant",
      "ChromaDB",
      "Azure AI Search",
      "latency",
      "Recall@5",
      "nDCG@5",
      "cost optimization",
    ],
    categories: ["RAG", "Vector Search", "AI Economics"],
    status: "Benchmark",
    coverImage: "/images/blog/vector-search-poster.png",
    pdfPath: "/research/vector-search-research.pdf",
    excerptMarkdown: `
## Overview

This independent research benchmarks embedding–database combinations for startup RAG chatbots operating under practical constraints: low latency, high recall, and monthly AI budgets often below $100.

## Research question

Under startup constraints (<$100/month, interactive latency, high recall), which combination of embedding model and vector database delivers the best balance of performance, scalability, and cost?

## Systems under test

Representative configurations included:

| ID | Embedding | Vector DB | Notes |
| --- | --- | --- | --- |
| C1 | SentenceTransformer MiniLM | FAISS | Fastest local baseline |
| C2 | SentenceTransformer | ChromaDB | Lightweight local stack |
| C3 | SentenceTransformer | Qdrant | Managed/local scalable option |
| C5 | OpenAI text-embedding-3-large | FAISS | Higher semantic precision |
| C7 | SentenceTransformer | Azure AI Search | Enterprise managed search |

## Method

- Benchmarked **20 configurations** across open-source and commercial embeddings
- Evaluated **FAISS**, **Qdrant**, **ChromaDB**, and **Azure AI Search**
- Used a corpus of about **1,000 enterprise-style documents** (~1.2M tokens)
- Measured **latency**, **Recall@5**, **nDCG@5**, and total cost of ownership

## Key takeaways

- Local open-source stacks such as SentenceTransformer + FAISS can deliver excellent recall and very low query latency at near-zero infrastructure cost for early prototypes.
- Higher-capacity commercial embeddings can improve semantic precision at modest monthly cost for smaller query volumes.
- Managed search services trade higher operating cost for enterprise scaling, security, and operational features.
- A three-tier deployment framing—Prototype, Production, and Enterprise—helps teams evolve architecture as traffic and compliance needs grow.

## Why it matters for recruiters

This is not a toy demo. It shows Achint can evaluate retrieval systems the way production teams do: with explicit metrics, cost models, and architecture tiers.
`.trim(),
  },
  {
    slug: "vector-search-benchmarks-production-rag",
    title: "Vector Search Benchmarks for Production-Grade RAG Systems",
    author: "Achint Pal Singh",
    date: "2026-01-15",
    readingTimeMinutes: 8,
    summary:
      "Companion framing for production RAG: how embedding/database combinations affect latency, ranking quality, architecture choices, and operating cost as systems move beyond prototypes.",
    tags: [
      "vector search",
      "production RAG",
      "latency",
      "accuracy",
      "architecture",
      "operating cost",
    ],
    categories: ["RAG", "Vector Search"],
    status: "Research",
    coverImage: "/images/blog/vector-search-poster.png",
    pdfPath: "/research/vector-search-research.pdf",
    excerptMarkdown: `
## Focus

This article extends the vector-search benchmark work toward production-grade RAG considerations: retrieval quality under load, ranking metrics, architecture boundaries, and cost controls.

## Evaluation themes

- Embedding and database pairing trade-offs
- Latency budgets for interactive assistants
- Recall and ranking quality for trustworthy answers
- Operating cost as systems scale from prototype to production

## Practical guidance

Production RAG is not only about picking the “best” embedding. It requires clear retrieval SLOs, evaluation sets, fallback strategies, and cost visibility across embedding, vector storage, and generation.
`.trim(),
  },
  {
    slug: "cloud-services-comparison-gcp-azure-aws",
    title: "Cloud Services Comparison — GCP vs Azure vs AWS",
    author: "Achint Pal Singh",
    date: "2026-02-10",
    readingTimeMinutes: 10,
    summary:
      "A practical side-by-side comparison of GCP, Azure, and AWS across compute, storage, databases, networking, AI/ML, security, analytics, serverless, containers, and developer tooling.",
    tags: [
      "GCP",
      "Azure",
      "AWS",
      "compute",
      "storage",
      "AI/ML",
      "security",
      "analytics",
      "serverless",
    ],
    categories: ["Cloud Platforms"],
    status: "Guide",
    coverImage: "/images/research/cloud-comparison.png",
    pdfPath: "/research/azure-cloud-guide.pdf",
    excerptMarkdown: `
## Purpose

A practical reference for mapping equivalent cloud services across **Google Cloud**, **Microsoft Azure**, and **AWS**.

## Categories covered

- Compute and serverless
- Storage and databases
- Networking
- AI / ML services
- Analytics and big data
- Security, identity, and operations
- Containers and developer tooling

## Selected mappings

| Category | GCP | Azure | AWS |
| --- | --- | --- | --- |
| Compute | Compute Engine, Cloud Run, Cloud Functions | Virtual Machines, App Service, Azure Functions | EC2, Lambda, App Runner |
| Object storage | Cloud Storage | Blob Storage | S3 |
| Managed SQL | Cloud SQL | Azure SQL | RDS |
| Data warehouse | BigQuery | Synapse Analytics | Redshift |
| ML platform | Vertex AI | Azure Machine Learning / Azure AI Foundry | SageMaker |

## How to use this guide

Use it as a translation layer when designing multi-cloud architectures, writing migration plans, or explaining platform choices in interviews and design reviews.
`.trim(),
  },
  {
    slug: "microsoft-fabric-vs-azure-databricks",
    title: "Microsoft Fabric vs Azure Databricks",
    author: "Achint Pal Singh",
    date: "2026-07-03",
    readingTimeMinutes: 9,
    summary:
      "A reproducible benchmark framework comparing Microsoft Fabric and Azure Databricks across SQL, ML, GenAI/RAG, and mixed data types. Local validation is complete; cloud performance runs were still pending at publication of the summary.",
    tags: [
      "Microsoft Fabric",
      "Azure Databricks",
      "SQL",
      "Spark",
      "MLflow",
      "GenAI",
      "RAG",
      "benchmark design",
    ],
    categories: ["Data Platforms", "Cloud Platforms", "RAG"],
    status: "Work in Progress",
    coverImage: "/images/research/fabric-databricks.png",
    pdfPath: "/research/fabric-vs-databricks.pdf",
    excerptMarkdown: `
## Status

This research summarizes a **pre-cloud** benchmark framework for comparing Microsoft Fabric and Azure Databricks.

> Local validation was completed. Cloud performance runs were still pending in the status report, so no measured cloud performance winner was declared.

## What was built

- End-to-end benchmark harness with canonical SQL queries, concurrency tests, ML lab, and GenAI/RAG pipelines
- Reproducible NYC TLC taxi datasets at multiple scales
- Documentation-based comparison across platform capability dimensions
- Preflight checks, smoke-test mode, and scoring eligibility rules

## Local validation highlights

- DuckDB reference engine: reference queries verified
- Automated test suite passed locally
- ML and GenAI/RAG pipelines runnable in local/sample mode
- Cloud preflight, smoke tests, and full benchmarks: not run at the time of the summary

## Research verdict (documentation + framework readiness)

Based on documented capabilities and framework readiness—not completed cloud latency/cost runs—Azure Databricks was recommended for teams prioritizing ML depth, custom GenAI tooling, and mixed SQL/Python/Spark workflows. Fabric remains strong for T-SQL warehouse and Power BI-centric paths.

## Important caveat

Cloud latency, cost, and editor-usability benchmarks must still be executed before declaring a measured performance winner.
`.trim(),
  },
  {
    slug: "claude-opus-token-economics",
    title: "Mastering Claude Opus Token Economics for the Savvy Developer",
    author: "Achint Pal Singh",
    date: "2026-06-15",
    readingTimeMinutes: 14,
    summary:
      "A developer-focused guide to Claude Opus token pricing, prompt caching, batch processing, conversation-history costs, output-cost management, and model-selection strategies.",
    tags: [
      "tokens",
      "prompt caching",
      "batch processing",
      "output cost",
      "conversation history",
      "model routing",
    ],
    categories: ["AI Economics", "AI Models"],
    status: "Published",
    coverImage: "/images/research/token-economics.png",
    pdfPath: "/research/claude-token-economics.pdf",
    excerptMarkdown: `
## Why token economics matters

Every prompt, uploaded file, and model response is measured in tokens. Understanding that cost model is essential for building sustainable AI products — especially when Opus-class models power agent workflows that can burn through context in a single session.

## The 5:1 mental model

For most frontier models, **output tokens cost several times more than input tokens**. A useful rule of thumb: if input is $X per million tokens, output is often ~5X. That asymmetry changes how you design prompts:

- Long system prompts are expensive once, but cheap on cache hits
- Verbose model answers are expensive **every turn**
- Retrieval-heavy pipelines pay twice: embedding input + generation input

## Prompt caching as a first-class lever

When your system prompt, tool definitions, and document prefix stay stable across requests, **prompt caching** can cut repeated prefix cost dramatically. I structure prompts so the static portion (policies, tool schemas, persona) sits at the top and caches cleanly.

## Batch APIs for async workloads

Indexing jobs, offline evals, and report generation rarely need sub-second latency. Routing those workloads to **batch endpoints** can reduce spend 40–50% compared to synchronous calls — at the cost of turnaround time. That trade is almost always worth it for nightly pipelines.

## Conversation history is a silent budget leak

Each turn re-sends prior messages. A 30-turn support chat with large retrieved chunks can explode input tokens even if the latest user message is short. Mitigations I use:

- Rolling summaries after N turns
- Store structured state instead of full transcript when possible
- Hard caps with graceful “start new session” UX

## Model routing checklist

| Task type | Model tier | Rationale |
| --- | --- | --- |
| Classification / routing | Small, fast | Minimal reasoning needed |
| RAG Q&A with citations | Mid-tier | Balance quality and cost |
| Multi-doc analysis | Frontier | Quality dominates |
| Code or schema generation | Mid or frontier | Depends on error cost |

## Practical cost controls in production

1. Log **tokens per successful task**, not just per request
2. Alert when p95 context size crosses thresholds
3. A/B test shorter prompt templates against quality metrics
4. Review tool outputs that trigger second-pass regeneration

## Takeaway

Treat cost controls as part of system design — caching, truncation policies, batching, and model selection are product decisions, not finance afterthoughts. Teams that instrument token spend early ship assistants that scale without surprise invoices.
`.trim(),
  },
  {
    slug: "hermes-agents-memory",
    title: "Hermes-Style Agents, Memory, and Building a Chatbot That Never Forgets",
    author: "Achint Pal Singh",
    date: "2026-05-20",
    readingTimeMinutes: 11,
    summary:
      "An exploration of durable memory patterns and Planner / Executor / Committer / Auditor agent designs for chatbots that retain useful context while remaining governable.",
    tags: [
      "agents",
      "durable memory",
      "planner",
      "executor",
      "auditor",
      "lifecycle",
      "compliance",
    ],
    categories: ["Agents", "Governance", "Compliance"],
    status: "Published",
    coverImage: "/images/research/hermes-agents.png",
    excerptMarkdown: `
## Why durable memory changes agent design

Most chatbots forget everything when the session ends. That is fine for FAQs — it is a problem when users expect an assistant to remember project context, prior decisions, and open tasks across days or weeks.

**Hermes-style agent architectures** address this by separating *what happened* from *what the model sees right now*. The goal is memory that is useful, auditable, and revocable.

## The four-role pattern

I organize long-running agents into four responsibilities:

| Role | Job | Example output |
| --- | --- | --- |
| **Planner** | Decompose goals into steps | Task graph with dependencies |
| **Executor** | Call tools, fetch data, draft content | Tool traces, partial results |
| **Committer** | Decide what becomes durable memory | Structured memory entries |
| **Auditor** | Review actions against policy | Allow / deny / escalate |

The critical insight: **only the Committer writes to durable memory**. Executors can be messy; memory must be deliberate.

## Memory layers that work in production

1. **Ephemeral context** — Current turn retrieval and tool outputs. Discarded after the session unless promoted.
2. **Session summaries** — Compressed narrative of what was accomplished. Cheap to inject into future prompts.
3. **Structured facts** — Key-value records: user preferences, matter IDs, approved decisions. Queryable without re-sending full chat logs.
4. **Audit log** — Immutable record of who changed what memory and when. Required for regulated domains.

## Governance without killing UX

Durable memory scares compliance teams for good reason. Mitigations I apply:

- User-visible memory panel (“what the assistant remembers about you”)
- TTL and deletion on request
- Role-based memory scopes (client vs internal analyst views)
- Auditor step for PHI or legally sensitive commits

## Lifecycle management

Memory entries should have states: **proposed → committed → superseded → deleted**. Never overwrite in place without leaving an audit trail. When a user corrects the bot, supersede the old fact rather than pretending the error never happened.

## When this pattern is worth the complexity

Use Planner / Executor / Committer / Auditor when:

- Sessions span multiple days
- Agents call external tools that mutate state
- You need explainability for automated decisions
- Compliance requires knowing *why* the assistant “remembered” something

Skip it for simple RAG Q&A over static documents — the overhead is not justified.

## Takeaway

A chatbot that “never forgets” without governance becomes a liability. Hermes-style designs trade a bit of latency and engineering cost for memory that is **intentional, inspectable, and safe to scale**.
`.trim(),
  },
];

export const researchCategories: ResearchCategory[] = [
  "RAG",
  "Vector Search",
  "AI Economics",
  "Cloud Platforms",
  "Data Platforms",
  "Agents",
  "Governance",
  "Compliance",
  "AI Models",
];

export function getResearchBySlug(slug: string) {
  return researchArticles.find((a) => a.slug === slug);
}

export function getAdjacentResearch(slug: string) {
  const index = researchArticles.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? researchArticles[index - 1] : undefined,
    next:
      index < researchArticles.length - 1
        ? researchArticles[index + 1]
        : undefined,
  };
}
