<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="main-content">
      <!-- Header section -->
      <header class="content-header">
        <div class="header-info">
          <h1>Faturamento & Transações 💳</h1>
          <p class="subtitle">Acompanhe as faturas, cobranças e assinaturas ativas.</p>
        </div>

        <button v-if="store.isEditor" class="add-invoice-btn" @click="openModal">
          <span>+</span> Nova Fatura
        </button>
      </header>

      <!-- Financial overview widgets -->
      <section class="overview-grid">
        <div class="overview-card">
          <span class="label">Total Faturado</span>
          <h3>{{ formatCurrency(totalInvoiced) }}</h3>
        </div>
        <div class="overview-card">
          <span class="label">Pago</span>
          <h3 class="success">{{ formatCurrency(totalPaid) }}</h3>
        </div>
        <div class="overview-card">
          <span class="label">Pendente</span>
          <h3 class="warning">{{ formatCurrency(totalPending) }}</h3>
        </div>
        <div class="overview-card">
          <span class="label">Atrasado</span>
          <h3 class="error">{{ formatCurrency(totalOverdue) }}</h3>
        </div>
      </section>

      <!-- Invoices Table -->
      <div class="table-card">
        <table class="invoices-table">
          <thead>
            <tr>
              <th>ID da Fatura</th>
              <th>Membro / Cliente</th>
              <th>Plano</th>
              <th>Data de Emissão</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in store.invoices" :key="invoice.id" class="table-row">
              <td class="id-cell">#{{ invoice.id }}</td>
              <td class="customer-cell">{{ invoice.customer }}</td>
              <td>
                <span class="plan-label">{{ invoice.plan }}</span>
              </td>
              <td>{{ formatDate(invoice.date) }}</td>
              <td class="amount-cell">{{ formatCurrency(invoice.amount) }}</td>
              <td>
                <span :class="['status-badge', invoice.status.toLowerCase()]">{{ invoice.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Invoice Modal -->
      <transition name="modal-fade">
        <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-card">
            <div class="modal-header">
              <h3>Nova Fatura</h3>
              <button class="close-modal-btn" @click="closeModal">×</button>
            </div>
            
            <form @submit.prevent="submitForm" class="modal-form">
              <div class="form-group">
                <label>Cliente / Membro</label>
                <select v-model="form.customer" required>
                  <option v-for="user in store.users" :key="user.id" :value="user.name">
                    {{ user.name }} ({{ user.email }})
                  </option>
                </select>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Plano</label>
                  <select v-model="form.plan">
                    <option value="Starter">Starter</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Valor (BRL)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    v-model="form.amount" 
                    required 
                    placeholder="Ex: 299.00" 
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Status Inicial</label>
                <select v-model="form.status">
                  <option value="Paid">Pago</option>
                  <option value="Pending">Pendente</option>
                  <option value="Overdue">Atrasado</option>
                </select>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn-secondary" @click="closeModal">Cancelar</button>
                <button type="submit" class="btn-primary">Emitir</button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import { useSaasStore } from '../stores/saasStore'

const store = useSaasStore()
const isModalOpen = ref(false)

const form = ref({
  customer: '',
  plan: 'Pro',
  amount: 299.00,
  status: 'Paid'
})

// Financial stats computations
const totalInvoiced = computed(() => {
  return store.invoices.reduce((acc, inv) => acc + inv.amount, 0)
})

const totalPaid = computed(() => {
  return store.invoices.filter(i => i.status === 'Paid').reduce((acc, inv) => acc + inv.amount, 0)
})

const totalPending = computed(() => {
  return store.invoices.filter(i => i.status === 'Pending').reduce((acc, inv) => acc + inv.amount, 0)
})

const totalOverdue = computed(() => {
  return store.invoices.filter(i => i.status === 'Overdue').reduce((acc, inv) => acc + inv.amount, 0)
})

// Handlers
function openModal() {
  form.value = {
    customer: store.users[0]?.name || '',
    plan: 'Pro',
    amount: 299.00,
    status: 'Paid'
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function submitForm() {
  store.addInvoice({
    customer: form.value.customer,
    plan: form.value.plan,
    amount: parseFloat(form.value.amount),
    status: form.value.status
  })
  closeModal()
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('pt-BR').format(date)
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
  margin-bottom: 6px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
}

.add-invoice-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
  box-shadow: 0 4px 12px hsla(var(--primary), 0.3);
}

.add-invoice-btn:hover {
  opacity: 0.9;
}

/* Overview financial widgets grid */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.overview-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.overview-card .label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.overview-card h3 {
  font-size: 22px;
  font-weight: 700;
}

.overview-card h3.success {
  color: hsl(var(--success));
}

.overview-card h3.warning {
  color: hsl(var(--warning));
}

.overview-card h3.error {
  color: hsl(var(--error));
}

/* Invoices table styling */
.table-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.invoices-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.invoices-table th {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.invoices-table td {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.table-row {
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: var(--bg-surface-hover);
}

.id-cell {
  font-family: monospace;
  font-weight: 600;
  color: var(--text-secondary);
}

.customer-cell {
  font-weight: 600;
}

.plan-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

.amount-cell {
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

/* Modal backing styling duplicated for encapsulation */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  width: 480px;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 700;
}

.close-modal-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input, .form-group select {
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  width: 100%;
}

.form-group input:focus, .form-group select:focus {
  border-color: var(--border-focus);
}

.form-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

.btn-secondary {
  background: none;
  border: 1px solid var(--border);
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: var(--border-focus);
}

.btn-primary {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Modal fade animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
