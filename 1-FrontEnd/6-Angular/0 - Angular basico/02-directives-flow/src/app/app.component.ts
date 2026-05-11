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
    .container { 
      padding: 2rem; 
      font-family: sans-serif; 
      max-width: 500px; 
      margin: 0 auto;
      background: #f9f9f9;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    ul { list-style: none; padding: 0; }
    li { 
      padding: 10px; 
      background: white; 
      margin: 5px 0; 
      border-radius: 6px; 
      border-left: 4px solid #6200ee;
    }
    button { 
      padding: 10px 20px; 
      background: #6200ee; 
      color: white; 
      border: none; 
      border-radius: 6px; 
      cursor: pointer;
      font-weight: bold;
    }
    button:hover { background: #3700b3; }
  `]
})
export class AppComponent {
  isVisible = true;
  items = [
    { id: 1, name: 'Angular v18' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Standalone Components' }
  ];

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
