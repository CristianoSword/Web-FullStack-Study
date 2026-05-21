<template>
  <div class="directives-app-root">
    <div class="setup-screen">
      <h1>🔮 AuraDirectives Setup</h1>
      <p>Biblioteca de diretivas personalizadas pronta para implementação.</p>
    </div>
  </div>
</template>

<script setup>
// Root App Component
</script>

<style scoped>
.directives-app-root {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-app);
}

.setup-screen {
  text-align: center;
  padding: 32px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
</style>
