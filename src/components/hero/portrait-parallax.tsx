"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  src?: string;
  alt: string;
};

export function PortraitParallax({
  src = "/images/achint/portrait-main.png",
  alt,
}: Props) {
  const [enabled, setEnabled] = useState(false);
  const [hasImage, setHasImage] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const translateX = useSpring(x, { stiffness: 120, damping: 18 });
  const translateY = useSpring(y, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mq.matches && !reduce.matches && window.innerWidth >= 768);
    update();
    mq.addEventListener("change", update);
    reduce.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${translateX}px ${translateY}px, color-mix(in oklab, var(--accent) 28%, transparent), transparent 55%)`;

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-md"
      onMouseMove={(event) => {
        if (!enabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = event.clientX - rect.left - rect.width / 2;
        const py = event.clientY - rect.top - rect.height / 2;
        x.set(px * 0.03);
        y.set(py * 0.03);
        rotateY.set(px * 0.015);
        rotateX.set(-py * 0.015);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-[-8%] rounded-[2rem] opacity-80"
        style={{ background: enabled ? spotlight : undefined }}
      />
      <div
        aria-hidden
        className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--blue)_35%,transparent),transparent_55%),radial-gradient(circle_at_70%_80%,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_50%)]"
      />
      <motion.div
        className="relative h-full overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
        style={{
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
          transformPerspective: 900,
        }}
      >
        {hasImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover object-top"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(160deg,var(--accent-soft),var(--surface))] p-8 text-center">
            <div>
              <p className="text-4xl font-semibold text-[var(--accent)]">APS</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Portrait placeholder — add an image to{" "}
                <code className="text-xs">/public/images/achint/</code>
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
