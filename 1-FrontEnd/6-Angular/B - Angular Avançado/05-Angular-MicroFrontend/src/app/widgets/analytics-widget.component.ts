import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'analytics-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="micro-widget analytics-card">
      <div class="widget-header">
        <span class="icon">📊</span>
        <h3>Módulo de Métricas</h3>
      </div>
      <p class="summary">Monitoramento de acessos corporativos.</p>
      
      <div class="metrics-grid">
        <div class="metric-item">
          <span class="label">Sessões</span>
          <span class="val">8.420</span>
        </div>
        <div class="metric-item">
          <span class="label">Rejeição</span>
          <span class="val">24.6%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .micro-widget {
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border-focus);
      border-radius: var(--radius-md);
      padding: 24px;
      font-family: var(--font-sans);
    }
    .widget-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .icon { font-size: 24px; }
    h3 { font-size: 15px; font-weight: 800; }
    .summary { font-size: 12px; color: var(--text-secondary); margin-bottom: 20px; }
    .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .metric-item { background-color: var(--bg-surface); border: 1px solid var(--border); padding: 12px; border-radius: var(--radius-sm); display: flex; flex-direction: column; gap: 4px; }
    .label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; }
    .val { font-size: 18px; font-weight: 800; color: hsl(var(--primary)); }
  `]
})
export class AnalyticsWidgetComponent {}
