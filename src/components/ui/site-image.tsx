import Image, { type ImageProps } from "next/image";
import { publicPath } from "@/lib/paths";

function resolveSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src !== "string") return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return publicPath(src);
  return src;
}

/** Next/Image wrapper that applies GitHub Pages basePath to local assets. */
export function SiteImage(props: ImageProps) {
  return <Image {...props} alt={props.alt} src={resolveSrc(props.src)} />;
}
