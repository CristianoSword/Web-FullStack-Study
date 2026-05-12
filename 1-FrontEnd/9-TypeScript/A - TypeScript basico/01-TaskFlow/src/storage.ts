import { Task } from "./types";

export interface StorageProvider {
    save(tasks: Task[]): void;
    load(): Task[];
}

export class MockStorage implements StorageProvider {
    private storageName = "taskflow_tasks";

    save(tasks: Task[]): void {
        console.log(`[Storage] Salvando ${tasks.length} tarefas...`);
        // Simula persistência (ex: LocalStorage ou File System)
    }

    load(): Task[] {
        console.log(`[Storage] Carregando tarefas...`);
        return [];
    }
}
