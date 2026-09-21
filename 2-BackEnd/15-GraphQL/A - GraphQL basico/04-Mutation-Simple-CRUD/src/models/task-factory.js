let currentId = 3;

export function createTaskRecord(input) {
  return {
    id: `TSK-${String(currentId++).padStart(3, "0")}`,
    title: input.title,
    description: input.description,
    status: "todo"
  };
}
