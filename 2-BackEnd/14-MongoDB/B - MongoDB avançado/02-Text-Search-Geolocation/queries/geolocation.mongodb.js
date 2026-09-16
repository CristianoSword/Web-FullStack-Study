use("places_directory");

db.venues.find(
  {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [-46.6333, -23.5505]
        },
        $maxDistance: 120000
      }
    }
  },
  {
    _id: 0,
    venueId: 1,
    name: 1,
    city: 1,
    location: 1
  }
);
