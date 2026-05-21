<template>
  <div class="feed-container">
    <!-- Header Banner -->
    <header class="feed-header">
      <div class="logo">
        <span class="logo-icon">🌀</span>
        <h1>AURA<span class="highlight">Feed</span></h1>
      </div>
      <p class="subtitle">Feed de notícias reativo com paginação Infinite Scroll sob demanda e modais transportados via Vue Teleport.</p>
    </header>

    <!-- Category Tabs Navigation -->
    <nav class="category-tabs">
      <button 
        v-for="cat in ['Todos', 'Tecnologia', 'Design', 'Negócios', 'Futuro']" 
        :key="cat"
        :class="['tab-btn', { active: store.activeCategory === cat }]"
        @click="store.setCategory(cat)"
      >
        {{ cat }}
      </button>
    </nav>

    <!-- Articles Feed List -->
    <main class="feed-list-wrapper">
      <transition-group name="feed-item-anim" tag="div" class="feed-grid">
        <article 
          v-for="article in store.filteredFeed" 
          :key="article.id" 
          class="feed-card"
        >
          <div class="card-meta">
            <span class="category-tag">{{ article.category }}</span>
            <span class="read-time">{{ article.readTime }}</span>
          </div>

          <h2 class="card-title">{{ article.title }}</h2>
          <p class="card-summary">{{ article.summary }}</p>

          <div class="card-footer">
            <div class="author-box">
              <span class="author-avatar">{{ article.author.charAt(0) }}</span>
              <div class="author-details">
                <p class="author-name">{{ article.author }}</p>
                <p class="post-date">{{ article.date }}</p>
              </div>
            </div>
            
            <button @click="store.selectArticle(article)" class="read-btn">
              Leia Mais ➡️
            </button>
          </div>
        </article>
      </transition-group>

      <!-- Infinite Scroll Trigger Anchor -->
      <div ref="scrollTrigger" class="scroll-trigger-anchor">
        <!-- Spinner Loader -->
        <div v-if="store.isLoading" class="loader-box">
          <div class="pulse-loader"></div>
          <p>Buscando matérias reativas...</p>
        </div>

        <div v-else-if="!store.hasMore" class="end-feed-msg">
          <span>✨</span> Fim do feed — Todos os artigos carregados reativamente <span>✨</span>
        </div>
      </div>
    </main>

    <!-- Vue Teleport Modal Context -->
    <Teleport to="#teleport-modal-destination">
      <transition name="modal-fade">
        <div 
          v-if="store.selectedArticle" 
          class="modal-backdrop" 
          @click.self="store.closeArticle"
        >
          <div class="modal-card">
            <!-- Modal Header -->
            <header class="modal-header">
              <span class="modal-cat">{{ store.selectedArticle.category }}</span>
              <button @click="store.closeArticle" class="close-btn">&times;</button>
            </header>

            <!-- Modal Content Body -->
            <main class="modal-content">
              <h1>{{ store.selectedArticle.title }}</h1>
              
              <div class="modal-author-bar">
                <span class="avatar">{{ store.selectedArticle.author.charAt(0) }}</span>
                <div class="meta">
                  <p class="name">{{ store.selectedArticle.author }}</p>
                  <p class="date">{{ store.selectedArticle.date }} • {{ store.selectedArticle.readTime }}</p>
                </div>
              </div>

              <div class="modal-body-text">
                <p>{{ store.selectedArticle.content }}</p>
              </div>
            </main>

            <!-- Modal Footer -->
            <footer class="modal-footer">
              <button @click="store.closeArticle" class="done-btn">Fechar Leitura</button>
            </footer>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStoreFeed } from './stores/storeFeed'

const store = useStoreFeed()
const scrollTrigger = ref(null)
let observer = null

// Initialize IntersectionObserver to trigger infinite scroll
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const trigger = entries[0]
    if (trigger.isIntersecting && store.hasMore && !store.isLoading) {
      store.loadNextPage()
    }
  }, { threshold: 0.1, rootMargin: '0px 0px 100px 0px' })

  if (scrollTrigger.value) {
    observer.observe(scrollTrigger.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.feed-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 24px;
}

.feed-header {
  text-align: center;
  margin-bottom: 48px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.logo-icon {
  font-size: 32px;
  animation: spin 8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.logo h1 {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.highlight {
  color: hsl(var(--primary));
}

.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Categories Tabs */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
  overflow-x: auto;
}

.tab-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn:hover {
  background-color: rgba(22, 34, 29, 0.5);
  color: var(--text-primary);
}

.tab-btn.active {
  background-color: var(--primary-glow);
  color: hsl(var(--primary));
}

/* Feed Grid Card styling */
.feed-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.feed-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s, border-color 0.25s;
}

.feed-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-focus);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.category-tag {
  background-color: var(--primary-glow);
  color: hsl(var(--primary));
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.read-time {
  font-size: 11px;
  color: var(--text-secondary);
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.4;
}

.card-summary {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(22, 34, 29, 0.4);
  padding-top: 20px;
}

.author-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background-color: var(--border-focus);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  text-transform: uppercase;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
}

.post-date {
  font-size: 10px;
  color: var(--text-muted);
}

.read-btn {
  background: none;
  border: none;
  color: hsl(var(--primary));
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.read-btn:hover {
  transform: translateX(4px);
}

/* Spinner Infinite loader */
.scroll-trigger-anchor {
  padding: 40px 0;
  text-align: center;
}

.loader-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.pulse-loader {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background-color: hsl(var(--primary));
  box-shadow: 0 0 20px hsla(var(--primary), 0.5);
  animation: pulse 1.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.loader-box p {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.end-feed-msg {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
  border-top: 1px dashed var(--border);
  padding-top: 24px;
}

/* ── Vue Teleport Modal styling ── */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(5, 8, 7, 0.7);
  backdrop-filter: blur(12px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 640px;
  background-color: rgba(14, 20, 18, 0.85);
  border: 1px solid var(--border-focus);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-lg);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: zoom-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
}

@keyframes zoom-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-cat {
  background-color: var(--primary-glow);
  color: hsl(var(--primary));
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 28px;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 0.5;
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-content h1 {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.modal-author-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.modal-author-bar .avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background-color: var(--border-focus);
  color: var(--text-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  text-transform: uppercase;
}

.modal-author-bar .name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}

.modal-author-bar .date {
  font-size: 10px;
  color: var(--text-muted);
}

.modal-body-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  border-top: 1px solid rgba(22, 34, 29, 0.4);
  padding-top: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(22, 34, 29, 0.4);
  padding-top: 20px;
}

.done-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.done-btn:hover {
  opacity: 0.9;
}

/* Animations */
.feed-item-anim-enter-active,
.feed-item-anim-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.feed-item-anim-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.feed-item-anim-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
