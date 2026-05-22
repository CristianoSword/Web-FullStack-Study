import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; text-align: center;">
      <h1>⚡ AuraNgRx Store</h1>
      <p>Gerenciamento de estado global corporativo usando NgRx Store & Effects.</p>
    </div>
  `,
  styles: [`
    h1 {
      color: hsl(var(--primary));
    }
  `]
})
export class AppComponent {
  title = 'AuraNgRx';
}
