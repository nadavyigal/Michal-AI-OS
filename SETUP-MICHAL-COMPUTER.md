# הקמה במחשב של מיכל — Antigravity + GitHub

מבנה: שני פרויקטים מסונכרנים דרך GitHub (תוכן, אנליטיקס) ופרויקט אחד מקומי בלבד (גבייה). הגבייה לא נכנסת ל-GitHub לעולם — היא מכילה שמות ופרטי לקוחות אמיתיים.

## מה מגיע מאיפה

| פרויקט | תיקייה במחשב של מיכל | מקור | Git? |
|---|---|---|---|
| תוכן | `Documents/Michal-AI-OS/content` | clone מ-GitHub | כן (פרטי) |
| אנליטיקס | `Documents/Michal-AI-OS/analytics` | clone מ-GitHub | כן (פרטי) |
| גבייה | `Documents/billing` | zip מקומי (לא GitHub) | לא, לעולם |

## שלב 1 — Clone מ-GitHub לתוך Antigravity

1. פתחי את Antigravity.
2. בחרי Clone repository / Clone from GitHub.
3. כתובת: `https://github.com/nadavyigal/Michal-AI-OS`
4. יעד: `Documents` (ייווצר `Documents/Michal-AI-OS`).
5. פתחי את שתי התיקיות כפרויקטים נפרדים: `content` ו-`analytics`.

## שלב 2 — פרויקט הגבייה (מקומי בלבד)

1. פתחי את קובץ ה-zip של הגבייה (נשלח בנפרד, לא ב-Drive ולא ב-GitHub).
2. חלצי אותו ל-`Documents/billing`.
3. שימי את קבצי האקסל הרגישים (`אקסל מתאמנים.ods`, `טבלה 2026.xlsx`) רק בתוך `Documents/billing/data`.
4. פתחי את `Documents/billing` כפרויקט נפרד ב-Antigravity.

חשוב: אף פעם לא להעלות את `billing` ל-GitHub, ל-Drive, ל-NotebookLM או ל-Gemini.

## שלב 3 — הפעלה

בכל פרויקט יש קובץ `AGENTS.md` שמגדיר לסוכן את התפקיד ואת הכלל: **תמיד לתכנן לפני ביצוע ולחכות לאישור.** הפרומפטים להרצה נמצאים בתיקיית `prompts` של כל פרויקט, ובקובץ `Michal-share-workspace/SETUP-PROMPTS-ANTIGRAVITY.md`.

- תוכן: פתחי, הדביקי את פרומפט ההקמה מ-`content/prompts/משימות-תוכן.md`.
- אנליטיקס: הסוכן חוקר בעצמו את Wix Analytics API (ראי `analytics/AGENTS.md`), מציג תוכנית, ואז מבצע.
- גבייה: הריצי את פרומפט ההקמה מ-`billing/prompts/משימות-גבייה.md`.

## שלב 4 — עדכונים

כשמעדכנים תוכן או אנליטיקס: הסוכן (או מיכל) עושה commit + push, ובמחשב אחר עושים pull. הגבייה נשארת מקומית ולא מסתנכרנת.
