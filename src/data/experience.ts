export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  range: string;
  type: "full-time" | "internship" | "freelance" | "part-time";
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "ptl-engineer",
    company: "Predictive Tech Labs",
    role: "AI Systems Engineer",
    location: "Toronto, Ontario, Canada",
    start: "July 2026",
    end: "Present",
    range: "July 2026 – Present",
    type: "full-time",
    summary:
      "Designs and implements production AI capabilities, backends, RAG pipelines, and cloud deployments for AI-powered legal-information and productivity platforms.",
    highlights: [
      "Led the design and implementation of core AI capabilities for WeKnowRights, formerly LEGID, an AI-powered legal workspace.",
      "Built backend services supporting legal research, document generation, client intake, lawyer-client workflows, CRM functions, analytics, and scheduled legal updates.",
      "Curated and processed publicly available Canadian and United States legal information for retrieval and document workflows.",
      "Developed document indexing, embedding, semantic retrieval, and RAG pipelines.",
      "Integrated multiple LLM providers through secure backend APIs for chatbot, document-generation, reasoning, and model-evaluation use cases.",
      "Built Python and FastAPI services connecting user-facing and lawyer-facing applications.",
      "Designed legal templates, clause libraries, workflow rules, and document validation processes.",
      "Implemented multi-document comparison and risk-analysis workflows.",
      "Built agentic workflows for research, communication, email actions, document creation, and task automation.",
      "Deployed cloud services using Google Cloud Run, Secret Manager, IAM roles, service accounts, scheduled jobs, storage, monitoring, and related infrastructure.",
      "Conducted model, retrieval, cost, and output-quality benchmarking.",
      "Contributed technical research and implementation guides for Predictive Tech Labs.",
    ],
  },
  {
    id: "ptl-intern",
    company: "Predictive Tech Labs",
    role: "AI Engineer Intern",
    location: "Toronto, Ontario, Canada",
    start: "November 2025",
    end: "April 2026",
    range: "November 2025 – April 2026",
    type: "internship",
    summary:
      "Built practical machine-learning and AI prototypes while developing foundations in cloud infrastructure, APIs, deployment, and collaborative engineering.",
    highlights: [
      "Worked with Python, SQL, NumPy, Pandas, scikit-learn, data analysis, feature preparation, model experimentation, and evaluation.",
      "Studied and applied supervised learning, unsupervised learning, model selection, preprocessing, pipelines, persistence, and inference.",
      "Built multimodal document-intelligence pipelines using Tesseract OCR, CLIP, SentenceTransformers, and FAISS.",
      "Created a generation and audit pipeline for six document types with 54+ deterministic checks and an LLM review layer.",
      "Built and deployed a finance assistant using Azure AI Foundry, AI Search, Blob Storage, and App Service.",
      "Learned cloud infrastructure, Git workflows, APIs, deployment, and collaborative engineering practices.",
      "Explored neural networks, TensorFlow, PyTorch, Keras, LLMs, RAG, and AI-assisted development.",
      "Contributed to research, experimentation, and internal product work.",
    ],
  },
  {
    id: "freelance",
    company: "Independent",
    role: "Full-Stack Developer & Data Analytics Consultant",
    location: "Toronto / Remote",
    start: "August 2023",
    end: "Present",
    range: "August 2023 – Present",
    type: "freelance",
    summary:
      "Deliver software, RAG chatbots, and analytics solutions for small businesses from requirements through deployment.",
    highlights: [
      "Build web applications and chatbots that automate customer inquiries.",
      "Develop reporting and data workflows with Python, SQL, Power BI, and Tableau.",
      "Own requirements, architecture, implementation, testing, and stakeholder communication.",
    ],
  },
  {
    id: "sudan-movers",
    company: "Sudan Movers",
    role: "Dispatcher & AI Solutions Contributor",
    location: "Canada",
    start: "During studies",
    end: "",
    range: "Part-time during studies",
    type: "part-time",
    summary:
      "Combined dispatch operations with AI-assisted contract processing and operational analytics.",
    highlights: [
      "Built a workflow to organize operational data and produce coordination briefs.",
      "Used Python and Power BI for reporting, data-quality workflows, and fraud-detection experimentation.",
    ],
  },
];
