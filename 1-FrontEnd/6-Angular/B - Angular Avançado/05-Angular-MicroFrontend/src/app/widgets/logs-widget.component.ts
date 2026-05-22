import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'logs-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="micro-widget logs-card">
      <div class="widget-header">
        <span class="icon">💻</span>
        <h3>Módulo de Auditoria</h3>
      </div>
      <p class="summary">Rastreamento de logs em tempo de execução.</p>
      
      <div class="console-mini">
        <div class="log-row"><span class="time">[14:32:01]</span> <span class="txt">Core container loaded</span></div>
        <div class="log-row"><span class="time">[14:32:05]</span> <span class="txt text-success">Auth token verified</span></div>
        <div class="log-row"><span class="time">[14:32:10]</span> <span class="txt text-warn">Database pool: 2 active</span></div>
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
    .console-mini {
      background-color: #010103;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .log-row { display: flex; gap: 8px; }
    .time { color: var(--text-muted); }
    .txt { color: var(--text-primary); }
    .text-success { color: #2ad17a; }
    .text-warn { color: #ffc83b; }
  `]
})
export class LogsWidgetComponent {}
