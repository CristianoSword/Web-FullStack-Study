function deduplicateWithFilter(items) {
  return items.filter((item, index) => items.indexOf(item) === index);
}

module.exports = {
  deduplicateWithFilter
};
