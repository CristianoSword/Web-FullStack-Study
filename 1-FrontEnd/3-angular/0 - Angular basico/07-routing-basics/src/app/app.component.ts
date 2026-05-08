import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="page-content">
      <h2>🏠 Página Inicial</h2>
      <p>Bem-vindo ao estudo de Roteamento no Angular 18!</p>
      <div class="card">Nesta aula, aprendemos como navegar entre componentes sem recarregar a página.</div>
    </div>
  `,
  styles: [`.page-content { animation: fadeIn 0.5s ease; } .card { background: #eee; padding: 15px; border-radius: 8px; margin-top: 10px; }`]
})
export class HomeComponent {}

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="page-content">
      <h2>ℹ️ Sobre o Projeto</h2>
      <p>Este módulo faz parte do <strong>Web-FullStack-Study</strong>.</p>
      <p>O roteamento permite criar Single Page Applications (SPA) fluidas.</p>
    </div>
  `,
  styles: [`.page-content { animation: fadeIn 0.5s ease; }`]
})
export class AboutComponent {}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <header>
        <h1>Angular Routing</h1>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Início</a>
          <a routerLink="/about" routerLinkActive="active">Sobre</a>
        </nav>
      </header>

      <main class="router-box">
        <router-outlet></router-outlet>
      </main>
      
      <footer>Estudo Angular 2026</footer>
    </div>
  `,
  styles: [`
    .container { 
      padding: 2rem; 
      font-family: 'Outfit', sans-serif; 
      max-width: 600px; 
      margin: 2rem auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    header { border-bottom: 2px solid #f0f0f0; margin-bottom: 2rem; padding-bottom: 1rem; }
    h1 { margin: 0 0 1rem; color: #333; }
    nav { display: flex; gap: 15px; }
    a { 
      text-decoration: none; 
      color: #666; 
      font-weight: 600; 
      padding: 8px 16px; 
      border-radius: 10px;
      transition: all 0.3s;
    }
    a.active { color: white; background: #6200ee; box-shadow: 0 4px 10px rgba(98,0,238,0.3); }
    .router-box { min-height: 200px; padding: 20px; background: #fafafa; border-radius: 15px; }
    footer { margin-top: 2rem; text-align: center; color: #999; font-size: 0.8rem; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class AppComponent {}
