use("analytics_lab");

db.sales.aggregate([
  { $match: { status: "closed" } },
  {
    $group: {
      _id: "$seller",
      closedDeals: { $sum: 1 },
      totalRevenue: { $sum: "$revenue" },
      averageTicket: { $avg: "$revenue" }
    }
  },
  {
    $project: {
      _id: 0,
      seller: "$_id",
      closedDeals: 1,
      totalRevenue: 1,
      averageTicket: { $round: ["$averageTicket", 2] }
    }
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 5 }
]);
