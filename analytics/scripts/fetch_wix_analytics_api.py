"""
שלד ראשוני למשיכת נתוני Wix Analytics API.

צריך להשלים לפי סוג המדידה המדויק ב-Wix ולפי ההרשאות בחשבון של מיכל.
הסוכן ב-Antigravity יכול להשתמש בקובץ הזה כנקודת התחלה.
"""

from pathlib import Path
import os
import json
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs"
OUT.mkdir(exist_ok=True)

API_TOKEN = os.getenv("WIX_API_TOKEN")
SITE_ID = os.getenv("WIX_SITE_ID")

if not API_TOKEN or not SITE_ID:
    print("חסר WIX_API_TOKEN או WIX_SITE_ID. מלאו קובץ .env או הגדירו משתני סביבה.")
    raise SystemExit(1)

params = {
    # TODO: update according to Wix Analytics Data API measurement type and filters.
    "siteId": SITE_ID,
}
url = "https://www.wixapis.com/analytics/v2/site-analytics/data?" + urllib.parse.urlencode(params)
req = urllib.request.Request(
    url,
    headers={
        "Authorization": API_TOKEN,
        "Content-Type": "application/json",
    },
)

with urllib.request.urlopen(req, timeout=30) as res:
    data = json.loads(res.read().decode("utf-8"))

(OUT / "wix_analytics_raw.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"נשמרו נתוני Wix: {OUT / 'wix_analytics_raw.json'}")
