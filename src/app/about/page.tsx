import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Achint Pal Singh — AI System Engineer in Toronto, Algoma University Computer Science graduate, and builder of AI products at Predictive Tech Labs.",
};

export default function AboutPage() {
  return <AboutSection />;
}
