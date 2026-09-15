use("analytics_lab");

db.sales.aggregate([
  { $match: { status: "closed" } },
  {
    $group: {
      _id: "$region",
      totalRevenue: { $sum: "$revenue" },
      orderCount: { $sum: 1 },
      averageRevenue: { $avg: "$revenue" }
    }
  },
  {
    $project: {
      _id: 0,
      region: "$_id",
      totalRevenue: 1,
      orderCount: 1,
      averageRevenue: { $round: ["$averageRevenue", 2] }
    }
  },
  { $sort: { totalRevenue: -1 } }
]);
