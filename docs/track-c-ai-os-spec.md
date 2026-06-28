---
title: Track C — Michal's Gemini AI Operating System (Deep Spec)
status: active — foundation track, build first
owner: Nadav
created: 2026-06-28
privacy: client-safe (no PII in this repo)
depends-on: docs/engagement-plan.md
---

# Track C — Michal's AI Operating System (Deep Spec)

**Objective (one sentence):** Stand up a Gemini-based operating system — a privacy-safe set of Gems sharing one "Michal's Voice" knowledge asset, plus only the extensions that don't expose client data — that Tracks A (billing) and B (content) run on top of.

Track C is the foundation. Nothing in A or B works until the Voice doc exists, the privacy rule is enforced in a reusable block, and the Gems are stood up in her account. Everything below is built **here** (instruction text, the Voice doc, specs) and **pasted/configured into Michal's Gemini account** by Nadav.

---

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-28 | **Tier = Google AI Plus** (~₪19/mo), not Pro | Sufficient for the Gems foundation; verify only the knowledge-file caveat (§1 row 2). |
| 2026-06-28 | **Knowledge hub: decide later** | Voice doc as a standalone Google Doc; hub choice deferred to Track B (§6). |
| 2026-06-28 | **Antigravity is NOT part of Michal's OS** | It's an agent-first dev IDE for *developers*, not an ops tool for a non-technical coach. Her OS stays Gems-in-the-Gemini-app. Antigravity is at most an optional workbench for Nadav (he already uses Claude Code). |
| 2026-06-28 | **Engagement gets its own private repo**, not merged into `Michal-full-course-` | Keep our PII/billing architecture out of her deployed product repo (possibly public). That repo is a *read source* for the Voice doc, not the home. Created: `github.com/nadavyigal/Michal-AI-OS` (private). |
| 2026-06-28 | **Framing correction: dual practice, not pure life/couples coach** | Mining `Michal-full-course-` + `Michal-Business-Card-` shows she also does organizational/management coaching (12yr running an insurance agency, ~20 employees). See [michal-voice-tone-design.md](michal-voice-tone-design.md) §0. **Needs her confirmation** before the audit report locks this in. |
| 2026-06-28 | **No external Gem marketplace exists; default to custom-only for launch** | Researched it directly (§5a) — Gemini has no GPT-Store-style catalog. Google's pre-made business Gems and Workspace Calendar/Tasks extensions are the only real "external" options; deferred to roadmap so they don't dilute the aha-moment demo. |

## 0. Architecture at a glance

```
                 ┌─────────────────────────────────────────────┐
   Public assets │  "Michal's Voice" doc  (tone / style / design)│  ← we build this from
   (IG, card,    │  one Google Doc, attached as a KNOWLEDGE FILE │    her public assets
    course repos)│  to every Gem. Single source of truth.        │
                 └───────────────┬─────────────────────────────┘
                                 │ attached to each Gem
        ┌────────────────────────┼────────────────────────┬────────────────────┐
        ▼                        ▼                        ▼                    ▼
   ┌─────────┐            ┌──────────────┐         ┌─────────────┐      ┌──────────────┐
   │ Billing │            │ Content/Voice│         │  Newsletter │      │  Repurpose   │
   │  Gem    │            │     Gem      │         │     Gem     │      │     Gem      │
   │ (Trk A) │            │   (Trk B)    │         │   (Trk B)   │      │   (Trk B)    │
   └────┬────┘            └──────┬───────┘         └──────┬──────┘      └──────┬───────┘
        │  no connected apps     │                        │                    │ YouTube ext (opt)
        ▼                        ▼                        ▼                    ▼
   aliased notes in →       topic in →              recent themes in →    video topic in →
   sessions table +         post in her voice        Fri newsletter        posts/hooks/
   SMS drafts out           out                      draft out             snippets out

   EVERY Gem starts with the same PRIVACY PREAMBLE (privacy-preamble.md).
   PII never enters Gemini. Real names re-attached by Michal, offline, at send time.
```

Two design rules that fall out of this:
1. **One Voice doc, attached as a knowledge file to all four Gems** — so a voice change is a one-file edit, not four.
2. **The Billing Gem connects to nothing.** Closed box, aliased text in, drafts out. The only Gem allowed an extension is Repurpose (YouTube), and only because YouTube content is already public.

---

## 1. Gemini account audit (do this first, inside her account)

We are guessing at her setup. Confirm before building. Checklist:

| # | What to verify | Why it matters | If "no" → |
|---|----------------|----------------|-----------|
| 1 | ~~Tier~~ — **CONFIRMED: Google AI Plus** (~₪19/mo, the entry paid tier; *not* AI Pro) | Custom Gems work on AI Plus; the only open item is knowledge-file upload (row 2) | Sufficient for Track C. No upsell to Pro needed for the foundation. |
| 2 | Can she **upload a knowledge file** to a Gem (up to 10) on **AI Plus** | The Voice doc ideally attaches to each Gem | Docs confirm this for AI Pro/Advanced but are **not explicit for AI Plus** — **verify live**. If unavailable, fall back to **pasting the Voice doc text into each Gem's instructions** (it's ~1–2 pages, fits fine). Architecture survives either way. |
| 3 | Account type: personal Gmail vs **Google Workspace** | Determines which extensions/apps are even offered | Personal account = fewer Workspace controls; note it |
| 4 | Which **extensions / connected apps** are already on | We need to know what's wired before we wire more | Audit and document; disconnect anything PII-risky |
| 5 | **Where her files live** — transcript says **Mac Files**, not Drive | Gemini can't reach local Mac files; she'd upload per-session | Good for privacy by construction; plan for manual upload, not auto-sync |
| 6 | Language: confirm she works with Gemini in **Hebrew** | All Gem instructions + outputs are Hebrew | Author everything Hebrew-first |

**Known platform constraints to flag to Michal (set expectations now):**
- Consumer Gemini Gems are **assistants, not agents** — they draft and answer; they do **not** send SMS, edit Excel, or take autonomous actions. So "Billing Gem won't auto-send" is both our chosen boundary *and* a platform reality. Don't promise automation the tier can't do.
- Extensions are mostly **read/query** (look something up in Gmail/Drive/YouTube), not write-automation. MCP-style agentic action is not part of the consumer tier.
- Connecting the **Gmail or Drive** extension means Gemini can read that mailbox/drive — that is a PII exposure. We deliberately **do not** connect Gmail/Drive to any client-data workflow.

---

## 2. The privacy preamble (the reusable core)

Lives in [`gems/privacy-preamble.md`](../gems/privacy-preamble.md). The **exact same block** is pasted at the very top of every Gem's instructions. This is the single most important artifact in Track C — write it once, reuse verbatim, and verify it fires before any Gem ships.

It must enforce: no full names/emails/phones ever; halt-and-ask if PII is detected in input; work in aliases only; drafts-only, never send or act autonomously.

---

## 3. "Michal's Voice" doc — tone / style / design

The core knowledge asset, attached to every Gem. **We build it ourselves** from her public assets — we do **not** ask her for it.

### 3a. Sources to mine
- **Instagram** `michal_slonim_life_coach` — captions (voice, recurring phrases, sentence length, emoji habits, hooks, CTAs), themes she returns to, post structure.
- **Business-card site** (`Michal-Business-Card-` repo + Vercel `michal-business-card`) — logo, colour palette, fonts, tagline, how she describes herself.
- **Course + landing repos** (`Michal-full-course-`, `landing-page---Michal-course`) — long-form positioning, headlines, the promise/transformation she sells.

### 3b. Doc structure (the template)
```
# Michal's Voice — Tone / Style / Design
1. Who she is (one paragraph: life/relationship coach, who she helps, the transformation)
2. Voice & tone        — 5–8 adjectives + 3 "she sounds like / never sounds like" pairs
3. Signature phrases   — recurring words, openers, sign-offs (Hebrew, verbatim)
4. Sentence & structure — length, rhythm, emoji use, paragraphing, hook→body→CTA shape
5. Topics & themes      — the 4–6 content pillars she actually posts about
6. Audience             — who she's talking to, their pain, the words THEY use
7. Visual identity      — logo, hex colours, fonts, image style (from the card + repos)
8. Do / Don't           — flat-copy traps to avoid (the outsourced-copywriter problem)
9. 3 gold-standard examples — her best real captions, lightly annotated
```
> Note: section 9 uses her **public** captions — public content, not client PII. Fine to include.

### 3c. How it's used
Exported as a Google Doc → uploaded as a **knowledge file** to all four Gems. Editing voice later = edit this one doc, re-upload. This doc is also the **Track B quick-win deliverable** (the Tone/Style/Design doc she explicitly asked for).

---

## 4. The Gems (skills) — shared structure

Each Gem is one instruction file in `gems/`, built to the same skeleton:

```
[PRIVACY PREAMBLE — pasted verbatim from gems/privacy-preamble.md]

# Role
<what this Gem is, in Hebrew>

# Knowledge
Use the attached "Michal's Voice" doc for all tone/style decisions.

# Input it expects
<exact shape of what Michal pastes/uploads — always aliased>

# What it produces
<exact output format>

# What it must NEVER do
- Never request, infer, or output a real name/email/phone.
- Never send, post, or take any action. Drafts only.
- <Gem-specific boundaries>

# Steps
<numbered procedure>

# Output format
<template the Gem fills>
```

### The four Gems (full instruction files authored once resources arrive)
| Gem | Track | Input (aliased) | Output | Extensions |
|-----|-------|-----------------|--------|------------|
| **Billing** | A | weekly session notes (alias + topic) | sessions-per-alias table + per-alias SMS draft in her voice | **none** (closed box) |
| **Content/Voice** | B | a topic / rough idea / theme | IG+FB post: hook → body → CTA + visual direction | none |
| **Newsletter** | B | recent themes / last posts | bi-weekly Friday newsletter outline → draft | none |
| **Repurpose** | B | one video's topic/transcript | posts, hooks, captions, newsletter snippet from it | YouTube (optional, public) |

The **7-prompt social workflow** (theme map → monthly plan → hooks → posts → newsletter outline → goal-per-post → repurpose) is not a 7th Gem — it's a set of prompt templates the Content / Newsletter / Repurpose Gems run as modes. Authored in Track B; they live on this foundation.

---

## 5. Extensions / plugins — what to connect (and what not to)

| Extension | Connect? | Reason |
|-----------|----------|--------|
| **YouTube** | Optional, later | Her ~20 videos are public; safe for the Repurpose Gem. |
| **Google Docs** | Maybe | Lets a Gem read the Voice doc from Drive instead of an upload — only if the Voice doc lives in Drive and contains no PII (it doesn't). |
| **Gmail** | **No** | Reads her mailbox = direct PII exposure. Never in a client workflow. |
| **Google Drive (broad)** | **No** | Same — broad Drive access pulls in client files. Keep client data off Drive entirely. |
| **Maps / Flights / Hotels** | No | Irrelevant to her ops. |

Default posture: **connect nothing for Track C's launch.** The Voice doc goes in as an uploaded knowledge file. Add YouTube only when we build the Repurpose Gem in Track B. This keeps the privacy surface minimal.

---

## 5a. External skills Michal could adopt (researched 2026-06-28)

Nadav asked whether there are existing/external Gems she could adopt on top of the 4 custom
ones, to enhance the OS further. Researched what actually exists, to avoid recommending
something that isn't real:

**There is no public Gem marketplace.** Unlike the GPT Store, Gemini has no browse-and-install
catalog of community Gems — Gems are always custom-built per account, not adopted from a
library. Anything "external" has to come from one of these three real categories:

| Category | What it actually is | Adopt for Michal? |
|---|---|---|
| **Google's pre-made business Gems** (Marketing insights, Sales pitch ideator, Hiring consultant, Outreach specialist, Copy creator, Sentiment analyzer — rolled out Jan 2026) | Pre-built, not custom — appear automatically for eligible accounts | **Verify in C1 account audit** whether her AI Plus tier surfaces these (they may be Workspace-tier gated). If yes: **Copy creator** and **Marketing insights** are plausibly useful alongside our Content/Voice Gem — but only after her Voice doc Gem is proven, so she doesn't dilute the custom one with a generic alternative. |
| **Workspace Calendar / Tasks / Keep extensions** (beta) | Let Gemini read/act on her calendar, tasks, and notes | Useful for her own scheduling and the "things I need to remember" roadmap item — **but session entries will contain client names/initials**, so the same alias discipline from the privacy preamble applies the moment she connects this. Don't wire it into Track C launch; revisit as a roadmap item once the Billing Gem is proven and we know her actual calendar hygiene. |
| **YouTube extension** | Already planned (§5, Repurpose Gem) | Yes, already scoped to Track B. |

**Recommendation:** don't add anything here for the Track C launch. The highest-leverage move
is proving the 4 custom Gems work first — a pre-made generic Gem competing for her attention
right after the "aha moment" demo would muddy the signal. Revisit Google's pre-made Gems and
the Calendar/Tasks extensions as **roadmap items**, gated on (a) what C1's account audit
actually shows is available on her tier, and (b) the custom Gems already landing well.

---

## 6. Knowledge hub — Google Workspace vs Notion

**DECIDED (2026-06-28): decide later.** For the Track C foundation we do **not** stand up a
hub platform. The Voice doc is built as a **standalone Google Doc** (so Gems can read/attach
it), and any aliased billing working copy is a standalone Sheet. The Google-Workspace-vs-Notion
choice is deferred to **Track B**, when the content-calendar board UI actually forces it.
Rationale: the foundation must not block on a tooling decision, and a standalone Google Doc
works regardless of which hub we land on later.

---

## 7. Track C stories (one at a time — implement, verify, report, then next)

| # | Story | Output | Done when |
|---|-------|--------|-----------|
| C0 | Send the resource-request message + confirm life-coach framing | message sent | Michal replies / files arrive |
| C1 | **Account audit** in her Gemini account | filled audit table (§1) | all 6 rows answered |
| C2 | **Write the privacy preamble** | `gems/privacy-preamble.md` | reads clean in Hebrew; PII halt-and-ask explicit |
| C3 | **Build "Michal's Voice" doc** from public assets | [docs/michal-voice-tone-design.md](michal-voice-tone-design.md) — v1 draft done | 9 sections filled from real sources ✅ draft; **pending her confirmation** on framing, canonical site, and visual identity (4 open questions logged in the doc) |
| C4 | **Author Billing Gem** instructions | `gems/billing-gem.md` | preamble + §4 skeleton complete |
| C5 | **Author Content/Voice Gem** instructions | `gems/content-voice-gem.md` | "" |
| C6 | **Stand up Gems in her account** + attach Voice doc | live Gems | each opens, follows instructions |
| C7 | **PII red-team** every live Gem | pass/fail log | feeding a name triggers halt-and-ask, every Gem |
| C8 | Author Newsletter + Repurpose Gems | `gems/newsletter-gem.md`, `gems/repurpose-gem.md` | skeletons complete |

C2 and C3 don't need her files — start them now, in parallel with C0/C1. C4+ on the billing side waits for the billing Excel.

---

## 8. Verification (how we know Track C works)

- **Privacy (the gate):** feed each live Gem a fake full name → it halts and asks for an alias. If any Gem processes the name, Track C is **not** done.
- **Voice doc:** Content Gem produces 3 sample posts → Michal confirms they sound like her, not "flat."
- **Reusability:** edit the Voice doc once, re-upload → all Gems reflect the change.
- **No leakage:** grep this repo for names/emails/phones before any commit; `.gitignore` blocks `alias-map*` and `*-PII*`.

---

## 9. Open decisions (need Nadav's call)

1. ~~Knowledge hub for the foundation~~ — **RESOLVED 2026-06-28: decide later.** Voice doc is a standalone Google Doc; hub choice deferred to Track B. See §6.
2. **Start C2 (privacy preamble) + C3 (Voice doc) now**, before her files arrive? They don't need her input. Recommended: yes. *(C2 done.)*
3. **YouTube extension:** wire it in Track C launch, or defer to the Repurpose Gem build in Track B? Recommended: defer.
