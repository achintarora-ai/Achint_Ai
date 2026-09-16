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
  source: "achint";
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
    source: "achint",
    excerptMarkdown: article.excerptMarkdown,
    featured: true,
  };
}

export const blogPosts: BlogPost[] = [
  ...researchArticles.map(fromResearch),
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
    source: "achint",
    excerptMarkdown: `
## The question every stakeholder asks

“How much does a RAG chatbot cost?” is the wrong question if you stop at a single number. In 2026, the honest answer is a **range** driven by retrieval architecture, model routing, traffic shape, and how much human review you require.

I built this breakdown after helping teams scope chatbots from prototype to production. The numbers below are representative for a North American B2B SaaS or internal enterprise assistant — adjust for your region and compliance tier.

## Three budget profiles

### Low — prototype / pilot ($150–$800 / month)

| Component | Typical choice | Monthly note |
| --- | --- | --- |
| Embeddings | Open-source (MiniLM class) | Near-zero infra on a small VM |
| Vector store | FAISS or ChromaDB local | Storage only |
| LLM | Small commercial model, low volume | ~$50–$200 at <5k queries |
| Hosting | Single Cloud Run / VM | ~$30–$100 |
| Ops | Engineer time not included | |

**Good for:** internal demos, 10–50 users, non-regulated data, manual evaluation.

### Medium — production assistant ($2k–$8k / month)

| Component | Typical choice | Monthly note |
| --- | --- | --- |
| Embeddings | Commercial embedding API | Scales with re-index frequency |
| Vector store | Qdrant Cloud or managed search | $200–$1.5k |
| LLM | Routed models (fast + capable) | $800–$4k depending on traffic |
| Hosting | Cloud Run / K8s with autoscale | $200–$800 |
| Observability | Logging, evals, tracing | $100–$500 |

**Good for:** hundreds of daily users, SLA targets, basic audit logging.

### High — regulated / enterprise ($12k–$45k+ / month)

Adds: private networking, VPC endpoints, dedicated support tiers, HIPAA/SOC2 controls, red-team eval cycles, human-in-the-loop review queues, and multi-region failover.

**Good for:** healthcare, legal, financial services, customer-facing products at scale.

## Cost levers you actually control

1. **Chunking and retrieval quality** — Bad retrieval means longer prompts and more regeneration. Fixing retrieval often cuts LLM spend 20–40%.
2. **Model routing** — Route simple FAQs to a small model; reserve frontier models for complex turns.
3. **Prompt caching** — Reuse stable system prompts and document prefixes. Cache hits can dramatically reduce input token bills.
4. **Conversation memory policy** — Unbounded chat history is a silent budget leak. Summarize or truncate with explicit rules.
5. **Batch and async paths** — Indexing, eval runs, and report generation do not need real-time pricing tiers.

## Hidden costs buyers forget

- **Re-indexing** when documents change weekly
- **Evaluation infrastructure** — golden sets, regression tests, human review
- **Security review** cycles for new model providers
- **Customer support** when the bot answers confidently but wrongly

## Five-step vendor checklist

Before signing a RAG vendor or internal build proposal, ask:

1. What is included in “unlimited” retrieval — vector dimensions, query rate, storage?
2. How do you measure **cost per successful answer**, not just tokens?
3. What is the failover plan when the LLM provider has an outage?
4. Can we export embeddings and vectors if we leave?
5. Who owns the eval dataset and regression pipeline?

## Bottom line

A serious RAG chatbot in 2026 is rarely a $99/month SaaS add-on. It is a **system** — retrieval, models, hosting, governance, and evaluation. Start with a low pilot to prove retrieval quality, then scale spend deliberately as traffic and compliance requirements grow.
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
    source: "achint",
    excerptMarkdown: `
## Healthcare RAG is not “chatGPT with PDFs”

Deploying a RAG chatbot in healthcare means PHI can enter the pipeline at ingestion, retrieval, generation, logging, and feedback stages. Most failures I see are not exotic attacks — they are **predictable design mistakes** that turn an helpful assistant into a compliance incident.

This article lists seven high-risk patterns and what to do instead.

## 1. Treating the vector index as non-PHI storage

**Mistake:** Embedding clinical notes or policy PDFs into a shared index without access controls at retrieval time.

**Fix:** Partition indexes by tenant, role, or care setting. Enforce authorization **before** retrieval returns chunks to the LLM. The model should never see documents the user is not allowed to read.

## 2. Logging full prompts and completions in plain text

**Mistake:** Shipping debug logs to a third-party observability tool with unrestricted retention.

**Fix:** Redact or tokenize PHI in logs. Use retention policies aligned with HIPAA minimum necessary principles. Prefer structured audit events (who, when, document IDs) over raw transcript dumps.

## 3. Ignoring BAAs for every subprocessors

**Mistake:** Signing a BAA with your cloud provider but not with the embedding API, LLM vendor, or support ticketing integration.

**Fix:** Maintain a subprocessor register. No new vendor enters the pipeline without legal review — including “just for evals” sandboxes.

## 4. Over-trusting retrieved context

**Mistake:** Assuming retrieved policy text is always current. Clinical pathways change; outdated chunks produce confident wrong answers.

**Fix:** Version documents, surface **effective dates** in citations, and block answers when retrieval confidence is low. A “I cannot find an current policy” response is safer than hallucinated guidance.

## 5. Unbounded conversational memory

**Mistake:** Persisting entire chat histories with PHI indefinitely for “personalization.”

**Fix:** Define memory scopes: session-only, role-based summaries, or explicit user-approved notes. Automate deletion schedules.

## 6. Skipping human-in-the-loop for high-risk intents

**Mistake:** Allowing the bot to interpret symptoms, suggest treatments, or summarize records without clinician review.

**Fix:** Intent routing that escalates clinical decision support to licensed professionals. Display disclaimers that are legally reviewed, not marketing copy.

## 7. No adversarial eval before go-live

**Mistake:** Launching after happy-path QA only.

**Fix:** Run red-team prompts: prompt injection via uploaded files, cross-patient leakage tests, and jailbreak attempts on system prompts. Track regression in CI like any other production service.

## Readiness checklist

Before production in a covered entity environment, confirm:

- [ ] BAAs executed for all AI and infra vendors handling PHI
- [ ] Retrieval enforces user/document authorization
- [ ] Logs minimize PHI and have retention limits
- [ ] Document versioning and stale-content handling documented
- [ ] Escalation paths for clinical and administrative queries defined
- [ ] Eval suite includes leakage and injection tests
- [ ] Incident response playbook includes model vendor contacts

## Closing thought

Healthcare RAG can reduce clinician admin burden — but only when compliance is engineered into retrieval, logging, and routing from day one. The organizations that succeed treat the chatbot as **clinical infrastructure**, not a demo wrapped in a portal.
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
