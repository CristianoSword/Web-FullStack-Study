function normalizeTrackName(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

module.exports = {
  normalizeTrackName
};
