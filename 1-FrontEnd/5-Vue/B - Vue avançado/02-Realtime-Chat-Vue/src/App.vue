<template>
  <div class="chat-layout">
    <!-- Sidebar (Left Pane) -->
    <aside class="chat-sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">💬</span>
          <h2>AURA<span class="highlight">Chat</span></h2>
        </div>
        <button class="add-chan-btn" @click="openModal" title="Criar Canal">+</button>
      </div>

      <!-- Channels List -->
      <div class="sidebar-section">
        <p class="section-title">CANAIS</p>
        <nav class="channels-list">
          <button 
            v-for="channel in store.channels" 
            :key="channel.id" 
            :class="['channel-item', { active: store.activeChannelId === channel.id }]"
            @click="store.selectChannel(channel.id)"
          >
            <span class="chan-icon">{{ channel.icon }}</span>
            <span class="chan-name">#{{ channel.name }}</span>
          </button>
        </nav>
      </div>

      <!-- User Profile at bottom -->
      <div class="sidebar-footer">
        <div class="user-profile">
          <img :src="store.currentUser.avatar" class="user-avatar" alt="Avatar" />
          <div class="user-info">
            <p class="name">{{ store.currentUser.name }}</p>
            <span class="status-indicator online">Online</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Chat Area (Right Pane) -->
    <main class="chat-main">
      <header class="chat-header">
        <div class="chan-info">
          <h2>
            <span class="header-icon">{{ store.activeChannel?.icon }}</span>
            #{{ store.activeChannel?.name }}
          </h2>
          <p class="chan-description">{{ store.activeChannel?.description }}</p>
        </div>

        <!-- Bot helper buttons for mention -->
        <div class="bot-shortcuts">
          <span class="label">Mencione:</span>
          <button @click="insertMention('@Jarvis')" class="mention-shortcut jarvis">@Jarvis</button>
          <button @click="insertMention('@Suporte-Bot')" class="mention-shortcut support">@Suporte-Bot</button>
          <button @click="insertMention('@GamerBot')" class="mention-shortcut gamer">@GamerBot</button>
        </div>
      </header>

      <!-- Message History List -->
      <div class="messages-pane" ref="messagePane">
        <div 
          v-for="msg in store.activeMessages" 
          :key="msg.id" 
          :class="['message-bubble-wrapper', { 'mine': msg.sender.name === store.currentUser.name }]"
        >
          <img :src="msg.sender.avatar" class="msg-avatar" alt="Avatar" />
          <div class="message-content">
            <div class="msg-meta">
              <span class="msg-sender">{{ msg.sender.name }}</span>
              <span v-if="msg.sender.isBot" :class="['bot-badge', msg.sender.name.toLowerCase()]">bot</span>
              <span class="msg-time">{{ msg.timestamp }}</span>
            </div>
            <div class="msg-text">
              {{ msg.text }}
            </div>
          </div>
        </div>

        <!-- Bouncing Dot Typing Indicator -->
        <div v-if="store.typingBotName" class="typing-indicator-wrapper">
          <span class="typing-text">{{ store.typingBotName }} está digitando</span>
          <div class="typing-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Input controls panel -->
      <footer class="chat-footer">
        <form @submit.prevent="handleSend" class="chat-form">
          <input 
            type="text" 
            v-model="inputMsg" 
            placeholder="Digite sua mensagem aqui... (mencione bots com @)" 
            class="chat-input"
            ref="messageInput"
          />
          <button type="submit" class="send-btn">
            Enviar <span>✈️</span>
          </button>
        </form>
      </footer>
    </main>

    <!-- Create Channel Modal -->
    <transition name="modal-fade">
      <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Criar Novo Canal</h3>
            <button class="close-modal-btn" @click="closeModal">×</button>
          </div>

          <form @submit.prevent="submitChannel" class="modal-form">
            <div class="form-group">
              <label>Nome do Canal</label>
              <input 
                type="text" 
                v-model="chanForm.name" 
                required 
                placeholder="Ex: anuncios-importantes" 
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Ícone (Emoji)</label>
                <input 
                  type="text" 
                  v-model="chanForm.icon" 
                  placeholder="Ex: 🚀" 
                  maxlength="2"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Descrição do Canal</label>
              <textarea 
                v-model="chanForm.description" 
                placeholder="Ex: Canal dedicado a discussões sobre infraestrutura cloud."
                rows="3"
              ></textarea>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn-secondary" @click="closeModal">Cancelar</button>
              <button type="submit" class="btn-primary">Criar</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import { useChatStore } from './stores/chatStore'

const store = useChatStore()

// State UI
const inputMsg = ref('')
const isModalOpen = ref(false)
const messagePane = ref(null)
const messageInput = ref(null)

const chanForm = ref({
  name: '',
  icon: '💬',
  description: ''
})

// Auto scroll helpers
function scrollToBottom() {
  nextTick(() => {
    if (messagePane.value) {
      messagePane.value.scrollTop = messagePane.value.scrollHeight
    }
  })
}

onMounted(() => {
  scrollToBottom()
})

// Watch active messages to auto-scroll on new inputs
watch(() => store.activeMessages.length, () => {
  scrollToBottom()
})

watch(() => store.typingBotName, () => {
  scrollToBottom()
})

// Dynamic title sync
watch(() => store.activeChannelId, () => {
  if (store.activeChannel) {
    document.title = `AuraChat | #${store.activeChannel.name}`
  }
}, { immediate: true })

// Handlers
function handleSend() {
  if (!inputMsg.value.trim()) return
  store.sendMessage(inputMsg.value)
  inputMsg.value = ''
  nextTick(() => {
    messageInput.value?.focus()
  })
}

function insertMention(botTag) {
  inputMsg.value = botTag + ' ' + inputMsg.value
  nextTick(() => {
    messageInput.value?.focus()
  })
}

function openModal() {
  chanForm.value = {
    name: '',
    icon: '📁',
    description: ''
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function submitChannel() {
  const success = store.createChannel({
    name: chanForm.value.name,
    icon: chanForm.value.icon,
    description: chanForm.value.description
  })
  if (success) {
    closeModal()
  } else {
    alert('Erro: Canal com esse nome já existe.')
  }
}
</script>

<style scoped>
.chat-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-app);
}

/* Sidebar styling */
.chat-sidebar {
  width: 280px;
  background-color: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 24px;
}

.logo h2 {
  font-weight: 700;
  font-size: 18px;
}

.highlight {
  color: hsl(var(--primary));
}

.add-chan-btn {
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  color: var(--text-primary);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.add-chan-btn:hover {
  background-color: #27272a;
  border-color: var(--border-focus);
}

.sidebar-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.channels-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: none;
  border: none;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s;
}

.channel-item:hover {
  background-color: var(--bg-surface-hover);
  color: var(--text-primary);
}

.channel-item.active {
  background-color: var(--primary-glow);
  color: hsl(var(--primary));
  border: 1px solid hsla(var(--primary), 0.2);
}

.chan-icon {
  font-size: 16px;
}

.sidebar-footer {
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  padding: 2px;
}

.user-info .name {
  font-size: 13px;
  font-weight: 600;
}

.status-indicator {
  font-size: 10px;
}

.status-indicator.online {
  color: rgb(34, 197, 94);
}

/* Chat Main Area styling */
.chat-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-header {
  padding: 20px 32px;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chan-info h2 {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 20px;
}

.chan-description {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.bot-shortcuts {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bot-shortcuts .label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.mention-shortcut {
  font-size: 11px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background-color: var(--bg-surface-hover);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.mention-shortcut:hover {
  background-color: #27272a;
}

.mention-shortcut.jarvis:hover {
  border-color: rgba(234, 179, 8, 0.4);
  color: rgb(234, 179, 8);
}

.mention-shortcut.support:hover {
  border-color: rgba(59, 130, 246, 0.4);
  color: rgb(59, 130, 246);
}

.mention-shortcut.gamer:hover {
  border-color: rgba(34, 197, 94, 0.4);
  color: rgb(34, 197, 94);
}

/* Messages Pane styling */
.messages-pane {
  flex-grow: 1;
  padding: 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--bg-app);
}

.message-bubble-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 75%;
}

.message-bubble-wrapper.mine {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 2px;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.msg-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.message-bubble-wrapper.mine .msg-meta {
  flex-direction: row-reverse;
}

.msg-sender {
  font-weight: 600;
  font-size: 13px;
}

.bot-badge {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  background-color: rgba(161, 161, 170, 0.15);
  color: rgb(161, 161, 170);
  padding: 1px 6px;
  border-radius: var(--radius-full);
}

.bot-badge.jarvis {
  background-color: rgba(234, 179, 8, 0.15);
  color: rgb(234, 179, 8);
}

.bot-badge.suporte-bot {
  background-color: rgba(59, 130, 246, 0.15);
  color: rgb(59, 130, 246);
}

.bot-badge.gamerbot {
  background-color: rgba(34, 197, 94, 0.15);
  color: rgb(34, 197, 94);
}

.msg-time {
  font-size: 10px;
  color: var(--text-secondary);
}

.msg-text {
  font-size: 14px;
  line-height: 1.5;
  padding: 10px 14px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 0 var(--radius-md) var(--radius-md) var(--radius-md);
  color: var(--text-primary);
}

.message-bubble-wrapper.mine .msg-text {
  background-color: hsl(var(--primary));
  border-color: hsla(var(--primary), 0.1);
  color: white;
  border-radius: var(--radius-md) 0 var(--radius-md) var(--radius-md);
  box-shadow: 0 2px 8px hsla(var(--primary), 0.2);
}

/* Typing indicator */
.typing-indicator-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 48px;
}

.typing-text {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 500;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.typing-dots .dot {
  width: 4px;
  height: 4px;
  background-color: var(--text-secondary);
  border-radius: var(--radius-full);
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-dots .dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dots .dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}

/* Footer panel inputs */
.chat-footer {
  padding: 24px 32px;
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border);
}

.chat-form {
  display: flex;
  gap: 12px;
}

.chat-input {
  flex-grow: 1;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: var(--border-focus);
}

.send-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 0 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
  box-shadow: 0 4px 12px hsla(var(--primary), 0.25);
}

.send-btn:hover {
  opacity: 0.9;
}

/* Modal backing */
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
  width: 440px;
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

.form-group input, .form-group textarea {
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  width: 100%;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: var(--border-focus);
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
