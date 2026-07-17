"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function SpecialtyRotator({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [items.length, reduce]);

  if (reduce) {
    return (
      <p className="text-sm font-medium text-[var(--accent)]" aria-live="polite">
        {items.join(" · ")}
      </p>
    );
  }

  return (
    <div className="h-6 overflow-hidden" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={items[index]}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-sm font-medium text-[var(--accent)]"
        >
          {items[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
