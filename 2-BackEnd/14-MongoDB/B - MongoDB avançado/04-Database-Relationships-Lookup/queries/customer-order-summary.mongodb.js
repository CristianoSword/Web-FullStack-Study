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
  { $unwind: "$items" },
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "productId",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $group: {
      _id: "$customer.customerId",
      customerName: { $first: "$customer.name" },
      tier: { $first: "$customer.tier" },
      city: { $first: "$customer.city" },
      ordersCount: { $addToSet: "$orderId" },
      totalSpent: { $sum: { $multiply: ["$items.quantity", "$product.price"] } }
    }
  },
  {
    $project: {
      _id: 0,
      customerId: "$_id",
      customerName: 1,
      tier: 1,
      city: 1,
      ordersCount: { $size: "$ordersCount" },
      totalSpent: 1
    }
  },
  { $sort: { totalSpent: -1 } }
]);
