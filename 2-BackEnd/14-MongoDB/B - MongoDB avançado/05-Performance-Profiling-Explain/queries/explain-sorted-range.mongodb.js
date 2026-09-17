use("perf_lab");

db.events.find(
  {
    region: "sa-east-1",
    eventType: "checkout",
    durationMs: { $gte: 300 }
  }
).sort({ durationMs: -1 }).limit(20).explain("executionStats");
