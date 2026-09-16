use("commerce_graph");

db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "customerId",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $project: {
      _id: 0,
      orderId: 1,
      status: 1,
      orderedAt: 1,
      customerId: "$customer.customerId",
      customerName: "$customer.name",
      customerTier: "$customer.tier",
      customerCity: "$customer.city"
    }
  },
  { $sort: { orderedAt: -1 } }
]);
