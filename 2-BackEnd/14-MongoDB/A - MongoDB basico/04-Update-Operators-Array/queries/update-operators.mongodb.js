use("project_tracker");

// $set root and nested values
db.projects.updateOne(
  { projectId: "PRJ-1002" },
  {
    $set: {
      status: "active",
      "members.0.role": "product-manager"
    }
  }
);

// $push with nested object append
db.projects.updateOne(
  { projectId: "PRJ-1001" },
  {
    $push: {
      members: { name: "Diego", role: "qa" }
    }
  }
);

// $push with $each to add multiple labels
db.projects.updateOne(
  { projectId: "PRJ-1002" },
  {
    $push: {
      labels: {
        $each: ["sync", "roadmap"]
      }
    }
  }
);

// $addToSet to prevent duplicate label
db.projects.updateOne(
  { projectId: "PRJ-1001" },
  {
    $addToSet: {
      labels: "backend"
    }
  }
);

// $push nested checkpoints array
db.projects.updateOne(
  { projectId: "PRJ-1001", "tasks.taskId": "TASK-2" },
  {
    $push: {
      "tasks.$.checkpoints": {
        $each: ["implementation", "testing"]
      }
    }
  }
);

// $pull member and label
db.projects.updateOne(
  { projectId: "PRJ-1001" },
  {
    $pull: {
      labels: "mongodb",
      members: { name: "Diego" }
    }
  }
);
