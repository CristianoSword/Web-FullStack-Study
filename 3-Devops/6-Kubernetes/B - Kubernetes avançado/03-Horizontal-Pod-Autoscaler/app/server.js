import express from "express";

const app = express();
const port = Number(process.env.PORT || 8080);

function spendCpu(milliseconds) {
  const end = Date.now() + milliseconds;
  let result = 0;

  while (Date.now() < end) {
    result += Math.sqrt(Math.random() * 1000);
  }

  return Number(result.toFixed(2));
}

app.get("/healthz", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/work", (request, response) => {
  const loadMs = Number(request.query.ms || 80);
  const score = spendCpu(loadMs);

  response.json({
    loadMs,
    score
  });
});

app.listen(port, () => {
  console.log(`metrics-api listening on ${port}`);
});
