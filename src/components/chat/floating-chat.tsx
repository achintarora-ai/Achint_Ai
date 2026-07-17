"use client";

import { usePathname } from "next/navigation";
import { ChatWidget } from "./chat-widget";

export function FloatingChat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/assistant")) return null;
  return <ChatWidget />;
}
