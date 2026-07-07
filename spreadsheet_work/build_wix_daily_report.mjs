import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "../outputs/story3";
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();

const colors = {
  deep: "#24495D",
  ink: "#344B59",
  rose: "#D9A6A0",
  cream: "#FAF4ED",
  sage: "#DFE6DF",
  paper: "#FFFDF9",
  white: "#FFFFFF",
  line: "#DCCDC2",
  input: "#FFF2CC",
  good: "#DDEEDB",
  warn: "#FCE4D6",
};

const dashboard = workbook.worksheets.add("Dashboard");
const input = workbook.worksheets.add("Daily Input");
const setup = workbook.worksheets.add("Wix Setup");
const defs = workbook.worksheets.add("Metric Definitions");
const sources = workbook.worksheets.add("Sources");

for (const sheet of [dashboard, input, setup, defs, sources]) {
  sheet.showGridLines = false;
}

function styleTitle(sheet, range, title, subtitle) {
  range.merge();
  range.values = [[title]];
  range.format = {
    fill: colors.deep,
    font: { bold: true, color: colors.white, size: 18 },
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
      font: { color: colors.ink, italic: true, size: 11 },
      horizontalAlignment: "center",
      wrapText: true,
    };
    next.format.rowHeight = 30;
  }
}

function styleHeader(range) {
  range.format = {
    fill: colors.deep,
    font: { bold: true, color: colors.white },
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

// Daily Input
styleTitle(
  input,
  input.getRange("A1:J1"),
  "Daily Input - Wix Website Performance",
  "Paste one row per day from Wix Analytics reports. Yellow fields are manual inputs; calculated fields live on Dashboard."
);
input.getRange("A4:J4").values = [[
  "Date",
  "Visitors",
  "Sessions",
  "Page Views",
  "Leads / Forms",
  "Orders",
  "Revenue",
  "Top Traffic Source",
  "Top Page",
  "Notes / Action",
]];
styleHeader(input.getRange("A4:J4"));

const baseDate = new Date("2026-07-01T00:00:00");
const sampleRows = [
  [0, 72, 86, 154, 4, 1, 197, "Instagram", "מחוברים מחדש", "Example row - replace with real Wix data."],
  [1, 64, 75, 132, 3, 0, 0, "Direct", "Business Card", "Check CTA clicks."],
  [2, 91, 103, 218, 7, 2, 394, "Facebook", "מחוברים מחדש", "Good conversion day."],
  [3, 58, 69, 121, 2, 0, 0, "Organic Search", "Home", "Review low lead rate."],
  [4, 83, 96, 190, 5, 1, 197, "Instagram", "מחוברים מחדש", "Post drove traffic."],
  [5, 77, 89, 173, 4, 1, 197, "WhatsApp", "Family Business", "Warm traffic from direct shares."],
  [6, 105, 124, 261, 8, 3, 591, "Facebook", "מחוברים מחדש", "Strongest day this week."],
];

input.getRange("A5:J11").values = sampleRows.map(([offset, visitors, sessions, views, leads, orders, revenue, source, page, notes]) => {
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
setWidths(input, [13, 11, 11, 12, 13, 10, 12, 19, 20, 36]);
input.tables.add("A4:J205", true, "DailyInputTable");

// Dashboard
styleTitle(
  dashboard,
  dashboard.getRange("A1:J1"),
  "Wix Daily Performance Dashboard",
  "Daily view for Michal: traffic, leads, sales, conversion and the next action."
);
dashboard.getRange("A4:B4").values = [["Latest Date", ""]];
dashboard.getRange("B4").formulas = [["=IFERROR(LOOKUP(2,1/('Daily Input'!A5:A205<>\"\"),'Daily Input'!A5:A205),\"\")"]];
dashboard.getRange("B4").setNumberFormat("yyyy-mm-dd");
dashboard.getRange("A4:B4").format = {
  fill: colors.cream,
  font: { bold: true, color: colors.ink },
  borders: { preset: "outside", style: "thin", color: colors.line },
};

const cards = [
  ["Visitors", "=IF($B$4=\"\",\"\",SUMIFS('Daily Input'!B5:B205,'Daily Input'!A5:A205,$B$4))", "#,##0"],
  ["Leads", "=IF($B$4=\"\",\"\",SUMIFS('Daily Input'!E5:E205,'Daily Input'!A5:A205,$B$4))", "#,##0"],
  ["Orders", "=IF($B$4=\"\",\"\",SUMIFS('Daily Input'!F5:F205,'Daily Input'!A5:A205,$B$4))", "#,##0"],
  ["Revenue", "=IF($B$4=\"\",\"\",SUMIFS('Daily Input'!G5:G205,'Daily Input'!A5:A205,$B$4))", '"₪"#,##0'],
  ["Lead Conversion", "=IFERROR(B7/B6,0)", "0.0%"],
  ["Sales Conversion", "=IFERROR(B8/B6,0)", "0.0%"],
  ["Avg Order Value", "=IFERROR(B9/B8,0)", '"₪"#,##0'],
  ["Top Source", "=IFERROR(INDEX('Daily Input'!H5:H205,MATCH($B$4,'Daily Input'!A5:A205,0)),\"\")", "@"],
  ["Top Page", "=IFERROR(INDEX('Daily Input'!I5:I205,MATCH($B$4,'Daily Input'!A5:A205,0)),\"\")", "@"],
  ["Today Action", "=IFERROR(INDEX('Daily Input'!J5:J205,MATCH($B$4,'Daily Input'!A5:A205,0)),\"\")", "@"],
];

dashboard.getRange("A6:B15").values = cards.map(([label]) => [label, ""]);
dashboard.getRange("B6:B15").formulas = cards.map(([, formula]) => [formula]);
dashboard.getRange("A6:A15").format = {
  fill: colors.deep,
  font: { bold: true, color: colors.white },
  horizontalAlignment: "center",
};
dashboard.getRange("B6:B15").format = {
  fill: colors.paper,
  font: { bold: true, color: colors.ink, size: 13 },
  horizontalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: colors.line },
  wrapText: true,
};
cards.forEach(([, , numberFormat], i) => {
  dashboard.getRange(`B${6 + i}`).setNumberFormat(numberFormat);
});
styleTable(dashboard.getRange("A6:B15"));

dashboard.getRange("D4:J4").values = [["7-Day Trend", "Visitors", "Leads", "Orders", "Revenue", "Lead Conv.", "Sales Conv."]];
styleHeader(dashboard.getRange("D4:J4"));
dashboard.getRange("D5:J11").formulas = Array.from({ length: 7 }, (_, i) => {
  const sourceRow = 5 + i;
  return [
    `=TEXT('Daily Input'!A${sourceRow},"yyyy-mm-dd")`,
    `='Daily Input'!B${sourceRow}`,
    `='Daily Input'!E${sourceRow}`,
    `='Daily Input'!F${sourceRow}`,
    `='Daily Input'!G${sourceRow}`,
    `=IFERROR(F${5 + i}/E${5 + i},0)`,
    `=IFERROR(G${5 + i}/E${5 + i},0)`,
  ];
});
styleTable(dashboard.getRange("D5:J11"));
dashboard.getRange("D5:D11").setNumberFormat("yyyy-mm-dd");
dashboard.getRange("D5:D11").setNumberFormat("@");
dashboard.getRange("E5:G11").setNumberFormat("#,##0");
dashboard.getRange("H5:H11").setNumberFormat('"₪"#,##0');
dashboard.getRange("I5:J11").setNumberFormat("0.0%");

const chart = dashboard.charts.add("line", dashboard.getRange("D4:H11"));
chart.title = "Traffic, Leads, Orders and Revenue";
chart.hasLegend = true;
chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
chart.yAxis = { numberFormatCode: "#,##0" };
chart.setPosition("D13", "J28");

dashboard.getRange("A18:B24").values = [
  ["Decision Checklist", "Use this every morning"],
  ["1", "Did traffic rise or fall versus the last few days?"],
  ["2", "Did leads or orders move in the same direction as traffic?"],
  ["3", "Which source/page worked best?"],
  ["4", "What one action should Michal take today?"],
  ["5", "If sales are low but leads are high, check follow-up flow."],
  ["6", "If traffic is high but leads are low, check page CTA/message."],
];
styleHeader(dashboard.getRange("A18:B18"));
styleTable(dashboard.getRange("A19:B24"));
dashboard.getRange("A19:A24").format = {
  fill: colors.sage,
  font: { bold: true, color: colors.deep },
  horizontalAlignment: "center",
};
setWidths(dashboard, [21, 28, 3, 14, 12, 10, 10, 13, 12, 12]);
dashboard.freezePanes.freezeRows(3);

// Wix Setup
styleTitle(
  setup,
  setup.getRange("A1:D1"),
  "Wix Setup - Daily Reports",
  "Recommended report subscriptions and daily workflow."
);
setup.getRange("A4:D4").values = [["Step", "Where in Wix", "What to select", "Notes"]];
styleHeader(setup.getRange("A4:D4"));
setup.getRange("A5:D12").values = [
  ["1", "Dashboard > Analytics > All Reports", "Traffic Overview", "Subscribe daily if available. Export CSV manually if needed."],
  ["2", "Dashboard > Analytics > All Reports", "Sales Overview", "Use if orders/revenue happen through Wix."],
  ["3", "Dashboard > Analytics > All Reports", "Form Submissions over Time", "Use for daily leads."],
  ["4", "Dashboard > Analytics > All Reports", "Form Submissions by Traffic Source", "Use to see which source creates leads."],
  ["5", "Dashboard > Analytics > All Reports", "Top Pages / Page Visits", "Use to identify strongest landing pages."],
  ["6", "Report page", "Export icon > CSV", "CSV exports are useful for offline review."],
  ["7", "Report page", "Subscribe", "Send daily/weekly report emails to Michal or team."],
  ["8", "Every morning", "Update Daily Input", "One row per day is enough for the dashboard."],
];
styleTable(setup.getRange("A5:D12"));
setWidths(setup, [9, 31, 31, 46]);

// Metric Definitions
styleTitle(
  defs,
  defs.getRange("A1:D1"),
  "Metric Definitions",
  "Keep definitions consistent so daily reporting stays clean."
);
defs.getRange("A4:D4").values = [["Metric", "Definition", "Formula / Source", "Owner Question"]];
styleHeader(defs.getRange("A4:D4"));
defs.getRange("A5:D15").values = [
  ["Visitors", "Unique people visiting the site during the day.", "Wix Traffic Overview", "Is the audience growing?"],
  ["Sessions", "Total visits. One visitor can create multiple sessions.", "Wix Traffic Overview", "Are people returning or browsing more?"],
  ["Page Views", "Total page views across the site.", "Wix Traffic Overview / Top Pages", "Which pages create interest?"],
  ["Leads / Forms", "Form submissions or qualified inquiries.", "Wix Forms reports", "Are visitors raising their hand?"],
  ["Orders", "Completed purchases.", "Wix Sales reports", "Did interest become revenue?"],
  ["Revenue", "Daily gross sales from Wix orders.", "Wix Sales Overview", "How much money came in?"],
  ["Lead Conversion", "Leads divided by visitors.", "Leads / Visitors", "Is the page convincing visitors to inquire?"],
  ["Sales Conversion", "Orders divided by visitors.", "Orders / Visitors", "Is traffic converting to buyers?"],
  ["Avg Order Value", "Revenue divided by orders.", "Revenue / Orders", "How much is each order worth on average?"],
  ["Top Traffic Source", "Main source driving visits or leads.", "Wix reports", "Where should Michal put attention?"],
  ["Top Page", "Page with strongest activity.", "Wix Top Pages / Page Visits", "Which page should be improved or promoted?"],
];
styleTable(defs.getRange("A5:D15"));
setWidths(defs, [22, 42, 32, 42]);

// Sources
styleTitle(
  sources,
  sources.getRange("A1:C1"),
  "Sources",
  "Official Wix references used for the reporting workflow."
);
sources.getRange("A4:C4").values = [["Topic", "URL", "Key Note"]];
styleHeader(sources.getRange("A4:C4"));
sources.getRange("A5:C9").values = [
  ["Downloading/subscribing reports", "https://support.wix.com/en/article/scheduling-wix-analytics-report-emails", "Wix Analytics reports can be downloaded/exported and subscribed to by email."],
  ["Analytics FAQs", "https://support.wix.com/en/article/wix-analytics-faqs", "Wix notes analytics data is reflected after a delay; check latest Wix dashboard for current status."],
  ["Form reports", "https://support.wix.com/en/article/wix-analytics-about-your-form-submission-reports", "Use Form Submission reports for leads and traffic source analysis."],
  ["Sales reports", "https://support.wix.com/en/article/wix-analytics-about-your-sales-reports-4815635", "Use Sales reports if purchases happen through Wix Stores / Wix sales flows."],
  ["Analytics reports overview", "https://support.wix.com/en/article/about-wix-analytics-reports", "All Reports is the central place for Wix Analytics reports."],
];
styleTable(sources.getRange("A5:C9"));
setWidths(sources, [28, 72, 54]);

// Formatting cleanup
for (const sheet of [dashboard, input, setup, defs, sources]) {
  sheet.getUsedRange().format.font = { name: "Arial", color: colors.ink };
  sheet.getUsedRange().format.wrapText = true;
  sheet.getUsedRange().format.verticalAlignment = "center";
  sheet.getUsedRange().format.autofitRows();
}

// Re-apply title/header styles after global font cleanup.
styleTitle(dashboard, dashboard.getRange("A1:J1"), "Wix Daily Performance Dashboard", "Daily view for Michal: traffic, leads, sales, conversion and the next action.");
styleTitle(input, input.getRange("A1:J1"), "Daily Input - Wix Website Performance", "Paste one row per day from Wix Analytics reports. Yellow fields are manual inputs; calculated fields live on Dashboard.");
styleTitle(setup, setup.getRange("A1:D1"), "Wix Setup - Daily Reports", "Recommended report subscriptions and daily workflow.");
styleTitle(defs, defs.getRange("A1:D1"), "Metric Definitions", "Keep definitions consistent so daily reporting stays clean.");
styleTitle(sources, sources.getRange("A1:C1"), "Sources", "Official Wix references used for the reporting workflow.");
styleHeader(dashboard.getRange("D4:J4"));
styleHeader(dashboard.getRange("A18:B18"));
styleHeader(input.getRange("A4:J4"));
styleHeader(setup.getRange("A4:D4"));
styleHeader(defs.getRange("A4:D4"));
styleHeader(sources.getRange("A4:C4"));
dashboard.getRange("A6:A15").format = {
  fill: colors.deep,
  font: { bold: true, color: colors.white },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
dashboard.getRange("B6:B15").format = {
  fill: colors.paper,
  font: { bold: true, color: colors.ink, size: 13 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: colors.line },
  wrapText: true,
};

const dashPreview = await workbook.render({
  sheetName: "Dashboard",
  autoCrop: "all",
  scale: 1,
  format: "png",
});
await fs.writeFile(`${outputDir}/wix_daily_report_dashboard.png`, new Uint8Array(await dashPreview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(`${outputDir}/michal_wix_daily_performance_report.xlsx`);

console.log(`${outputDir}/michal_wix_daily_performance_report.xlsx`);
