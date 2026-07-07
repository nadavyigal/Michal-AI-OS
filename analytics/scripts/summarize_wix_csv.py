from pathlib import Path
import csv
import json

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT = ROOT / "outputs"
OUT.mkdir(exist_ok=True)

csv_files = sorted(DATA.glob("*.csv"), key=lambda p: p.stat().st_mtime, reverse=True)
if not csv_files:
    print("לא נמצאו קבצי CSV בתיקיית data.")
    raise SystemExit(0)

path = csv_files[0]
rows = []
with path.open("r", encoding="utf-8-sig", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        rows.append(row)

summary = {
    "file": path.name,
    "rows": len(rows),
    "columns": list(rows[0].keys()) if rows else [],
}

(OUT / "latest_csv_structure.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

md = [
    "# סיכום CSV אחרון מ-Wix",
    "",
    f"קובץ: `{path.name}`",
    f"כמות שורות: {len(rows)}",
    "",
    "## עמודות שזוהו",
]
for col in summary["columns"]:
    md.append(f"- {col}")

md += [
    "",
    "## הצעד הבא",
    "בקש מהסוכן למפות את העמודות למדדים: מבקרים, ביקורים, לידים, הזמנות, הכנסות, מקור תנועה ועמוד מוביל.",
]

(OUT / "summary_latest.md").write_text("\n".join(md), encoding="utf-8")
print(f"נוצר סיכום: {OUT / 'summary_latest.md'}")
