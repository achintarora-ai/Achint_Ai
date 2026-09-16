import { blogPosts } from "@/data/blogs";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cloudProviders, skillGroups } from "@/data/skills";
import { siteConfig } from "@/data/site-config";
import { retrieveHandbook } from "./handbook";

export type KnowledgeChunk = {
  id: string;
  source: string;
  title: string;
  text: string;
  weight: number;
  url?: string;
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#./-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCorpus(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push({
    id: "profile-bio",
    source: "profile",
    title: "Biography",
    text: [...profile.biography, profile.story, siteConfig.availability].join(
      " ",
    ),
    weight: 1.4,
    url: "/about",
  });

  for (const school of education) {
    chunks.push({
      id: `education-${school.id}`,
      source: "education",
      title: `${school.degree} — ${school.school}`,
      text: `${school.school} ${school.degree} ${school.range} ${school.description} ${(school.activities ?? []).join(" ")} ${(school.skills ?? []).join(" ")} ${school.grade ?? ""}`,
      weight: 1.3,
      url: "/about",
    });
  }

  for (const job of experience) {
    chunks.push({
      id: `experience-${job.id}`,
      source: "experience",
      title: `${job.role} at ${job.company}`,
      text: `${job.role} ${job.company} ${job.range} ${job.summary} ${job.highlights.join(" ")}`,
      weight: 1.5,
      url: "/experience",
    });
  }

  for (const project of projects) {
    chunks.push({
      id: `project-${project.id}`,
      source: "projects",
      title: project.name,
      text: [
        project.name,
        project.formerly ?? "",
        project.description,
        project.problem,
        project.solution.join(" "),
        project.contributions.join(" "),
        project.stack.join(" "),
        project.disclaimer ?? "",
      ].join(" "),
      weight: 1.6,
      url: `/projects/${project.slug}`,
    });
  }

  for (const group of skillGroups) {
    chunks.push({
      id: `skills-${group.id}`,
      source: "skills",
      title: group.title,
      text: `${group.title} ${group.description} ${group.items.join(" ")}`,
      weight: 1.2,
      url: "/skills",
    });
  }

  for (const cloud of cloudProviders) {
    chunks.push({
      id: `cloud-${cloud.id}`,
      source: "skills",
      title: `${cloud.name} cloud skills`,
      text: `${cloud.name} ${cloud.knowledgeLevel} ${cloud.groups
        .flatMap((g) => [g.title, ...g.items])
        .join(" ")}`,
      weight: 1.3,
      url: "/skills#cloud",
    });
  }

  for (const article of blogPosts) {
    chunks.push({
      id: `blog-${article.slug}`,
      source: "blogs",
      title: article.title,
      text: `${article.title} ${article.summary} ${article.tags.join(" ")} ${article.excerptMarkdown}`,
      weight: 1.4,
      url: `/blogs/${article.slug}`,
    });
  }

  chunks.push({
    id: "contact-availability",
    source: "contact",
    title: "Contact and availability",
    text: `${siteConfig.name} ${siteConfig.email} ${siteConfig.location} ${siteConfig.availability} ${siteConfig.interests.join(" ")} LinkedIn GitHub résumé`,
    weight: 1.1,
    url: "/contact",
  });

  return chunks;
}

const CORPUS = buildCorpus();

const BOOST_TERMS: Record<string, string[]> = {
  weknowrights: ["weknowrights", "legid", "legal"],
  rag: ["rag", "retrieval", "embedding", "vector", "semantic"],
  cloud: ["cloud", "gcp", "azure", "aws", "vertex", "databricks"],
  ml: ["machine learning", "scikit", "supervised", "model"],
  research: ["research", "benchmark", "token", "fabric"],
};

export function retrievePortfolioContext(query: string, limit = 6) {
  const handbookRelevant =
    /handbook|data science|explain|what is|regression|classification|clustering|numpy|pandas|statistics|overfit|gradient|neural|learning|train.test|probability/i.test(
      query,
    );
  const handbook = handbookRelevant
    ? retrieveHandbook(query, /handbook/i.test(query) ? 4 : 2)
    : [];
  const normalizedQuery = normalize(query);
  const terms = normalizedQuery.split(" ").filter((t) => t.length > 2);

  const scored = CORPUS.map((chunk) => {
    const hay = normalize(`${chunk.title} ${chunk.text}`);
    let score = 0;

    for (const term of terms) {
      if (hay.includes(term)) score += 2 * chunk.weight;
      if (chunk.title.toLowerCase().includes(term)) score += 3 * chunk.weight;
    }

    for (const group of Object.values(BOOST_TERMS)) {
      if (group.some((g) => normalizedQuery.includes(g))) {
        if (group.some((g) => hay.includes(g))) score += 2;
      }
    }

    if (normalizedQuery.includes("available") && chunk.id.includes("contact")) {
      score += 5;
    }

    return { chunk, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length === 0) {
    if (handbook.length) return handbook;
    return CORPUS.filter((c) =>
      [
        "profile-bio",
        "experience-ptl-engineer",
        "project-weknowrights",
      ].includes(c.id),
    );
  }

  const portfolio = scored.map((s) => s.chunk);
  return /handbook/i.test(query)
    ? [...handbook, ...portfolio].slice(0, limit)
    : [...portfolio.slice(0, limit - handbook.length), ...handbook];
}

export function formatContextForPrompt(chunks: KnowledgeChunk[]) {
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] (${c.source}) ${c.title}\n${c.text.slice(0, 1200)}${
          c.url ? `\nLink: ${c.url}` : ""
        }`,
    )
    .join("\n\n");
}
