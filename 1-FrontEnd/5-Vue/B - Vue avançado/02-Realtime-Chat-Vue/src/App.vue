<template>
  <div class="chat-app-root">
    <!-- Chat component will be rendered here in Commit 4 -->
    <div class="setup-screen">
      <h1>💬 AuraChat Setup</h1>
      <p>Serviços e infraestrutura do chat realtime prontos.</p>
    </div>
  </div>
</template>

<script setup>
// Root App Component
</script>

<style scoped>
.chat-app-root {
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
