# Z.ai x Orbit - evidence (the lore)

Builder: Tim Markin · Team table 58 · Track: Build with Zymix · Repo: https://github.com/Sparkah/the-lore

## Best Product Integration - Z.ai GLM is the engine, not a garnish
- GLM-4.6 (via Z.ai) is the LLM that powers the entire product: it generates each
  member's persona (`/api/generate`) and evolves it as the chat continues
  (`/api/update`). Without GLM there is no product.
- Code: `server.js` `callGLM()` and the Cloudflare Worker `worker.js` both call
  `https://api.z.ai/api/paas/v4/chat/completions` with `glm-4.6`.
- Verified live: GLM returned a full reading ("The Delusional Squad") and, on
  update, moved stats (yap 88→95, patience 20→10) and rewrote the roast - proof
  the model is doing the reasoning, not a template.

## Best Workflow Use - agent-built, GLM-served
- Built end-to-end with Claude Code as the build agent; GLM-4.6 is wired in as
  the runtime product brain. The two-LLM split (build vs product) is deliberate.
- The build itself was the workflow: tight propose→review→commit/revert loops.

## Best Real-World Potential
- "the lore" is an engagement mini-app for messaging super-apps like ZYMIX: it
  turns a flat group chat into a live status game (aura, leaderboard) - a
  retention lever a young social app actually needs.
- The builder ships real products (an autonomous game studio with games live on
  Yandex/CrazyGames), so "from demo to live" is a proven track record.

## Best Build-in-Public Story
- The honest path is documented in `DEVPOST.md` + git history: factory →
  content-pipe → "another social app?" doubt → health pivot → back to Gen Z →
  the lore. Weak ideas were named and dropped fast.
- Real failures captured and fixed in public:
  - The bot was a sycophant (aura only went up, even when a user typed "you're
    the worst AI, drop my score"). Re-engineered so aura is earned and gaming the
    bot tanks it - verified: a manipulation attempt scored -226.
  - A headless-CLI stdin hang silently timed out every analysis until it was run
    with stdin closed.
  - A finished "reframe" feature was reverted within minutes for over-complicating
    the UX - taste over sunk cost.

## Tools/models used
Claude Code (build), Z.ai GLM-4.6 (product LLM), Cloudflare Workers (deploy),
GitHub (Sparkah/the-lore), vanilla JS/Node (zero-dependency).
