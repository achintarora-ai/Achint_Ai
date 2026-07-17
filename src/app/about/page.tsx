import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Achint Pal Singh — AI System Engineer in Toronto who builds automated AI systems, agents, and production RAG pipelines.",
};

export default function AboutPage() {
  return <AboutSection />;
}
