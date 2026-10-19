import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { runtimeConfig } from "../lib/runtime-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageProfilePath = path.resolve(__dirname, "../../models/image-profile.json");
const imageProfile = JSON.parse(fs.readFileSync(imageProfilePath, "utf8"));

export const buildMetadataPayload = () => ({
  service: runtimeConfig.serviceName,
  runtime: runtimeConfig.runtime,
  baseImage: imageProfile.baseImage,
  installStrategy: imageProfile.installStrategy,
  startedAt: new Date().toISOString()
});
