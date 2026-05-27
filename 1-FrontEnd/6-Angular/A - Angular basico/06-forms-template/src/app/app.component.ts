import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h1>Template-Driven Forms</h1>
      
      <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm.value)" class="form-card">
        <div class="field">
          <label>Nome de usuário</label>
          <input type="text" name="username" ngModel required placeholder="Ex: Cristiano">
        </div>

        <div class="field">
          <label>E-mail</label>
          <input type="email" name="email" ngModel required email placeholder="seu@email.com">
        </div>

        <button type="submit" [disabled]="!userForm.valid">Enviar Cadastro</button>
      </form>

      @if (submitted) { 
        <div class="success-message">
          ✅ Formulário enviado com sucesso!
        </div> 
      }
    </div>
  `,
  styles: [`
    .container { 
      padding: 3rem; 
      font-family: 'Segoe UI', system-ui, sans-serif; 
      max-width: 400px; 
      margin: 3rem auto;
    }
    h1 { text-align: center; color: #333; margin-bottom: 2rem; }
    .form-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .field { display: flex; flex-direction: column; gap: 8px; }
    label { font-size: 0.9rem; color: #666; font-weight: 500; }
    input { 
      padding: 12px; 
      border: 2px solid #eee; 
      border-radius: 8px; 
      font-size: 1rem;
      transition: all 0.3s;
    }
    input:focus { border-color: #6200ee; outline: none; }
    input.ng-invalid.ng-touched { border-color: #ff0033; }
    
    button { 
      padding: 14px; 
      background: #6200ee; 
      color: white; 
      border: none; 
      border-radius: 8px; 
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
      transition: opacity 0.3s;
    }
    button:disabled { background: #ccc; cursor: not-allowed; }
    button:not(:disabled):hover { background: #3700b3; }

    .success-message {
      margin-top: 1.5rem;
      padding: 15px;
      background: #e7f9ee;
      color: #1e7e34;
      border-radius: 10px;
      text-align: center;
      font-weight: 500;
      animation: fadeIn 0.5s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } }
  `]
})
export class AppComponent {
  submitted = false;
  onSubmit(data: any) { 
    console.log('Form Data:', data); 
    this.submitted = true; 
    setTimeout(() => this.submitted = false, 5000);
  }
}
