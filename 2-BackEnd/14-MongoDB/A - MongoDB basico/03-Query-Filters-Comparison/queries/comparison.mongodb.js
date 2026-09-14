use("sales_analytics");

// amount > 900
db.orders.find(
  { amount: { $gt: 900 } },
  { _id: 0, orderId: 1, amount: 1, region: 1 }
).sort({ amount: -1 });

// 300 <= amount < 2000
db.orders.find(
  {
    $and: [
      { amount: { $gte: 300 } },
      { amount: { $lt: 2000 } }
    ]
  },
  { _id: 0, orderId: 1, amount: 1, priority: 1 }
).sort({ amount: 1 });

// region sudeste or sul and not cancelled
db.orders.find(
  {
    $and: [
      { status: { $ne: "cancelled" } },
      {
        $or: [
          { region: "sudeste" },
          { region: "sul" }
        ]
      }
    ]
  },
  { _id: 0, orderId: 1, region: 1, status: 1 }
).sort({ region: 1, orderId: 1 });

// approved or fulfilled with high amount
db.orders.find(
  {
    $or: [
      { status: "approved" },
      { status: "fulfilled" }
    ],
    amount: { $gt: 1000 }
  },
  { _id: 0, orderId: 1, status: 1, amount: 1 }
).sort({ amount: -1 });

// selected channels and segment range sample
db.orders.find(
  {
    channel: { $in: ["website", "inside-sales"] },
    amount: { $lte: 2000 }
  },
  { _id: 0, orderId: 1, channel: 1, amount: 1 }
).sort({ orderId: 1 });
