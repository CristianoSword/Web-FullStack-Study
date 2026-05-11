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
        <input #newMsg type="text" placeholder="Digite uma nota ou lembrete...">
        <button (click)="add(newMsg.value); newMsg.value=''">Adicionar</button>
      </div>

      <div class="message-list">
        @for (m of messages; track $index) {
          <div class="message-card">
            <span class="bullet"></span>
            {{ m }}
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .container { 
      padding: 3rem; 
      font-family: 'Outfit', 'Inter', sans-serif; 
      max-width: 550px; 
      margin: 2rem auto; 
      background: #fdfdfd;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    }
    h1 { color: #1a1a1a; margin-bottom: 2rem; font-size: 1.8rem; text-align: center; }
    .input-group { display: flex; gap: 12px; margin-bottom: 2.5rem; }
    input { 
      flex: 1; 
      padding: 14px 18px; 
      border: 2px solid #f0f0f0; 
      border-radius: 12px; 
      font-size: 1rem; 
      outline: none;
      transition: all 0.3s;
    }
    input:focus { border-color: #6200ee; background: white; }
    button { 
      padding: 14px 28px; 
      background: #6200ee; 
      color: white; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-weight: 600; 
      transition: all 0.3s;
    }
    button:hover { background: #3700b3; transform: translateY(-2px); }
    .message-card { 
      padding: 18px; 
      background: white; 
      margin-top: 12px; 
      border-radius: 12px; 
      display: flex;
      align-items: center;
      gap: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03); 
      border: 1px solid #f5f5f5;
      animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    }
    .bullet {
      width: 10px;
      height: 10px;
      background: #03dac6;
      border-radius: 50%;
      flex-shrink: 0;
    }
    @keyframes slideIn { 
      from { opacity: 0; transform: translateX(-20px); } 
      to { opacity: 1; transform: translateX(0); } 
    }
  `]
})
export class AppComponent {
  private dataService = inject(DataService);
  messages = this.dataService.getMessages();

  add(msg: string) {
    if (msg.trim()) {
      this.dataService.addMessage(msg);
    }
  }
}
