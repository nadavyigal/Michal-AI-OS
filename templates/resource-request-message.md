---
title: Resource-request message to Michal (story C0)
status: ready to send
owner: Nadav
created: 2026-06-28
privacy: client-safe — no PII (this is the message itself, not her response)
---

# Resource-request message — ready to send

Keep the ask minimal: only the two billing files, plus one light confirmation line on the
framing correction found while building the Voice doc (§0 of `docs/michal-voice-tone-design.md`).
We do not ask her for content/branding — that's sourced from her own public assets already.

```
היי מיכל 🙏 כדי להתחיל לבנות לך את מערכת ה-AI, אני צריך שני קבצים:
1. קובץ הגבייה (האקסל החודשי של המתאמנים).
2. קובץ ה-E-motion (טבלת הגמולים).
אפשר עם ראשי תיבות/כינויים במקום שמות מלאים — שום פרט מזהה לא נכנס ל-AI,
את משלימה שמות אמיתיים רק ברגע השליחה.

ושאלה קטנה אחת לפני שממשיכים: אני מבין שאת גם מאמנת אישית/זוגית (שיטת סאטיה)
וגם מלווה מנהלים וצוותים מהניסיון הניהולי שלך — זה נכון? רוצה לדייק את הקול
לפני שאני בונה עליו.
```

The 20-video location and visual-identity confirmation (which of the two palettes found in
her repos is current) are **not** in this first message — raise those live in tonight's
meeting instead (see `docs/track-c-meeting-runbook.md`).

---

## Update 2026-06-28 (evening, before the meeting): she's already sending 3 things

Michal confirmed she's sending the **billing Excel**, the **E-motion sheet**, and the **20
marketing assets** (resolves the video-location open item). Two things this doesn't cover —
raise both tonight:

1. **A sample month of her raw weekly session notes**, separate from the Excel. The Excel is
   the monthly summary; `gems/billing-gem.md` needs to read her *weekly* input format (however
   she actually jots it day-to-day) to be built against reality instead of a guess.
2. **PII handling on the incoming files.** The Excel and E-motion sheet will have real client
   names — they need aliasing **before** they touch Gemini, Notion, or this repo. Either ask her
   to re-export with aliases already in, or alias them yourself the moment they land, before
   using them anywhere. Do not paste either file as-is into any AI tool.
