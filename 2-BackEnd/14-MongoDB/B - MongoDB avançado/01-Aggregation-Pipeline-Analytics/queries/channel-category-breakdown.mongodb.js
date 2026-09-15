use("analytics_lab");

db.sales.aggregate([
  { $match: { status: { $in: ["closed", "pending"] } } },
  { $unwind: "$items" },
  {
    $group: {
      _id: {
        channel: "$channel",
        category: "$items.category"
      },
      grossValue: { $sum: { $multiply: ["$items.quantity", "$items.unitPrice"] } },
      units: { $sum: "$items.quantity" }
    }
  },
  {
    $project: {
      _id: 0,
      channel: "$_id.channel",
      category: "$_id.category",
      grossValue: { $round: ["$grossValue", 2] },
      units: 1
    }
  },
  { $sort: { channel: 1, grossValue: -1 } }
]);
