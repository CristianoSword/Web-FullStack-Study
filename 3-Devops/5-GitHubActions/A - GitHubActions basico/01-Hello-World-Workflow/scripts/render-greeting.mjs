import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const spec = JSON.parse(fs.readFileSync(path.resolve(root, "config/workflow-spec.json"), "utf8"));

const actor = process.env.ACTOR ?? "local-user";
const eventName = process.env.EVENT_NAME ?? "workflow_dispatch";
const refName = process.env.REF_NAME ?? "main";
const note = process.env.NOTE ?? "manual-check";

const greeting = spec.messageTemplate
  .replace("{actor}", actor)
  .replace("{eventName}", eventName)
  .replace("{refName}", refName);

console.log(greeting);
console.log(`Note: ${note}`);
