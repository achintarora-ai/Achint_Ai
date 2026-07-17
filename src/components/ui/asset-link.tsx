import type { AnchorHTMLAttributes } from "react";
import { publicPath } from "@/lib/paths";

type AssetLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/** Anchor for static files (PDF, DOCX) that need basePath on GitHub Pages. */
export function AssetLink({ href, ...props }: AssetLinkProps) {
  const resolved =
    href.startsWith("http://") || href.startsWith("https://")
      ? href
      : publicPath(href);
  return <a href={resolved} {...props} />;
}
