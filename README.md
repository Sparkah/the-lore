# the lore

> Add an AI bot to your group chat. It reads the room, scores everyone, and drops playable mini-games right into the chat.

VibeHack London 2026 · Team "content pipe" (table 58) · Main track: Build with Zymix

Live demo: https://the-lore.timofeymarkin98.workers.dev/chat

## What it is

the lore is a ZYMIX-style mini-app you add to a group chat. An AI reads the whole
conversation and turns each person into a character card: an archetype, an aura
score, three playful stats, a one-line roast, and an award, with a live group
leaderboard. Aura is earned, not given: it climbs for wit and charisma and crashes
for cringe, ghosting, or trying to game the bot (which it calls out). It is also an
"ultra-bot": type "show games" and it drops playable mini-games into the chat that
open full-screen like native ZYMIX mini-programs.

## Why it matters

ZYMIX wants to be the WeChat of Europe. WeChat is sticky for two reasons: a reason
to keep opening the chat, and an endless supply of mini-games inside it. the lore
delivers both in one bot. The mini-games come from an existing autonomous AI game
studio (game-factory.tech) that designs, builds, arts, tests, and ships new games
to live marketplaces (Yandex, CrazyGames) every day, so the supply is real and
continuous.

## How AI is used

AI is the entire product, not a decorative feature. Z.ai's GLM-4.6 powers both
endpoints: `/api/generate` produces the first reading (a structured JSON persona
per person), and `/api/update` re-reads new messages and evolves everyone's score
with consistent values (rewarding wit, penalising cringe and manipulation). The
judgement, the personalities, and the evolving status are all model reasoning.
Built with Claude Code; deployed on Cloudflare Workers.

## Try it

1. Open https://the-lore.timofeymarkin98.workers.dev/chat
2. Tap "Add the lore bot" to see the reading (cards + leaderboard).
3. Type a message, then "update the lore", to watch aura move.
4. Type "show games" to drop playable mini-games into the chat; tap one to play.

## Tech

Vanilla JavaScript, HTML5 Canvas + SVG, a zero-dependency Node server (local) and a
Cloudflare Worker (deploy), Z.ai GLM-4.6, Montserrat. No frameworks.

## Run locally

```bash
echo "GLM_API_KEY=your_key" > .env   # gitignored; falls back to local Claude CLI if absent
node server.js                        # http://localhost:8787
```

## Awards applying for

- Build with Zymix (main track)
- Z.ai x Orbit Builder Workflow Awards: GLM-4.6 is the product's brain; the Orbit
  team ZIP is submitted separately on orbit24.uk/vibehack
- Manus Real-World Use Case Award: https://loregtm-uknkx2zp.manus.space (a
  published go-to-market brief for the product)

## Disclosure

The lore mini-app (the group-chat reading, the aura scoring, and the in-chat game
launcher) was built during VibeHack this weekend. The mini-games it surfaces come
from an existing autonomous game studio (game-factory.tech), which is prior work,
presented as the real-world engine behind the product, not as something built this
weekend. AI inference is Z.ai GLM-4.6; the UI is styled to resemble ZYMIX. No
third-party datasets or templates.

## Team

content pipe (table 58): Tim Markin (@Sparkah), Dimitrios Koutsoumpos (@dimknaf),
hh h (@hhh153843).
