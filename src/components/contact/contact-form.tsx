"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/data/site-config";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [mailto, setMailto] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setMailto(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
      company: String(form.get("company") || ""),
    };

    if (payload.company) {
      setStatus("idle");
      return;
    }
    setMailto(
      `mailto:${siteConfig.email}?subject=${encodeURIComponent("[Portfolio] " + payload.subject)}&body=${encodeURIComponent("From: " + payload.name + " <" + payload.email + ">\n\n" + payload.message)}`,
    );
    setStatus("success");
    setMessage(
      "Your email draft is ready. Open your email app below and send it to complete your message.",
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm text-[var(--muted)]">
        Prepare an email to Achint. You’ll review and send it in your email app.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          minLength={3}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
        />
      </div>
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
      >
        {status === "loading" ? "Preparing…" : "Prepare email"}
      </button>
      {message && (
        <p
          className={
            status === "error"
              ? "text-sm text-red-600"
              : "text-sm text-[var(--muted)]"
          }
          role="status"
        >
          {message}{" "}
          {mailto && (
            <a href={mailto} className="text-[var(--accent)] hover:underline">
              Open email client
            </a>
          )}
        </p>
      )}
    </form>
  );
}
