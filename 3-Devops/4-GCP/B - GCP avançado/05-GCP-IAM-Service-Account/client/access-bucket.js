import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { GoogleAuth } from "google-auth-library";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const serviceAccountSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/service-account-spec.json"), "utf8"));

const auth = new GoogleAuth({
  scopes: serviceAccountSpec.scopes
});

const client = await auth.getClient();
const accessToken = await client.getAccessToken();

console.log(
  JSON.stringify({
    projectId: serviceAccountSpec.projectId,
    targetBucket: serviceAccountSpec.targetBucket,
    accessTokenPreview: String(accessToken?.token ?? "").slice(0, 12)
  })
);
