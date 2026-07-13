# /check

Pre-deploy validation pass for FleetPro TCO. Run before shipping changes to `index.html` or the serverless function. Report pass/fail per item — don't silently fix anything, surface it so the user decides.

1. **HTML files in sync** — `diff index.html fleet-tco-calculator.html` must be empty.
2. **Inline JS syntax** — extract the `<script>` blocks from `index.html` (skip `type="application/ld+json"` and any `src=` script tags) and run `node --check` against the extracted JS.
3. **api/submit-lead.js syntax** — `node --check api/submit-lead.js` if it changed.
4. **vercel.json is valid JSON** — `python3 -c "import json; json.load(open('vercel.json'))"`.
5. **No secrets leaking** — grep the working tree diff (`git diff` and `git diff --cached`) for anything that looks like an API key, access token, or a hardcoded credential (e.g. a UUID-shaped string assigned to a JS const — that's exactly the pattern the old hardcoded Web3Forms key had before it was moved server-side). Flag anything found; don't assume it's fine.
6. **git status** — note any unstaged or untracked files that look like they belong in this change but aren't staged.

Summarize as a short pass/fail list. If everything passes, say so plainly — don't pad it with caveats.
