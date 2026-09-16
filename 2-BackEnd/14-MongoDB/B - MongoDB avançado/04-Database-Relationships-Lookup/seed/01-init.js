db = db.getSiblingDB("commerce_graph");

db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customerId", "name", "email", "tier", "city"],
      properties: {
        customerId: { bsonType: "string" },
        name: { bsonType: "string" },
        email: { bsonType: "string" },
        tier: { enum: ["silver", "gold", "platinum"] },
        city: { bsonType: "string" }
      }
    }
  }
});

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["productId", "name", "category", "price"],
      properties: {
        productId: { bsonType: "string" },
        name: { bsonType: "string" },
        category: { bsonType: "string" },
        price: { bsonType: ["double", "int", "long", "decimal"] }
      }
    }
  }
});

db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["orderId", "customerId", "items", "status", "orderedAt"],
      properties: {
        orderId: { bsonType: "string" },
        customerId: { bsonType: "string" },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["productId", "quantity"],
            properties: {
              productId: { bsonType: "string" },
              quantity: { bsonType: ["double", "int", "long", "decimal"] }
            }
          }
        },
        status: { enum: ["paid", "shipped", "processing"] },
        orderedAt: { bsonType: "date" }
      }
    }
  }
});

db.customers.createIndex({ customerId: 1 }, { name: "customer_id_unique", unique: true });
db.products.createIndex({ productId: 1 }, { name: "product_id_unique", unique: true });
db.orders.createIndex({ orderId: 1 }, { name: "order_id_unique", unique: true });
db.orders.createIndex({ customerId: 1 }, { name: "orders_customer_id" });

if (db.customers.countDocuments() === 0) {
  db.customers.insertMany([
    { customerId: "CUS-1001", name: "Marina Costa", email: "marina@example.com", tier: "gold", city: "Sao Paulo" },
    { customerId: "CUS-1002", name: "Diego Ramos", email: "diego@example.com", tier: "silver", city: "Curitiba" },
    { customerId: "CUS-1003", name: "Paula Teixeira", email: "paula@example.com", tier: "platinum", city: "Recife" }
  ]);
}

if (db.products.countDocuments() === 0) {
  db.products.insertMany([
    { productId: "PRD-2001", name: "Mechanical Keyboard", category: "peripherals", price: 420 },
    { productId: "PRD-2002", name: "USB-C Dock", category: "accessories", price: 310 },
    { productId: "PRD-2003", name: "Ergonomic Mouse", category: "peripherals", price: 190 }
  ]);
}

if (db.orders.countDocuments() === 0) {
  db.orders.insertMany([
    {
      orderId: "ORD-1001",
      customerId: "CUS-1001",
      items: [
        { productId: "PRD-2001", quantity: 1 },
        { productId: "PRD-2002", quantity: 2 }
      ],
      status: "paid",
      orderedAt: new Date("2026-06-21T13:00:00Z")
    },
    {
      orderId: "ORD-1002",
      customerId: "CUS-1002",
      items: [
        { productId: "PRD-2003", quantity: 1 }
      ],
      status: "shipped",
      orderedAt: new Date("2026-06-22T15:30:00Z")
    },
    {
      orderId: "ORD-1003",
      customerId: "CUS-1001",
      items: [
        { productId: "PRD-2002", quantity: 1 },
        { productId: "PRD-2003", quantity: 2 }
      ],
      status: "processing",
      orderedAt: new Date("2026-06-23T09:45:00Z")
    }
  ]);
}
