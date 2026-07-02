function createSummary() {
  return {
    totalRows: 0,
    totalAmount: 0,
    skippedRows: 0,
    byCategory: {},
  };
}

module.exports = {
  createSummary,
};
