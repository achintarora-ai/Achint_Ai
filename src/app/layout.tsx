import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { FloatingChat } from "@/components/chat/floating-chat";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

/* Anthropic-like pairing: editorial serif display + clean humanist sans */
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.social.siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.supportingText,
  keywords: [
    "AI System Engineer",
    "AI Engineer",
    "Generative AI Engineer",
    "Machine Learning Engineer",
    "Junior MLOps Engineer",
    "Data Scientist",
    "Python Backend Engineer",
    "RAG",
    "LLM",
    "Automation",
    "AI Agents",
    "Toronto",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.supportingText,
    url: siteConfig.social.siteUrl,
    siteName: `${siteConfig.name} Portfolio`,
    locale: "en_CA",
    type: "website",
    images: [{ url: "/images/achint/banner-green.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.supportingText,
    images: ["/images/achint/banner-green.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.education.school,
  },
  worksFor: {
    "@type": "Organization",
    name: siteConfig.company,
  },
  url: siteConfig.social.siteUrl,
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models",
    "Retrieval Augmented Generation",
    "Machine Learning",
    "MLOps",
    "Google Cloud",
    "Python",
    "FastAPI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="light h-full"
    >
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} flex min-h-full flex-col bg-[var(--background)] antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:p-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
