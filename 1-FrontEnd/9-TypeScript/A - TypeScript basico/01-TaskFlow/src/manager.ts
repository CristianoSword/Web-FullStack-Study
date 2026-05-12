import { Task, TaskStatus, TaskUpdate } from "./types";

export class TaskManager {
    private tasks: Task[] = [];

    addTask(title: string, description: string): Task {
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            status: TaskStatus.TODO,
            createdAt: new Date()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    updateTask(id: string, update: TaskUpdate): Task | undefined {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, update);
            return task;
        }
        return undefined;
    }

    deleteTask(id: string): boolean {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}
