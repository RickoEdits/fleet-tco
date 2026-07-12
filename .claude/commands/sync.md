# /sync

Keep `index.html` and `fleet-tco-calculator.html` byte-identical (per `README.md` — this repo intentionally duplicates the app as two files, and both must stay in sync).

1. Run `diff index.html fleet-tco-calculator.html`.
2. If there's no diff, report "already in sync" and stop.
3. If they differ, figure out which one has the intended edits — in practice this is almost always `index.html`, since that's the file normally edited during work. If it's genuinely ambiguous, ask rather than guess.
4. Copy the file with the intended changes over the other (`cp index.html fleet-tco-calculator.html` in the normal case).
5. Confirm with `diff` that they're now identical and report what changed.
