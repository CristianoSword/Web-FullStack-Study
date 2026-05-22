import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; text-align: center;">
      <h1>🔮 AuraRxJS Setup</h1>
      <p>Biblioteca de operadores customizados RxJS e Reactive Forms complexos.</p>
    </div>
  `,
  styles: [`
    h1 {
      color: hsl(var(--primary));
    }
  `]
})
export class AppComponent {
  title = 'AuraRxJS';
}
