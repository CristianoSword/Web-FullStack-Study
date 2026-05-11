import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <h1>Property & Event Binding</h1>
      
      <div class="box" [style.backgroundColor]="boxColor">
        Cor atual: {{ boxColor }}
      </div>

      <div class="controls">
        <input type="text" #colorInput placeholder="Digite uma cor (ex: red, #000)">
        <button (click)="changeColor(colorInput.value)">Mudar Cor</button>
      </div>

      <p>Cliques no botão: {{ clickCount }}</p>
    </div>
  `,
  styles: [`
    .container { 
      text-align: center; 
      font-family: 'Segoe UI', sans-serif; 
      padding: 2rem;
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      max-width: 450px;
      margin: 2rem auto;
    }
    .box { 
      width: 100%; 
      height: 120px; 
      margin: 1.5rem auto; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      color: white; 
      font-weight: bold; 
      text-shadow: 1px 1px 4px rgba(0,0,0,0.5); 
      border-radius: 12px; 
      transition: all 0.4s ease;
      font-size: 1.2rem;
    }
    .box:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    .controls { display: flex; gap: 10px; justify-content: center; margin-top: 2rem; }
    input { 
      padding: 10px; 
      border: 2px solid #eee; 
      border-radius: 8px; 
      flex: 1;
      outline: none;
      transition: border-color 0.3s;
    }
    input:focus { border-color: #6200ee; }
    button { 
      padding: 10px 20px; 
      cursor: pointer; 
      background: #6200ee; 
      color: white; 
      border: none; 
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.3s;
    }
    button:hover { background: #3700b3; }
  `]
})
export class AppComponent {
  boxColor = '#6200ee';
  clickCount = 0;

  changeColor(newColor: string) {
    if (newColor) {
      this.boxColor = newColor;
      this.clickCount++;
    }
  }
}
