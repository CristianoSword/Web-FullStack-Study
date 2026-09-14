db = db.getSiblingDB("project_tracker");

db.createCollection("projects", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["projectId", "name", "status", "labels", "members", "tasks", "createdAt"],
      properties: {
        projectId: { bsonType: "string" },
        name: { bsonType: "string" },
        status: { enum: ["planning", "active", "paused", "done"] },
        labels: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        members: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["name", "role"],
            properties: {
              name: { bsonType: "string" },
              role: { bsonType: "string" }
            }
          }
        },
        tasks: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["taskId", "title", "done"],
            properties: {
              taskId: { bsonType: "string" },
              title: { bsonType: "string" },
              done: { bsonType: "bool" },
              checkpoints: {
                bsonType: "array",
                items: { bsonType: "string" }
              }
            }
          }
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.projects.createIndex({ projectId: 1 }, { unique: true, name: "project_id_unique" });

if (db.projects.countDocuments() === 0) {
  db.projects.insertMany([
    {
      projectId: "PRJ-1001",
      name: "Realtime Dashboard",
      status: "active",
      labels: ["mongodb", "backend"],
      members: [
        { name: "Ana", role: "tech-lead" },
        { name: "Bruno", role: "backend" }
      ],
      tasks: [
        {
          taskId: "TASK-1",
          title: "Design schema",
          done: true,
          checkpoints: ["draft", "review", "approved"]
        },
        {
          taskId: "TASK-2",
          title: "Implement API endpoints",
          done: false,
          checkpoints: ["spec"]
        }
      ],
      createdAt: new Date("2026-05-01T09:00:00Z")
    },
    {
      projectId: "PRJ-1002",
      name: "Mobile Sync",
      status: "planning",
      labels: ["mobile", "offline"],
      members: [
        { name: "Carla", role: "pm" }
      ],
      tasks: [
        {
          taskId: "TASK-10",
          title: "Map offline conflicts",
          done: false,
          checkpoints: ["research"]
        }
      ],
      createdAt: new Date("2026-05-03T11:30:00Z")
    }
  ]);
}
