"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
export function VisitorGuide() {
  const [stage, setStage] = useState<"welcome" | "reading" | null>(null);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("achint-guide-dismissed")) return;
    } catch {}
    const first = setTimeout(() => {
      try {
        if (!sessionStorage.getItem("achint-guide-welcome"))
          setStage("welcome");
      } catch {
        setStage("welcome");
      }
    }, 9000);
    const second = setTimeout(() => {
      try {
        if (sessionStorage.getItem("achint-guide-dismissed")) return;
      } catch {}
      setStage((current) => (current === null ? "reading" : current));
    }, 75000);
    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, []);
  function dismiss() {
    setStage(null);
    try {
      sessionStorage.setItem("achint-guide-dismissed", "1");
    } catch {}
  }
  function choose() {
    setStage(null);
    try {
      sessionStorage.setItem("achint-guide-welcome", "1");
    } catch {}
  }
  if (!stage) return null;
  return (
    <aside className="visitor-guide" aria-label="Portfolio welcome">
      <button onClick={dismiss} aria-label="Dismiss welcome">
        <X size={17} />
      </button>
      <p className="eyebrow">
        {stage === "welcome"
          ? "WELCOME TO MY CORNER OF THE INTERNET"
          : "SOMETHING FOR YOUR READING LIST"}
      </p>
      <h2>
        {stage === "welcome"
          ? "What brings you here?"
          : "Two towers. Three public-good ideas."}
      </h2>
      <p>
        {stage === "welcome"
          ? "Take the route that interests you."
          : "Explore the recommendation lab and the honest story behind its training data."}
      </p>
      <div>
        {stage === "welcome" ? (
          <>
            <Link onClick={choose} href="/resume">
              I’m recruiting ↗
            </Link>
            <Link onClick={choose} href="/projects">
              Just curious ↗
            </Link>
          </>
        ) : (
          <Link onClick={dismiss} href="/blogs/two-tower-civicmatch">
            Read the field note ↗
          </Link>
        )}
      </div>
    </aside>
  );
}
