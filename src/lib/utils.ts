import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function isBlogPoster(coverImage?: string) {
  return Boolean(coverImage?.includes("-poster"));
}

export function coverImageClass(coverImage?: string) {
  return isBlogPoster(coverImage) ? "object-contain" : "object-cover";
}
