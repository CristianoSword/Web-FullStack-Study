import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>{{ title }}</h1>
      <p>Bem-vindo ao estudo de Angular!</p>
      <p>Data atual: {{ today | date:'fullDate' }}</p>
    </div>
  `,
  styles: [`
    .container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 2rem;
      border-radius: 12px;
      background: linear-gradient(135deg, #6200ee, #03dac6);
      color: white;
      text-align: center;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      max-width: 500px;
      margin: 2rem auto;
    }
  `]
})
export class AppComponent {
  title = 'Hello Angular Interpolation';
  today = new Date();
}
