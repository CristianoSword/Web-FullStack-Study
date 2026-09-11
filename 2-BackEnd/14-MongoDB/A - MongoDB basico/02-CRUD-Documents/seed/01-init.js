db = db.getSiblingDB("customer_crm");

db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customerId", "name", "email", "status", "createdAt"],
      properties: {
        customerId: { bsonType: "string" },
        name: { bsonType: "string", minLength: 3 },
        email: { bsonType: "string" },
        status: { enum: ["lead", "active", "inactive"] },
        phones: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.customers.createIndex({ customerId: 1 }, { unique: true, name: "customer_id_unique" });

if (db.customers.countDocuments() === 0) {
  db.customers.insertMany([
    {
      customerId: "CUST-1001",
      name: "Ana Costa",
      email: "ana.costa@example.com",
      status: "active",
      phones: ["+55-11-99999-0001"],
      createdAt: new Date("2026-03-01T10:00:00Z")
    },
    {
      customerId: "CUST-1002",
      name: "Bruno Lima",
      email: "bruno.lima@example.com",
      status: "lead",
      phones: ["+55-21-98888-0002"],
      createdAt: new Date("2026-03-02T11:30:00Z")
    }
  ]);
}
