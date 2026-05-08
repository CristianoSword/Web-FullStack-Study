import { Injectable, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messages: string[] = ['Início do estudo de Serviços'];

  getMessages() {
    return this.messages;
  }

  addMessage(msg: string) {
    this.messages.push(msg);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Serviços e Injeção de Dependência</h1>
      
      <div class="input-group">
        <input #newMsg type="text" placeholder="Nova mensagem...">
        <button (click)="add(newMsg.value); newMsg.value=''">Adicionar</button>
      </div>

      <div class="message-list">
        @for (m of messages; track $index) {
          <div class="message">{{ m }}</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; font-family: 'Inter', sans-serif; max-width: 500px; margin: auto; }
    .input-group { display: flex; gap: 10px; margin-bottom: 2rem; }
    input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; }
    button { padding: 12px 24px; background: #6200ee; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
    button:hover { background: #3700b3; }
    .message { padding: 15px; background: white; margin-top: 10px; border-radius: 8px; border-left: 6px solid #6200ee; box-shadow: 0 2px 4px rgba(0,0,0,0.05); animation: slideIn 0.3s ease-out; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class AppComponent {
  private dataService = inject(DataService);
  messages = this.dataService.getMessages();

  add(msg: string) {
    if (msg) {
      this.dataService.addMessage(msg);
    }
  }
}
