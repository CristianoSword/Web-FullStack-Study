import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLoaderService } from './services/widget-loader.service';
import { MicroWidgetConfig, WidgetAnalytics } from './models/micro.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="shell-wrapper">
      <header class="shell-header">
        <div class="brand">
          <span class="brand-icon">🌐</span>
          <h1>AURA<span class="highlight">SHELL</span></h1>
        </div>
        <p class="subtitle">Orquestrador e carregador sob demanda de Micro-Frontends isolados baseados em standalone components.</p>
      </header>

      <!-- Operations Dashboard Panel -->
      <section class="telemetry-panel">
        <div class="metric-card">
          <span class="m-label">Módulos Carregados</span>
          <span class="m-val">{{ loadedWidgetsCount }} / 3</span>
        </div>
        
        <div class="metric-card">
          <span class="m-label">Latência Simulada</span>
          <span class="m-val highlight">1.5s</span>
        </div>

        <div class="metric-card">
          <span class="m-label">Última Operação</span>
          <span class="m-val time">{{ lastInteraction || 'Nenhuma' }}</span>
        </div>
      </section>

      <!-- Main Shell Content Grid -->
      <main class="shell-content">
        <!-- Control Center (Loaders) -->
        <aside class="control-center">
          <h2>Central de Orquestração</h2>
          <p class="section-desc">Instancie ou remova micro-aplicações isoladas do contêiner.</p>

          <div class="widget-list">
            @for (widget of widgets; track widget.id) {
              <div class="widget-control-card">
                <div class="widget-meta">
                  <span class="meta-icon">{{ widget.icon }}</span>
                  <div class="meta-text">
                    <h3>{{ widget.name }}</h3>
                    <p>{{ widget.category }}</p>
                  </div>
                </div>

                <div class="widget-actions">
                  @if (widget.loadingState === 'idle') {
                    <button 
                      (click)="loadWidget(widget.id)" 
                      class="btn btn-load"
                    >
                      Montar Módulo
                    </button>
                  } @else if (widget.loadingState === 'loading') {
                    <button class="btn btn-loading" disabled>
                      Baixando...
                    </button>
                  } @else if (widget.loadingState === 'loaded') {
                    <button 
                      (click)="unloadWidget(widget.id)" 
                      class="btn btn-unload"
                    >
                      Desmontar
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        </aside>

        <!-- Dynamic Micro-Frontend Mounting Port -->
        <section class="viewport-section">
          <h2>Porta de Visualização (Viewport)</h2>
          <p class="section-desc">Grade de módulos carregados e renderizados dinamicamente pelo Angular.</p>

          <!-- The view container where components will be mounted dynamically -->
          <div class="viewport-canvas">
            <div #widgetContainer class="widgets-render-grid"></div>

            @if (loadedWidgetsCount === 0) {
              <div class="empty-viewport">
                <span class="empty-icon">🔌</span>
                <p>Nenhum micro-frontend montado na porta.</p>
                <p class="empty-sub">Acione "Montar Módulo" para simular o download assíncrono e injeção do chunk.</p>
              </div>
            }
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .shell-wrapper {
      padding: 48px;
      max-width: 1300px;
      margin: 0 auto;
    }

    .shell-header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 6px;
    }

    .brand-icon { font-size: 32px; }
    .brand h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
    .highlight { color: hsl(var(--primary)); }
    .subtitle { color: var(--text-secondary); font-size: 14px; }

    /* Telemetry Panel */
    .telemetry-panel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    .metric-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .m-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .m-val {
      font-size: 22px;
      font-weight: 850;
      color: var(--text-primary);
    }

    .m-val.time {
      font-size: 16px;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      margin-top: 6px;
    }

    /* Layout Grid */
    .shell-content {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 40px;
    }

    @media (max-width: 950px) {
      .shell-content {
        grid-template-columns: 1fr;
      }
    }

    .control-center h2, .viewport-section h2 {
      font-size: 18px;
      font-weight: 850;
      margin-bottom: 6px;
    }

    .section-desc {
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .widget-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .widget-control-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: border-color 0.2s;
    }

    .widget-control-card:hover {
      border-color: var(--border-focus);
    }

    .widget-meta {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .meta-icon {
      font-size: 24px;
    }

    .meta-text h3 {
      font-size: 14px;
      font-weight: 800;
    }

    .meta-text p {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .widget-actions {
      display: flex;
    }

    .btn {
      width: 100%;
      border: none;
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 800;
      padding: 10px 16px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.25s;
    }

    .btn-load {
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border-focus);
      color: var(--text-primary);
    }

    .btn-load:hover {
      background-color: hsl(var(--primary));
      color: var(--bg-app);
      border-color: hsl(var(--primary));
    }

    .btn-loading {
      background-color: var(--border);
      color: var(--text-muted);
      cursor: not-allowed;
    }

    .btn-unload {
      background-color: transparent;
      border: 1px solid rgba(255, 74, 74, 0.4);
      color: #ff4a4a;
    }

    .btn-unload:hover {
      background-color: rgba(255, 74, 74, 0.1);
    }

    /* Viewport mount area */
    .viewport-canvas {
      background-color: #020001;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 32px;
      min-height: 400px;
      position: relative;
    }

    .widgets-render-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
    }

    .empty-viewport {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: var(--text-muted);
      width: 80%;
    }

    .empty-icon {
      font-size: 48px;
      margin-bottom: 12px;
      display: block;
    }

    .empty-sub {
      font-size: 11px;
      margin-top: 6px;
    }
  `]
})
export class AppComponent {
  widgets: MicroWidgetConfig[] = [
    { id: 'finance', name: 'Painel Financeiro', category: 'Corporativo', icon: '📈', loadingState: 'idle' },
    { id: 'logs', name: 'Log de Operações', category: 'Auditoria', icon: '💻', loadingState: 'idle' },
    { id: 'analytics', name: 'Painel de Métricas', category: 'Performance', icon: '📊', loadingState: 'idle' }
  ];

  loadedWidgetsCount = 0;
  lastInteraction = '';
  
  // Keep active component references to clean up cleanly!
  private activeComponents: Record<string, ComponentRef<any>> = {};

  @ViewChild('widgetContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private loader: WidgetLoaderService) {}

  loadWidget(widgetId: string) {
    const widget = this.widgets.find(w => w.id === widgetId);
    if (!widget) return;

    widget.loadingState = 'loading';
    this.updateTelemetry(`Carregando módulo: ${widget.name}`);

    this.loader.loadWidgetComponent(widgetId).subscribe({
      next: (componentType) => {
        // Programmatically compile and render standalone widget into container
        const compRef = this.container.createComponent(componentType);
        
        // Save reference for deletion later
        this.activeComponents[widgetId] = compRef;

        widget.loadingState = 'loaded';
        this.loadedWidgetsCount++;
        this.updateTelemetry(`Módulo montado: ${widget.name}`);
      },
      error: (err) => {
        widget.loadingState = 'error';
        this.updateTelemetry(`Erro no módulo: ${widget.name}`);
        console.error(err);
      }
    });
  }

  unloadWidget(widgetId: string) {
    const widget = this.widgets.find(w => w.id === widgetId);
    const compRef = this.activeComponents[widgetId];
    
    if (widget && compRef) {
      // Find component index in the container to destroy
      const index = this.container.indexOf(compRef.hostView);
      if (index > -1) {
        this.container.remove(index);
      }
      compRef.destroy();

      delete this.activeComponents[widgetId];
      widget.loadingState = 'idle';
      this.loadedWidgetsCount--;
      this.updateTelemetry(`Módulo removido: ${widget.name}`);
    }
  }

  private updateTelemetry(opName: string) {
    this.lastInteraction = opName;
  }
}
