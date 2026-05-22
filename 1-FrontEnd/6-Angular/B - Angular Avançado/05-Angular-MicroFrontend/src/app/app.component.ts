import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; text-align: center;">
      <h1>🌐 AuraShell Micro-Frontend</h1>
      <p>Container Shell carregador de micro-aplicações isoladas de forma dinâmica.</p>
    </div>
  `,
  styles: [`
    h1 {
      color: hsl(var(--primary));
    }
  `]
})
export class AppComponent {
  title = 'AuraShell';
}
