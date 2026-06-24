#!/usr/bin/env node
const { listItems, addItem, completeItem } = require("./services/task-cli-store");

function main() {
  const [command = "list", ...rest] = process.argv.slice(2);

  if (command === "add") {
    const title = rest.join(" ") || "Untitled task";
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
