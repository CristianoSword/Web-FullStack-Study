const fs = require("fs");
const readline = require("readline");
const { buildReportRow } = require("../models/report-row");
const { createSummary } = require("../types/report-summary");
const { isValidReportRow } = require("../validators/report-validator");

async function processLines(filePath) {
  const summary = createSummary();
  const input = fs.createReadStream(filePath, { encoding: "utf8" });
  const stream = readline.createInterface({
    input,
    crlfDelay: Infinity,
  });
  let lineNumber = 0;

  for await (const line of stream) {
    lineNumber += 1;

    if (!line.trim()) {
      continue;
    }

    if (lineNumber === 1 && line.toLowerCase().startsWith("id,")) {
      continue;
    }

    const row = buildReportRow(line.split(","));
    if (!isValidReportRow(row)) {
      summary.skippedRows += 1;
      continue;
    }

    summary.totalRows += 1;
    summary.totalAmount += row.amount;
    summary.byCategory[row.category] = (summary.byCategory[row.category] ?? 0) + row.amount;
  }

  return summary;
}

module.exports = {
  processLines,
};
