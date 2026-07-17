/** Chart data derived from Achint's research summaries (not invented business KPIs). */

export const vectorSearchLatency = [
  { name: "ST + FAISS", latency: 0.027, recall: 100, cost: 0 },
  { name: "ST + Chroma", latency: 1.2, recall: 98, cost: 0 },
  { name: "ST + Qdrant", latency: 2.1, recall: 97, cost: 0 },
  { name: "OpenAI-L + FAISS", latency: 3.4, recall: 99, cost: 1.3 },
  { name: "ST + Azure Search", latency: 18, recall: 96, cost: 45 },
];

export const tokenEconomics = [
  { lever: "Base input", relativeCost: 100 },
  { lever: "Prompt cache read", relativeCost: 10 },
  { lever: "Batch input", relativeCost: 50 },
  { lever: "Output tokens", relativeCost: 500 },
];

export const fabricDatabricksStatus = [
  { dimension: "AI/ML Lab", fabric: 62, databricks: 88 },
  { dimension: "GenAI/RAG", fabric: 58, databricks: 86 },
  { dimension: "Data types", fabric: 74, databricks: 90 },
  { dimension: "Query editor", fabric: 70, databricks: 84 },
  { dimension: "Cloud perf.", fabric: 0, databricks: 0 },
];

export const cloudServiceCounts = [
  { provider: "GCP", categories: 5, focus: "Production deploy" },
  { provider: "Azure", categories: 4, focus: "Working knowledge" },
  { provider: "AWS", categories: 1, focus: "Foundational" },
];
