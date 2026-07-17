const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function callOpenRouter(options: {
  messages: ChatMessage[];
  model?: string;
  fallbackModel?: string;
  maxTokens?: number;
  timeoutMs?: number;
}) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      ok: false as const,
      reason: "missing_key" as const,
      content: null,
    };
  }

  const models = [
    options.model || process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
    options.fallbackModel ||
      process.env.OPENROUTER_FALLBACK_MODEL ||
      "anthropic/claude-3.5-haiku",
  ];

  let lastError = "Unknown model error";

  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(),
      options.timeoutMs ?? 25_000,
    );

    try {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Achint Portfolio Assistant",
        },
        body: JSON.stringify({
          model,
          messages: options.messages,
          max_tokens: options.maxTokens ?? 700,
          temperature: 0.3,
        }),
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        lastError = `Model ${model} failed with status ${response.status}`;
        continue;
      }

      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) {
        lastError = `Model ${model} returned empty content`;
        continue;
      }

      return { ok: true as const, content, model };
    } catch (error) {
      clearTimeout(timer);
      lastError =
        error instanceof Error ? error.message : "Request failed or timed out";
    }
  }

  return { ok: false as const, reason: "upstream" as const, content: lastError };
}
