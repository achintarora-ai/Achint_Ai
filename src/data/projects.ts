export type CapabilityStatus =
  | "implemented"
  | "prototype"
  | "experimental"
  | "in-development";

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
  {
    id: "1ai",
    slug: "1ai",
    name: "1AI",
    tagline: "AI assistant and agent platform for productivity",
    description:
      "An AI assistant designed to help users manage daily commitments, research, communication, scheduling, content, and productivity through connected tools and specialized agents.",
    featured: true,
    status: "Prototype / in development",
    stack: [
      "Python",
      "LLM Agents",
      "RAG",
      "API Integrations",
      "Workflow Orchestration",
    ],
    problem:
      "Personal and professional productivity tools are fragmented across email, calendar, research, and content workflows.",
    solution: [
      "Unified AI assistant experience",
      "Specialized agents for research and productivity",
      "Connected tool workflows",
      "Knowledge assistance with RAG",
    ],
    contributions: [
      "Product concept and agent workflow design",
      "Exploration of multi-agent orchestration patterns",
      "RAG-based knowledge assistance prototypes",
      "Integration patterns for communication and scheduling tools",
    ],
    architecture: [
      "User Interface",
      "Assistant Orchestrator",
      "Specialized Agents",
      "Tool Connectors",
      "RAG Knowledge Layer",
      "LLM Provider Router",
    ],
    capabilities: [
      { name: "Gmail workflows", status: "in-development" },
      { name: "Calendar workflows", status: "in-development" },
      { name: "Web research", status: "prototype" },
      { name: "Daily digest", status: "prototype" },
      { name: "Task prioritization", status: "prototype" },
      { name: "Social-content support", status: "experimental" },
      { name: "RAG-based knowledge assistance", status: "prototype" },
      { name: "Multi-agent workflows", status: "experimental" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
