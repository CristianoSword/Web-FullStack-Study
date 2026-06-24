const LOG_LEVELS = ["info", "warn", "error"];

function buildEntry({ level, source, message }) {
  return {
    level,
    source,
    message,
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  LOG_LEVELS,
  buildEntry,
};
