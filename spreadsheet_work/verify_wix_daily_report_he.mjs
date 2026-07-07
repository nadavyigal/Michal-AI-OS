import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const input = await FileBlob.load("../outputs/story3/דוח_ביצועים_יומי_אתר_מיכל.xlsx");
const workbook = await SpreadsheetFile.importXlsx(input);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
  maxChars: 4000,
});

const dashboard = await workbook.inspect({
  kind: "table",
  sheetId: "דשבורד",
  range: "A1:J24",
  tableMaxRows: 24,
  tableMaxCols: 10,
  maxChars: 6000,
});

console.log("ERROR_SCAN");
console.log(errors.ndjson);
console.log("DASHBOARD");
console.log(dashboard.ndjson);
