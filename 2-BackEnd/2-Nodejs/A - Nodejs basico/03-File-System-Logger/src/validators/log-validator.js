const { LOG_LEVELS } = require("../models/log-schema");

function assertCommand(command) {
  const allowed = ["write", "list", "summary"];

  if (!allowed.includes(command)) {
    throw new Error(`Unsupported command: ${command}`);
  }
}

function assertLevel(level) {
  if (!LOG_LEVELS.includes(level)) {
    throw new Error(`Unsupported level: ${level}`);
  }
}

module.exports = {
  assertCommand,
  assertLevel,
};
