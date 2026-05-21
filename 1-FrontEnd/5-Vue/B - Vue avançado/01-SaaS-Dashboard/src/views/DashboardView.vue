<template>
  <div class="dashboard-layout">
    <Sidebar />
    
    <main class="main-content">
      <!-- Top header -->
      <header class="content-header">
        <div class="header-info">
          <h1>Olá, {{ store.currentUser?.name || 'Membro' }} 👋</h1>
          <p class="subtitle">Bem-vindo ao AuraSaaS. Veja as métricas de crescimento hoje.</p>
        </div>
        <div class="date-selector">
          <span>📅</span> Maio, 2026
        </div>
      </header>

      <!-- SaaS Metrics grid -->
      <section class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon mrr">💰</div>
          <div class="metric-details">
            <span class="metric-label">Receita Recorrente (MRR)</span>
            <h3 class="metric-value">{{ formatCurrency(store.metrics.mrr) }}</h3>
            <span class="trend positive">↑ 12% vs último mês</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon active">📈</div>
          <div class="metric-details">
            <span class="metric-label">Usuários Ativos</span>
            <h3 class="metric-value">{{ formatNumber(store.metrics.activeUsers) }}</h3>
            <span class="trend positive">↑ 8.4% vs último mês</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon churn">📉</div>
          <div class="metric-details">
            <span class="metric-label">Taxa de Churn</span>
            <h3 class="metric-value">{{ store.metrics.churnRate }}%</h3>
            <span class="trend positive">↓ 0.3% vs último mês</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon conversion">⚡</div>
          <div class="metric-details">
            <span class="metric-label">Taxa de Conversão</span>
            <h3 class="metric-value">{{ store.metrics.conversionRate }}%</h3>
            <span class="trend positive">↑ 1.2% vs último mês</span>
          </div>
        </div>
      </section>

      <!-- Advanced SVG Area Chart and Quick Info Grid -->
      <section class="dashboard-details">
        <!-- SVG Interactive Chart Card -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Tendência de Crescimento (MRR)</h3>
            <span class="chart-legend">
              <span class="legend-dot"></span> MRR Mensal
            </span>
          </div>
          
          <!-- Custom Premium SVG Dynamic Graphic -->
          <div class="svg-container">
            <svg viewBox="0 0 600 220" class="svg-chart">
              <!-- Definitions for linear gradients -->
              <defs>
                <linearGradient id="mrr-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="hsla(250, 84%, 54%, 0.4)" />
                  <stop offset="100%" stop-color="hsla(250, 84%, 54%, 0.0)" />
                </linearGradient>
              </defs>
              
              <!-- Grid lines -->
              <line x1="50" y1="30" x2="550" y2="30" stroke="#1f1f23" stroke-dasharray="4" />
              <line x1="50" y1="80" x2="550" y2="80" stroke="#1f1f23" stroke-dasharray="4" />
              <line x1="50" y1="130" x2="550" y2="130" stroke="#1f1f23" stroke-dasharray="4" />
              <line x1="50" y1="180" x2="550" y2="180" stroke="#1f1f23" />

              <!-- Area Path (Jan-Mai) -->
              <path d="M 50 180 L 50 180 C 100 160, 150 165, 175 160 C 200 155, 275 150, 300 130 C 325 110, 400 115, 425 90 C 450 65, 500 55, 550 40 L 550 180 Z" fill="url(#mrr-grad)" />

              <!-- Trend Line Path -->
              <path d="M 50 180 C 100 160, 150 165, 175 160 C 200 155, 275 150, 300 130 C 325 110, 400 115, 425 90 C 450 65, 500 55, 550 40" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    stroke-width="3" 
                    stroke-linecap="round" />

              <!-- Data Dots & Hover Interaction effects -->
              <g class="chart-nodes">
                <!-- Jan -->
                <circle cx="50" cy="180" r="5" fill="hsl(var(--primary))" stroke="#121215" stroke-width="2" />
                <!-- Fev -->
                <circle cx="175" cy="160" r="5" fill="hsl(var(--primary))" stroke="#121215" stroke-width="2" />
                <!-- Mar -->
                <circle cx="300" cy="130" r="5" fill="hsl(var(--primary))" stroke="#121215" stroke-width="2" />
                <!-- Abr -->
                <circle cx="425" cy="90" r="5" fill="hsl(var(--primary))" stroke="#121215" stroke-width="2" />
                <!-- Mai -->
                <circle cx="550" cy="40" r="6" fill="#fff" stroke="hsl(var(--primary))" stroke-width="3" />
              </g>

              <!-- Chart Labels -->
              <text x="50" y="198" class="axis-label" text-anchor="middle">Jan</text>
              <text x="175" y="198" class="axis-label" text-anchor="middle">Fev</text>
              <text x="300" y="198" class="axis-label" text-anchor="middle">Mar</text>
              <text x="425" y="198" class="axis-label" text-anchor="middle">Abr</text>
              <text x="550" y="198" class="axis-label" text-anchor="middle">Mai</text>

              <text x="42" y="184" class="axis-label-y" text-anchor="end">$120k</text>
              <text x="42" y="134" class="axis-label-y" text-anchor="end">$130k</text>
              <text x="42" y="84" class="axis-label-y" text-anchor="end">$140k</text>
              <text x="42" y="34" class="axis-label-y" text-anchor="end">$150k</text>
            </svg>
          </div>
        </div>

        <!-- System Active Feeds / Quick Invoices -->
        <div class="recent-billing-card">
          <div class="card-header">
            <h3>Transações Recentes</h3>
            <router-link to="/billing" class="view-all-link">Ver todas →</router-link>
          </div>
          
          <div class="billing-list">
            <div v-for="invoice in store.invoices.slice(0, 3)" :key="invoice.id" class="billing-item">
              <div class="billing-info">
                <span class="customer-name">{{ invoice.customer }}</span>
                <span class="invoice-plan">{{ invoice.plan }}</span>
              </div>
              <div class="billing-amount-status">
                <span class="amount">{{ formatCurrency(invoice.amount) }}</span>
                <span :class="['status-badge', invoice.status.toLowerCase()]">{{ invoice.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { useSaasStore } from '../stores/saasStore'

const store = useSaasStore()

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value)
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 40px;
  background-color: var(--bg-app);
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.content-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
}

.date-selector {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Metrics grid styling */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.metric-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-focus);
}

.metric-icon {
  width: 48px;
  height: 48px;
  background-color: var(--bg-surface-hover);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: 1px solid var(--border);
}

.metric-details {
  display: flex;
  flex-direction: column;
}

.metric-label {
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.metric-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.trend {
  font-size: 12px;
  font-weight: 500;
}

.trend.positive {
  color: hsl(var(--success));
}

/* SVG Chart & Dashboard Details styling */
.dashboard-details {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 1024px) {
  .dashboard-details {
    grid-template-columns: 1fr;
  }
}

.chart-card, .recent-billing-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 700;
}

.chart-legend {
  font-size: 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: hsl(var(--primary));
  display: inline-block;
}

.svg-container {
  width: 100%;
  padding: 10px 0;
}

.svg-chart {
  width: 100%;
  height: auto;
}

.axis-label {
  fill: var(--text-secondary);
  font-size: 10px;
  font-family: var(--font-sans);
  font-weight: 600;
}

.axis-label-y {
  fill: var(--text-muted);
  font-size: 9px;
  font-family: var(--font-sans);
}

.view-all-link {
  color: hsl(var(--primary));
  font-size: 12px;
  font-weight: 600;
}

.billing-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.billing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background-color: var(--bg-surface-hover);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.billing-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.customer-name {
  font-size: 13px;
  font-weight: 600;
}

.invoice-plan {
  font-size: 11px;
  color: var(--text-secondary);
}

.billing-amount-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.amount {
  font-size: 13px;
  font-weight: 700;
}

.status-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.status-badge.paid {
  background-color: rgba(34, 197, 94, 0.15);
  color: rgb(34, 197, 94);
}

.status-badge.pending {
  background-color: rgba(234, 179, 8, 0.15);
  color: rgb(234, 179, 8);
}

.status-badge.overdue {
  background-color: rgba(239, 68, 68, 0.15);
  color: rgb(239, 68, 68);
}
</style>
