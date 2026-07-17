import { redirect } from "next/navigation";
import { researchArticles } from "@/data/research";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";

export function generateStaticParams() {
  return researchArticles.map((article) => ({ slug: article.slug }));
}

export default async function ResearchSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/blogs/${slug}`);
}
