use("commerce_graph");

print("Collections:");
printjson(db.getCollectionNames().sort());

print("Indexes on orders:");
printjson(db.orders.getIndexes());

print("Orders count by status:");
printjson(
  db.orders.aggregate([
    { $group: { _id: "$status", total: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]).toArray()
);
