db = db.getSiblingDB("perf_lab");

db.createCollection("events", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["eventId", "tenantId", "eventType", "region", "status", "createdAt", "durationMs", "payloadSizeKb"],
      properties: {
        eventId: { bsonType: "string" },
        tenantId: { bsonType: "string" },
        eventType: { bsonType: "string" },
        region: { bsonType: "string" },
        status: { enum: ["success", "warning", "failed"] },
        createdAt: { bsonType: "date" },
        durationMs: { bsonType: ["double", "int", "long", "decimal"] },
        payloadSizeKb: { bsonType: ["double", "int", "long", "decimal"] },
        metadata: { bsonType: "object" }
      }
    }
  }
});

db.events.createIndex({ eventId: 1 }, { name: "event_id_unique", unique: true });
db.events.createIndex({ tenantId: 1, status: 1, createdAt: -1 }, { name: "tenant_status_created_idx" });
db.events.createIndex({ region: 1, eventType: 1, durationMs: -1 }, { name: "region_type_duration_idx" });

if (db.events.countDocuments() === 0) {
  const tenants = ["tenant-blue", "tenant-green", "tenant-red", "tenant-gold"];
  const types = ["checkout", "sync", "invoice", "shipment", "search"];
  const regions = ["sa-east-1", "us-east-1", "eu-west-1"];
  const statuses = ["success", "success", "success", "warning", "failed"];
  const services = ["billing", "orders", "catalog", "shipping", "search"];

  const docs = [];

  for (let i = 1; i <= 1200; i += 1) {
    const tenant = tenants[i % tenants.length];
    const eventType = types[i % types.length];
    const region = regions[i % regions.length];
    const status = statuses[i % statuses.length];
    const service = services[i % services.length];
    const createdAt = new Date(Date.UTC(2026, 5, 1 + (i % 28), (i * 3) % 24, (i * 7) % 60, 0));
    const durationMs = 80 + ((i * 17) % 900);
    const payloadSizeKb = 16 + ((i * 13) % 512);

    docs.push({
      eventId: `EVT-${String(i).padStart(6, "0")}`,
      tenantId: tenant,
      eventType,
      region,
      status,
      createdAt,
      durationMs,
      payloadSizeKb,
      metadata: {
        service,
        route: `/api/${eventType}`,
        traceId: `trace-${String(i).padStart(6, "0")}`
      }
    });
  }

  db.events.insertMany(docs);
}
