<template>
  <div class="unauthorized-wrapper">
    <div class="glow-bg"></div>
    <div class="card">
      <span class="error-badge">403</span>
      <h2>Acesso Restrito 🔐</h2>
      <p class="subtitle">Desculpe, a conta de nível atual não possui privilégios necessários para acessar este recurso administrativo.</p>
      
      <router-link to="/dashboard" class="home-btn">
        Voltar para a Área Segura
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Unauthorized view configuration
</script>

<style scoped>
.unauthorized-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #070708;
  position: relative;
  overflow: hidden;
  padding: 24px;
}

.glow-bg {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: var(--radius-full);
  background-color: hsl(var(--error));
  filter: blur(120px);
  opacity: 0.1;
  z-index: 1;
}

.card {
  width: 440px;
  background: rgba(18, 18, 21, 0.6);
  border: 1px solid rgba(239, 68, 68, 0.2);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  padding: 40px;
  text-align: center;
  z-index: 10;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-badge {
  font-size: 48px;
  font-weight: 800;
  color: hsl(var(--error));
  letter-spacing: 1px;
  margin-bottom: 16px;
  line-height: 1;
}

h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 28px;
}

.home-btn {
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 13px;
  transition: all 0.2s;
  display: inline-block;
}

.home-btn:hover {
  border-color: var(--border-focus);
  background-color: #27272a;
}
</style>
