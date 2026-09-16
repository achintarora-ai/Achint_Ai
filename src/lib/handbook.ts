import index from "@/data/handbook-index.json";

function bucket(token: string) {
  let hash = 2166136261;
  for (const character of token)
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return String(hash % 2048);
}
export function retrieveHandbook(query: string, limit = 3) {
  const counts: Record<string, number> = {};
  const idf = index.idf as Record<string, number>;
  const ignored = new Set([
    "the",
    "from",
    "with",
    "about",
    "what",
    "how",
    "explain",
    "handbook",
    "please",
    "tell",
    "does",
    "achint",
  ]);
  for (const token of query.toLowerCase().match(/[a-z0-9]{3,}/g) || []) {
    if (ignored.has(token)) continue;
    const stem = token.replace(/ing$/, "");
    const candidates = [
      token,
      stem,
      stem.replace(/(.)\1$/, "$1"),
      token.replace(/s$/, ""),
    ];
    for (const known of new Set(candidates.filter((t) => idf[t])))
      counts[known] = (counts[known] || 0) + 1;
  }
  const vector: Record<string, number> = {};
  for (const [token, count] of Object.entries(counts)) {
    if (!idf[token]) continue;
    const key = bucket(token);
    vector[key] = (vector[key] || 0) + (1 + Math.log(count)) * idf[token];
  }
  const norm =
    Math.sqrt(Object.values(vector).reduce((s, v) => s + v * v, 0)) || 1;
  return index.chunks
    .map((chunk) => ({
      chunk,
      score:
        Object.entries(vector).reduce(
          (s, [key, value]) =>
            s +
            (value / norm) *
              ((chunk.vector as Record<string, number | undefined>)[key] || 0),
          0,
        ) +
        Object.keys(counts).filter((token) =>
          chunk.text
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .includes(token),
        ).length *
          0.3,
    }))
    .filter((x) => x.score > 0.12)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk }, i) => ({
      id: `handbook-${chunk.page}-${i}`,
      source: "handbook",
      title: `Data Science Handbook · page ${chunk.page}`,
      text: chunk.text,
      weight: 1,
      url: `/resources/data-science-handbook.pdf#page=${chunk.page}`,
    }));
}
