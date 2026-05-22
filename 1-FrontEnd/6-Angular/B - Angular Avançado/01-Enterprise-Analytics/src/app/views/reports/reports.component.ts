import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-reports',
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
            <h1>Central de Relatórios</h1>
            <p class="subtitle">Geração assíncrona e exportação de relatórios corporativos.</p>
          </div>
        </header>

        <div class="reports-layout">
          <!-- Left side: List of existing reports -->
          <section class="reports-list-section">
            <div class="card-title-row">
              <h3>Relatórios Disponíveis</h3>
              <span class="reports-count">{{ (reports$ | async)?.length }} Arquivos</span>
            </div>

            <div class="table-container">
              <table class="premium-table">
                <thead>
                  <tr>
                    <th>Nome do Relatório</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Tamanho</th>
                    <th>Status</th>
                    <th>Autor</th>
                    <th style="text-align: right;">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  @for (report of reports$ | async; track report.id) {
                    <tr>
                      <td class="report-name">📄 {{ report.name }}</td>
                      <td>
                        <span [class]="['format-badge', report.type.toLowerCase()]">{{ report.type }}</span>
                      </td>
                      <td>{{ report.date }}</td>
                      <td>{{ report.size }}</td>
                      <td>
                        <span [class]="['status-badge', getStatusClass(report.status)]">
                          {{ report.status }}
                        </span>
                      </td>
                      <td class="author-cell">{{ report.author }}</td>
                      <td style="text-align: right;">
                        <button (click)="onDelete(report.id)" class="delete-btn">Excluir 🗑️</button>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="7" class="empty-state">Nenhum relatório gerado no momento.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </section>

          <!-- Right side: Generation Form -->
          <section class="reports-form-section">
            <div class="form-card">
              <h3>Gerar Novo Relatório</h3>
              <p class="form-desc">Defina os parâmetros do arquivo analítico para inicialização da compilação assíncrona.</p>

              @if (nameError) {
                <div class="validation-error">⚠️ {{ nameError }}</div>
              }

              <div class="form-group">
                <label>Nome do Arquivo</label>
                <input #nameInput type="text" placeholder="Ex: Métricas Globais Q2" class="premium-input" />
              </div>

              <div class="form-group">
                <label>Formato de Exportação</label>
                <select #typeSelect class="premium-input">
                  <option value="PDF">Documento PDF (.pdf)</option>
                  <option value="XLSX">Planilha Excel (.xlsx)</option>
                  <option value="CSV">Dados Separados (.csv)</option>
                </select>
              </div>

              <div class="form-group">
                <label>Tamanho Estimado</label>
                <select #sizeSelect class="premium-input">
                  <option value="1.5 MB">Normal (~1.5 MB)</option>
                  <option value="8.4 MB">Completo (~8.4 MB)</option>
                  <option value="24.2 MB">Estendido (~24.2 MB)</option>
                </select>
              </div>

              <button 
                (click)="onGenerate(nameInput.value, typeSelect.value, sizeSelect.value); nameInput.value = ''" 
                class="generate-action-btn"
              >
                Gerar Relatório 📑
              </button>
            </div>
          </section>
        </div>
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

    /* Reports Layout Grid */
    .reports-layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 32px;
    }

    @media (max-width: 1200px) {
      .reports-layout {
        grid-template-columns: 1fr;
      }
    }

    .card-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .reports-count {
      font-size: 12px;
      font-weight: 700;
      color: hsl(var(--accent));
      background-color: var(--accent-glow);
      padding: 4px 10px;
      border-radius: var(--radius-full);
    }

    /* Table styles */
    .table-container {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow-x: auto;
    }

    .premium-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      text-align: left;
    }

    .premium-table th {
      padding: 16px 20px;
      color: var(--text-secondary);
      font-weight: 700;
      border-bottom: 1px solid var(--border);
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }

    .premium-table td {
      padding: 18px 20px;
      border-bottom: 1px solid var(--border);
      color: var(--text-primary);
    }

    .premium-table tr:last-child td {
      border-bottom: none;
    }

    .report-name {
      font-weight: 700;
    }

    .format-badge {
      font-size: 10px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .format-badge.pdf {
      background-color: hsla(0, 100%, 50%, 0.15);
      color: #ff4a4a;
    }

    .format-badge.xlsx {
      background-color: hsla(120, 100%, 40%, 0.15);
      color: #3bf13b;
    }

    .format-badge.csv {
      background-color: hsla(200, 100%, 50%, 0.15);
      color: #4ad1ff;
    }

    .status-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: var(--radius-full);
    }

    .status-badge.completed {
      background-color: var(--accent-glow);
      color: hsl(var(--accent));
    }

    .status-badge.pending {
      background-color: hsla(45, 100%, 50%, 0.15);
      color: #ffc83b;
    }

    .status-badge.error {
      background-color: hsla(0, 100%, 50%, 0.15);
      color: #ff4a4a;
    }

    .author-cell {
      color: var(--text-secondary);
      font-weight: 500;
    }

    .delete-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      transition: color 0.2s;
    }

    .delete-btn:hover {
      color: #ff4a4a;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: var(--text-muted);
    }

    /* Form Styles */
    .validation-error {
      background-color: hsla(0, 100%, 50%, 0.15);
      color: #ff4a4a;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .form-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
    }

    .form-card h3 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .form-desc {
      font-size: 12px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .form-group label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .premium-input {
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 600;
      outline: none;
      transition: border-color 0.25s;
    }

    .premium-input:focus {
      border-color: var(--border-focus);
    }

    .generate-action-btn {
      width: 100%;
      background: linear-gradient(135deg, hsl(var(--primary)), #8d53ff);
      border: none;
      color: white;
      padding: 14px;
      font-size: 13px;
      font-weight: 700;
      border-radius: var(--radius-sm);
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(114, 46, 255, 0.35);
      transition: opacity 0.2s;
    }

    .generate-action-btn:hover {
      opacity: 0.9;
    }
  `]
})
export class ReportsComponent {
  private analyticsService = inject(AnalyticsService);
  reports$ = this.analyticsService.reports$;
  nameError = '';

  getStatusClass(status: string): string {
    if (status === 'Concluído') return 'completed';
    if (status === 'Pendente') return 'pending';
    return 'error';
  }

  onGenerate(name: string, type: string, size: string) {
    if (!name.trim()) {
      this.nameError = 'O nome do relatório é obrigatório.';
      return;
    }
    if (name.trim().length < 3) {
      this.nameError = 'O nome do relatório deve ter pelo menos 3 caracteres.';
      return;
    }
    this.nameError = '';
    this.analyticsService.addReport({
      name: name.trim(),
      type: type as 'PDF' | 'XLSX' | 'CSV',
      size,
      status: 'Concluído',
      author: 'Cristiano Sword'
    });
  }

  onDelete(id: string) {
    this.analyticsService.deleteReport(id);
  }
}
