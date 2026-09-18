import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadTypeDefs() {
  const files = ["base.graphql", "user.graphql", "post.graphql"];
  const parts = await Promise.all(
    files.map((file) => readFile(path.join(__dirname, file), "utf8"))
  );

  return parts.join("\n");
}
