---
title: Engagement Plan — Michal AI Operations Pilot
status: active
owner: Nadav
created: 2026-06-28
privacy: client-safe (no PII in this repo)
---

# Engagement Plan — Michal AI Operations Pilot

## Context

Nadav is starting a new AI-consulting engagement to help his partner **Michal** get more out of AI in her **daily operations** — and to actually **build her AI "operating system" and implement it for her**. This is the first real client for the **AI Audit Toolkit** (parked in the vault), so it does double duty: serve Michal *and* build/validate the toolkit's missing templates against a live case.

**Platform decision (overrides the earlier Notion+Claude pick):** Michal already pays for **Gemini**, so we build her OS on **Gemini** — Gemini Advanced + **Gems** (her "skills") + Workspace/app **extensions** (her "plugins"). Nadav builds the artifacts here (Gem instructions, prompt files, skill/plugin specs) and **implements them in her Gemini account**.

Inputs gathered:
- **1-on-1 meeting transcript** (Michal's own words, authoritative).
- **Google Doc questionnaire** (`1BxE_EHYmPBXF2QExziELY0O66sjtDq2VO_0dMkjGSjM`) — AI-generated profile, flagged "not verified truth."
- **Existing repos:** `Michal-Business-Card-`, `Michal-full-course-`, `landing-page---Michal-course` + Vercel `michal-business-card`.
- **Parked framework:** `AI Audit Toolkit Home.md` — 6-step model (Intake → Pre-audit → Call → Report → Roadmap → Implementation); template notes referenced but never written.

**Confirmed direction:** build all three tracks **in parallel**, but **start with Track C** (the OS foundation everything else runs on); **quick win first, then roadmap**; first action is to **send Michal a message requesting the missing resources** (billing Excel, content samples, etc.) needed to build her OS.

---

## Two findings that shape everything

### 1. Privacy is a hard constraint (Michal's red line)
The AI must **never** see full client names, emails, or identifying data. Every workflow is built so **PII never enters Gemini**: aliases/initials in, Michal keeps a private offline alias→identity map, real names re-attached only at the manual send step. Restate this rule at the top of every Gem and every spec.

### 2. Business framing (now largely resolved → **life coach**)
Her Instagram handle is **`michal_slonim_life_coach`** (https://www.instagram.com/michal_slonim_life_coach/). That, plus the Google Doc's couples-coaching read and the course repos, points to a **life / relationship coach** — the transcript's "מתאמנים / אימונים" are **coaching clients / sessions**, not gym workouts, and **E-motion** is the platform/affiliation she settles commissions through. Treat **life coach** as the working framing; keep one light confirmation line in the message rather than a separate diagnostic.

---

## Tracks (build in parallel; Track C is the foundation, start there)

### Track C — AI OS setup (FOUNDATION — start here)
Stand up Michal's Gemini-based operating system that Tracks A and B then run on.
- **Gemini account audit:** confirm her tier (Advanced?), what Gems/extensions she has, Workspace connection, where her files live (transcript says **Mac Files**, not Drive).
- **"Michal's Voice" Tone / Style / Design doc** — the core knowledge asset. **We build it ourselves** by mining her public assets (Instagram, business card site, course/landing repos). Loaded into every Gem. Also the Track B quick win.
- **Skills = a set of Gems**, each with the privacy rule baked in: Billing Gem, Content/Voice Gem, Newsletter Gem, Repurpose Gem.
- **Plugins = Gemini extensions / connected apps** (Workspace: Docs/Sheets/Gmail; YouTube). Flag agentic/MCP-style limits on the consumer tier.
- **Knowledge hub:** Notion (or Google Workspace) as asset library + content calendar; Gemini Gems as the generation surface.

### Track A — Billing / Collection assistant (quick win)
Current loop: weekly phone note → month-end counts sessions per trainee → Excel → SMS each trainee → checks payment → Green Invoice receipt → reconciles **E-motion** commission sheet.
- **Billing Gem does:** ingest aliased weekly notes → build sessions table → draft per-client SMS in her voice. She reviews, edits, re-attaches names, sends.
- **Does NOT:** touch Green Invoice, change records, or send automatically.
- **Needs from her:** billing Excel + E-motion sheet structure + one sample month of weekly notes (anonymized).

### Track B — Marketing / Content engine (quick win + roadmap)
Pain: flat outsourced copy; IG+FB same content; inactive newsletter; no LinkedIn; ~20 videos (~3 months) with no publishing plan; wants a Tone/Style/Design doc (built in Track C).
- **Quick win:** Content/Voice Gem producing posts that sound like her.
- **Sources we pull ourselves:** Instagram, business-card site, course/landing repos. The 20 videos need a link/folder — confirm later.
- **Build out:** Notion content calendar + 7-prompt social workflow + 20-video publishing plan + bi-weekly newsletter outline generator.

### Longer term (roadmap only)
Lightweight task management and the custom trainee app ("Misha's app"). Capture in roadmap; do not scope now.

---

## First action — resource-request message to Michal

Keep the first ask **minimal** — only the two billing files. Voice/tone/style/logo we build ourselves from public assets.

> **היי מיכל 🙏 כדי להתחיל לבנות לך את מערכת ה‑AI, אני צריך שני קבצים:**
> 1. **קובץ הגבייה** (האקסל החודשי של המתאמנים).
> 2. **קובץ ה‑E‑motion** (טבלת הגמולים).
> אפשר עם ראשי תיבות/כינויים במקום שמות מלאים — שום פרט מזהה לא נכנס ל‑AI, את משלימה שמות אמיתיים רק ברגע השליחה.

---

## Tooling & privacy architecture

- **Gemini Advanced** = platform; **Gems** = skills; **extensions/connected apps** = plugins.
- **Notion or Google Workspace** = human-facing knowledge base + content calendar + asset library (no PII; clients as aliases).
- **Anonymization rule** baked into every Gem and spec; Michal keeps the alias→identity map offline; real names re-attached only at manual send.

---

## Deliverables / artifacts

**Client-facing (this phase):**
1. Track C: configured Gemini OS — Gems + wired extensions + "Michal's Voice" doc.
2. Track A: Billing Gem → sessions table + SMS drafts.
3. Track B: Content/Voice Gem + Notion calendar + 20-video plan + newsletter generator.
4. The resource-request message (sent).
5. Final audit report + prioritized roadmap.

**Toolkit-building (reuse value):**
6. AI Audit Toolkit Intake Form (short-prompt model).
7. AI Audit Toolkit Call Script.
8. AI Audit Toolkit Report Template.

---

## Sequencing

1. Send the resource-request message + reconcile business framing.
2. Track C foundation: stand up Gemini OS — build "Michal's Voice" doc + author core Gems + wire extensions.
3. In parallel: Track A Billing Gem and Track B Content Gem.
4. Implement in her Gemini account.
5. Notion content calendar + 20-video publishing plan + newsletter generator.
6. Audit report + roadmap.
7. Backfill the 3 toolkit templates.

---

## Verification

- **OS/Gems:** each Gem opens, follows instructions, refuses/strips PII when tested with a name.
- **Voice doc:** 3 sample posts → Michal confirms they sound like her.
- **Billing:** one aliased month → table matches her hand version; SMS send-ready, zero PII.
- **Content calendar:** she finds an asset + sees next-2-weeks content in under a minute.
- **Privacy:** audit every Gem/spec/note for names/emails/phones before handoff.
- **Toolkit:** the 3 phantom links resolve; `wiki-log.md` has the ingest entry.
