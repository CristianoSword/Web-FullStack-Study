use("inventory_catalog");

try {
  db.suppliers.insertOne({
    supplierCode: "SUP-1001",
    name: "Duplicate Supplier",
    email: "duplicate@example.com",
    country: "Brazil",
    city: "Sao Paulo",
    category: "peripherals",
    active: true,
    createdAt: new Date()
  });
} catch (error) {
  print("Duplicate supplierCode blocked as expected.");
  print(error.message);
}

try {
  db.suppliers.insertOne({
    supplierCode: "SUP-9999",
    name: "Duplicate Email Supplier",
    email: "ops@northwindparts.example.com",
    country: "Brazil",
    city: "Rio de Janeiro",
    category: "network",
    active: true,
    createdAt: new Date()
  });
} catch (error) {
  print("Duplicate email blocked as expected.");
  print(error.message);
}
