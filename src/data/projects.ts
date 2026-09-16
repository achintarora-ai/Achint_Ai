export type CapabilityStatus =
  "implemented" | "prototype" | "experimental" | "in-development";

export type Project = {
  id: string;
  slug: string;
  name: string;
  formerly?: string;
  tagline: string;
  description: string;
  website?: string;
  image?: string;
  featured: boolean;
  status: string;
  stack: string[];
  problem: string;
  solution: string[];
  contributions: string[];
  architecture: string[];
  capabilities: { name: string; status: CapabilityStatus }[];
  disclaimer?: string;
};

export const projects: Project[] = [
  {
    id: "civicmatch",
    slug: "civicmatch",
    name: "CivicMatch",
    tagline: "Two towers. Three public-interest catalogs.",
    description:
      "A working recommendation lab for community recreation, climate and energy datasets, and employment and skills datasets. Separate user and item encoders learn a shared retrieval space.",
    featured: true,
    status: "Trained research prototype",
    stack: [
      "Python",
      "NumPy",
      "Two-tower retrieval",
      "Open government data",
      "TypeScript",
    ],
    problem:
      "Public catalogs are rich in information but difficult to explore through a person's interests. Can a compact learned retriever connect preferences with relevant resources?",
    solution: [
      "Ingest Toronto recreation and Government of Canada catalogs.",
      "Train independent user and item towers on explicitly simulated preferences.",
      "Precompute item vectors and run browser-side dot-product retrieval.",
      "Compare held-out retrieval against random, untrained and content baselines.",
    ],
    contributions: [
      "Built three reproducible NumPy training pipelines with seed 42 and 24-dimensional embeddings.",
      "Trained on 420 simulated users per track; kept 90 for validation and 90 for testing.",
      "Measured test Recall@10: recreation 0.632, climate 0.587, skills 0.634.",
      "Published training code, saved weights, numerical gradient tests, data provenance and a browser demo.",
    ],
    architecture: [
      "Public catalog snapshot",
      "Item features",
      "Simulated preference profiles",
      "User tower + item tower",
      "Dot-product training",
      "Saved vectors",
      "Browser retrieval",
    ],
    capabilities: [
      { name: "Three trained retrieval models", status: "implemented" },
      { name: "Interactive inference", status: "implemented" },
      { name: "Real-user effectiveness", status: "experimental" },
    ],
    website:
      "https://github.com/achintarora-ai/Achint_Ai/tree/main/projects/civicmatch",
    disclaimer:
      "These are synthetic-label test results, not observed resident outcomes. The content teacher baseline scores 1.0 because it defines relevance; the trained model does not beat it. No peer review or previously unused dataset claim is made.",
  },
  {
    id: "weknowrights",
    slug: "weknowrights",
    name: "WeKnowRights",
    formerly: "LEGID",
    tagline: "AI-powered legal information and workflow platform",
    description:
      "An AI-powered legal information and workflow platform connecting individuals and legal professionals through research, document, intake, CRM, and collaboration tools.",
    website: "https://legid.ca/",
    image: "/images/projects/weknowrights-logo.png",
    featured: true,
    status: "Production product work",
    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "RAG",
      "Embeddings",
      "LLM APIs",
      "GCP Cloud Run",
      "Secret Manager",
      "IAM",
      "SQL",
      "Object Storage",
    ],
    problem:
      "Legal workflows involve fragmented intake, repetitive documentation, scattered research, and difficult client communication.",
    solution: [
      "Legal-information research",
      "Semantic retrieval",
      "Document generation",
      "Guided client intake",
      "Lawyer portal",
      "Client CRM",
      "Matter tracking",
      "Templates and clause libraries",
      "Multi-document analysis",
      "Workflow automation",
      "Scheduled legal-industry updates",
      "Analytics dashboards",
    ],
    contributions: [
      "Product ideation and workflow design for user and lawyer portals",
      "Data collection and preparation of publicly available Canadian and US legal information",
      "Embeddings, document indexing, semantic retrieval, and RAG pipelines",
      "FastAPI backend services connecting client-facing and lawyer-facing applications",
      "Secure LLM provider integrations for chatbot, document generation, and reasoning",
      "Prompt and agent orchestration for research, communication, and task automation",
      "CRM pipelines, matter tracking, and intake workflows",
      "Document-generation workflows with templates, clause libraries, and validation rules",
      "Multi-document comparison and risk-analysis workflows",
      "Model, retrieval, cost, and output-quality benchmarking",
      "GCP infrastructure including Cloud Run, Secret Manager, IAM, scheduler jobs, storage, and monitoring",
    ],
    architecture: [
      "User Portal / Lawyer Portal",
      "Next.js Frontend",
      "FastAPI API Layer",
      "Authentication and Authorization",
      "Workflow and Agent Orchestrator",
      "LLM Provider Router",
      "RAG and Semantic Retrieval",
      "Document Generation",
      "CRM and Matter Services",
      "SQL / Object Storage / Vector Index",
      "Cloud Run / Secret Manager / IAM / Scheduler / Monitoring",
    ],
    capabilities: [
      { name: "Legal-information research", status: "implemented" },
      { name: "Semantic retrieval / RAG", status: "implemented" },
      { name: "Document generation", status: "implemented" },
      { name: "Client intake", status: "implemented" },
      { name: "Lawyer portal workflows", status: "implemented" },
      { name: "CRM and matter tracking", status: "implemented" },
      { name: "Agentic automation", status: "implemented" },
      { name: "Multi-document analysis", status: "implemented" },
    ],
    disclaimer:
      "This platform provides legal information and workflow support and is not a substitute for advice from a qualified legal professional.",
  },
];

projects.push(
  {
    id: "document-intelligence",
    slug: "multimodal-document-intelligence",
    name: "Document Intelligence",
    tagline: "Making mixed-format documents searchable",
    description:
      "A multimodal ingestion and retrieval pipeline for PDF, DOCX, spreadsheets, and images, developed during the Predictive Tech Labs internship.",
    featured: true,
    status: "Internship project",
    stack: ["Python", "Tesseract OCR", "CLIP", "FAISS", "SentenceTransformers"],
    problem:
      "Useful information is spread across scanned pages, images, and structured files that cannot be handled by text extraction alone.",
    solution: [
      "Extract text and process images through format-specific ingestion.",
      "Create text and image-text embeddings for semantic retrieval.",
      "Index content in FAISS for downstream question answering.",
    ],
    contributions: [
      "Built ingestion pipelines for PDF, DOCX, Excel, and image content.",
      "Integrated Tesseract OCR, CLIP, SentenceTransformers, and OpenAI embeddings.",
      "Connected retrieval to persistent conversation and project memory with cross-user isolation.",
    ],
    architecture: [
      "PDF / DOCX / Excel / Images",
      "Extraction and OCR",
      "Text / Image Embeddings",
      "FAISS Index",
      "Retrieval",
      "Application API",
    ],
    capabilities: [
      { name: "Multiformat ingestion", status: "implemented" },
      { name: "Multimodal retrieval", status: "implemented" },
    ],
    disclaimer:
      "Project scope is drawn from the supplied resume. No public repository or independently reproduced benchmark is linked.",
  },
  {
    id: "document-audit",
    slug: "legal-document-audit",
    name: "Document Audit Pipeline",
    tagline: "Deterministic validation meets semantic review",
    description:
      "A generation and audit pipeline covering six Ontario real-estate document types, combining curated templates, deterministic checks, and LLM review.",
    featured: true,
    status: "Internship project",
    stack: ["Python", "LLM APIs", "pytest", "Document Templates"],
    problem:
      "Repeated drafting and manual validation create bottlenecks in document workflows.",
    solution: [
      "Generate documents from a curated template library.",
      "Run deterministic validation before semantic review.",
      "Keep fast rule checks separate from model-dependent evaluation.",
    ],
    contributions: [
      "Implemented 54+ deterministic checks across six document types.",
      "Added an LLM semantic-review layer.",
      "Resume-reported results: approximately four hours less repetitive drafting per closing workflow and sub-100 ms deterministic audit latency.",
    ],
    architecture: [
      "Structured Intake",
      "Template Library",
      "Document Generation",
      "Deterministic Checks",
      "LLM Semantic Review",
      "Human Review",
    ],
    capabilities: [
      { name: "Template generation", status: "implemented" },
      { name: "Deterministic audit", status: "implemented" },
      { name: "Semantic review", status: "implemented" },
    ],
    disclaimer:
      "Timing and effort figures are reported in the supplied resume, not independently benchmarked here. Audit latency refers only to the deterministic layer, not total model response time.",
  },
  {
    id: "finance-assistant",
    slug: "azure-finance-assistant",
    name: "Azure Finance Assistant",
    tagline: "Cloud-based retrieval over financial documents",
    description:
      "A finance assistant built and deployed during the Predictive Tech Labs internship using Azure-managed ingestion, search, and application services.",
    featured: false,
    status: "Internship project",
    stack: [
      "Azure AI Foundry",
      "Azure AI Search",
      "Blob Storage",
      "App Service",
      "Azure DevOps",
    ],
    problem:
      "Financial documents need a connected ingestion, retrieval, and application workflow.",
    solution: [
      "Connect document storage with managed search.",
      "Deploy the assistant through Azure application services.",
      "Validate ingestion and retrieval before release.",
    ],
    contributions: [
      "Built and deployed the finance assistant.",
      "Validated ingestion, retrieval quality, application behavior, and cloud configuration through Azure DevOps.",
    ],
    architecture: [
      "Blob Storage",
      "Ingestion",
      "Azure AI Search",
      "Azure AI Foundry",
      "App Service",
    ],
    capabilities: [
      { name: "Document retrieval", status: "implemented" },
      { name: "Cloud deployment", status: "implemented" },
    ],
  },
);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
