import Link from "next/link";
import { SiteImage } from "@/components/ui/site-image";

export function HeroSection() {
  return (
    <section className="editorial-hero">
      <div>
        <p className="eyebrow">AI ENGINEER · TORONTO, CANADA</p>
        <h1>
          Intelligence,
          <br />
          <em>put to work.</em>
        </h1>
        <p className="hero-intro">
          I’m Achint Pal Singh. I build AI systems that turn complex information
          into useful, reliable software.
        </p>
        <p className="hero-detail">
          From document intelligence and retrieval to agent workflows and cloud
          deployment — thoughtful engineering, from the first experiment to
          production.
        </p>
        <div className="hero-actions">
          <Link className="editorial-button" href="/projects">
            Explore my work ↗
          </Link>
          <Link className="text-link" href="/resume">
            View résumé ↗
          </Link>
        </div>
        <p className="hero-footnote">
          AI Systems Engineer at Predictive Tech Labs
        </p>
      </div>
      <figure className="portrait-frame">
        <div className="portrait-image">
          <SiteImage
            src="/images/achint/profile-photo.png"
            alt="Achint Pal Singh, AI engineer"
            fill
            priority
            sizes="(max-width: 760px) 90vw, 420px"
            className="object-cover cinematic-portrait"
          />
        </div>
        <figcaption>
          <span>ACHINT PAL SINGH</span>
          <span>ENGINEER & BUILDER</span>
        </figcaption>
      </figure>
    </section>
  );
}
