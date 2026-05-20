// Modelo de uma tarefa (Todo)
export class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = new Date();
  }
}
