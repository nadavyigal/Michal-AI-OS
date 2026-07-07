import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "../outputs/story3";
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const colors = {
  deep: "#24495D",
  ink: "#344B59",
  cream: "#FAF4ED",
  sage: "#DFE6DF",
  paper: "#FFFDF9",
  white: "#FFFFFF",
  line: "#DCCDC2",
  input: "#FFF2CC",
};

const dashboard = workbook.worksheets.add("דשבורד");
const input = workbook.worksheets.add("הזנה יומית");
const setup = workbook.worksheets.add("הגדרת Wix");
const defs = workbook.worksheets.add("הגדרות מדדים");
const sources = workbook.worksheets.add("מקורות");

for (const sheet of [dashboard, input, setup, defs, sources]) {
  sheet.showGridLines = false;
}

function styleTitle(sheet, range, title, subtitle) {
  range.merge();
  range.values = [[title]];
  range.format = {
    fill: colors.deep,
    font: { bold: true, color: colors.white, size: 18, name: "Arial" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
  };
  range.format.rowHeight = 38;
  if (subtitle) {
    const next = sheet.getRange("A2:J2");
    next.merge();
    next.values = [[subtitle]];
    next.format = {
      fill: colors.cream,
      font: { color: colors.ink, italic: true, size: 11, name: "Arial" },
      horizontalAlignment: "center",
      wrapText: true,
    };
    next.format.rowHeight = 30;
  }
}

function styleHeader(range) {
  range.format = {
    fill: colors.deep,
    font: { bold: true, color: colors.white, name: "Arial" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "outside", style: "thin", color: colors.deep },
  };
}

function styleTable(range) {
  range.format = {
    borders: {
      insideHorizontal: { style: "thin", color: colors.line },
      insideVertical: { style: "thin", color: colors.line },
      top: { style: "thin", color: colors.line },
      bottom: { style: "thin", color: colors.line },
      left: { style: "thin", color: colors.line },
      right: { style: "thin", color: colors.line },
    },
    verticalAlignment: "top",
    wrapText: true,
  };
}

function setWidths(sheet, widths) {
  widths.forEach((width, index) => {
    sheet.getRangeByIndexes(0, index, 1, 1).format.columnWidth = width;
  });
}

styleTitle(input, input.getRange("A1:J1"), "הזנה יומית - ביצועי אתר Wix", "ממלאים שורה אחת בכל יום מתוך דוחות Wix Analytics. התאים הצהובים הם שדות ידניים.");
input.getRange("A4:J4").values = [[
  "תאריך",
  "מבקרים",
  "ביקורים",
  "צפיות עמוד",
  "לידים / טפסים",
  "הזמנות",
  "הכנסות",
  "מקור תנועה מוביל",
  "עמוד מוביל",
  "הערה / פעולה",
]];
styleHeader(input.getRange("A4:J4"));

const baseDate = new Date("2026-07-01T00:00:00");
const rows = [
  [0, 72, 86, 154, 4, 1, 197, "אינסטגרם", "מחוברים מחדש", "שורת דוגמה - להחליף בנתוני Wix אמיתיים."],
  [1, 64, 75, 132, 3, 0, 0, "כניסה ישירה", "כרטיס ביקור", "לבדוק הקלקות CTA."],
  [2, 91, 103, 218, 7, 2, 394, "פייסבוק", "מחוברים מחדש", "יום המרה טוב."],
  [3, 58, 69, 121, 2, 0, 0, "חיפוש אורגני", "בית", "לבדוק למה יחס הלידים נמוך."],
  [4, 83, 96, 190, 5, 1, 197, "אינסטגרם", "מחוברים מחדש", "פוסט יצר תנועה."],
  [5, 77, 89, 173, 4, 1, 197, "וואטסאפ", "עסקים משפחתיים", "תנועה חמה משיתופים ישירים."],
  [6, 105, 124, 261, 8, 3, 591, "פייסבוק", "מחוברים מחדש", "היום החזק בשבוע."],
];
input.getRange("A5:J11").values = rows.map(([offset, visitors, sessions, views, leads, orders, revenue, source, page, notes]) => {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + offset);
  return [d, visitors, sessions, views, leads, orders, revenue, source, page, notes];
});
styleTable(input.getRange("A5:J205"));
input.getRange("A5:A205").setNumberFormat("yyyy-mm-dd");
input.getRange("B5:F205").setNumberFormat("#,##0");
input.getRange("G5:G205").setNumberFormat('"₪"#,##0');
input.getRange("A5:J205").format.fill = colors.input;
input.freezePanes.freezeRows(4);
setWidths(input, [13, 11, 11, 13, 15, 10, 12, 20, 20, 38]);
input.tables.add("A4:J205", true, "DailyInputTable");

styleTitle(dashboard, dashboard.getRange("A1:J1"), "דשבורד ביצועי אתר יומי", "מבט יומי למיכל: תנועה, לידים, מכירות, המרות והפעולה הבאה.");
dashboard.getRange("A4:B4").values = [["תאריך אחרון", ""]];
dashboard.getRange("B4").formulas = [["=IFERROR(LOOKUP(2,1/('הזנה יומית'!A5:A205<>\"\"),'הזנה יומית'!A5:A205),\"\")"]];
dashboard.getRange("B4").setNumberFormat("yyyy-mm-dd");
dashboard.getRange("A4:B4").format = {
  fill: colors.cream,
  font: { bold: true, color: colors.ink, name: "Arial" },
  borders: { preset: "outside", style: "thin", color: colors.line },
};

const cards = [
  ["מבקרים", "=IF($B$4=\"\",\"\",SUMIFS('הזנה יומית'!B5:B205,'הזנה יומית'!A5:A205,$B$4))", "#,##0"],
  ["לידים", "=IF($B$4=\"\",\"\",SUMIFS('הזנה יומית'!E5:E205,'הזנה יומית'!A5:A205,$B$4))", "#,##0"],
  ["הזמנות", "=IF($B$4=\"\",\"\",SUMIFS('הזנה יומית'!F5:F205,'הזנה יומית'!A5:A205,$B$4))", "#,##0"],
  ["הכנסות", "=IF($B$4=\"\",\"\",SUMIFS('הזנה יומית'!G5:G205,'הזנה יומית'!A5:A205,$B$4))", '"₪"#,##0'],
  ["יחס המרה לליד", "=IFERROR(B7/B6,0)", "0.0%"],
  ["יחס המרה למכירה", "=IFERROR(B8/B6,0)", "0.0%"],
  ["ממוצע הזמנה", "=IFERROR(B9/B8,0)", '"₪"#,##0'],
  ["מקור מוביל", "=IFERROR(INDEX('הזנה יומית'!H5:H205,MATCH($B$4,'הזנה יומית'!A5:A205,0)),\"\")", "@"],
  ["עמוד מוביל", "=IFERROR(INDEX('הזנה יומית'!I5:I205,MATCH($B$4,'הזנה יומית'!A5:A205,0)),\"\")", "@"],
  ["פעולה להיום", "=IFERROR(INDEX('הזנה יומית'!J5:J205,MATCH($B$4,'הזנה יומית'!A5:A205,0)),\"\")", "@"],
];
dashboard.getRange("A6:B15").values = cards.map(([label]) => [label, ""]);
dashboard.getRange("B6:B15").formulas = cards.map(([, formula]) => [formula]);
dashboard.getRange("A6:A15").format = {
  fill: colors.deep,
  font: { bold: true, color: colors.white, name: "Arial" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
dashboard.getRange("B6:B15").format = {
  fill: colors.paper,
  font: { bold: true, color: colors.ink, size: 13, name: "Arial" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: colors.line },
  wrapText: true,
};
cards.forEach(([, , numberFormat], i) => dashboard.getRange(`B${6 + i}`).setNumberFormat(numberFormat));
styleTable(dashboard.getRange("A6:B15"));

dashboard.getRange("D4:J4").values = [["מגמת 7 ימים", "מבקרים", "לידים", "הזמנות", "הכנסות", "המרה לליד", "המרה למכירה"]];
styleHeader(dashboard.getRange("D4:J4"));
dashboard.getRange("D5:J11").formulas = Array.from({ length: 7 }, (_, i) => {
  const sourceRow = 5 + i;
  return [
    `=TEXT('הזנה יומית'!A${sourceRow},"yyyy-mm-dd")`,
    `='הזנה יומית'!B${sourceRow}`,
    `='הזנה יומית'!E${sourceRow}`,
    `='הזנה יומית'!F${sourceRow}`,
    `='הזנה יומית'!G${sourceRow}`,
    `=IFERROR(F${5 + i}/E${5 + i},0)`,
    `=IFERROR(G${5 + i}/E${5 + i},0)`,
  ];
});
styleTable(dashboard.getRange("D5:J11"));
dashboard.getRange("D5:D11").setNumberFormat("@");
dashboard.getRange("E5:G11").setNumberFormat("#,##0");
dashboard.getRange("H5:H11").setNumberFormat('"₪"#,##0');
dashboard.getRange("I5:J11").setNumberFormat("0.0%");
const chart = dashboard.charts.add("line", dashboard.getRange("D4:H11"));
chart.title = "תנועה, לידים, הזמנות והכנסות";
chart.hasLegend = true;
chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
chart.yAxis = { numberFormatCode: "#,##0" };
chart.setPosition("D13", "J28");

dashboard.getRange("A18:B24").values = [
  ["צ'קליסט החלטה", "להשתמש בכל בוקר"],
  ["1", "האם התנועה עלתה או ירדה ביחס לימים האחרונים?"],
  ["2", "האם הלידים/הזמנות זזו יחד עם התנועה?"],
  ["3", "איזה מקור או עמוד עבד הכי טוב?"],
  ["4", "מה פעולה אחת שמיכל צריכה לעשות היום?"],
  ["5", "אם יש הרבה לידים אבל מעט מכירות - לבדוק המשך טיפול."],
  ["6", "אם יש הרבה תנועה ומעט לידים - לבדוק מסר/CTA בעמוד."],
];
styleHeader(dashboard.getRange("A18:B18"));
styleTable(dashboard.getRange("A19:B24"));
dashboard.getRange("A19:A24").format = {
  fill: colors.sage,
  font: { bold: true, color: colors.deep, name: "Arial" },
  horizontalAlignment: "center",
};
setWidths(dashboard, [22, 32, 3, 14, 12, 10, 10, 13, 13, 13]);
dashboard.freezePanes.freezeRows(3);

styleTitle(setup, setup.getRange("A1:D1"), "הגדרת Wix - דוחות יומיים", "דוחות מומלצים ושגרת עבודה יומית.");
setup.getRange("A4:D4").values = [["שלב", "איפה ב-Wix", "מה לבחור", "הערות"]];
styleHeader(setup.getRange("A4:D4"));
setup.getRange("A5:D12").values = [
  ["1", "Dashboard > Analytics > All Reports", "Traffic Overview", "להפעיל מייל יומי אם זמין. אחרת לייצא CSV ידנית."],
  ["2", "Dashboard > Analytics > All Reports", "Sales Overview", "רלוונטי אם רכישות עוברות דרך Wix."],
  ["3", "Dashboard > Analytics > All Reports", "Form Submissions over Time", "לידים / פניות יומיות."],
  ["4", "Dashboard > Analytics > All Reports", "Form Submissions by Traffic Source", "להבין מאיפה הגיעו הלידים."],
  ["5", "Dashboard > Analytics > All Reports", "Top Pages / Page Visits", "לזהות עמודים חזקים."],
  ["6", "עמוד הדוח", "Export > CSV", "לשמירה ועדכון ידני בגיליון."],
  ["7", "עמוד הדוח", "Subscribe", "לשליחת דוח יומי/שבועי במייל."],
  ["8", "כל בוקר", "לעדכן הזנה יומית", "שורה אחת ביום מספיקה לדשבורד."],
];
styleTable(setup.getRange("A5:D12"));
setWidths(setup, [9, 31, 31, 48]);

styleTitle(defs, defs.getRange("A1:D1"), "הגדרות מדדים", "הגדרות קבועות כדי שהדוח יישאר ברור.");
defs.getRange("A4:D4").values = [["מדד", "הגדרה", "מקור / חישוב", "שאלה ניהולית"]];
styleHeader(defs.getRange("A4:D4"));
defs.getRange("A5:D15").values = [
  ["מבקרים", "אנשים ייחודיים שנכנסו לאתר ביום.", "Wix Traffic Overview", "האם החשיפה גדלה?"],
  ["ביקורים", "סך כניסות לאתר. מבקר אחד יכול להיכנס כמה פעמים.", "Wix Traffic Overview", "האם אנשים חוזרים או בודקים עוד?"],
  ["צפיות עמוד", "סך צפיות בכל עמודי האתר.", "Wix Traffic Overview / Top Pages", "אילו עמודים יוצרים עניין?"],
  ["לידים / טפסים", "השארת פרטים או פנייה רלוונטית.", "Wix Forms Reports", "האם מבקרים מרימים יד?"],
  ["הזמנות", "רכישות שהושלמו.", "Wix Sales Reports", "האם עניין הפך להכנסה?"],
  ["הכנסות", "סך הכנסות יומי ממכירות Wix.", "Wix Sales Overview", "כמה כסף נכנס?"],
  ["יחס המרה לליד", "לידים חלקי מבקרים.", "לידים / מבקרים", "האם העמוד משכנע לפנות?"],
  ["יחס המרה למכירה", "הזמנות חלקי מבקרים.", "הזמנות / מבקרים", "האם תנועה הופכת לקנייה?"],
  ["ממוצע הזמנה", "הכנסות חלקי הזמנות.", "הכנסות / הזמנות", "כמה שווה כל הזמנה בממוצע?"],
  ["מקור מוביל", "מקור התנועה המרכזי.", "Wix Reports", "איפה להשקיע תשומת לב?"],
  ["עמוד מוביל", "העמוד עם הפעילות החזקה ביותר.", "Wix Top Pages", "איזה עמוד לקדם או לשפר?"],
];
styleTable(defs.getRange("A5:D15"));
setWidths(defs, [22, 43, 32, 43]);

styleTitle(sources, sources.getRange("A1:C1"), "מקורות", "מקורות Wix רשמיים לתהליך הדיווח.");
sources.getRange("A4:C4").values = [["נושא", "קישור", "הערה"]];
styleHeader(sources.getRange("A4:C4"));
sources.getRange("A5:C9").values = [
  ["הורדה/מנוי לדוחות", "https://support.wix.com/en/article/scheduling-wix-analytics-report-emails", "אפשר להוריד דוחות ולהירשם לדוחות במייל."],
  ["שאלות נפוצות Analytics", "https://support.wix.com/en/article/wix-analytics-faqs", "ל-Wix Analytics יש עיכוב מסוים בעדכון נתונים."],
  ["דוחות טפסים", "https://support.wix.com/en/article/wix-analytics-about-your-form-submission-reports", "מדידת לידים ומקורות תנועה."],
  ["דוחות מכירות", "https://support.wix.com/en/article/wix-analytics-about-your-sales-reports-4815635", "רלוונטי אם המכירות מתבצעות דרך Wix."],
  ["סקירת דוחות", "https://support.wix.com/en/article/about-wix-analytics-reports", "All Reports הוא המרכז לדוחות Wix Analytics."],
];
styleTable(sources.getRange("A5:C9"));
setWidths(sources, [28, 72, 54]);

for (const sheet of [dashboard, input, setup, defs, sources]) {
  sheet.getUsedRange().format.font = { name: "Arial", color: colors.ink };
  sheet.getUsedRange().format.wrapText = true;
  sheet.getUsedRange().format.verticalAlignment = "center";
  sheet.getUsedRange().format.autofitRows();
}

styleTitle(dashboard, dashboard.getRange("A1:J1"), "דשבורד ביצועי אתר יומי", "מבט יומי למיכל: תנועה, לידים, מכירות, המרות והפעולה הבאה.");
styleTitle(input, input.getRange("A1:J1"), "הזנה יומית - ביצועי אתר Wix", "ממלאים שורה אחת בכל יום מתוך דוחות Wix Analytics. התאים הצהובים הם שדות ידניים.");
styleTitle(setup, setup.getRange("A1:D1"), "הגדרת Wix - דוחות יומיים", "דוחות מומלצים ושגרת עבודה יומית.");
styleTitle(defs, defs.getRange("A1:D1"), "הגדרות מדדים", "הגדרות קבועות כדי שהדוח יישאר ברור.");
styleTitle(sources, sources.getRange("A1:C1"), "מקורות", "מקורות Wix רשמיים לתהליך הדיווח.");
styleHeader(dashboard.getRange("D4:J4"));
styleHeader(dashboard.getRange("A18:B18"));
styleHeader(input.getRange("A4:J4"));
styleHeader(setup.getRange("A4:D4"));
styleHeader(defs.getRange("A4:D4"));
styleHeader(sources.getRange("A4:C4"));
dashboard.getRange("A6:A15").format = {
  fill: colors.deep,
  font: { bold: true, color: colors.white, name: "Arial" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
dashboard.getRange("B6:B15").format = {
  fill: colors.paper,
  font: { bold: true, color: colors.ink, size: 13, name: "Arial" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: colors.line },
  wrapText: true,
};

const preview = await workbook.render({ sheetName: "דשבורד", autoCrop: "all", scale: 1, format: "png" });
await fs.writeFile(`${outputDir}/דוח_ביצועים_יומי_דשבורד.png`, new Uint8Array(await preview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(`${outputDir}/דוח_ביצועים_יומי_אתר_מיכל.xlsx`);
console.log(`${outputDir}/דוח_ביצועים_יומי_אתר_מיכל.xlsx`);
