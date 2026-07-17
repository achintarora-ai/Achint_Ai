/**
 * Central site configuration.
 * VERIFY: contact email, résumé path, social URLs, and availability before publishing.
 */
export const siteConfig = {
  name: "Achint Pal Singh",
  shortName: "Achint",
  title: "AI System Engineer",
  location: "Toronto, Ontario, Canada",
  // VERIFY: replace with personal contact email if preferred
  email: "info@predictivetechlabs.com",
  company: "Predictive Tech Labs",
  education: {
    degree: "Bachelor of Computer Science",
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
  // VERIFY: confirm availability wording before sharing with recruiters
  availability:
    "Open to AI engineering, generative AI, MLOps, and backend-focused opportunities in Toronto or remote.",
  interests: [
    "AI systems engineering",
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
    // VERIFY: update when portfolio is deployed
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://achint-portfolio.vercel.app",
  },
  resumePath: "/resume/achint-pal-singh-resume.pdf",
  weknowrightsUrl: "https://legid.ca/",
  ptlBlog: "https://www.predictivetechlabs.com/blog",
  tagline: "AI System Engineer Building Intelligent, Reliable Systems",
  supportingText:
    "I build AI agents, RAG applications, production LLM workflows, cloud-native backends, machine-learning systems, and data platforms that turn complex problems into useful products.",
  specialties: [
    "AI Systems Engineering",
    "Generative AI and LLMs",
    "RAG and Semantic Search",
    "MLOps and Cloud Infrastructure",
    "Data Science and Analytics",
  ],
  credibility: [
    "AI System Engineer at Predictive Tech Labs",
    "Computer Science graduate from Algoma University",
    "Builder of AI-powered legal and productivity platforms",
    "Author of technical research and benchmarking studies",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
