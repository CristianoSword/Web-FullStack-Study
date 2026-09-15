use("inventory_catalog");

// inspect indexes
db.suppliers.getIndexes();

// query that benefits from compound index
db.suppliers.find(
  {
    country: "Brazil",
    city: "Sao Paulo",
    category: "peripherals"
  },
  { _id: 0, supplierCode: 1, name: 1, email: 1 }
);

// explain the indexed lookup
db.suppliers.find({
  country: "Brazil",
  city: "Curitiba",
  category: "network"
}).explain("executionStats");
