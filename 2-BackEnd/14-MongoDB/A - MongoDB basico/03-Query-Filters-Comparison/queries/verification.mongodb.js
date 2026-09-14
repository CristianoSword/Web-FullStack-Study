use("sales_analytics");

db.orders.countDocuments();
db.orders.find({}, { _id: 0, orderId: 1, region: 1, status: 1, amount: 1 }).sort({ orderId: 1 });
db.orders.getIndexes();
