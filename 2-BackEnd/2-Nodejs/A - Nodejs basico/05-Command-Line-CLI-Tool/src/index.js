#!/usr/bin/env node
const { defaultCommands } = require("./models/task-command");
const { listItems, addItem, completeItem } = require("./services/task-cli-store");
const { parseArgs, validateCommand } = require("./validators/cli-arguments");

function printHelp(message) {
  if (message) {
    console.error(message);
  }

  console.log("Usage: task-helper <command> [arguments]");
  console.log("");
  console.log("Commands:");

  for (const command of defaultCommands) {
    console.log(`- ${command.name}: ${command.description}`);
  }
}

function main() {
  const { command, rest } = parseArgs(process.argv.slice(2));
  const validation = validateCommand(command, rest);

  if (!validation.valid) {
    printHelp(validation.error);
    process.exitCode = 1;
    return;
  }

  if (command === "add") {
    const title = rest.join(" ").trim();
    const item = addItem(title);
    console.log("Added:", item);
    return;
  }

  if (command === "done") {
    const item = completeItem(Number(rest[0]));
    console.log(item ? `Done: ${item.title}` : "Item not found");
    return;
  }

  console.log(JSON.stringify(listItems(), null, 2));
}

main();
