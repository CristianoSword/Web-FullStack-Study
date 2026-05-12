import { Task, TaskStatus, TaskUpdate } from "./types";
import { StorageProvider } from "./storage";

export class TaskManager {
    private tasks: Task[] = [];
    private storage?: StorageProvider;

    constructor(storage?: StorageProvider) {
        this.storage = storage;
        if (this.storage) {
            this.tasks = this.storage.load();
        }
    }

    private save(): void {
        this.storage?.save(this.tasks);
    }

    addTask(title: string, description: string): Task {
        if (!title.trim()) throw new Error("Ttulo no pode ser vazio");
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            status: TaskStatus.TODO,
            createdAt: new Date()
        };
        this.tasks.push(newTask);
        this.save();
        return newTask;
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    updateTask(id: string, update: TaskUpdate): Task | undefined {
        if (update.title !== undefined && !update.title.trim()) {
            throw new Error("Ttulo no pode ser vazio");
        }
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, update);
            this.save();
            return task;
        }
        return undefined;
    }

    deleteTask(id: string): boolean {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    filterByStatus(status: TaskStatus): Task[] {
        return this.tasks.filter(t => t.status === status);
    }

    searchTasks(query: string): Task[] {
        const lowerQuery = query.toLowerCase();
        return this.tasks.filter(t => 
            t.title.toLowerCase().includes(lowerQuery) || 
            t.description.toLowerCase().includes(lowerQuery)
        );
    }
}
