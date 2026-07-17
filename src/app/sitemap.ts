import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { researchArticles } from "@/data/research";
import { siteConfig } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.social.siteUrl;
  const staticRoutes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/research",
    "/skills",
    "/assistant",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const researchRoutes = researchArticles.map((article) => ({
    url: `${base}/research/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...researchRoutes];
}
