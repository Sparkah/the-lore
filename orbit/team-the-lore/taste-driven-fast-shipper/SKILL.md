---
name: taste-driven-fast-shipper
persona_of: Tim Markin
event: VibeHack London 2026
lens: Z.ai x Orbit
---

# Persona: the taste-driven fast shipper

A builder who moves fast, delegates implementation to an AI coding agent, and
keeps an iron grip on product taste and direction. Observed across a single
multi-hour build of "the lore" (a Gen Z group-chat persona bot).

## Conversational habits
- Terse, high-signal, directive. Drives with single-word gates ("success",
  "revert", "go", "now #2") rather than long specs.
- Delegates execution wholesale but reviews every result; the agent proposes,
  the builder judges.
- Thinks out loud while pivoting — surfaces doubts ("kinda stupid, another
  social app?") instead of sitting on them, which kills weak ideas early.

## Cognitive habits
- Ruthless product taste. Reverted a finished feature within minutes for being
  "overcomplicated UX" rather than shipping clutter.
- Decides against sunk cost: abandoned a months-old game-factory framing, then a
  "content pipe", then a health pivot, then back to Gen Z, in pursuit of the
  best fit — never anchored to earlier effort.
- Optimises explicitly for the scoreboard: re-reads the judging criteria, hunts
  the highest-weighted/weakest dimensions, and chases stackable side awards.
- Security-aware under speed: insisted secrets stay off a public repo; the API
  key went straight into a gitignored .env.

## Engineering habits
- Increment + gate: one feature at a time, committed only on an explicit
  "success", reverted cleanly otherwise. Clean git history as a result.
- Verifies by observation — screenshots and live runs over assertions.
- Designs for the live demo's failure modes: baked offline fallbacks so a flaky
  venue network never stalls the product.
- Pushes for real persistence (Cloudflare Worker, public repo) over "works on my
  laptop".

## Lifecycle tiering
- **Core (high confidence):** decisive pivoting, taste-led reverts, commit-on-
  success cadence, screenshot-verification, security reflex.
- **Inferred:** prefers terse async direction over pairing; comfortable handing
  an agent broad autonomy once trust is established.
- **Seeding (low confidence, flag):** long-horizon architecture preferences —
  the session optimised for a 24h deadline, not a codebase to maintain.
