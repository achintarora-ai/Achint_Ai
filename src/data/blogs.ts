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
    slug: "claude-fable-5-launch",
    title: "Claude Fable 5 & Mythos 5: Anthropic Splits the Frontier Into Two Products",
    author: "Achint Pal Singh",
    date: "2026-06-09",
    readingTimeMinutes: 16,
    summary:
      "One frontier model, two products. Benchmark matrix, safety-routing split, pricing, and a practical guide for when to use Fable 5 over Opus 4.8.",
    tags: ["Claude Fable 5", "Anthropic", "Benchmarks", "AI Models"],
    coverImage: "/images/blog/claude-fable-5-poster.png",
    source: "achint",
    excerptMarkdown: `
## Why Anthropic split the frontier

When Anthropic launched **Claude Fable 5** and **Mythos 5**, they made something clear: frontier capability is no longer a single product decision. Teams building chat assistants, research tools, and agent pipelines need to choose between models optimized for different trade-offs — latency, safety routing, reasoning depth, and cost.

I wrote this guide after evaluating both models in the kind of workloads I run daily: RAG-backed assistants, multi-step agent orchestration, and document-heavy legal research pipelines.

## Fable 5 vs Mythos 5 at a glance

| Dimension | Claude Fable 5 | Mythos 5 |
| --- | --- | --- |
| Primary use | Interactive chat, fast iteration | Deep reasoning, long-context analysis |
| Latency profile | Lower for typical prompts | Higher, but stronger on complex chains |
| Safety routing | Aggressive pre-filtering | Balanced for research workflows |
| Best fit | User-facing assistants | Analyst copilots, audit trails |

Neither model replaces the other. Fable 5 is what you put in front of users who expect snappy responses. Mythos 5 is what you reach for when the task requires sustained reasoning across large document sets.

## Benchmark themes that actually matter

Marketing benchmark tables are easy to skim and hard to act on. In production, I look at four clusters:

1. **Instruction following under tool use** — Does the model reliably call the right function when RAG context is ambiguous?
2. **Citation fidelity** — When grounding answers in retrieved chunks, does it invent sources?
3. **Long-context coherence** — At 50k+ tokens of mixed PDF and chat history, does reasoning degrade?
4. **Cost per successful task** — Not cost per token, but cost to complete a workflow end-to-end.

In my tests, Fable 5 consistently won on time-to-first-token and short-turn chat quality. Mythos 5 pulled ahead on multi-hop reasoning — especially when comparing clauses across several uploaded contracts.

## Safety routing is a product feature now

Anthropic’s safety routing is not just a compliance checkbox. It changes UX:

- Fable 5 declines or reframes certain prompts earlier in the pipeline. That reduces downstream hallucination risk in customer-facing bots, but can frustrate power users running legitimate research queries.
- Mythos 5 allows more exploratory reasoning before guardrails engage. That helps internal analyst tools, but demands stronger logging and human review on outputs.

If you are building a **healthcare** or **legal** assistant, treat safety routing as part of your architecture diagram — not an afterthought.

## When to pick Fable 5 over Opus 4.8

Opus 4.8 remains the heavy-duty option for tasks that need maximum capability regardless of cost. Choose **Fable 5** when:

- Users expect sub-second perceived latency on most turns
- Your RAG pipeline already constrains context to high-quality chunks
- You need predictable spend on high-volume chat traffic
- Safety pre-filtering aligns with your compliance posture

Stick with **Opus 4.8** when:

- Agents must plan across 8+ tool calls without losing thread
- You are synthesizing across entire document corpora in one session
- Output quality matters more than per-request cost

## Practical deployment pattern

Here is the routing pattern I recommend for production systems:

\`\`\`
User query
  → Intent classifier (cheap model)
  → Route: Fable 5 (chat) | Mythos 5 (analysis) | Opus 4.8 (critical)
  → RAG retrieval layer
  → Response + audit log
\`\`\`

Start with Fable 5 as the default. Promote to Mythos 5 when the classifier detects comparison, summarization across files, or explicit “analyze deeply” intent. Reserve Opus 4.8 for flagged high-stakes workflows.

## Takeaway

Model selection in 2026 is product design. Fable 5 and Mythos 5 give teams a sensible split between **speed** and **depth**. Map each model to a user journey, measure cost per completed task, and document your routing rules — that is how you ship AI systems that feel fast, trustworthy, and governable.
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
