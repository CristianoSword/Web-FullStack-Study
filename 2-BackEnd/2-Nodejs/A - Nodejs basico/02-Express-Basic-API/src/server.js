const express = require("express");
const {
  listTasks,
  findTask,
  createTask,
  updateTask,
  removeTask,
} = require("./services/task-service");

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ message: "API online" });
});

app.get("/tasks", (_req, res) => {
  res.json({ data: listTasks() });
});

app.get("/tasks/:id", (req, res) => {
  const task = findTask(Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ data: task });
});

app.post("/tasks", (req, res) => {
  const task = createTask(req.body);
  res.status(201).json({ message: "Task created", data: task });
});

app.put("/tasks/:id", (req, res) => {
  const task = updateTask(Number(req.params.id), req.body);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ message: "Task updated", data: task });
});

app.delete("/tasks/:id", (req, res) => {
  const removed = removeTask(Number(req.params.id));

  if (!removed) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(204).send();
});

app.listen(3000, () => {
  console.log("Express Basic API running on port 3000");
});
