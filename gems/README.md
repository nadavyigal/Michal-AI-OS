# Gems — Michal's AI OS "skills"

Each file here is the **instruction text for one Gem**, authored locally and pasted into
Michal's Gemini account by Nadav. A Gem in Gemini = custom instructions + knowledge files.

## Build rule
Every Gem's instructions start with the verbatim block from
[`privacy-preamble.md`](privacy-preamble.md), then follow the skeleton in
[`../docs/track-c-ai-os-spec.md`](../docs/track-c-ai-os-spec.md) §4.

## Shared knowledge file
All Gems attach the same **"Michal's Voice"** Google Doc as a knowledge file. Voice changes
= edit that one doc and re-upload to each Gem.

## Files
| File | Gem | Status |
|------|-----|--------|
| `privacy-preamble.md` | (shared block, all Gems) | ✅ written (story C2) |
| `billing-gem.md` | Billing (Track A) | ⬜ awaits billing Excel (story C4) |
| `content-voice-gem.md` | Content/Voice (Track B) | ⬜ after Voice doc (story C5) |
| `newsletter-gem.md` | Newsletter (Track B) | ⬜ story C8 |
| `repurpose-gem.md` | Repurpose (Track B) | ⬜ story C8 |

## Hard rules (every Gem, no exceptions)
- No PII ever enters a Gem. Halt-and-ask on detection.
- Drafts only. No sending, posting, or autonomous action.
- The Billing Gem connects to **no** extensions. Closed box.
