use("customer_crm");

db.customers.find({}, { _id: 0, customerId: 1, name: 1, status: 1 }).sort({ customerId: 1 });
db.customers.getIndexes();
