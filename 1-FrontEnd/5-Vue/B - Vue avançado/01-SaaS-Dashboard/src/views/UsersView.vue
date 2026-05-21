<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="main-content">
      <!-- Header section -->
      <header class="content-header">
        <div class="header-info">
          <h1>Gerenciamento de Membros 👥</h1>
          <p class="subtitle">Cadastre, edite e gerencie permissões de acesso dos usuários.</p>
        </div>
        
        <!-- Viewer Role warning alert banner -->
        <div v-if="!store.isEditor" class="role-warning">
          <span>🔒</span> Modo Leitura (Apenas Visualização)
        </div>

        <button v-else class="add-user-btn" @click="openAddModal">
          <span>+</span> Novo Membro
        </button>
      </header>

      <!-- Search and filters -->
      <div class="filters-card">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar por nome ou email..." 
            class="search-input"
          />
        </div>
        <div class="filter-select-wrapper">
          <select v-model="selectedRole" class="filter-select">
            <option value="all">Todas as Funções</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      <!-- Users Grid / Table -->
      <div class="table-card">
        <table class="users-table">
          <thead>
            <tr>
              <th>Membro</th>
              <th>Função</th>
              <th>Plano</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th v-if="store.isEditor" class="actions-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="table-row">
              <td class="member-cell">
                <img :src="user.avatar" class="avatar-cell" alt="avatar" />
                <div class="member-info">
                  <p class="name">{{ user.name }}</p>
                  <p class="email">{{ user.email }}</p>
                </div>
              </td>
              <td>
                <span :class="['role-badge', user.role]">{{ user.role }}</span>
              </td>
              <td>{{ user.plan }}</td>
              <td>
                <span :class="['status-dot', user.status.toLowerCase()]"></span>
                {{ user.status }}
              </td>
              <td class="last-active">{{ user.lastActive }}</td>
              <td v-if="store.isEditor" class="actions-cell">
                <button class="action-btn edit" @click="openEditModal(user)" title="Editar">✏️</button>
                <button class="action-btn delete" @click="handleDelete(user.id)" title="Deletar" :disabled="user.email === store.currentUser.email">🗑️</button>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="empty-state">
                <p>Nenhum membro encontrado com os filtros selecionados.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Component for Add / Edit (Smoothly animated) -->
      <transition name="modal-fade">
        <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-card">
            <div class="modal-header">
              <h3>{{ isEditMode ? 'Editar Membro' : 'Novo Membro' }}</h3>
              <button class="close-modal-btn" @click="closeModal">×</button>
            </div>
            
            <form @submit.prevent="saveForm" class="modal-form">
              <div class="form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  v-model="form.name" 
                  required 
                  placeholder="Ex: Cristiano Sword" 
                />
              </div>

              <div class="form-group">
                <label>Email Corporativo</label>
                <input 
                  type="email" 
                  v-model="form.email" 
                  required 
                  placeholder="Ex: cristiano@saas.com" 
                  :disabled="isEditMode"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Função (Role)</label>
                  <select v-model="form.role">
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Plano</label>
                  <select v-model="form.plan">
                    <option value="Starter">Starter</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>Status</label>
                <select v-model="form.status">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn-secondary" @click="closeModal">Cancelar</button>
                <button type="submit" class="btn-primary">Salvar</button>
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

// State
const searchQuery = ref('')
const selectedRole = ref('all')
const isModalOpen = ref(false)
const isEditMode = ref(false)
const currentUserId = ref(null)

const form = ref({
  name: '',
  email: '',
  role: 'viewer',
  plan: 'Starter',
  status: 'Active'
})

// Computed filtered list
const filteredUsers = computed(() => {
  return store.users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRole = selectedRole.value === 'all' || user.role === selectedRole.value
    
    return matchesSearch && matchesRole
  })
})

// Handlers
function openAddModal() {
  isEditMode.value = false
  form.value = {
    name: '',
    email: '',
    role: 'viewer',
    plan: 'Starter',
    status: 'Active'
  }
  isModalOpen.value = true
}

function openEditModal(user) {
  isEditMode.value = true
  currentUserId.value = user.id
  form.value = {
    name: user.name,
    email: user.email,
    role: user.role,
    plan: user.plan,
    status: user.status
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function saveForm() {
  if (isEditMode.value) {
    store.updateUser(currentUserId.value, form.value)
  } else {
    store.addUser(form.value)
  }
  closeModal()
}

function handleDelete(userId) {
  if (confirm('Tem certeza de que deseja remover este membro?')) {
    store.deleteUser(userId)
  }
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

.role-warning {
  background-color: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.2);
  color: rgb(234, 179, 8);
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
}

.add-user-btn {
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

.add-user-btn:hover {
  opacity: 0.9;
}

/* Filters card styling */
.filters-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px 24px;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
}

.search-input-wrapper {
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border-radius: var(--radius-md);
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--border-focus);
}

.filter-select {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

/* Users table styling */
.table-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.users-table th {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.users-table td {
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

.member-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-cell {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  padding: 2px;
}

.member-info .name {
  font-weight: 600;
  color: var(--text-primary);
}

.member-info .email {
  font-size: 12px;
  color: var(--text-secondary);
}

.role-badge {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.role-badge.admin {
  background-color: rgba(239, 68, 68, 0.15);
  color: rgb(239, 68, 68);
}

.role-badge.editor {
  background-color: rgba(59, 130, 246, 0.15);
  color: rgb(59, 130, 246);
}

.role-badge.viewer {
  background-color: rgba(161, 161, 170, 0.15);
  color: rgb(161, 161, 170);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  display: inline-block;
  margin-right: 6px;
}

.status-dot.active {
  background-color: rgb(34, 197, 94);
}

.status-dot.inactive {
  background-color: rgb(161, 161, 170);
}

.last-active {
  color: var(--text-secondary);
}

.actions-header {
  text-align: right;
}

.actions-cell {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.action-btn {
  background: none;
  border: 1px solid var(--border);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 13px;
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.action-btn.edit:hover {
  border-color: var(--border-focus);
}

.action-btn.delete:hover:not(:disabled) {
  border-color: rgba(239, 68, 68, 0.3);
  background-color: rgba(239, 68, 68, 0.1);
}

.empty-state {
  text-align: center;
  padding: 40px !important;
  color: var(--text-secondary);
}

/* Modal Styling */
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
  grid-template-columns: 1fr 1fr;
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
