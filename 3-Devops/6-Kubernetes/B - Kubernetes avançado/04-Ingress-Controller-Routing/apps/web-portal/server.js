import express from "express";

const app = express();
const port = Number(process.env.PORT || 8080);

app.get("/healthz", (_request, response) => {
  response.json({ status: "ok", service: "web-portal" });
});

app.get("*", (_request, response) => {
  response.send("<h1>Study Portal</h1><p>Ingress web route is working.</p>");
});

app.listen(port, () => {
  console.log(`web-portal listening on ${port}`);
});
