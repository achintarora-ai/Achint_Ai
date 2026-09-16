"use client";

import { usePathname } from "next/navigation";
import { ChatWidget } from "./chat-widget";
import { VisitorGuide } from "./visitor-guide";

export function FloatingChat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/assistant")) return null;
  return (
    <>
      <VisitorGuide />
      <ChatWidget />
    </>
  );
}
