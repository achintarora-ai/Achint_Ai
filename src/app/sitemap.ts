import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.social.siteUrl;
  const staticRoutes = [
    "",
    "/skills",
    "/experience",
    "/projects",
    "/blogs",
    "/assistant",
    "/resume",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${base}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
