import { TaskManager } from "./manager";
import { MockStorage } from "./storage";
import { TaskStatus } from "./types";

const manager = new TaskManager(new MockStorage());

console.log("--- TaskFlow CLI ---");

// Adicionando tarefas
const t1 = manager.addTask("Estudar TypeScript", "Completar os 6 projetos de estudo");
const t2 = manager.addTask("Configurar Ambiente", "Instalar Node, TS e Vite");

console.log("Tarefas iniciais:", manager.getTasks());

// Atualizando status
manager.updateTask(t1.id, { status: TaskStatus.IN_PROGRESS });
console.log("Aps atualizao:", manager.filterByStatus(TaskStatus.IN_PROGRESS));

// Busca
console.log("Busca por 'Configurar':", manager.searchTasks("Configurar"));

// Deleo
manager.deleteTask(t2.id);
console.log("Aps deleo:", manager.getTasks());
