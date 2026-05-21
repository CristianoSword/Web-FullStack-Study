<template>
  <div class="playground-wrapper">
    <!-- Luxury glass background accents -->
    <div class="glow-bg violet"></div>
    <div class="glow-bg pink"></div>

    <header class="playground-header">
      <span class="header-icon">🔮</span>
      <h1>AURA<span class="highlight">Directives</span></h1>
      <p class="subtitle">Playground interativo para testar diretivas customizadas avançadas construídas sob o ciclo de vida do Vue 3.</p>
    </header>

    <div class="playground-grid">
      <!-- 1. v-tooltip Card -->
      <section class="playground-card">
        <div class="card-header">
          <h3>v-tooltip 💬</h3>
          <span class="badge">Hover</span>
        </div>
        <p class="card-description">Cria balões flutuantes inteligentes com posicionamento automático e limpeza absoluta de memória.</p>
        
        <div class="tooltip-test-area">
          <input 
            type="text" 
            v-model="customTooltipText" 
            placeholder="Edite o texto do tooltip..." 
            class="playground-input"
          />

          <div class="direction-buttons">
            <button v-tooltip:top="customTooltipText" class="test-btn">Top ⬆️</button>
            <button v-tooltip:bottom="customTooltipText" class="test-btn">Bottom ⬇️</button>
            <button v-tooltip:left="customTooltipText" class="test-btn">Left ⬅️</button>
            <button v-tooltip:right="customTooltipText" class="test-btn">Right ➡️</button>
          </div>
        </div>

        <div class="code-box">
          <pre><code>{{ `<button v-tooltip:top="'${customTooltipText}'">Top</button>` }}</code></pre>
        </div>
      </section>

      <!-- 2. v-ripple Card -->
      <section class="playground-card">
        <div class="card-header">
          <h3>v-ripple 🌊</h3>
          <span class="badge">Click</span>
        </div>
        <p class="card-description">Ondas de propagação baseadas nas coordenadas relativas exatas do ponteiro de clique (Material Style).</p>

        <div class="ripple-test-area">
          <button v-ripple @click="logEvent('Ripple', 'Botão Padrão clicado')" class="ripple-btn default">
            Onda Violeta
          </button>
          <button v-ripple @click="logEvent('Ripple', 'Card Temático clicado')" class="ripple-btn emerald">
            Onda Esmeralda
          </button>
        </div>

        <div class="code-box">
          <pre><code>&lt;button v-ripple&gt;Onda&lt;/button&gt;</code></pre>
        </div>
      </section>

      <!-- 3. v-click-outside Card -->
      <section class="playground-card">
        <div class="card-header">
          <h3>v-click-outside 🔐</h3>
          <span class="badge">Event</span>
        </div>
        <p class="card-description">Detecta eventos ocorridos fora do elemento. Perfeito para fechar modais ou submenus flutuantes.</p>

        <div class="click-outside-test-area">
          <div class="dropdown-container">
            <button @click="toggleDropdown" class="test-btn primary">
              {{ isDropdownOpen ? 'Fechar Dropdown' : 'Abrir Dropdown' }}
            </button>
            
            <transition name="fade">
              <div 
                v-if="isDropdownOpen" 
                v-click-outside="closeDropdown" 
                class="dropdown-content"
              >
                <p class="dropdown-title">Dropdown Protegido 🔒</p>
                <p>Clique em qualquer lugar fora deste card roxo para fechá-lo de forma automática!</p>
              </div>
            </transition>
          </div>
        </div>

        <div class="code-box">
          <pre><code>&lt;div v-click-outside="closeDropdown"&gt;Dropdown&lt;/div&gt;</code></pre>
        </div>
      </section>

      <!-- 4. v-intersection-observer Card -->
      <section class="playground-card">
        <div class="card-header">
          <h3>v-intersection-observer 👁️</h3>
          <span class="badge">Scroll</span>
        </div>
        <p class="card-description">Observador reativo do viewport. Dispara transições CSS suaves (fade-in) ao rolar e visualizá-lo.</p>

        <div class="observer-test-area">
          <p class="observer-note">Role a caixa abaixo para ver os cards surgindo ⬇️</p>
          <div class="scrollable-container">
            <div class="scroll-spacer">Role para baixo...</div>
            <div 
              v-intersection-observer="() => handleVisible('Card A')" 
              class="observer-item"
            >
              🚀 Card A Revelado!
            </div>
            <div class="scroll-spacer-sm">Mais um pouco...</div>
            <div 
              v-intersection-observer="() => handleVisible('Card B')" 
              class="observer-item accent"
            >
              🔮 Card B Revelado!
            </div>
          </div>
        </div>

        <div class="code-box">
          <pre><code>&lt;div v-intersection-observer="onVisible"&gt;Card&lt;/div&gt;</code></pre>
        </div>
      </section>
    </div>

    <!-- Active Log History Panel -->
    <section class="log-panel">
      <div class="log-header">
        <h3>💻 AuraConsole — Log de Eventos Ativos</h3>
        <button @click="clearLogs" class="clear-btn">Limpar Console</button>
      </div>
      <div class="log-messages" ref="logPane">
        <p v-if="logs.length === 0" class="empty-log">Nenhum evento registrado ainda. Interaja com os cards acima!</p>
        <p v-for="log in logs" :key="log.id" class="log-entry">
          <span class="log-time">[{{ log.time }}]</span>
          <span class="log-tag">{{ log.tag }}</span>:
          <span class="log-text">{{ log.message }}</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { vTooltip, vRipple, vIntersectionObserver, vClickOutside } from './directives'

// Registering locally in the component
const _directives = {
  tooltip: vTooltip,
  ripple: vRipple,
  'intersection-observer': vIntersectionObserver,
  'click-outside': vClickOutside
}

// State
const customTooltipText = ref('Olá! Sou um tooltip premium')
const isDropdownOpen = ref(false)
const logs = ref([])
const logPane = ref(null)

// Handlers for logging
function logEvent(tag, message) {
  const time = new Date().toLocaleTimeString([], { hour12: false })
  logs.value.push({
    id: Date.now() + Math.random(),
    time,
    tag,
    message
  })
  
  // Auto-scroll the log console to latest entry
  nextTick(() => {
    if (logPane.value) {
      logPane.value.scrollTop = logPane.value.scrollHeight
    }
  })
}

function clearLogs() {
  logs.value = []
}

// Click Outside helper
function toggleDropdown(e) {
  // Prevent immediate click-outside trigger from self button click
  e.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    logEvent('Click Outside', 'Dropdown Aberto')
  }
}

function closeDropdown() {
  if (isDropdownOpen.value) {
    isDropdownOpen.value = false
    logEvent('Click Outside', 'Clique fora detectado! Dropdown fechado.')
  }
}

// Intersection Observer helper
function handleVisible(cardName) {
  logEvent('Observer', `${cardName} entrou no viewport e foi animado.`)
}
</script>

<style scoped>
.playground-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  position: relative;
  min-height: 100vh;
}

/* Glow Background Orbs */
.glow-bg {
  position: absolute;
  border-radius: var(--radius-full);
  filter: blur(140px);
  opacity: 0.15;
  z-index: 1;
}

.glow-bg.violet {
  width: 500px;
  height: 500px;
  background-color: hsl(var(--primary));
  top: -100px;
  left: -150px;
}

.glow-bg.pink {
  width: 400px;
  height: 400px;
  background-color: hsl(var(--accent));
  bottom: 100px;
  right: -100px;
}

.playground-header {
  text-align: center;
  margin-bottom: 56px;
  z-index: 10;
  position: relative;
}

.header-icon {
  font-size: 40px;
  display: inline-block;
  margin-bottom: 16px;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.playground-header h1 {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
}

.highlight {
  color: hsl(var(--primary));
}

.subtitle {
  color: var(--text-secondary);
  font-size: 15px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Grid layout for playground cards */
.playground-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  margin-bottom: 40px;
  z-index: 10;
  position: relative;
}

.playground-card {
  background: rgba(16, 15, 28, 0.6);
  border: 1px solid var(--border);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  padding: 32px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
  transition: border-color 0.3s;
}

.playground-card:hover {
  border-color: var(--border-focus);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 700;
}

.badge {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: var(--primary-glow);
  color: hsl(var(--primary));
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.card-description {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 24px;
}

/* Tooltip testing components */
.tooltip-test-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
}

.playground-input {
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background-color: rgba(8, 7, 13, 0.8);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.playground-input:focus {
  border-color: var(--border-focus);
}

.direction-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.test-btn {
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.test-btn:hover {
  background-color: #2b284a;
  border-color: var(--border-focus);
}

.test-btn.primary {
  background-color: hsl(var(--primary));
  border-color: hsla(var(--primary), 0.1);
  color: white;
}

.test-btn.primary:hover {
  opacity: 0.9;
}

/* Ripple button testing */
.ripple-test-area {
  display: flex;
  gap: 12px;
  flex-grow: 1;
}

.ripple-btn {
  flex-grow: 1;
  padding: 16px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  transition: opacity 0.2s;
}

.ripple-btn.default {
  background-color: hsl(var(--primary));
}

.ripple-btn.emerald {
  background-color: rgb(16, 185, 129);
}

/* Click Outside testing */
.click-outside-test-area {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 12px);
  background-color: #1f1b3d;
  border: 1px solid var(--border-focus);
  border-radius: var(--radius-md);
  padding: 20px;
  width: 280px;
  text-align: center;
  box-shadow: var(--shadow-lg);
  z-index: 100;
}

.dropdown-title {
  font-weight: 700;
  font-size: 14px;
  color: hsl(var(--accent));
  margin-bottom: 8px;
}

.dropdown-content p {
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Scrollable observer testing */
.observer-test-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.observer-note {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.scrollable-container {
  height: 180px;
  border: 1px solid var(--border);
  background-color: rgba(8, 7, 13, 0.8);
  border-radius: var(--radius-sm);
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scroll-spacer {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
  border-bottom: 1px dashed var(--border);
}

.scroll-spacer-sm {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
}

.observer-item {
  padding: 16px;
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: white;
}

.observer-item.accent {
  border-color: rgba(236, 72, 153, 0.2);
  background-color: rgba(236, 72, 153, 0.05);
}

/* Code layout box */
.code-box {
  margin-top: 24px;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.code-box pre {
  background-color: #0b0a12;
  padding: 12px;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.code-box code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  color: hsl(var(--primary));
}

/* Active console log layout */
.log-panel {
  background: rgba(16, 15, 28, 0.6);
  border: 1px solid var(--border);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  padding: 24px 32px;
  box-shadow: var(--shadow-md);
  z-index: 10;
  position: relative;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.log-header h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.clear-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background-color: var(--bg-surface-hover);
  border-color: var(--border-focus);
}

.log-messages {
  height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
}

.empty-log {
  color: var(--text-muted);
  text-align: center;
  padding-top: 60px;
}

.log-entry {
  color: var(--text-primary);
  line-height: 1.4;
}

.log-time {
  color: var(--text-muted);
}

.log-tag {
  font-weight: 700;
  color: hsl(var(--primary));
}

.log-text {
  color: var(--text-secondary);
}

/* Animations transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
