function isValidReportRow(row) {
  return Boolean(row.id) && Boolean(row.category) && Number.isFinite(row.amount);
}

module.exports = {
  isValidReportRow,
};
