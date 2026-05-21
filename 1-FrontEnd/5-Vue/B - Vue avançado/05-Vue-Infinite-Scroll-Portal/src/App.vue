<template>
  <div class="portal-app-root">
    <div class="setup-screen">
      <h1>🌀 AuraFeed Setup</h1>
      <p>Infinite Scroll & Teleport Portal pronto para implementação.</p>
    </div>
  </div>
</template>

<script setup>
// Root App Component
</script>

<style scoped>
.portal-app-root {
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
