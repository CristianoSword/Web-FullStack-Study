db = db.getSiblingDB("places_directory");

db.createCollection("venues", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["venueId", "name", "description", "category", "city", "location", "tags", "active", "createdAt"],
      properties: {
        venueId: { bsonType: "string" },
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        category: { bsonType: "string" },
        city: { bsonType: "string" },
        location: {
          bsonType: "object",
          required: ["type", "coordinates"],
          properties: {
            type: { enum: ["Point"] },
            coordinates: {
              bsonType: "array",
              minItems: 2,
              maxItems: 2,
              items: { bsonType: ["double", "int", "long", "decimal"] }
            }
          }
        },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        active: { bsonType: "bool" },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.venues.createIndex(
  { name: "text", description: "text", tags: "text" },
  { name: "venue_text_search", default_language: "english" }
);
db.venues.createIndex(
  { location: "2dsphere" },
  { name: "venue_location_2dsphere" }
);

if (db.venues.countDocuments() === 0) {
  db.venues.insertMany([
    {
      venueId: "VEN-1001",
      name: "Paulista Cowork Garden",
      description: "Coworking space with coffee bar, meeting rooms and startup events.",
      category: "coworking",
      city: "Sao Paulo",
      location: { type: "Point", coordinates: [-46.6525, -23.5614] },
      tags: ["coworking", "coffee", "startup"],
      active: true,
      createdAt: new Date("2026-06-10T10:00:00Z")
    },
    {
      venueId: "VEN-1002",
      name: "Rio Beach Tech Hub",
      description: "Innovation hub near the beach with developer community meetups.",
      category: "innovation-hub",
      city: "Rio de Janeiro",
      location: { type: "Point", coordinates: [-43.1823, -22.9676] },
      tags: ["community", "developer", "beach"],
      active: true,
      createdAt: new Date("2026-06-11T09:30:00Z")
    },
    {
      venueId: "VEN-1003",
      name: "Curitiba Smart Logistics Center",
      description: "Operations center focused on logistics analytics and fulfillment planning.",
      category: "operations-center",
      city: "Curitiba",
      location: { type: "Point", coordinates: [-49.2733, -25.4284] },
      tags: ["logistics", "analytics", "fulfillment"],
      active: true,
      createdAt: new Date("2026-06-12T08:15:00Z")
    },
    {
      venueId: "VEN-1004",
      name: "Campinas Data Lab",
      description: "Data science workspace with workshops, cloud demos and mentoring.",
      category: "data-lab",
      city: "Campinas",
      location: { type: "Point", coordinates: [-47.0608, -22.9056] },
      tags: ["data", "cloud", "workshop"],
      active: true,
      createdAt: new Date("2026-06-13T14:20:00Z")
    },
    {
      venueId: "VEN-1005",
      name: "Belo Horizonte Product Studio",
      description: "Product design studio with discovery sprints and research rooms.",
      category: "design-studio",
      city: "Belo Horizonte",
      location: { type: "Point", coordinates: [-43.9386, -19.9208] },
      tags: ["product", "design", "research"],
      active: false,
      createdAt: new Date("2026-06-14T16:45:00Z")
    }
  ]);
}
