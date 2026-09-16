db = db.getSiblingDB("bank_ops");

db.createCollection("accounts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["accountId", "owner", "currency", "balance", "status", "updatedAt"],
      properties: {
        accountId: { bsonType: "string" },
        owner: { bsonType: "string" },
        currency: { enum: ["BRL"] },
        balance: { bsonType: ["double", "int", "long", "decimal"] },
        status: { enum: ["active", "blocked"] },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("transfers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["transferId", "fromAccountId", "toAccountId", "amount", "status", "createdAt"],
      properties: {
        transferId: { bsonType: "string" },
        fromAccountId: { bsonType: "string" },
        toAccountId: { bsonType: "string" },
        amount: { bsonType: ["double", "int", "long", "decimal"] },
        status: { enum: ["committed", "rolled_back"] },
        createdAt: { bsonType: "date" },
        reason: { bsonType: "string" }
      }
    }
  }
});

db.createCollection("audit_logs");

db.accounts.createIndex({ accountId: 1 }, { name: "account_id_unique", unique: true });
db.transfers.createIndex({ transferId: 1 }, { name: "transfer_id_unique", unique: true });
db.audit_logs.createIndex({ createdAt: -1 }, { name: "audit_created_at_desc" });

if (db.accounts.countDocuments() === 0) {
  db.accounts.insertMany([
    {
      accountId: "ACC-1001",
      owner: "Ana Souza",
      currency: "BRL",
      balance: 1500,
      status: "active",
      updatedAt: new Date("2026-06-20T10:00:00Z")
    },
    {
      accountId: "ACC-1002",
      owner: "Bruno Lima",
      currency: "BRL",
      balance: 800,
      status: "active",
      updatedAt: new Date("2026-06-20T10:05:00Z")
    },
    {
      accountId: "ACC-1003",
      owner: "Carla Mendes",
      currency: "BRL",
      balance: 300,
      status: "active",
      updatedAt: new Date("2026-06-20T10:10:00Z")
    }
  ]);
}

if (db.audit_logs.countDocuments() === 0) {
  db.audit_logs.insertOne({
    event: "seed_initialized",
    details: "Base accounts loaded for transaction lab.",
    createdAt: new Date("2026-06-20T10:15:00Z")
  });
}
