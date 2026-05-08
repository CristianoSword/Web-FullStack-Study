import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h1>Template-Driven Forms</h1>
      <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm.value)">
        <input type="text" name="username" ngModel required placeholder="Nome de usuário">
        <input type="email" name="email" ngModel required email placeholder="E-mail">
        <button [disabled]="!userForm.valid">Enviar</button>
      </form>
      @if (submitted) { <p>Formulário enviado com sucesso!</p> }
    </div>
  `,
  styles: [`.container { padding: 20px; } input { display: block; margin-bottom: 10px; padding: 8px; }`]
})
export class AppComponent {
  submitted = false;
  onSubmit(data: any) { console.log(data); this.submitted = true; }
}
