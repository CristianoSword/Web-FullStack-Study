<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">✨</span>
        <span v-if="!isCollapsed" class="logo-text">AURA<span class="highlight">SaaS</span></span>
      </div>
      <button class="collapse-btn" @click="toggleCollapse">
        {{ isCollapsed ? '→' : '←' }}
      </button>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/dashboard" class="nav-item" active-class="active">
        <span class="icon">📊</span>
        <span v-if="!isCollapsed" class="label">Painel</span>
      </router-link>
      <router-link to="/users" class="nav-item" active-class="active">
        <span class="icon">👥</span>
        <span v-if="!isCollapsed" class="label">Membros</span>
      </router-link>
      <router-link to="/billing" class="nav-item" active-class="active">
        <span class="icon">💳</span>
        <span v-if="!isCollapsed" class="label">Faturamento</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="user-profile" v-if="store.currentUser">
        <img :src="store.currentUser.avatar" alt="Avatar" class="avatar" />
        <div class="user-info" v-if="!isCollapsed">
          <p class="user-name">{{ store.currentUser.name }}</p>
          <span :class="['role-badge', store.currentUser.role]">{{ store.currentUser.role }}</span>
        </div>
      </div>
      <button class="logout-btn" @click="handleLogout" :title="isCollapsed ? 'Sair' : ''">
        <span class="icon">🚪</span>
        <span v-if="!isCollapsed" class="label">Sair</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSaasStore } from '../stores/saasStore'

const store = useSaasStore()
const router = useRouter()
const isCollapsed = ref(false)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function handleLogout() {
  store.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.5px;
}

.highlight {
  color: hsl(var(--primary));
}

.collapse-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.collapse-btn:hover {
  border-color: var(--border-focus);
  color: var(--text-primary);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: var(--bg-surface-hover);
  color: var(--text-primary);
}

.nav-item.active {
  background-color: var(--primary-glow);
  color: hsl(var(--primary));
  border: 1px solid hsla(var(--primary), 0.2);
}

.sidebar-footer {
  border-top: 1px solid var(--border);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface-hover);
  padding: 2px;
  border: 1px solid var(--border);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 13px;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-badge {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  width: fit-content;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  margin-top: 2px;
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

.logout-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  text-align: left;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.08);
  color: rgb(239, 68, 68);
}
</style>
