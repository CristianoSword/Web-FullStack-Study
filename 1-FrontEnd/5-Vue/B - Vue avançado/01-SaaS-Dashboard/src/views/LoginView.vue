<template>
  <div class="login-wrapper">
    <!-- Floating background blur elements -->
    <div class="glow-bg violet"></div>
    <div class="glow-bg pink"></div>

    <div class="login-card">
      <div class="card-header">
        <span class="logo-icon">✨</span>
        <h2>AURA<span class="highlight">SaaS</span></h2>
        <p class="subtitle">Faça login para gerenciar sua plataforma SaaS premium.</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Endereço de Email</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="nome@empresa.com" 
            required 
          />
        </div>

        <div class="form-group">
          <label>Senha de Acesso</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Autenticando...' : 'Entrar no Painel' }}
        </button>

        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
      </form>

      <!-- Premium autofill helper cards for fast testing -->
      <div class="autofill-section">
        <p class="autofill-title">Entrada Rápida para Testes 🧪</p>
        <div class="autofill-grid">
          <button @click="quickLogin('admin@saas.com')" class="autofill-btn admin">
            <span>👑</span> Admin
          </button>
          <button @click="quickLogin('ana.silva@saas.com')" class="autofill-btn editor">
            <span>✏️</span> Editor
          </button>
          <button @click="quickLogin('carlos.santos@saas.com')" class="autofill-btn viewer">
            <span>👁️</span> Viewer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSaasStore } from '../stores/saasStore'

const store = useSaasStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

function handleLogin() {
  isLoading.value = true
  errorMessage.value = ''
  
  // Simulate network latency for premium look and feel loaders
  setTimeout(() => {
    try {
      const success = store.login(email.value, password.value)
      if (success) {
        router.push('/dashboard')
      } else {
        errorMessage.value = 'Credenciais inválidas.'
      }
    } catch (e) {
      errorMessage.value = 'Ocorreu um erro ao processar a autenticação.'
    } finally {
      isLoading.value = false
    }
  }, 800)
}

function quickLogin(selectedEmail) {
  email.value = selectedEmail
  password.value = 'testing123'
  handleLogin()
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #070708;
  position: relative;
  overflow: hidden;
  padding: 24px;
}

/* Luxury glowing background dots */
.glow-bg {
  position: absolute;
  border-radius: var(--radius-full);
  filter: blur(120px);
  z-index: 1;
  opacity: 0.15;
}

.glow-bg.violet {
  width: 400px;
  height: 400px;
  background-color: hsl(var(--primary));
  top: -100px;
  left: -100px;
}

.glow-bg.pink {
  width: 400px;
  height: 400px;
  background-color: hsl(var(--accent));
  bottom: -100px;
  right: -100px;
}

/* Glassmorphism card container */
.login-card {
  width: 440px;
  background: rgba(18, 18, 21, 0.6);
  border: 1px solid rgba(39, 39, 42, 0.8);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  padding: 40px;
  z-index: 10;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-icon {
  font-size: 32px;
  display: inline-block;
  margin-bottom: 12px;
}

.card-header h2 {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.highlight {
  color: hsl(var(--primary));
}

.subtitle {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.login-form {
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
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background-color: rgba(9, 9, 11, 0.8);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.form-group input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 1px var(--border-focus);
}

.submit-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 14px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  transition: opacity 0.2s, transform 0.1s;
  box-shadow: 0 4px 12px hsla(var(--primary), 0.35);
}

.submit-btn:hover {
  opacity: 0.9;
}

.submit-btn:active {
  transform: scale(0.98);
}

.error-msg {
  color: hsl(var(--error));
  font-size: 12px;
  text-align: center;
  margin-top: 8px;
  font-weight: 500;
}

/* Autofill panel */
.autofill-section {
  border-top: 1px solid var(--border);
  margin-top: 32px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.autofill-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  text-align: center;
}

.autofill-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.autofill-btn {
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

.autofill-btn:hover {
  border-color: var(--border-focus);
  background-color: #27272a;
}

.autofill-btn.admin span {
  color: rgb(239, 68, 68);
}

.autofill-btn.editor span {
  color: rgb(59, 130, 246);
}

.autofill-btn.viewer span {
  color: rgb(161, 161, 170);
}
</style>
