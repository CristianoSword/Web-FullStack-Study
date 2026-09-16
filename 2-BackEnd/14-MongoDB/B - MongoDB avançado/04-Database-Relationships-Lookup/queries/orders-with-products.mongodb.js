use("commerce_graph");

db.orders.aggregate([
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
    $project: {
      _id: 0,
      orderId: 1,
      status: 1,
      productId: "$product.productId",
      productName: "$product.name",
      category: "$product.category",
      quantity: "$items.quantity",
      unitPrice: "$product.price",
      lineTotal: { $multiply: ["$items.quantity", "$product.price"] }
    }
  },
  { $sort: { orderId: 1, productName: 1 } }
]);
