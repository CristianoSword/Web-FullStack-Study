const { seedTasks } = require("../models/task-model");

const tasks = seedTasks();

module.exports = {
  tasks,
};
