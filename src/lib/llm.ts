export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type LlmResult =
  | { ok: true; content: string; model: string; provider: string }
  | { ok: false; reason: "missing_key" | "upstream"; content: string | null };

async function callOpenAI(
  messages: ChatMessage[],
  maxTokens: number,
  timeoutMs: number,
): Promise<LlmResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "missing_key", content: null };
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature: 0.3,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      return {
        ok: false,
        reason: "upstream",
        content: `OpenAI status ${response.status}`,
      };
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return { ok: false, reason: "upstream", content: "Empty OpenAI response" };
    }
    return { ok: true, content, model, provider: "openai" };
  } catch (error) {
    clearTimeout(timer);
    return {
      ok: false,
      reason: "upstream",
      content: error instanceof Error ? error.message : "OpenAI request failed",
    };
  }
}

async function callAnthropic(
  messages: ChatMessage[],
  maxTokens: number,
  timeoutMs: number,
): Promise<LlmResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "missing_key", content: null };
  }

  const model =
    process.env.ANTHROPIC_CHAT_MODEL || "claude-sonnet-4-20250514";
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");
  const anthropicMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role, content: m.content }));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system: system || undefined,
        messages: anthropicMessages,
        temperature: 0.3,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      return {
        ok: false,
        reason: "upstream",
        content: `Anthropic status ${response.status}`,
      };
    }

    const data = (await response.json()) as {
      content?: { type?: string; text?: string }[];
    };
    const content = data.content
      ?.filter((part) => part.type === "text")
      .map((part) => part.text ?? "")
      .join("\n")
      .trim();

    if (!content) {
      return {
        ok: false,
        reason: "upstream",
        content: "Empty Anthropic response",
      };
    }
    return { ok: true, content, model, provider: "anthropic" };
  } catch (error) {
    clearTimeout(timer);
    return {
      ok: false,
      reason: "upstream",
      content:
        error instanceof Error ? error.message : "Anthropic request failed",
    };
  }
}

async function callOpenRouter(
  messages: ChatMessage[],
  maxTokens: number,
  timeoutMs: number,
): Promise<LlmResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "missing_key", content: null };
  }

  const models = [
    process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
    process.env.OPENROUTER_FALLBACK_MODEL || "anthropic/claude-3.5-haiku",
  ];

  let lastError = "OpenRouter unavailable";

  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
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
            messages,
            max_tokens: maxTokens,
            temperature: 0.3,
          }),
          signal: controller.signal,
        },
      );
      clearTimeout(timer);

      if (!response.ok) {
        lastError = `OpenRouter ${model} status ${response.status}`;
        continue;
      }

      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) {
        lastError = `OpenRouter ${model} empty`;
        continue;
      }
      return { ok: true, content, model, provider: "openrouter" };
    } catch (error) {
      clearTimeout(timer);
      lastError =
        error instanceof Error ? error.message : "OpenRouter request failed";
    }
  }

  return { ok: false, reason: "upstream", content: lastError };
}

export async function callPortfolioLlm(options: {
  messages: ChatMessage[];
  maxTokens?: number;
  timeoutMs?: number;
}): Promise<LlmResult> {
  const maxTokens = options.maxTokens ?? 700;
  const timeoutMs = options.timeoutMs ?? 25_000;
  const provider = (process.env.LLM_PROVIDER || "auto").toLowerCase();

  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);
  const hasOpenRouter = Boolean(process.env.OPENROUTER_API_KEY);

  if (!hasOpenAI && !hasAnthropic && !hasOpenRouter) {
    return { ok: false, reason: "missing_key", content: null };
  }

  const order =
    provider === "openai"
      ? (["openai", "anthropic", "openrouter"] as const)
      : provider === "anthropic"
        ? (["anthropic", "openai", "openrouter"] as const)
        : provider === "openrouter"
          ? (["openrouter", "openai", "anthropic"] as const)
          : (["openai", "anthropic", "openrouter"] as const);

  let last: LlmResult = { ok: false, reason: "missing_key", content: null };

  for (const name of order) {
    if (name === "openai" && !hasOpenAI) continue;
    if (name === "anthropic" && !hasAnthropic) continue;
    if (name === "openrouter" && !hasOpenRouter) continue;

    const result =
      name === "openai"
        ? await callOpenAI(options.messages, maxTokens, timeoutMs)
        : name === "anthropic"
          ? await callAnthropic(options.messages, maxTokens, timeoutMs)
          : await callOpenRouter(options.messages, maxTokens, timeoutMs);

    if (result.ok) return result;
    last = result;
  }

  return last;
}
