import Image from "next/image";
import { skillIconSlugs } from "@/data/skills";

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`;
}

export function SkillBadges({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => {
        const slug = skillIconSlugs[item];
        return (
          <li
            key={item}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-xs"
          >
            {slug ? (
              <Image
                src={iconUrl(slug)}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5 opacity-90"
                unoptimized
              />
            ) : (
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              />
            )}
            {item}
          </li>
        );
      })}
    </ul>
  );
}
