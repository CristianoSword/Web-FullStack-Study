import fs from "node:fs";

const isValid = process.env.IS_VALID ?? "true";
console.log(`Validation result: ${isValid}`);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `is_valid=${isValid}\n`);
}
