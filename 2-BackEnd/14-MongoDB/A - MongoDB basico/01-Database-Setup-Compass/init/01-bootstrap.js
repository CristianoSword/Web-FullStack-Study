const databaseName = process.env.MONGO_APP_DATABASE || "study_inventory";
const appUser = process.env.MONGO_APP_USER || "inventory_app";
const appPassword = process.env.MONGO_APP_PASSWORD || "inventory_pass";

const warehouseValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["code", "city", "capacity", "active"],
    properties: {
      code: { bsonType: "string" },
      city: { bsonType: "string" },
      capacity: { bsonType: ["int", "long"], minimum: 0 },
      active: { bsonType: "bool" },
      createdAt: { bsonType: "date" }
    }
  }
};

const productValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["sku", "name", "category", "price", "stock", "warehouse"],
    properties: {
      sku: { bsonType: "string" },
      name: { bsonType: "string", minLength: 3 },
      category: { bsonType: "string" },
      price: { bsonType: ["double", "int", "long", "decimal"], minimum: 0 },
      stock: { bsonType: ["int", "long"], minimum: 0 },
      warehouse: {
        bsonType: "object",
        required: ["code", "city"],
        properties: {
          code: { bsonType: "string" },
          city: { bsonType: "string" }
        }
      },
      tags: {
        bsonType: "array",
        items: { bsonType: "string" }
      },
      createdAt: { bsonType: "date" }
    }
  }
};

const inventoryDb = db.getSiblingDB(databaseName);

try {
  inventoryDb.createUser({
    user: appUser,
    pwd: appPassword,
    roles: [{ role: "readWrite", db: databaseName }]
  });
} catch (error) {
  print(`User setup skipped: ${error.message}`);
}

inventoryDb.createCollection("warehouses", { validator: warehouseValidator });
inventoryDb.createCollection("products", { validator: productValidator });

inventoryDb.warehouses.createIndex({ code: 1 }, { unique: true, name: "warehouse_code_unique" });
inventoryDb.products.createIndex({ sku: 1 }, { unique: true, name: "product_sku_unique" });
inventoryDb.products.createIndex({ category: 1, stock: -1 }, { name: "category_stock_lookup" });
