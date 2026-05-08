import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Diretivas e Controle de Fluxo</h1>
      
      <button (click)="toggle()">Alternar Lista</button>

      @if (isVisible) {
        <ul>
          @for (item of items; track item.id) {
            <li>{{ item.name }}</li>
          } @empty {
            <li>Nenhum item encontrado.</li>
          }
        </ul>
      } @else {
        <p>A lista está oculta.</p>
      }
    </div>
  `,
  styles: [`
    .container { padding: 1rem; border: 1px solid #ccc; border-radius: 8px; }
    ul { list-style: none; padding: 0; }
    li { padding: 0.5rem; background: #f4f4f4; margin-bottom: 5px; border-radius: 4px; transition: background 0.3s; }
    li:hover { background: #e0e0e0; cursor: pointer; }
    button { padding: 8px 16px; background: #6200ee; color: white; border: none; border-radius: 4px; margin-bottom: 1rem; }
  `]
})
export class AppComponent {
  isVisible = true;
  items = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' }
  ];

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
