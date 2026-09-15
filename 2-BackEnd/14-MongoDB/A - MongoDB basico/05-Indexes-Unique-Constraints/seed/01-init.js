db = db.getSiblingDB("inventory_catalog");

db.createCollection("suppliers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["supplierCode", "name", "email", "country", "city", "category", "active", "createdAt"],
      properties: {
        supplierCode: { bsonType: "string" },
        name: { bsonType: "string" },
        email: { bsonType: "string" },
        country: { bsonType: "string" },
        city: { bsonType: "string" },
        category: { bsonType: "string" },
        active: { bsonType: "bool" },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.suppliers.createIndex({ supplierCode: 1 }, { unique: true, name: "supplier_code_unique" });
db.suppliers.createIndex({ email: 1 }, { unique: true, name: "supplier_email_unique" });
db.suppliers.createIndex({ country: 1, city: 1, category: 1 }, { name: "country_city_category_lookup" });

if (db.suppliers.countDocuments() === 0) {
  db.suppliers.insertMany([
    {
      supplierCode: "SUP-1001",
      name: "Northwind Parts",
      email: "ops@northwindparts.example.com",
      country: "Brazil",
      city: "Sao Paulo",
      category: "peripherals",
      active: true,
      createdAt: new Date("2026-05-15T09:00:00Z")
    },
    {
      supplierCode: "SUP-1002",
      name: "Blue Harbor Tech",
      email: "supply@blueharbor.example.com",
      country: "Brazil",
      city: "Curitiba",
      category: "network",
      active: true,
      createdAt: new Date("2026-05-16T10:30:00Z")
    },
    {
      supplierCode: "SUP-1003",
      name: "Atlas Components",
      email: "contact@atlascomponents.example.com",
      country: "Chile",
      city: "Santiago",
      category: "storage",
      active: false,
      createdAt: new Date("2026-05-17T13:45:00Z")
    }
  ]);
}
