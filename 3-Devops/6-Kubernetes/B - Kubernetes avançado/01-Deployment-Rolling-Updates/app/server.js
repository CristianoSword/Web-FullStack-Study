import express from "express";

const app = express();
const port = Number(process.env.PORT || 8080);
const version = process.env.APP_VERSION || "v1";
const startedAt = new Date().toISOString();

app.get("/healthz", (_request, response) => {
  response.json({
    status: "ok",
    version,
    startedAt
  });
});

app.get("/readyz", (_request, response) => {
  response.json({
    ready: true,
    version
  });
});

app.get("/catalog", (_request, response) => {
  response.json({
    version,
    items: [
      { sku: "kb-101", name: "Kubernetes Basics" },
      { sku: "ka-201", name: "Rolling Update Patterns" }
    ]
  });
});

app.listen(port, () => {
  console.log(`catalog-api listening on ${port} (${version})`);
});
