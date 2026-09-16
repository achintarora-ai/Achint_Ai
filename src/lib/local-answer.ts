import { retrievePortfolioContext, type KnowledgeChunk } from "./retrieval";
export function referenceReply(question: string, chunks?: KnowledgeChunk[]) {
  const found = chunks || retrievePortfolioContext(question);
  const handbook = found.filter((x) => x.source === "handbook");
  const selected =
    handbook.length &&
    /handbook|explain|what is|learning|regression|classification|data science/i.test(
      question,
    )
      ? handbook
      : found.slice(0, 3);
  const reply =
    "Here’s what I found in the portfolio references:\n\n" +
    selected
      .slice(0, 3)
      .map((c) => `**${c.title}**\n${c.text.slice(0, 750)}`)
      .join("\n\n");
  return {
    reply,
    sources: selected
      .filter((x) => x.url)
      .map((x) => ({ title: x.title, url: x.url! })),
    mode: "reference",
  };
}
