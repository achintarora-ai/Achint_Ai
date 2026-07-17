import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { callPortfolioLlm } from "@/lib/llm";
import { rateLimit } from "@/lib/rate-limit";
import {
  formatContextForPrompt,
  retrievePortfolioContext,
} from "@/lib/retrieval";
import { searchWithTavily, shouldUseWebSearch } from "@/lib/tavily";
import { siteConfig } from "@/data/site-config";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .max(12)
    .optional(),
});

const SYSTEM_PROMPT = `You are Ask Achint AI, the portfolio assistant for Achint Pal Singh (AI Engineer, Toronto).

Answer using the supplied portfolio context first. Be accurate, concise, and recruiter-friendly.
When relevant, recommend Achint's blog posts at /blogs/[slug] — especially vector search, RAG cost, Claude Fable 5, and healthcare compliance posts.
Never invent employment, education, skills, metrics, certifications, or project functionality.
Clearly distinguish professional experience, academic study, research, prototypes, and technologies explored.
When information is unavailable, say so.
Do not provide legal advice. WeKnowRights is a legal-information and workflow platform, not a law firm.
Direct users to relevant blogs, projects, research pages, résumé, GitHub, LinkedIn, email, or /contact when useful.

Email: ${siteConfig.email}
GitHub: ${siteConfig.social.github}
LinkedIn: ${siteConfig.social.linkedin}
Blogs: /blogs
Contact: /contact
Résumé: /resume
PDF: ${siteConfig.resumePath}
DOCX: ${siteConfig.resumeDocxPath}`;

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function localFallbackAnswer(message: string, context: string) {
  const lower = message.toLowerCase();
  if (lower.includes("weknowrights") || lower.includes("legid")) {
    return "WeKnowRights (formerly LEGID) is an AI-powered legal information and workflow platform. Achint contributed across RAG, FastAPI backends, LLM integrations, CRM/intake workflows, and GCP deployment. It provides legal information and workflow support—not legal advice. See /projects/weknowrights.";
  }
  if (lower.includes("rag") || lower.includes("vector")) {
    return "Achint has hands-on RAG experience through WeKnowRights and published vector-search benchmarking research covering embeddings, FAISS, Qdrant, ChromaDB, Azure AI Search, latency, recall, and cost. Start with /research/benchmarking-vector-search-startup-chatbots.";
  }
  if (
    lower.includes("available") ||
    lower.includes("hire") ||
    lower.includes("opportunit")
  ) {
    return `${siteConfig.availability} Reach him via /contact, LinkedIn, or GitHub.`;
  }
  return `Live model keys are temporarily unavailable, so here is portfolio-grounded context:\n\n${context.slice(0, 1200)}`;
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(`chat:${clientKey(request)}`, 12, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid message. Keep questions under 1000 characters." },
      { status: 400 },
    );
  }

  const { message, history = [] } = parsed.data;
  const chunks = retrievePortfolioContext(message, 6);
  const localContext = formatContextForPrompt(chunks);
  const sources = chunks
    .filter((c) => c.url)
    .map((c) => ({ title: c.title, url: c.url as string }));

  let webContext = "";
  const webSources: { title: string; url: string }[] = [];

  if (shouldUseWebSearch(message, chunks.length)) {
    const web = await searchWithTavily(message);
    if (web.length) {
      webContext = web
        .map((r, i) => `[Web ${i + 1}] ${r.title}\n${r.content}\n${r.url}`)
        .join("\n\n");
      webSources.push(...web.map((r) => ({ title: r.title, url: r.url })));
    }
  }

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    {
      role: "system" as const,
      content: `Portfolio context:\n${localContext}${
        webContext ? `\n\nOptional web context:\n${webContext}` : ""
      }`,
    },
    ...history.slice(-8).map((h) => ({
      role: h.role,
      content: h.content,
    })),
    { role: "user" as const, content: message },
  ];

  const result = await callPortfolioLlm({ messages, maxTokens: 750 });

  if (!result.ok) {
    if (result.reason === "missing_key") {
      return NextResponse.json({
        reply: localFallbackAnswer(message, localContext),
        sources: [...sources, ...webSources],
        mode: "local-fallback",
      });
    }

    return NextResponse.json({
      reply:
        "The language model is temporarily unavailable. Based on portfolio knowledge: " +
        localFallbackAnswer(message, localContext),
      sources,
      mode: "degraded",
    });
  }

  return NextResponse.json({
    reply: result.content,
    sources: [...sources, ...webSources],
    mode: "live",
    model: result.model,
    provider: result.provider,
  });
}
