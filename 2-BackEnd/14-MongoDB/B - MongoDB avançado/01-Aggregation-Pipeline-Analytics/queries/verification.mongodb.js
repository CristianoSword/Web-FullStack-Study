use("analytics_lab");

db.sales.countDocuments();
db.sales.find({}, { _id: 0, saleId: 1, region: 1, channel: 1, status: 1, revenue: 1 }).sort({ saleId: 1 });
db.sales.getIndexes();
