import express from "express";

const app = express();
const port = Number(process.env.PORT || 8081);

app.get("/healthz", (_request, response) => {
  response.json({ status: "ok", service: "orders-api" });
});

app.get("/api/orders", (_request, response) => {
  response.json({
    orders: [
      { id: "ord-1", status: "processing" },
      { id: "ord-2", status: "shipped" }
    ]
  });
});

app.listen(port, () => {
  console.log(`orders-api listening on ${port}`);
});
