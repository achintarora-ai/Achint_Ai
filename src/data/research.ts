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
  externalUrl?: string;
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
    externalUrl:
      "https://www.predictivetechlabs.com/blog/claude-opus-4-8-token-economics",
    excerptMarkdown: `
## Why token economics matters

Every prompt, uploaded file, and model response is measured in tokens. Understanding that cost model is essential for building sustainable AI products.

## Pricing reality (Claude Opus class models)

- Input tokens set the baseline request cost
- Output tokens are typically much more expensive than input
- Prompt cache reads can reduce repeated prefix cost dramatically
- Batch APIs can cut spend for asynchronous workloads

## Themes covered

1. How tokens are counted and why content type changes density
2. Input versus output pricing asymmetry (the 5:1 mental model)
3. Prompt caching as a major cost lever
4. Batch APIs for asynchronous workloads
5. Conversation-history growth as a silent budget risk
6. Model routing: using the right model for the job
7. Practical checklists for cost-aware AI systems

## Takeaway for engineers

Treat cost controls as part of system design—caching, truncation policies, batching, and model selection are product decisions, not afterthoughts.

For the full published article, use the external Predictive Tech Labs link.
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
    externalUrl: "https://www.predictivetechlabs.com/blog/hermes-agents-memory",
    excerptMarkdown: `
## Focus

This article discusses agent architectures that combine planning, execution, commitment, and auditing with durable memory so assistants can retain useful context without becoming ungoverned.

## Topics

- Durable memory design for long-running assistants
- Planner / Executor / Committer / Auditor patterns
- Lifecycle management for agent actions
- Compliance and governance considerations

## Portfolio note

Read the full write-up on the Predictive Tech Labs blog. This portfolio page provides a summary and navigation aid for recruiters and collaborators.
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

export const externalResearchLinks = [
  {
    title: "Claude Opus Token Economics",
    url: "https://www.predictivetechlabs.com/blog/claude-opus-4-8-token-economics",
  },
  {
    title: "Hermes Agents and Memory",
    url: "https://www.predictivetechlabs.com/blog/hermes-agents-memory",
  },
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
