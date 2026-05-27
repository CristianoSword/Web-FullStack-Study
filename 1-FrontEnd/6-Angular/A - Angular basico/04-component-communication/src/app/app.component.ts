import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="child">
      <h3>Componente Filho</h3>
      <p>Mensagem do Pai: <strong>{{ parentMessage }}</strong></p>
      <button (click)="sendMessage()">Enviar para o Pai</button>
    </div>
  `,
  styles: [`
    .child { 
      padding: 1.5rem; 
      border: 2px dashed #03dac6; 
      border-radius: 12px; 
      margin-top: 1.5rem; 
      background: rgba(3, 218, 198, 0.05);
    }
    h3 { margin-top: 0; color: #018786; }
    button { 
      padding: 8px 16px; 
      background: #018786; 
      color: white; 
      border: none; 
      border-radius: 6px; 
      cursor: pointer;
      font-weight: 500;
      transition: transform 0.2s;
    }
    button:active { transform: scale(0.95); }
  `]
})
export class ChildComponent {
  @Input() parentMessage: string = '';
  @Output() childEvent = new EventEmitter<string>();

  sendMessage() {
    this.childEvent.emit('Olá Papai! Recebi sua mensagem.');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <div class="container">
      <h1>Comunicação de Componentes</h1>
      <div class="status-box">
        <small>Mensagem do Filho:</small>
        <p>{{ childMessage }}</p>
      </div>
      
      <app-child 
        [parentMessage]="'Oi filho, o jantar está pronto!'" 
        (childEvent)="handleChildEvent($event)">
      </app-child>
    </div>
  `,
  styles: [`
    .container { 
      padding: 2.5rem; 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      max-width: 450px; 
      margin: 3rem auto; 
      border-radius: 20px; 
      box-shadow: 0 15px 35px rgba(0,0,0,0.1); 
      background: white; 
    }
    h1 { color: #333; font-size: 1.8rem; margin-bottom: 1.5rem; text-align: center; }
    .status-box { 
      background: #f8f9fa; 
      padding: 15px; 
      border-radius: 10px; 
      border-left: 5px solid #6200ee;
    }
    .status-box p { margin: 5px 0 0; font-weight: 600; color: #6200ee; }
    small { color: #666; text-transform: uppercase; letter-spacing: 1px; }
  `]
})
export class AppComponent {
  childMessage: string = 'Aguardando resposta...';

  handleChildEvent(message: string) {
    this.childMessage = message;
  }
}
