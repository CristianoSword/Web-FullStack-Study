const databaseName = process.env.MONGO_APP_DATABASE || "study_inventory";
const inventoryDb = db.getSiblingDB(databaseName);

if (inventoryDb.warehouses.countDocuments() === 0) {
  inventoryDb.warehouses.insertMany([
    {
      code: "WH-SP",
      city: "Sao Paulo",
      capacity: 1200,
      active: true,
      createdAt: new Date("2026-01-15T09:00:00Z")
    },
    {
      code: "WH-RJ",
      city: "Rio de Janeiro",
      capacity: 800,
      active: true,
      createdAt: new Date("2026-01-18T11:30:00Z")
    }
  ]);
}

if (inventoryDb.products.countDocuments() === 0) {
  inventoryDb.products.insertMany([
    {
      sku: "SKU-1000",
      name: "Mechanical Keyboard",
      category: "peripherals",
      price: 429.9,
      stock: 14,
      warehouse: { code: "WH-SP", city: "Sao Paulo" },
      tags: ["keyboard", "gaming", "usb-c"],
      createdAt: new Date("2026-02-01T10:15:00Z")
    },
    {
      sku: "SKU-2000",
      name: "Wireless Mouse",
      category: "peripherals",
      price: 189.9,
      stock: 27,
      warehouse: { code: "WH-SP", city: "Sao Paulo" },
      tags: ["mouse", "wireless"],
      createdAt: new Date("2026-02-03T14:45:00Z")
    },
    {
      sku: "SKU-3000",
      name: "USB-C Dock",
      category: "accessories",
      price: 549.9,
      stock: 9,
      warehouse: { code: "WH-RJ", city: "Rio de Janeiro" },
      tags: ["dock", "office", "usb-c"],
      createdAt: new Date("2026-02-06T08:20:00Z")
    }
  ]);
}
