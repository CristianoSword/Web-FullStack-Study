import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bootstrap = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../config/bootstrap.json"), "utf8")
);

export const runtimeConfig = {
  serviceName: process.env.APP_NAME ?? bootstrap.serviceName,
  runtime: bootstrap.runtime,
  port: Number.parseInt(process.env.PORT ?? String(bootstrap.defaultPort), 10),
  host: process.env.HOST ?? "0.0.0.0",
  appMode: process.env.APP_MODE ?? "development",
  message: process.env.MESSAGE ?? "Container started without custom message",
  featureFlag: String(process.env.FEATURE_FLAG ?? "false").toLowerCase() === "true"
};
