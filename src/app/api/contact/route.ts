import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/data/site-config";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(3000),
  company: z.string().max(0).optional(), // honeypot
});

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(`contact:${clientKey(request)}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, subject, and message." },
      { status: 400 },
    );
  }

  // Honeypot triggered
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, subject, message } = parsed.data;

  // No database in v1: log non-secret metadata only and return a mailto-ready payload.
  console.info("Contact form submission received", {
    name,
    emailDomain: email.split("@")[1] ?? "unknown",
    subjectLength: subject.length,
    messageLength: message.length,
    to: siteConfig.email,
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thanks for reaching out. Your message was validated. You can also email directly if you need a faster reply.",
    mailto: `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[Portfolio] ${subject}`,
    )}&body=${encodeURIComponent(
      `From: ${name} <${email}>\n\n${message}`,
    )}`,
  });
}
