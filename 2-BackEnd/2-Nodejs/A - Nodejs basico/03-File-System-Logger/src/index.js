const { appendLog, readLogs, summarizeLogs } = require("./services/logger-service");
const { assertCommand, assertLevel } = require("./validators/log-validator");

async function main() {
  const [command = "summary", level = "info", source = "cli", ...messageParts] = process.argv.slice(2);
  assertCommand(command);

  if (command === "write") {
    assertLevel(level);
    const message = messageParts.join(" ") || "No message provided";
    const entry = await appendLog({ level, source, message });
    console.log("Log written:", entry);
    return;
  }

  if (command === "list") {
    const entries = await readLogs();
    console.log(JSON.stringify(entries, null, 2));
    return;
  }

  const summary = await summarizeLogs();
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error("Logger command failed:", error.message);
  process.exitCode = 1;
});
