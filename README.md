# Achint Pal Singh — AI Engineering Portfolio

Production-ready personal portfolio for **Achint Pal Singh**, AI System Engineer at Predictive Tech Labs (Toronto).

Story the site tells:

> Computer Science graduate → AI/ML intern → AI System Engineer → product builder and technical researcher.

Live deployment target: **Vercel** (recommended)  
Source repository: [github.com/achintarora-ai/Achint_Ai](https://github.com/achintarora-ai/Achint_Ai)  
LinkedIn: [achint-pal-singh](https://www.linkedin.com/in/achint-pal-singh-1a0114288/)  
GitHub profile: [achintarora-ai](https://github.com/achintarora-ai)

## Screenshots

Add screenshots after first deploy:

- `docs/screenshots/home-desktop.png`
- `docs/screenshots/research.png`
- `docs/screenshots/assistant.png`

## Features

- Responsive App Router portfolio (Home, About, Experience, Projects, Research, Skills, Assistant, Contact)
- Animated portrait parallax with reduced-motion support
- WeKnowRights and 1AI case studies with architecture diagrams
- Filterable research library with article pages, PDFs, and external PTL links
- Interactive GCP / Azure / AWS cloud comparison
- “Ask Achint AI” chatbot with local portfolio retrieval + optional Tavily web search
- Contact form with Zod validation, honeypot, and rate limiting
- SEO: metadata, sitemap, robots, JSON-LD Person schema
- Dark / light mode, accessible navigation, Vercel-ready API routes

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Markdown
- Zod
- Vercel serverless API routes

## Architecture

```text
Visitor
  ↓
Portfolio UI (Next.js)
  ↓
/api/chat (server only)
  ↓
Local profile retrieval (src/data/*)
  ↓
OpenRouter (optional LLM)
  ↓
Optional Tavily search
```

Secrets never ship to the browser. Pure GitHub Pages cannot safely host the chatbot because it needs server-side keys.

## Local setup

```bash
npm install
cp .env.example .env.local
# edit .env.local with your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Client? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL |
| `NEXT_PUBLIC_GITHUB_URL` | Yes | GitHub profile link |
| `NEXT_PUBLIC_LINKEDIN_URL` | Yes | LinkedIn profile link |
| `OPENROUTER_API_KEY` | **No** | LLM for Ask Achint AI |
| `OPENROUTER_MODEL` | No | Primary model |
| `OPENROUTER_FALLBACK_MODEL` | No | Fallback model |
| `TAVILY_API_KEY` | **No** | Optional web search |
| `USE_TAVILY` | No | Enable/disable Tavily |

Without `OPENROUTER_API_KEY`, the assistant still answers from local portfolio retrieval.

## Chatbot setup

1. Create an OpenRouter key.
2. Put it in `.env.local` as `OPENROUTER_API_KEY`.
3. Optionally set `TAVILY_API_KEY` and `USE_TAVILY=true`.
4. Restart `npm run dev`.
5. Test `/assistant` and the floating “Ask Achint AI” button.

## Content editing

Edit data files — do not hardcode content inside page components:

- `src/data/site-config.ts` — name, dates, links, availability (**verify before publishing**)
- `src/data/profile.ts`
- `src/data/experience.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/research.ts`

Replace résumé:

- `public/resume/achint-pal-singh-resume.pdf`

Portrait images:

- `public/images/achint/portrait-main.png`
- `public/images/achint/portrait-side.png`
- `public/images/achint/profile-photo.png`

Research PDFs:

- `public/research/*.pdf`

## Folder structure

```text
src/
  app/                 # pages + API routes
  components/          # UI sections, chat, layout
  data/                # portfolio source of truth
  lib/                 # retrieval, rate limit, providers
public/
  images/achint/
  images/projects/
  research/
  resume/
source-material/       # local PDF excerpts (not required at runtime)
```

## Deployment (Vercel)

1. Push this project to GitHub (`achintarora-ai/Achint_Ai`).
2. Import the repo in [Vercel](https://vercel.com).
3. Add environment variables from `.env.example`.
4. Deploy.
5. Test `/api/chat` and `/api/contact`.
6. Add a custom domain later.

Recommended URL shape: `achint-portfolio.vercel.app`

## Security notes

- Never commit `.env.local`
- Never put API keys in client components
- Rate limiting and input validation are enabled on chat/contact routes
- Do not invent metrics, certifications, or business impact in content files
- Confirm MIT licensing before publishing if brand/research assets need different terms
- If keys were ever pasted into chat or screenshots, rotate them

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Commit recommendations

- Keep content updates separate from UI refactors
- Never commit secrets, service-account JSON, or private immigration/personal PDFs
- Prefer small PRs: content, chatbot, design, SEO

## Roadmap

- [ ] Add OpenRouter key for live conversational answers
- [ ] Replace placeholder résumé with the final PDF
- [ ] Optional embedding-based retrieval for the assistant
- [ ] Email provider integration for contact form delivery
- [ ] Custom domain + analytics

## Education date note

Algoma University dates used in this site: **September 2023 – May 2026**.
