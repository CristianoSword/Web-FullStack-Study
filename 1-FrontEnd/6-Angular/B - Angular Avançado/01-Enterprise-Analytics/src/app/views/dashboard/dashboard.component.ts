import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';
import { MetricItem } from '../../models/analytics.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-wrapper">
      <!-- Premium Sidebar Navigation -->
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-icon">⚡</span>
          <h2>AURA<span class="highlight">Analytics</span></h2>
        </div>
        <nav class="nav-menu">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">📊 Dashboard</a>
          <a routerLink="/reports" routerLinkActive="active" class="nav-link">📑 Relatórios</a>
        </nav>
        <div class="sidebar-footer">
          <p class="user-info">👤 Cristiano Sword</p>
          <span class="role-badge">Admin</span>
        </div>
      </aside>

      <!-- Main Contents Area -->
      <main class="main-content">
        <header class="content-header">
          <div>
            <h1>Dashboard Analítico</h1>
            <p class="subtitle">Monitoramento de desempenho reativo corporativo e infraestrutura SaaS.</p>
          </div>
          <div class="system-time">
            <span class="pulse-dot"></span>
            Real-time Sync ativo
          </div>
        </header>

        <!-- Metrics Cards Grid -->
        <section class="metrics-grid">
          @for (metric of metrics$ | async; track metric.id) {
            <div class="metric-card">
              <div class="card-header">
                <span class="label">{{ metric.label }}</span>
                <span [class]="['trend-badge', metric.isPositive ? 'positive' : 'negative']">
                  {{ metric.isPositive ? '▲' : '▼' }} {{ metric.trendPercent }}%
                </span>
              </div>

              <div class="value-box">
                <h2>{{ formatValue(metric) }}</h2>
              </div>

              <!-- Dynamic SVG Area Sparkline Chart -->
              <div class="sparkline-box">
                <svg viewBox="0 0 160 50" class="sparkline-svg">
                  <defs>
                    <linearGradient [id]="'grad-' + metric.id" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="var(--spark-color)" stop-opacity="0.3"/>
                      <stop offset="100%" stop-color="var(--spark-color)" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <!-- Area path -->
                  <path 
                    [attr.d]="getAreaPath(metric.history)" 
                    [attr.fill]="'url(#grad-' + metric.id + ')'"
                    [style.--spark-color]="metric.isPositive ? 'hsl(var(--accent))' : 'hsl(var(--primary))'"
                  />
                  <!-- Line path -->
                  <path 
                    [attr.d]="getLinePath(metric.history)" 
                    fill="none" 
                    [attr.stroke]="metric.isPositive ? 'hsl(var(--accent))' : 'hsl(var(--primary))'" 
                    stroke-width="1.8"
                  />
                </svg>
              </div>
            </div>
          }
        </section>

        <!-- Big Analytical Summary Card -->
        <section class="summary-section">
          <div class="summary-card">
            <h3>Visualização Tridimensional de Infraestrutura</h3>
            <p>Os servidores SaaS e as métricas do banco de dados relacional estão respondendo com latência média de 14ms (excelente). A reatividade está integrada de forma isolada no Angular 18 através de streams reativos e injeção assíncrona de dependência.</p>
            <div class="tech-stack-row">
              <span class="tech-tag">Angular 18</span>
              <span class="tech-tag">Reactive Routing</span>
              <span class="tech-tag">RxJS Streams</span>
              <span class="tech-tag">Scalable SVGs</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-wrapper {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 100vh;
    }

    @media (max-width: 768px) {
      .dashboard-wrapper {
        grid-template-columns: 1fr;
      }
      .sidebar {
        display: none;
      }
    }

    /* Sidebar Styles */
    .sidebar {
      background-color: var(--bg-surface);
      border-right: 1px solid var(--border);
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 40px;
    }

    .brand-icon {
      font-size: 24px;
    }

    .brand h2 {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .highlight {
      color: hsl(var(--primary));
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      transition: all 0.2s;
    }

    .nav-link:hover, .nav-link.active {
      background-color: var(--bg-surface-hover);
      color: var(--text-primary);
    }

    .nav-link.active {
      border-left: 3px solid hsl(var(--primary));
    }

    .sidebar-footer {
      border-top: 1px solid var(--border);
      padding-top: 20px;
    }

    .user-info {
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .role-badge {
      font-size: 10px;
      font-weight: 700;
      background-color: var(--primary-glow);
      color: hsl(var(--primary));
      padding: 3px 8px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }

    /* Main Content Styles */
    .main-content {
      padding: 48px;
      overflow-y: auto;
    }

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 32px;
      gap: 20px;
    }

    .content-header h1 {
      font-size: 28px;
      font-weight: 800;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 14px;
      margin-top: 4px;
    }

    .system-time {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      padding: 8px 16px;
      border-radius: var(--radius-full);
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: hsl(var(--accent));
      border-radius: 50%;
      box-shadow: 0 0 10px hsla(var(--accent), 0.7);
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.85); opacity: 0.5; }
      50% { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(0.85); opacity: 0.5; }
    }

    /* Metrics Grid */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }

    @media (max-width: 1200px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }

    .metric-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.25s;
    }

    .metric-card:hover {
      border-color: var(--border-focus);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .card-header .label {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .trend-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: var(--radius-full);
    }

    .trend-badge.positive {
      background-color: var(--accent-glow);
      color: hsl(var(--accent));
    }

    .trend-badge.negative {
      background-color: var(--primary-glow);
      color: hsl(var(--primary));
    }

    .value-box h2 {
      font-size: 26px;
      font-weight: 800;
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    /* Sparkline SVG Chart */
    .sparkline-box {
      height: 50px;
      margin-top: auto;
    }

    .sparkline-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    /* Big Analytical Summary Card */
    .summary-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      padding: 32px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }

    .summary-card h3 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .summary-card p {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .tech-stack-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .tech-tag {
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      font-size: 10px;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }
  `]
})
export class DashboardComponent {
  private analyticsService = inject(AnalyticsService);
  metrics$ = this.analyticsService.metrics$;

  formatValue(metric: MetricItem): string {
    const val = typeof metric.value === 'number' ? metric.value : parseFloat(metric.value);
    if (metric.type === 'currency') {
      return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (metric.type === 'percent') {
      return val.toFixed(2) + '%';
    }
    return val.toLocaleString('en-US');
  }

  // Generates math area path coordinates in SVG view box [160, 50]
  getAreaPath(history: number[]): string {
    if (!history || history.length < 2) return '';
    const points = this.getPoints(history);
    const linePath = points.map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
    
    // Close the area path to the bottom of the SVG [50]
    return `${linePath} L ${points[points.length - 1].x} 50 L ${points[0].x} 50 Z`;
  }

  // Generates math line path coordinates in SVG
  getLinePath(history: number[]): string {
    if (!history || history.length < 2) return '';
    const points = this.getPoints(history);
    return points.map((p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  }

  private getPoints(history: number[]): { x: number, y: number }[] {
    const minVal = Math.min(...history);
    const maxVal = Math.max(...history);
    const delta = maxVal - minVal || 1;

    return history.map((val, idx) => {
      const x = (idx / (history.length - 1)) * 160;
      // Map y from 10 to 45 (giving padding top/bottom)
      const y = 45 - ((val - minVal) / delta) * 35;
      return { x, y };
    });
  }
}
