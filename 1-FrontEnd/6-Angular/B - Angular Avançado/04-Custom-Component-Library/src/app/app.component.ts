import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuraButtonComponent } from './library/aura-button.component';
import { AuraBadgeComponent } from './library/aura-badge.component';
import { AuraCardComponent } from './library/aura-card.component';
import { AuraRippleDirective } from './library/aura-ripple.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AuraButtonComponent,
    AuraBadgeComponent,
    AuraCardComponent,
    AuraRippleDirective
  ],
  template: `
    <div class="library-wrapper">
      <header class="app-header">
        <div class="brand">
          <span class="brand-icon">🎨</span>
          <h1>AURA<span class="highlight">UI</span></h1>
        </div>
        <p class="subtitle">Biblioteca corporativa de componentes de UI reusáveis com suporte a efeitos táteis e HSL customizáveis.</p>
      </header>

      <main class="dashboard-grid">
        <!-- Buttons Showcase -->
        <section class="demo-section">
          <h2>1. Botões Dinâmicos (AuraButton)</h2>
          <p class="section-desc">Botões com suporte nativo a efeitos de ripple neon e múltiplos estados.</p>
          
          <aura-card title="Variantes de Botões" subtitle="Clique nos botões para testar o efeito tátil ripple">
            <div class="button-preview-row">
              <aura-button variant="primary" (auraClick)="logInteraction('Botão Primário Clicado')">
                Primário ⚡
              </aura-button>
              
              <aura-button variant="secondary" (auraClick)="logInteraction('Botão Secundário Clicado')">
                Secundário
              </aura-button>
              
              <aura-button variant="outline" (auraClick)="logInteraction('Botão Outline Clicado')">
                Contorno
              </aura-button>
              
              <aura-button variant="danger" (auraClick)="logInteraction('Botão Perigo Clicado')">
                Excluir 🗑️
              </aura-button>
              
              <aura-button variant="primary" [disabled]="true">
                Bloqueado 🔒
              </aura-button>
            </div>
          </aura-card>
        </section>

        <!-- Badges Showcase -->
        <section class="demo-section">
          <h2>2. Badges de Status (AuraBadge)</h2>
          <p class="section-desc">Marcadores de tag responsivos para sinalizar status de rede, APIs ou bancos de dados.</p>
          
          <aura-card title="Indicadores de Status" subtitle="Formatos padrão e mini tags">
            <div class="badge-preview-row">
              <div class="badge-group">
                <span class="badge-label">Sucesso:</span>
                <aura-badge variant="success">Online</aura-badge>
              </div>

              <div class="badge-group">
                <span class="badge-label">Alerta:</span>
                <aura-badge variant="warning">Atenção</aura-badge>
              </div>

              <div class="badge-group">
                <span class="badge-label">Informação:</span>
                <aura-badge variant="info">Processando</aura-badge>
              </div>

              <div class="badge-group">
                <span class="badge-label">Falha:</span>
                <aura-badge variant="danger">Erro 500</aura-badge>
              </div>
            </div>
          </aura-card>
        </section>

        <!-- Cards Showcase (Content Projection) -->
        <section class="demo-section">
          <h2>3. Recipientes & Projeção (AuraCard)</h2>
          <p class="section-desc">Conteineres flexíveis baseados em Content Projection (&lt;ng-content&gt;) e elevação.</p>

          <div class="cards-preview-grid">
            <aura-card 
              title="Cartão Interativo" 
              subtitle="Possui animação sutil de hover" 
              [hoverable]="true"
            >
              <p class="card-inner-text">Este cartão possui a propriedade <code>[hoverable]="true"</code>, permitindo a flutuação dinâmica e alteração da borda ao passar o ponteiro do cursor.</p>
            </aura-card>

            <aura-card 
              title="Cartão Clicável" 
              subtitle="Dispara eventos customizados" 
              [clickable]="true"
              [hoverable]="true"
              (auraClick)="logInteraction('Cartão Clicável Acionado!')"
            >
              <p class="card-inner-text">Este cartão possui <code>[clickable]="true"</code>, adicionando cursor pointer e feedback ativo ao clicar sobre o recipiente.</p>
            </aura-card>
          </div>
        </section>

        <!-- Activity Logger Console -->
        <section class="demo-section console-section">
          <h2>Log de Interação dos Componentes</h2>
          <p class="section-desc">Efetue ações nos componentes da biblioteca para gerar históricos reativos.</p>

          <div class="console-box">
            @for (log of logs; track log) {
              <div class="console-line">
                <span class="bullet">⚡</span>
                <span class="content">{{ log }}</span>
              </div>
            } @empty {
              <div class="console-line empty">Aguardando interações...</div>
            }
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .library-wrapper {
      padding: 48px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .app-header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 48px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 6px;
    }

    .brand-icon {
      font-size: 32px;
    }

    .brand h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .highlight {
      color: hsl(var(--primary));
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 14px;
    }

    /* Grid Dashboard */
    .dashboard-grid {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    .demo-section h2 {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 6px;
    }

    .section-desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .button-preview-row, .badge-preview-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
    }

    .badge-group {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border);
      padding: 10px 16px;
      border-radius: var(--radius-sm);
    }

    .badge-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .cards-preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .card-inner-text {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .card-inner-text code {
      background-color: var(--bg-surface-hover);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-mono);
      color: hsl(var(--primary));
    }

    /* Logger Console */
    .console-box {
      background-color: #010105;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      font-family: var(--font-mono);
      font-size: 12px;
      min-height: 160px;
      max-height: 300px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .console-line {
      display: flex;
      gap: 10px;
      line-height: 1.5;
    }

    .console-line .bullet {
      color: hsl(var(--primary));
    }

    .console-line .content {
      color: var(--text-primary);
    }

    .console-line.empty {
      color: var(--text-muted);
      font-style: italic;
    }
  `]
})
export class AppComponent {
  logs: string[] = [];

  logInteraction(message: string) {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    this.logs.unshift(`[${timestamp}] Interação AuraUI: ${message}`);
    if (this.logs.length > 8) {
      this.logs.pop();
    }
  }
}
