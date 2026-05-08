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
    .container { text-align: center; font-family: sans-serif; }
    .box { width: 200px; height: 100px; margin: 1rem auto; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 1px 1px 2px black; border-radius: 8px; }
    .controls { margin: 1rem; }
    input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 5px; }
    button { padding: 8px 16px; cursor: pointer; }
  `]
})
export class AppComponent {
  boxColor = 'blue';
  clickCount = 0;

  changeColor(newColor: string) {
    if (newColor) {
      this.boxColor = newColor;
      this.clickCount++;
    }
  }
}
