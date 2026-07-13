# FleetPro TCO — Monetization Plan

## Current state
- 241 vehicles, 44 brands, live at fleet-tco-lemon.vercel.app
- Fleet Procure tab exists but every dealer contact is still a placeholder ("Partner not yet assigned")
- Zero paying customers, zero validated willingness to pay
- No custom domain yet (running on Vercel subdomain)

## Decision (from council review)
Don't pick a monetization model yet — the tool has zero validated demand. Spend the next 2-4 weeks proving whether anyone will actually pay, using the cheapest possible tests, before committing to a model (dealer-referral, feature-gated freemium, data licensing, white-label, etc.).

## Next steps

1. **Get a custom domain** (e.g. a `.co.za`) and point it at Vercel — cheap (~R100-200/year), and needed before approaching dealers or asking anyone to pay; a Vercel subdomain undercuts credibility for both.

2. **Make Fleet Procure actually functional.** Sign 2-3 real dealer/finance partnerships for the highest-traffic brands in the catalog. Replace the placeholder entries in `DEALER_CONTACTS` with real contacts. Disclose sponsored placements transparently to users (flat placement fee, not pay-for-ranking) to protect the tool's neutrality — the whole product's credibility rests on being seen as unbiased.

3. **Add one small paid feature gate** — e.g. a one-time R99-299 fee to export a comparison as a PDF, or to unlock a 5+ vehicle fleet comparison view. Watch for 30 days whether anyone converts. Cheap, fast, real signal — don't build more before this.

4. **Talk to real fleet managers / SME fleet owners directly.** Message 10-20 people (LinkedIn, network) and ask plainly what they'd pay for and why. Use their answers — not more building — to decide the next move.

## Bigger ideas to revisit later (not now)
These need either real usage data or a live example of the product generating revenue before they're credible:
- Data licensing (cost-per-km / depreciation data to insurers, banks, leasing companies)
- White-labeling the calculator for fleet management companies (Avis Fleet, Bidvest, etc.)
- Embedded/commission-based vehicle finance quotes from a single partner
