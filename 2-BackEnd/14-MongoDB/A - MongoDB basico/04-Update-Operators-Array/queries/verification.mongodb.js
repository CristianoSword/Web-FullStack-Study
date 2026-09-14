use("project_tracker");

db.projects.find(
  {},
  {
    _id: 0,
    projectId: 1,
    status: 1,
    labels: 1,
    members: 1,
    tasks: 1
  }
).sort({ projectId: 1 });

db.projects.getIndexes();
