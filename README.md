# Fleet TCO

A free, public South African Total Cost of Ownership calculator for fleet and vehicle buying decisions.

**Live:** https://fleet-tco-lemon.vercel.app/
**Repo:** https://github.com/RickoEdits/fleet-tco

## What it does

Search a catalog of vehicles sold in South Africa, pick the ones you're considering, and compare true monthly running cost — finance, fuel, tyres, service, licensing and insurance — instead of just the sticker price.

### Features

- **TCO Calculator** — pick vehicles from the catalog, set contract parameters (interest rate, finance term, starting/ending odometer, fuel price), and compare full cost-of-ownership breakdowns side by side.
- **Second-hand vehicles** — any catalog vehicle can be toggled to "second-hand" mode (enter purchase price + current mileage) directly on its comparison card, reusing its real fuel consumption and service-rate data rather than requiring a separate manual entry.
- **Cost-per-km (CPK)** — every card shows R/km, so new and used vehicles compare on the same basis.
- **Data Analytics tab** — depreciation curve chart (straight-line vs. diminishing-balance toggle) and a cost-per-km simulator (compare your own billing rate against the calculated true cost).
- **Fleet Procure (beta)** — lead-gen form that routes enquiries to brand-specific dealer contacts (currently placeholders — see `DEALER_CONTACTS` in the source and `MONETIZATION.md`). Marked as beta in the UI and copy so it doesn't overpromise dealer routing that isn't live yet; enquiries land with the Fleet TCO team in the meantime.

### Vehicle catalog

241 vehicles across 44 brands. All pricing is current, real, ex-showroom South African pricing and manufacturer-cycle fuel consumption — sourced from official brand sites and reputable SA auto listings (cars.co.za, topauto.co.za, autotrader.co.za), not fabricated or estimated. Service-rate figures are marked "● matched" (real fleet cost-per-km data) or "○ estimated" (segment-level assumption) per vehicle.

Brands with no genuine current SA market presence or no published pricing (e.g. Jaguar, McLaren, Rolls-Royce, BAW, CMC, Iveco, and others) were deliberately excluded rather than estimated — see git history for the full research/exclusion notes.

Most brands also have a verified official South African website linked from each comparison card ("View photos on [Brand]"). Two brands (Lamborghini, Brandt) have no link since neither has a real official SA site.

## Tech

Self-contained static HTML file (`index.html`, duplicated as `fleet-tco-calculator.html` — keep both in sync) — no build step, no framework, no npm dependencies. All logic is vanilla JS; charts are hand-drawn inline SVG.

One small addition: `api/submit-lead.js`, a zero-config Vercel Serverless Function that proxies Fleet Procure form submissions to Web3Forms. It exists so the Web3Forms access key stays server-side (an env var) instead of sitting in the page source, where anyone could copy it and post arbitrary leads through your quota from another site. It needs no build step either — Vercel picks up anything in `/api` automatically.

Deployed on Vercel, auto-deploying from `main` on every push.

## Local development

```bash
python3 -m http.server 8934
# open http://localhost:8934/index.html
```

This serves the static files but **not** `/api/submit-lead` (Python's server can't run it) — the Fleet Procure form will fail locally under this setup. To test it end-to-end, use the Vercel CLI instead:

```bash
vercel dev
```

which runs the static files and the serverless function together, and needs `WEB3FORMS_ACCESS_KEY` available locally (see below).

## Environment variables

- `WEB3FORMS_ACCESS_KEY` — required for the Fleet Procure form to actually send anywhere. Get a free key at https://web3forms.com, then set it in **Vercel → Project → Settings → Environment Variables** (do not put it in code or commit it). For local `vercel dev` testing, `vercel env pull` will write it into a git-ignored `.env.local`.

## Repo structure

- `index.html` / `fleet-tco-calculator.html` — the app (identical, keep in sync)
- `api/submit-lead.js` — serverless proxy that keeps the Web3Forms key off the client
- `vercel.json` — security headers (CSP, HSTS, X-Frame-Options, etc.)
- `MONETIZATION.md` — current monetization status and next steps
- `README.md` — this file
- `robots.txt` / `sitemap.xml` — crawler access and discoverability (standard search + AI crawlers explicitly allowed)
- `llms.txt` — site summary for AI assistants/answer engines, per the [llms.txt convention](https://llmstxt.org/)

## SEO / analytics

- JSON-LD `WebApplication` structured data is embedded in `<head>` for rich results and AI-assistant understanding.
- Vercel Analytics + Speed Insights are wired in via the script-tag integration (`/_vercel/insights/script.js`, `/_vercel/speed-insights/script.js`) — no build step needed, but **Analytics/Speed Insights must be enabled for this project in the Vercel dashboard** for data to actually be collected.

## Status

No custom domain yet (running on the Vercel subdomain). No paying customers yet — see `MONETIZATION.md` for the current plan.
