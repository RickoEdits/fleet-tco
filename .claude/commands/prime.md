# /prime

Orient yourself in the Fleet TCO codebase at the start of a session. Read the following, in order, and hold the context — don't narrate what you're reading, just report a short summary at the end.

1. Read `README.md` — what the product is, tech stack, repo structure.
2. Read `MONETIZATION.md` — current monetization status/plan, so business-facing suggestions stay consistent with the agreed approach.
3. Run `git log --oneline -15` — recent history, to know what's already been done.
4. Run `git status --short` — anything uncommitted right now.
5. Skim `index.html` structure only (not the full 2000+ lines): the `<head>` meta/SEO block, `VEHICLE_DB` declaration line (don't read the array itself, it's huge and static), and the section around `DEALER_CONTACTS` / the Fleet Procure form handler.
6. Read `api/submit-lead.js` — the one serverless function in this otherwise-static app.
7. Read `vercel.json` — current security headers/CSP.

Remember: `index.html` and `fleet-tco-calculator.html` must always be kept byte-identical (README explains why) — if one is edited, mirror the change to the other before finishing any task.

After reading, give a brief summary (5-8 lines max): what the product does, what changed most recently, anything currently uncommitted, and any open follow-ups you notice (e.g. env vars that still need setting, TODOs). Don't dump full file contents back to the user.
