function deduplicateWithSet(items) {
  return [...new Set(items)];
}

module.exports = {
  deduplicateWithSet
};
