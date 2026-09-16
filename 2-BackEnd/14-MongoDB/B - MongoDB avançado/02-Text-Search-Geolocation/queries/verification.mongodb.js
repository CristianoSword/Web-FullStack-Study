use("places_directory");

db.venues.countDocuments();
db.venues.getIndexes();
db.venues.find({}, { _id: 0, venueId: 1, name: 1, city: 1, category: 1 }).sort({ venueId: 1 });
