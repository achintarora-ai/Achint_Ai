import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 md:px-6">
      <p className="text-sm font-medium text-[var(--accent)]">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        That page doesn’t exist in this portfolio. Try one of the main sections
        instead.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm"
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
