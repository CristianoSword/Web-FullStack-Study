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
    .container { padding: 2rem; font-family: sans-serif; }
    .input-group { margin-bottom: 1rem; }
    .message { padding: 10px; background: #eee; margin-top: 5px; border-radius: 4px; border-left: 5px solid #6200ee; }
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
