const items = [
  { id: 1, title: "Review task list", done: false },
  { id: 2, title: "Prepare study notes", done: true },
];

function listItems() {
  return items;
}

function addItem(title) {
  const nextId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  const item = { id: nextId, title, done: false };
  items.push(item);
  return item;
}

function completeItem(id) {
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return null;
  }

  item.done = true;
  return item;
}

module.exports = {
  listItems,
  addItem,
  completeItem,
};
