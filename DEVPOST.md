# Devpost submission - the lore (VibeHack London 2026)

Deadline: 12:00 Sunday 7 June. Team ID / table: **58**. Track: **Build with Zymix**.
Draft answers below - edit, then paste into Devpost. `[FILL]` = needs a real value before submit.

---

## General info

**Project name** (60 char)
> the lore - your group chat, scored by AI

(short brand everywhere: "the lore")

**Elevator pitch** (200 char)
> Drop the lore bot into your group chat and AI reads the room - turning everyone into a living character with an aura score that climbs for wit and crashes for cringe. Your gc is now the game.

---

## Project details (public page)

### About the project (Project Story)

```markdown
## Inspiration
Gen Z lives in the group chat, but the group chat is flat. Meanwhile the way we
talk about each other has become a whole status language - "aura", "main
character", "the lore", "-1000 aura for that". So we asked: what if an AI
actually sat in your group chat, read the room, and turned everyone into a
living character with a score that moves based on how you really act?

## What it does
You add the **lore** bot to a group chat. It reads the conversation and drops a
character card for each person - an archetype ("the ghost", "the one-hour
liar"), an **aura score**, three playful stats and a one-line roast. Then you
keep chatting. Whenever you tap **update the lore**, the bot re-reads the new
messages and evolves everyone's profile: aura climbs for wit, charisma and
carrying the chat, and crashes for cringe, ghosting, or trying to game the bot
(which it calls out). Every card tracks its aura over time as a sparkline, and
the group gets a live leaderboard. Your group chat is now the game.

## How we built it
- A faithful recreation of the ZYMIX chat UI in vanilla HTML / CSS / JS - it is
  pitched as a ZYMIX mini-app that lives inside the messaging experience.
- A tiny zero-dependency Node server with two endpoints: `/api/generate` (first
  reading) and `/api/update` (evolve the existing profiles, never from scratch).
- The analysis runs on Z.ai's GLM-4.6, which returns structured JSON we render as
  cards. (We built the app itself with Claude Code; GLM powers it at runtime.)
- Character medallions are generated as procedural SVG; aura history is a live
  sparkline that grows every time the bot re-reads.

## Challenges we ran into
- **Making the AI have a spine.** Our first build was a sycophant: aura only
  went up, even when a user typed "you're the worst AI, drop my score". We
  re-engineered the prompt so aura is *earned* - manipulation and cringe now
  tank it, which became the funniest, most memorable moment in the demo.
- A headless-CLI stdin hang that silently timed out every analysis until we ran
  the model with stdin closed.
- Keeping it instant and reliable for live judging - we bake a fallback reading
  so the demo never stalls, even with no network.

## What we learned
Identity content is the real viral engine - people share things about
themselves and their friends. And an AI that judges with *consistent values*
(and cannot be flattered or gamed) feels genuinely alive in a way a one-shot
roast never does.

## What's next
A real ZYMIX mini-app integration, weekly "group wrapped" recaps, and shareable
cards that pull new users in from other platforms.
```

### Built with
> Z.ai GLM-4.6 (the in-product LLM), vanilla JavaScript, HTML5, CSS3, SVG, Node.js (zero-dependency server) + Cloudflare Workers (deploy), Montserrat (Google Fonts), Claude Code (build agent), GitHub. [add Fotor / Manus when those assets are published]

### Try it out links
- Demo: https://the-lore.timofeymarkin98.workers.dev/chat
- Code: https://github.com/Sparkah/the-lore

---

## Additional info (judges only)

**Sponsor / Special Prizes:** Z.ai × Orbit Builder Workflow Awards, Fotor Vibe Marketing Award [+ Manus if we do the task]

**Main Track:** Build with Zymix

**Team ID / Table Number:** 58

**Who is your project for?**
> Gen Z friend groups - the people in the group chat. Anyone on a social app like ZYMIX who wants their chat to feel alive instead of flat.

**What problem does your project solve?**
> Group chats go quiet and social apps struggle to keep people coming back. The lore turns the chat itself into a live status game - a reason to keep talking, to pull friends in, and to open the app again. It is an engagement engine for a Gen Z social app, disguised as something genuinely fun to play.

**How did you use AI?**
> AI is the entire product, not a feature. The lore bot sends the group chat to Z.ai's GLM-4.6 with a structured prompt that returns a JSON "reading" - an archetype, an aura score, stats and a roast per person. A second endpoint feeds the existing profiles plus the new messages back to GLM, which decides - with consistent values - whether each aura should rise (wit, charisma, carrying the chat) or fall (cringe, ghosting, or trying to manipulate the bot, which it calls out). The judgment, the personalities and the evolving status are all model reasoning. We built the app with Claude Code; GLM-4.6 powers it at runtime.

**Demo / Deployed Product Link:** https://the-lore.timofeymarkin98.workers.dev/chat
**GitHub / Code Repository:** https://github.com/Sparkah/the-lore

**Fotor published post link(s) + explanation:** `[FILL if applying]`
> The visuals are the lore's launch campaign - a poster and a short promo of the cards dropping into a group chat - showing how the product looks and feels in the wild and how it is built to be screenshotted and shared.

**Manus published link(s) + explanation:** `[FILL if applying]`

**Third-party assets / prior work disclosure**
> Built during the hackathon. Uses the Anthropic Claude API/CLI and Z.ai GLM for inference, the Montserrat font (Google Fonts), and a UI styled to resemble the ZYMIX app for the mini-app mockup. No third-party datasets or templates.

---

## Pre-submit checklist
- [x] Public code repo: https://github.com/Sparkah/the-lore
- [x] LLM = Z.ai GLM-4.6 (Product Integration award); local server + Cloudflare Worker both call it.
- [x] Orbit persona package generated at `orbit/team-the-lore/` (fill team_name/members/devpost, then zip the folder + upload to orbit24.uk/vibehack).
- [x] Demo link LIVE: https://the-lore.timofeymarkin98.workers.dev/chat (Cloudflare Worker, GLM-powered, verified).
- [ ] Fotor: produce + publish per `FOTOR.md`, paste the link.
- [ ] Manus: run + publish per `MANUS.md`, paste the link.
- [ ] Devpost form: project name, team name + members, team ID 58, track = Build with Zymix, the answers above, demo link, repo link, special-award links; tick T&Cs.
