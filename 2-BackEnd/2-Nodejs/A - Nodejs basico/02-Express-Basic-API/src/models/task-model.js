/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {string} status
 * @property {string} owner
 */

/**
 * @returns {Task[]}
 */
function seedTasks() {
  return [
    { id: 1, title: "Map API routes", status: "todo", owner: "Camila" },
    { id: 2, title: "Write validation layer", status: "doing", owner: "Rafael" },
    { id: 3, title: "Document curl examples", status: "done", owner: "Bianca" },
  ];
}

module.exports = {
  seedTasks,
};
