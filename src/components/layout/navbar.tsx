"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/skills", label: "Skills" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
            {siteConfig.name}
          </span>
          <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)]">
            {siteConfig.title}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm transition-colors",
                isActive(link.href)
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            aria-label="GitHub profile"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            aria-label="Toggle color theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <a
            href={siteConfig.resumePath}
            className="hidden rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 sm:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--surface)] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm",
                    isActive(link.href)
                      ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "text-[var(--foreground)] hover:bg-[var(--surface)]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.resumePath}
                className="mt-2 block rounded-md bg-[var(--accent)] px-3 py-2 text-center text-sm font-medium text-white"
              >
                Download Résumé
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
