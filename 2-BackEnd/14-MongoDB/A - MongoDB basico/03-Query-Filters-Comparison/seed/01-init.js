db = db.getSiblingDB("sales_analytics");

db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["orderId", "region", "status", "amount", "priority", "channel", "createdAt"],
      properties: {
        orderId: { bsonType: "string" },
        region: { enum: ["sudeste", "sul", "nordeste", "centro-oeste", "norte"] },
        status: { enum: ["pending", "approved", "cancelled", "fulfilled"] },
        amount: { bsonType: ["double", "int", "long", "decimal"], minimum: 0 },
        priority: { enum: ["low", "medium", "high"] },
        channel: { enum: ["marketplace", "website", "inside-sales"] },
        customerSegment: { enum: ["startup", "smb", "enterprise"] },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.orders.createIndex({ orderId: 1 }, { unique: true, name: "order_id_unique" });
db.orders.createIndex({ region: 1, amount: -1 }, { name: "region_amount_lookup" });

if (db.orders.countDocuments() === 0) {
  db.orders.insertMany([
    {
      orderId: "ORD-1001",
      region: "sudeste",
      status: "approved",
      amount: 1840.75,
      priority: "high",
      channel: "website",
      customerSegment: "smb",
      createdAt: new Date("2026-04-05T13:20:00Z")
    },
    {
      orderId: "ORD-1002",
      region: "sul",
      status: "pending",
      amount: 450.10,
      priority: "medium",
      channel: "marketplace",
      customerSegment: "startup",
      createdAt: new Date("2026-04-06T09:10:00Z")
    },
    {
      orderId: "ORD-1003",
      region: "nordeste",
      status: "fulfilled",
      amount: 2900.00,
      priority: "high",
      channel: "inside-sales",
      customerSegment: "enterprise",
      createdAt: new Date("2026-04-07T16:45:00Z")
    },
    {
      orderId: "ORD-1004",
      region: "sudeste",
      status: "cancelled",
      amount: 220.00,
      priority: "low",
      channel: "website",
      customerSegment: "startup",
      createdAt: new Date("2026-04-08T11:30:00Z")
    },
    {
      orderId: "ORD-1005",
      region: "centro-oeste",
      status: "approved",
      amount: 980.50,
      priority: "medium",
      channel: "website",
      customerSegment: "smb",
      createdAt: new Date("2026-04-09T08:15:00Z")
    }
  ]);
}
