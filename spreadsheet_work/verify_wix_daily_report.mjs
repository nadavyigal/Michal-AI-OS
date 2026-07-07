import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const input = await FileBlob.load("../outputs/story3/michal_wix_daily_performance_report.xlsx");
const workbook = await SpreadsheetFile.importXlsx(input);

const dashboard = await workbook.inspect({
  kind: "table,formula",
  sheetId: "Dashboard",
  range: "A1:J24",
  tableMaxRows: 24,
  tableMaxCols: 10,
  maxChars: 8000,
});

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
  maxChars: 4000,
});

console.log("DASHBOARD_CHECK");
console.log(dashboard.ndjson);
console.log("ERROR_SCAN");
console.log(errors.ndjson);
