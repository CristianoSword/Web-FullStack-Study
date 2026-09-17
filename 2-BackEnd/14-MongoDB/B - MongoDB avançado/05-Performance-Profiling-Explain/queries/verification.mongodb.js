use("perf_lab");

print("Documents:");
printjson({ totalEvents: db.events.countDocuments() });

print("Indexes:");
printjson(db.events.getIndexes());

print("Top slow buckets:");
printjson(
  db.events.aggregate([
    {
      $bucket: {
        groupBy: "$durationMs",
        boundaries: [0, 200, 400, 600, 800, 1200],
        default: "overflow",
        output: { total: { $sum: 1 } }
      }
    }
  ]).toArray()
);
