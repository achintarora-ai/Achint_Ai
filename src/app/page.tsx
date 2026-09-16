import Link from "next/link";
import { HeroSection } from "@/components/hero/hero-section";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { researchArticles } from "@/data/research";

export default function HomePage() {
  return (
    <div className="editorial-home">
      <HeroSection />
      <div className="expertise-strip">
        <span>BUILT ACROSS THE STACK</span>
        <p>Python / FastAPI / RAG / AI Agents / GCP / Azure</p>
      </div>
      <section className="editorial-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>From problem to production.</h2>
          </div>
          <Link className="text-link" href="/projects">
            All projects ↗
          </Link>
        </div>
        <div className="work-grid">
          {projects.slice(0, 3).map((project, i) => (
            <Link
              href={`/projects/${project.slug}`}
              className={`work-card work-card-${i}`}
              key={project.id}
            >
              <div className="work-art" aria-hidden="true">
                <span className="work-number">0{i + 1}</span>
                <div className="system-flow">
                  {(i === 0
                    ? ["DOCUMENTS", "RETRIEVAL", "GROUNDED ANSWERS"]
                    : i === 1
                      ? [
                          "PDF / IMAGE",
                          "OCR + EMBEDDINGS",
                          "SEARCHABLE KNOWLEDGE",
                        ]
                      : ["TEMPLATES", "54+ CHECKS", "REVIEW & AUDIT"]
                  ).map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
                <span className="work-arrow">↗</span>
              </div>
              <div className="work-caption">
                <p className="eyebrow">{project.status}</p>
                <h3>{project.name}</h3>
                <p>{project.tagline}</p>
                <div className="stack-line">
                  {project.stack.slice(0, 4).join(" · ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-section about-editorial">
        <div>
          <p className="eyebrow">02 / HOW I WORK</p>
          <h2>
            The model is only
            <br />
            <em>part of the system.</em>
          </h2>
        </div>
        <div>
          <p className="large-copy">
            I care about what happens around it: the quality of the data, the
            evidence behind an answer, and the reliability of every release.
          </p>
          <p className="muted-copy">
            My work spans legal AI, multimodal search, document automation, and
            applied machine learning. I studied Computer Science at Algoma
            University and build across the backend, retrieval, evaluation, and
            deployment layers.
          </p>
          <Link className="text-link" href="/about">
            More about me ↗
          </Link>
        </div>
      </section>
      <section className="editorial-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / RESEARCH & FIELD NOTES</p>
            <h2>Ideas, with evidence.</h2>
          </div>
          <Link href="/research" className="text-link">
            Research library ↗
          </Link>
        </div>
        <div className="writing-list">
          {researchArticles.slice(0, 3).map((article, i) => (
            <Link
              className="writing-row"
              key={article.slug}
              href={`/blogs/${article.slug}`}
            >
              <span className="writing-index">0{i + 1}</span>
              <div>
                <p className="eyebrow">
                  {article.status} · {article.readingTimeMinutes} MIN READ
                </p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </div>
              <span className="writing-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / EXPERIENCE</p>
            <h2>Building, learning, shipping.</h2>
          </div>
          <Link href="/experience" className="text-link">
            Full experience ↗
          </Link>
        </div>
        {experience.slice(0, 3).map((item) => (
          <div className="experience-row" key={item.id}>
            <p>{item.range}</p>
            <div>
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </div>
            <p>{item.summary}</p>
          </div>
        ))}
      </section>
      <section className="editorial-section contact-editorial">
        <p className="eyebrow">LET’S BUILD SOMETHING USEFUL</p>
        <h2>
          Good systems start
          <br />
          with a conversation.
        </h2>
        <Link href="/contact" className="editorial-button">
          Get in touch ↗
        </Link>
        <p>Open to AI engineering opportunities in Toronto and remotely.</p>
      </section>
    </div>
  );
}
