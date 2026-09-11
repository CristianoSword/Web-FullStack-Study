use("customer_crm");

db.customers.insertOne({
  customerId: "CUST-1003",
  name: "Carla Souza",
  email: "carla.souza@example.com",
  status: "lead",
  phones: ["+55-31-97777-0003"],
  createdAt: new Date("2026-03-03T09:15:00Z")
});

db.customers.find({}, { _id: 0 }).sort({ customerId: 1 });

db.customers.updateOne(
  { customerId: "CUST-1003" },
  {
    $set: {
      status: "active",
      email: "carla.souza@updated.example.com"
    }
  }
);

db.customers.deleteOne({ customerId: "CUST-1002" });
