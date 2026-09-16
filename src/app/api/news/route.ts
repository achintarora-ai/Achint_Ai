import { getNews } from "@/lib/news";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  const feed = await getNews();
  return Response.json(feed, {
    status: feed.items.length ? 200 : 503,
    headers: {
      "Cache-Control": feed.stale
        ? "no-store"
        : "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
