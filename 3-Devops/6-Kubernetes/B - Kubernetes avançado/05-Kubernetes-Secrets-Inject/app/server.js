import express from "express";
import { readFile } from "node:fs/promises";

const app = express();
const port = Number(process.env.PORT || 8080);
const secretDirectory = "/var/run/secrets/app";

function mask(value) {
  if (!value) {
    return "missing";
  }

  if (value.length <= 4) {
    return "****";
  }

  return `${value.slice(0, 2)}****${value.slice(-2)}`;
}

app.get("/healthz", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/config", async (_request, response) => {
  let signingToken = "missing";

  try {
    signingToken = await readFile(`${secretDirectory}/signing-token`, "utf8");
  } catch {
    signingToken = "missing";
  }

  response.json({
    dbUser: mask(process.env.DB_USERNAME),
    dbPassword: mask(process.env.DB_PASSWORD),
    paymentProvider: process.env.PAYMENT_PROVIDER || "unknown",
    signingToken: mask(signingToken.trim())
  });
});

app.listen(port, () => {
  console.log(`payments-api listening on ${port}`);
});
