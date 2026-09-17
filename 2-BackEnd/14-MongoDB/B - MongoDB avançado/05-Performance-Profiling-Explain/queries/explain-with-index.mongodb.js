use("perf_lab");

db.events.createIndex(
  { tenantId: 1, status: 1, createdAt: -1 },
  { name: "tenant_status_created_idx" }
);

db.events.find(
  {
    tenantId: "tenant-gold",
    status: "failed",
    createdAt: {
      $gte: ISODate("2026-06-10T00:00:00Z"),
      $lte: ISODate("2026-06-24T23:59:59Z")
    }
  }
).sort({ createdAt: -1 }).limit(15).explain("executionStats");
