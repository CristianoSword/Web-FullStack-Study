import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bootstrapPath = path.resolve(__dirname, "../../config/bootstrap.json");
const bootstrap = JSON.parse(fs.readFileSync(bootstrapPath, "utf8"));

export const runtimeConfig = {
  serviceName: process.env.APP_NAME ?? bootstrap.serviceName,
  port: Number.parseInt(process.env.PORT ?? String(bootstrap.defaultPort), 10),
  host: process.env.HOST ?? "0.0.0.0",
  runtime: bootstrap.runtime
};
