import { siteConfig } from "./site-config";

export const profile = {
  ...siteConfig,
  biography: [
    `${siteConfig.name} is an AI Systems Engineer in ${siteConfig.location} who builds production systems that automate complex work — from data ingestion and RAG retrieval to agent workflows and cloud deployment.`,
    `He studied Computer Science at ${siteConfig.education.school} (${siteConfig.education.range}), with coursework in data structures, AI/ML, and agentic AI patterns, and writes independent technical studies on retrieval quality and latency.`,
    `At ${siteConfig.company} he originated WeKnowRights and built the production backend of LEGID (legid.ca): automated jurisdiction-aware chat, cited RAG answering, client→lawyer handoff workflows, OCR ingestion, FAISS retrieval, and GCP infrastructure with Docker, Terraform, and CI/CD.`,
    "He writes about vector-search benchmarking and LLM token economics, and focuses on systems that run reliably without manual babysitting — not one-off demos.",
  ],
  story:
    "Computer Science graduate → AI/ML intern → AI System Engineer → builder of automated AI products and technical researcher.",
  focusCards: [
    {
      title: "Automate",
      description:
        "Turn repetitive research, retrieval, and ops work into reliable pipelines, agents, and backend workflows.",
    },
    {
      title: "Research",
      description:
        "Benchmark retrieval, cloud platforms, model economics, and deployment patterns with clear evidence.",
    },
    {
      title: "Deploy",
      description:
        "Move automated systems to cloud infrastructure with secure secrets, monitoring, and reliable operations.",
    },
    {
      title: "Improve",
      description:
        "Evaluate models, control cost, refine RAG quality, and iterate based on measurable outcomes.",
    },
  ],
  assistantSuggestedQuestions: [
    "Recommend a blog post about RAG or vector search",
    "Which blog should I read about automating AI systems?",
    "Show me Achint's vector-search benchmark blog",
    "What did Achint build at Predictive Tech Labs?",
    "Tell me about WeKnowRights and LEGID",
    "What systems has Achint automated in production?",
    "Is Achint available for AI engineering roles?",
  ],
  assistantBlogRecommendations: [
    {
      slug: "benchmarking-vector-search-startup-chatbots",
      title: "Vector Search Benchmarks for Startup Chatbots",
      hook: "Latency, Recall@5, nDCG@5, and cost across 20 configurations.",
    },
    {
      slug: "bounded-agent-workflows",
      title: "Designing Bounded Agent Workflows",
      hook: "Explicit permissions, tool contracts, and recoverable execution.",
    },
    {
      slug: "how-much-does-a-rag-chatbot-cost-2026",
      title: "RAG Chatbot Cost in 2026",
      hook: "Budget tables and vendor checklist for procurement.",
    },
  ],
} as const;
