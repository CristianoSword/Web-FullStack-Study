db = db.getSiblingDB("analytics_lab");

db.createCollection("sales", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["saleId", "region", "channel", "seller", "status", "revenue", "items", "createdAt"],
      properties: {
        saleId: { bsonType: "string" },
        region: { bsonType: "string" },
        channel: { bsonType: "string" },
        seller: { bsonType: "string" },
        status: { enum: ["closed", "pending", "cancelled"] },
        revenue: { bsonType: ["double", "int", "long", "decimal"], minimum: 0 },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["sku", "category", "quantity", "unitPrice"],
            properties: {
              sku: { bsonType: "string" },
              category: { bsonType: "string" },
              quantity: { bsonType: ["int", "long"], minimum: 1 },
              unitPrice: { bsonType: ["double", "int", "long", "decimal"], minimum: 0 }
            }
          }
        },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.sales.createIndex({ saleId: 1 }, { unique: true, name: "sale_id_unique" });
db.sales.createIndex({ region: 1, status: 1, createdAt: -1 }, { name: "region_status_created_lookup" });

if (db.sales.countDocuments() === 0) {
  db.sales.insertMany([
    {
      saleId: "SALE-1001",
      region: "sudeste",
      channel: "website",
      seller: "Ana",
      status: "closed",
      revenue: 2450.5,
      items: [
        { sku: "SKU-1001", category: "peripherals", quantity: 2, unitPrice: 499.9 },
        { sku: "SKU-3001", category: "network", quantity: 1, unitPrice: 1450.7 }
      ],
      tags: ["campaign-q2", "priority"],
      createdAt: new Date("2026-06-01T10:00:00Z")
    },
    {
      saleId: "SALE-1002",
      region: "sul",
      channel: "inside-sales",
      seller: "Bruno",
      status: "closed",
      revenue: 1780.0,
      items: [
        { sku: "SKU-2001", category: "storage", quantity: 2, unitPrice: 890.0 }
      ],
      tags: ["renewal"],
      createdAt: new Date("2026-06-02T11:30:00Z")
    },
    {
      saleId: "SALE-1003",
      region: "nordeste",
      channel: "marketplace",
      seller: "Carla",
      status: "pending",
      revenue: 620.0,
      items: [
        { sku: "SKU-4001", category: "office", quantity: 4, unitPrice: 155.0 }
      ],
      tags: ["campaign-q2"],
      createdAt: new Date("2026-06-03T09:15:00Z")
    },
    {
      saleId: "SALE-1004",
      region: "sudeste",
      channel: "website",
      seller: "Ana",
      status: "closed",
      revenue: 3120.0,
      items: [
        { sku: "SKU-5001", category: "servers", quantity: 1, unitPrice: 3120.0 }
      ],
      tags: ["enterprise", "priority"],
      createdAt: new Date("2026-06-04T14:45:00Z")
    },
    {
      saleId: "SALE-1005",
      region: "centro-oeste",
      channel: "website",
      seller: "Diego",
      status: "cancelled",
      revenue: 540.0,
      items: [
        { sku: "SKU-1002", category: "peripherals", quantity: 1, unitPrice: 540.0 }
      ],
      tags: ["risk"],
      createdAt: new Date("2026-06-05T08:20:00Z")
    },
    {
      saleId: "SALE-1006",
      region: "sul",
      channel: "marketplace",
      seller: "Bruno",
      status: "closed",
      revenue: 980.0,
      items: [
        { sku: "SKU-3002", category: "network", quantity: 2, unitPrice: 490.0 }
      ],
      tags: ["campaign-q3"],
      createdAt: new Date("2026-06-06T16:05:00Z")
    }
  ]);
}
