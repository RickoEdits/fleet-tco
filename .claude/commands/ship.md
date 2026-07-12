# /ship

Commit and push the current changes to `main`, which triggers Vercel's auto-deploy (per `README.md`). This repo has no CI gate in front of that — this command is the safety net, so don't skip steps.

1. Run through `/check`'s steps first. Stop and report if anything fails rather than pushing broken state.
2. Run `git status --short` and `git diff` to see exactly what's changing.
3. Stage the relevant files by name — never `git add -A` or `git add .`. This repo has `.env*` gitignored on purpose; don't sweep in anything that shouldn't be tracked.
4. Draft a commit message matching this repo's existing style (`git log --oneline -10` for tone) — imperative mood, one-line summary, bullet detail if the change has several distinct parts.
5. Commit and push without re-confirming only if the user has already explicitly approved this exact change earlier in the conversation (e.g. said "commit and deploy" about what was just discussed). Otherwise, show what's about to ship and confirm first.
6. After pushing, remind the user this triggers Vercel's auto-deploy from `main`. Flag if anything in the change needs an env var or dashboard setting that isn't set yet (e.g. `WEB3FORMS_ACCESS_KEY`) — code alone won't surface that failure until someone hits the live feature.
