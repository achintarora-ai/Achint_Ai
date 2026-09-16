# Portfolio hosting

The full application runs at https://achint-ai.vercel.app in the existing `achint-ai` Vercel project. GitHub Pages remains a static mirror; its workflow sets `NEXT_PUBLIC_API_ORIGIN` to the Vercel origin so chat and news use the live server. CORS permits the portfolio's GitHub Pages origin.

## Daily updates

`/daily` reads `/api/news`, which fetches attributed headlines from OpenAI News, NVIDIA Developer and Microsoft Research. Both RSS and Atom are supported. The server caches successful responses for one hour and retries partial failures after five minutes; the browser checks every fifteen minutes while visible. Refresh happens on requests, without a new deployment. This is a publisher feed, separate from original writing; it does not silently generate articles under Achint's name. No scraping API key is required.

Warm server instances retain earlier entries during source failures. This in-memory fallback is not durable storage: a cold instance cannot recover a previous instance's cache. The UI reports source failures and shows direct publisher links.

## Assistant

Production model credentials live only in Vercel environment variables. Never commit `.env.local`. OpenAI, Anthropic and optional Tavily keys were configured with the owner's explicit approval. Without a working model provider the API returns labeled reference excerpts. The local handbook index uses sparse lexical vectors, exact-term boosts and page citations; it is not a claim of neural semantic retrieval.

Conversation text and retrieved passages are sent to the configured model provider when answering. Chat history is held in the current browser component, not written to a portfolio database. Rate limiting is per server instance, not a distributed abuse guarantee. For higher traffic, add shared rate limiting and a provider spending cap.

## CivicMatch

`projects/civicmatch` is a self-contained project with training, inference, tests, provenance, saved models and a LinkedIn draft. Public artifacts in `public/lab` support browser-only inference. The three tracks use real public catalogs and simulated preferences. A separate GitHub repository has not been created; the folder can be extracted into one when its name is selected. The LinkedIn draft has not been posted.

## Checks

Run `npm run lint`, `npm run build`, `node --experimental-strip-types --test scripts/news.test.mjs`, and `python -m unittest discover -s projects/civicmatch -p 'test_*.py'`.

Deploy source changes with the official Vercel CLI from this linked directory. A model or content update needs deployment; publisher news updates do not. The contact form opens an email draft in the visitor's email client and does not claim server-side delivery.
