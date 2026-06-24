const { tasks } = require("../data/task-store");

function listTasks() {
  return tasks;
}

function findTask(id) {
  return tasks.find((task) => task.id === id) ?? null;
}

function createTask(payload) {
  const nextId = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  const task = {
    id: nextId,
    title: payload.title,
    status: payload.status,
    owner: payload.owner,
  };

  tasks.push(task);
  return task;
}

function updateTask(id, payload) {
  const task = findTask(id);

  if (!task) {
    return null;
  }

  task.title = payload.title ?? task.title;
  task.status = payload.status ?? task.status;
  task.owner = payload.owner ?? task.owner;

  return task;
}

function removeTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  listTasks,
  findTask,
  createTask,
  updateTask,
  removeTask,
};
