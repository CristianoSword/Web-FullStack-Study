const { defaultCommands } = require("../models/task-command");

function parseArgs(argv) {
  const [command = "list", ...rest] = argv;
  return { command, rest };
}

function validateCommand(command, rest) {
  const knownCommands = new Set(defaultCommands.map((entry) => entry.name));

  if (!knownCommands.has(command)) {
    return {
      valid: false,
      error: `Unknown command: ${command}`,
    };
  }

  if (command === "add" && !rest.join(" ").trim()) {
    return {
      valid: false,
      error: "Provide a title for the new item.",
    };
  }

  if (command === "done") {
    const id = Number(rest[0]);

    if (!Number.isInteger(id) || id <= 0) {
      return {
        valid: false,
        error: "Provide a numeric id greater than zero.",
      };
    }
  }

  return { valid: true };
}

module.exports = {
  parseArgs,
  validateCommand,
};
