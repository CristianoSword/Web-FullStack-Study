<template>
  <div class="store-app-root">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// Root App Component
</script>

<style scoped>
.store-app-root {
  min-height: 100vh;
  background-color: var(--bg-app);
}
</style>
