export async function searchWithTavily(query: string) {
  if (process.env.USE_TAVILY !== "true") {
    return [] as { title: string; url: string; content: string }[];
  }

  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: "basic",
        include_answer: false,
        max_results: 3,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) return [];

    const data = (await response.json()) as {
      results?: { title?: string; url?: string; content?: string }[];
    };

    return (data.results ?? [])
      .filter((r) => r.title && r.url)
      .map((r) => ({
        title: r.title as string,
        url: r.url as string,
        content: (r.content ?? "").slice(0, 500),
      }));
  } catch {
    clearTimeout(timer);
    return [];
  }
}

export function shouldUseWebSearch(query: string, localHitCount: number) {
  const q = query.toLowerCase();
  const explicit =
    q.includes("latest") ||
    q.includes("current") ||
    q.includes("today") ||
    q.includes("news") ||
    q.includes("search the web") ||
    q.includes("online") ||
    q.includes("predictivetechlabs.com");

  return explicit || localHitCount < 2;
}
