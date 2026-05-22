import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finance-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="micro-widget finance-card">
      <div class="widget-header">
        <span class="icon">📈</span>
        <h3>Módulo Financeiro</h3>
      </div>
      <p class="summary">Receitas reativas geradas neste turno.</p>
      <div class="revenue-display">
        <span class="amount">R$ 14.890,50</span>
        <span class="badge positive">+18.4%</span>
      </div>
      <div class="mini-chart">
        <div class="bar" style="height: 40%"></div>
        <div class="bar" style="height: 60%"></div>
        <div class="bar" style="height: 50%"></div>
        <div class="bar" style="height: 90%"></div>
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
    .revenue-display { display: flex; align-items: baseline; gap: 10px; margin-bottom: 20px; }
    .amount { font-size: 20px; font-weight: 800; color: #ff4a4a; }
    .badge { font-size: 10px; font-weight: 800; color: #2ad17a; background: rgba(42, 209, 122, 0.12); padding: 2px 6px; border-radius: 4px; }
    .mini-chart { display: flex; gap: 8px; height: 50px; align-items: flex-end; }
    .bar { flex: 1; background-color: var(--border-focus); border-radius: 4px; transition: height 0.3s ease; }
    .bar:hover { background-color: #ff4a4a; }
  `]
})
export class FinanceWidgetComponent {}
