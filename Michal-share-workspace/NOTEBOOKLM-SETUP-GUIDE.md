# NotebookLM Setup Guide — Michal Content OS

Use this if Gemini Gems feel too disconnected from Drive.

עדכון: בנוסף למחברת התוכן הראשית, מומלץ להקים שלוש מחברות ייעוץ נפרדות:

- `מיכל - STORM` — מחקר, רעיונות, הזדמנויות וכיווני פעולה.
- `מיכל - ADVISOR` — ייעוץ עסקי, סדרי עדיפויות ותוכנית עבודה.
- `מיכל - RED TEAM` — ביקורת איכות, פרטיות, אמינות וסיכונים.

הוראות ההדבקה לכל אחת נמצאות בתיקייה:

`notebooklm-advisors/`

## Recommended structure

Create one main notebook:

`Michal Content OS`

Use it for:

- voice and tone
- positioning
- content pillars
- 30-day content calendars
- hooks
- newsletter ideas
- repurposing videos
- social media strategy

Keep billing/client operations separate because of privacy risk.

## Sources to add

Add these Drive files as sources:

1. `01-Michal-Voice-Hebrew.md`
2. `SM-00-README-Hebrew.md`
3. `SM-01-Niche-Audience-Hebrew.md`
4. `SM-02-Positioning-Brand-Hebrew.md`
5. `SM-03-Content-Pillars-Hebrew.md`
6. `SM-04-30-Day-Calendar-Hebrew.md`
7. `SM-05-Viral-Hooks-Hebrew.md`
8. `SM-06-Engagement-Community-Hebrew.md`
9. `SM-07-Analytics-Optimizer-Hebrew.md`

Optional later:

- YouTube video links
- transcripts
- examples of Michal's best posts
- current website copy

## Notebook instructions

Paste this into the notebook settings / custom instructions:

```text
אתה מערכת ניהול התוכן של מיכל סלונים.

המטרה שלך היא לעזור למיכל לבנות תוכן לרשתות חברתיות, ניוזלטרים, רעיונות לסרטונים, מסרים שיווקיים ותוכנית תוכן חודשית, על בסיס מקורות המחברת בלבד.

עבוד תמיד בעברית, אלא אם מבקשים אחרת.

שמור על הקול של מיכל כפי שהוא מוגדר במסמך הקול והטון. אל תכתוב כמו "מאמן גנרי". הכתיבה צריכה להרגיש אישית, חמה, ישירה, בוגרת, מחוברת לשטח, ולא שיווקית מדי.

אל תמציא עובדות על מיכל, ההכשרה שלה, לקוחות שלה, הצלחות שלה או הצעות מסחריות שלא מופיעות במקורות.

אם חסר מידע, שאל שאלת הבהרה קצרה לפני שאתה מייצר תוכן סופי.

אל תכניס או תבקש פרטים מזהים של לקוחות: שמות מלאים, טלפונים, אימיילים, כתובות או פרטים טיפוליים מזהים.

כשאתה יוצר תוכן, תן תוצר פרקטי ומוכן לעבודה: כותרת/הוק, גוף, קריאה לפעולה, כיוון ויזואלי, ורעיון לפורמט.
```

## First prompts to run

Start with this:

```text
קרא את כל מקורות המחברת. תן לי סיכום קצר של:
1. מי מיכל לפי החומרים
2. מי קהל היעד המרכזי
3. מהם 5 עמודי התוכן הכי חזקים
4. אילו שאלות חסרות צריך לשאול את מיכל לפני שבונים תוכנית תוכן חודשית
```

Then:

```text
על בסיס המקורות והתשובות של מיכל, בנה תוכנית תוכן ל-30 יום לאינסטגרם ופייסבוק. לכל יום תן: נושא, פורמט, הוק, רעיון לגוף הפוסט, CTA, וכיוון ויזואלי.
```

## What to keep as Gems

Keep Gems only for repeated workflows:

- `Content / Voice` — quick post drafting
- `Newsletter` — repeated newsletter format
- `Repurpose` — video/transcript to posts
- `Billing` — only if it refuses PII correctly

The NotebookLM notebook should be the main project brain.

## Advisor notebooks

Create three additional notebooks:

1. `מיכל - STORM`
2. `מיכל - ADVISOR`
3. `מיכל - RED TEAM`

For each notebook:

1. Open NotebookLM.
2. Create a new notebook.
3. Add only non-sensitive sources from Drive.
4. Open notebook settings / custom instructions.
5. Paste the matching prompt from `notebooklm-advisors/`.
6. Run the first sanity prompt:

```text
קרא את מקורות המחברת. הסבר במשפט אחד מה התפקיד שלך, ואז תן לי דוגמה לשאלה שכדאי לשאול אותך.
```
