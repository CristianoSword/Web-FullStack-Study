use("places_directory");

db.venues.find(
  { $text: { $search: "coworking coffee startup" } },
  {
    _id: 0,
    venueId: 1,
    name: 1,
    city: 1,
    score: { $meta: "textScore" }
  }
).sort({ score: { $meta: "textScore" } });

db.venues.find(
  { $text: { $search: "\"developer community\" beach" } },
  {
    _id: 0,
    venueId: 1,
    name: 1,
    category: 1,
    score: { $meta: "textScore" }
  }
).sort({ score: { $meta: "textScore" } });
