import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="child">
      <h3>Componente Filho</h3>
      <p>Mensagem do Pai: {{ parentMessage }}</p>
      <button (click)="sendMessage()">Enviar para o Pai</button>
    </div>
  `,
  styles: [`
    .child { padding: 1rem; border: 2px dashed #03dac6; border-radius: 8px; margin-top: 1rem; }
  `]
})
export class ChildComponent {
  @Input() parentMessage: string = '';
  @Output() childEvent = new EventEmitter<string>();

  sendMessage() {
    this.childEvent.emit('Olá Papai! Sou o seu filho.');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <div class="container">
      <h1>Comunicação entre Componentes</h1>
      <p>Mensagem do Filho: {{ childMessage }}</p>
      
      <app-child 
        [parentMessage]="'Oi filho, tudo bem?'" 
        (childEvent)="handleChildEvent($event)">
      </app-child>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; font-family: sans-serif; max-width: 400px; margin: 2rem auto; border: none; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background: #f9f9f9; }
    button { padding: 10px 20px; background: #6200ee; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; }
    button:hover { background: #3700b3; }
  `]
})
export class AppComponent {
  childMessage: string = 'Aguardando...';

  handleChildEvent(message: string) {
    this.childMessage = message;
  }
}
