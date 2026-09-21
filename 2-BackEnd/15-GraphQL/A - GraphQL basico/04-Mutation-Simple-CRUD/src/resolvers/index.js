import { createTaskRecord } from "../models/task-factory.js";
import { taskStore } from "../models/tasks.js";

function findTaskIndex(id) {
  return taskStore.findIndex((task) => task.id === id);
}

export const resolvers = {
  Query: {
    tasks: () => taskStore,
    task: (_, { id }) => taskStore.find((task) => task.id === id) ?? null
  },
  Mutation: {
    createTask: (_, { input }) => {
      const task = createTaskRecord(input);
      taskStore.push(task);
      return task;
    },
    updateTask: (_, { id, input }) => {
      const index = findTaskIndex(id);

      if (index === -1) {
        return null;
      }

      taskStore[index] = {
        ...taskStore[index],
        ...Object.fromEntries(
          Object.entries(input).filter(([, value]) => value !== null && value !== undefined)
        )
      };

      return taskStore[index];
    },
    deleteTask: (_, { id }) => {
      const index = findTaskIndex(id);

      if (index === -1) {
        return false;
      }

      taskStore.splice(index, 1);
      return true;
    }
  }
};
