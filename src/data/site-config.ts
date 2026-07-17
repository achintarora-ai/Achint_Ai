/**
 * Central site configuration — values aligned to Achint's résumé (DOCX).
 * VERIFY before publishing: phone visibility preference, availability wording.
 */
export const siteConfig = {
  name: "Achint Pal Singh",
  shortName: "Achint",
  title: "AI Engineer",
  location: "Toronto, Ontario, Canada",
  email: "achintpalsingh94@gmail.com",
  phone: "365-440-4319",
  company: "Predictive Tech Labs",
  education: {
    degree: "Bachelor's degree, Computer Science",
    school: "Algoma University",
    start: "September 2023",
    end: "May 2026",
    range: "September 2023 – May 2026",
  },
  internship: {
    role: "AI/ML Intern",
    company: "Predictive Tech Labs",
    start: "November 2025",
    end: "April 2026",
    range: "November 2025 – April 2026",
  },
  fullTime: {
    role: "AI System Engineer",
    company: "Predictive Tech Labs",
    start: "July 2026",
    end: "Present",
    range: "July 2026 – Present",
  },
  // Résumé lists continuous AI Engineer role Nov 2025 – Present at PredictiveTechLabs
  resumeRoleSummary: "AI Engineer — Predictive Tech Labs · Nov 2025 – Present",
  availability:
    "Open to AI engineering, generative AI, MLOps, and backend-focused opportunities in Toronto or remote.",
  interests: [
    "AI systems engineering",
    "automation and agent orchestration",
    "RAG and semantic search",
    "LLM workflows and agents",
    "Cloud-native backends",
    "MLOps and applied research",
  ],
  social: {
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL ||
      "https://github.com/achintarora-ai",
    githubRepo: "https://github.com/achintarora-ai/Achint_Ai",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://www.linkedin.com/in/achint-pal-singh-1a0114288/",
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://achintarora-ai.github.io/Achint_Ai",
  },
  resumePath: "/resume/achint-pal-singh-resume.pdf",
  resumeDocxPath: "/resume/achint-pal-singh-resume.docx",
  weknowrightsUrl: "https://legid.ca/",
  ptlBlog: "https://www.predictivetechlabs.com/blog",
  tagline: "Achint Pal Singh · AI Engineer",
  linkedinHeadline:
    "AI Engineer | Automating the small things that reduce human effort | Agents · RAG · AWS · GCP · Azure · Databricks",
  supportingText:
    "As an AI engineer, I admire automating single things that reduce human effort — from LEGID legal AI backends and agent workflows to vector-search research and cloud-native MLOps.",
  specialties: [
    "AI Systems Engineering",
    "Workflow & Agent Automation",
    "Generative AI and LLMs",
    "RAG and Semantic Search",
    "MLOps and Cloud Infrastructure",
  ],
  credibility: [
    "AI System Engineer who automates production AI pipelines",
    "B.Sc. Computer Science, Algoma University (Sep 2023 – May 2026)",
    "Builder of LEGID / WeKnowRights legal AI systems",
    "Author of vector-search and LLM token-economics research",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
