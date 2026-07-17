import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <p className="text-sm font-semibold text-[var(--accent)]">About</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em] md:text-4xl">
          AI Engineer who automates what others do manually
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">{profile.story}</p>

        <div className="mt-8 max-w-3xl space-y-4 text-[var(--foreground)] leading-relaxed">
          {profile.biography.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.focusCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h3 className="text-lg font-semibold text-[var(--accent)]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
