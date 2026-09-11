use("study_inventory");

db.warehouses.find({}, { _id: 0 }).sort({ code: 1 });
db.products.find({}, { _id: 0 }).sort({ sku: 1 });
db.products.find({ category: "peripherals" }, { _id: 0, sku: 1, name: 1, stock: 1 });
