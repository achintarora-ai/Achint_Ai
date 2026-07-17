import { siteConfig } from "./site-config";

export const profile = {
  ...siteConfig,
  biography: [
    `${siteConfig.name} is an AI System Engineer based in ${siteConfig.location}, focused on building practical AI applications, RAG systems, intelligent agents, cloud-native backends, and production machine-learning workflows.`,
    `He studied Computer Science at ${siteConfig.education.school} from ${siteConfig.education.range}, building foundations in Python, SQL, machine learning, deep learning, probability, data analytics, web development, and software engineering.`,
    `He joined ${siteConfig.company} as an AI/ML Intern from ${siteConfig.internship.range} and returned in July 2026 as a full-time AI System Engineer. His work spans AI engineering, backend architecture, cloud infrastructure, RAG, data systems, and applied research.`,
    "He is especially interested in building production systems rather than isolated demonstrations—turning research and prototypes into products people can actually use.",
  ],
  story:
    "Computer Science graduate → AI/ML intern → AI System Engineer → product builder and technical researcher.",
  focusCards: [
    {
      title: "Build",
      description:
        "Design and ship AI-powered products, backends, and workflows that solve real user problems.",
    },
    {
      title: "Research",
      description:
        "Benchmark retrieval, cloud platforms, model economics, and deployment patterns with clear evidence.",
    },
    {
      title: "Deploy",
      description:
        "Move systems to cloud infrastructure with secure secrets, monitoring, and reliable operations.",
    },
    {
      title: "Improve",
      description:
        "Evaluate models, control cost, refine RAG quality, and iterate based on measurable outcomes.",
    },
  ],
  assistantSuggestedQuestions: [
    "What did Achint build at Predictive Tech Labs?",
    "Tell me about WeKnowRights.",
    "What is Achint’s experience with RAG?",
    "Which cloud platforms has Achint worked with?",
    "What machine-learning skills does Achint have?",
    "Show me Achint’s vector-search research.",
    "Is Achint available for AI engineering opportunities?",
    "What technologies does Achint use for backend development?",
  ],
} as const;
