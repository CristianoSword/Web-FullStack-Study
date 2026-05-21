<template>
  <div class="checkout-container">
    <header class="checkout-header">
      <router-link to="/cart" class="back-btn">⬅️ Voltar ao Carrinho</router-link>
      <h2>Finalizar Pagamento</h2>
    </header>

    <div class="checkout-layout" v-if="!isSuccess">
      <!-- Left Column: Checkout Payment Form -->
      <section class="form-section">
        <form @submit.prevent="handlePayment" class="checkout-form">
          <h3 class="section-title">Detalhes de Cobrança 💳</h3>

          <div class="form-row">
            <div class="form-group">
              <label>Nome Completo</label>
              <input type="text" required placeholder="Ex: Cristiano Sword" class="form-input" />
            </div>
            <div class="form-group">
              <label>E-mail Corporativo</label>
              <input type="email" required placeholder="Ex: dev@cristiano.com" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label>Endereço de Entrega</label>
            <input type="text" required placeholder="Avenida Paulista, 1000 - Bela Vista" class="form-input" />
          </div>

          <h3 class="section-title mt-4">Dados de Pagamento</h3>

          <div class="form-group">
            <label>Nome Impresso no Cartão</label>
            <input 
              type="text" 
              required 
              v-model="cardName" 
              placeholder="NOME DO TITULAR" 
              class="form-input uppercase"
            />
          </div>

          <div class="form-group">
            <label>Número do Cartão</label>
            <input 
              type="text" 
              required 
              v-model="cardNumber" 
              @input="formatCardNumber" 
              placeholder="0000 0000 0000 0000" 
              maxlength="19" 
              class="form-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Validade</label>
              <input 
                type="text" 
                required 
                v-model="cardExpiry" 
                @input="formatExpiry" 
                placeholder="MM/AA" 
                maxlength="5" 
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>CVV</label>
              <input 
                type="text" 
                required 
                v-model="cardCvv" 
                @focus="isCardFlipped = true" 
                @blur="isCardFlipped = false" 
                placeholder="123" 
                maxlength="3" 
                class="form-input"
              />
            </div>
          </div>

          <button type="submit" class="pay-btn" :disabled="isProcessing">
            <span v-if="isProcessing" class="spinner"></span>
            <span v-else>Confirmar Pagamento de ${{ store.grandTotal.toFixed(2) }}</span>
          </button>
        </form>
      </section>

      <!-- Right Column: Interactive Virtual Card & Subtotals -->
      <section class="card-display-section">
        <!-- Interactive Flapping Card -->
        <div :class="['virtual-card', { flipped: isCardFlipped }]">
          <!-- Card Front -->
          <div class="card-side front">
            <div class="card-chip-container">
              <div class="card-chip"></div>
              <span class="card-brand">AuraGold</span>
            </div>
            <div class="card-num-display">
              {{ cardNumber || '•••• •••• •••• ••••' }}
            </div>
            <div class="card-meta">
              <div class="meta-item">
                <span class="label">TITULAR</span>
                <span class="val uppercase">{{ cardName || 'NOME DO TITULAR' }}</span>
              </div>
              <div class="meta-item">
                <span class="label">VALIDADE</span>
                <span class="val">{{ cardExpiry || 'MM/AA' }}</span>
              </div>
            </div>
          </div>

          <!-- Card Back -->
          <div class="card-side back">
            <div class="magnetic-strip"></div>
            <div class="signature-cvv">
              <span class="strip-label">ASSINATURA AUTORIZADA</span>
              <div class="cvv-display">{{ cardCvv || '•••' }}</div>
            </div>
            <p class="disclaimer">Válido apenas em ambiente de demonstração reativa AuraStore. Desenvolvido com Vue 3.</p>
          </div>
        </div>

        <!-- Mini Cart items brief -->
        <div class="mini-summary">
          <h4>Seu Pedido</h4>
          <div v-for="item in store.cartItems" :key="item.id" class="mini-row">
            <span>{{ item.quantity }}x {{ item.name }}</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="mini-row total">
            <span>Total com Desconto</span>
            <span>${{ store.grandTotal.toFixed(2) }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- Payment Completed Banner Screen -->
    <transition name="fade">
      <div v-if="isSuccess" class="success-screen">
        <div class="success-icon-box">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h3>Pagamento Confirmado! 🎉</h3>
        <p>Agradecemos sua preferência pela AuraStore. Seu pedido foi processado reativamente através de nosso gateway simulado do Pinia e será entregue em breve.</p>
        <div class="success-details">
          <p><strong>Código da Transação:</strong> #AUR-{{ transactionId }}</p>
          <p><strong>Data:</strong> {{ orderDate }}</p>
        </div>
        <button @click="finishCheckout" class="done-btn">Ir para Vitrine</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStoreCart } from '../stores/storeCart'

const store = useStoreCart()
const router = useRouter()

// Card representation state
const cardName = ref('')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const isCardFlipped = ref(false)

// Simulation loader
const isProcessing = ref(false)
const isSuccess = ref(false)
const transactionId = ref('')
const orderDate = ref('')

// Formatting functions
function formatCardNumber() {
  let v = cardNumber.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = v.match(/\d{4,16}/g)
  let match = (matches && matches[0]) || ''
  let parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length > 0) {
    cardNumber.value = parts.join(' ')
  } else {
    cardNumber.value = v
  }
}

function formatExpiry() {
  let v = cardExpiry.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    cardExpiry.value = v.substring(0, 2) + '/' + v.substring(2, 4)
  } else {
    cardExpiry.value = v
  }
}

function handlePayment() {
  isProcessing.value = true
  
  // Simulate API authorization latency
  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    transactionId.value = Math.floor(100000 + Math.random() * 900000)
    orderDate.value = new Date().toLocaleString()
  }, 2200)
}

function finishCheckout() {
  store.clearCart()
  router.push('/')
}
</script>

<style scoped>
.checkout-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
  margin-bottom: 32px;
}

.back-btn {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.back-btn:hover {
  color: var(--text-primary);
}

.checkout-header h2 {
  font-size: 20px;
  font-weight: 700;
}

/* Two columns */
.checkout-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 56px;
  align-items: start;
}

@media (max-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 20px;
  border-left: 3px solid hsl(var(--primary));
  padding-left: 10px;
}

.mt-4 {
  margin-top: 32px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.form-input {
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: var(--border-focus);
}

.uppercase {
  text-transform: uppercase;
}

.pay-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 16px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  margin-top: 16px;
  box-shadow: 0 4px 14px hsla(var(--primary), 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.2s;
}

.pay-btn:hover {
  opacity: 0.9;
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Interactive Flapping Card styling */
.card-display-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: sticky;
  top: 40px;
}

.virtual-card {
  width: 100%;
  max-width: 360px;
  height: 220px;
  perspective: 1000px;
  position: relative;
  align-self: center;
}

.card-side {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  padding: 24px;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-side.front {
  background: linear-gradient(135deg, #27272a 0%, #09090b 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: rotateY(0deg);
}

.card-side.back {
  background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform: rotateY(180deg);
  padding: 24px 0;
}

.virtual-card.flipped .card-side.front {
  transform: rotateY(-180deg);
}

.virtual-card.flipped .card-side.back {
  transform: rotateY(0deg);
}

/* Front Side Components */
.card-chip-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-chip {
  width: 44px;
  height: 32px;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 4px;
}

.card-brand {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 1px;
  color: #fbbf24;
}

.card-num-display {
  font-family: monospace;
  font-size: 20px;
  letter-spacing: 2px;
  word-spacing: 4px;
  color: white;
  margin: 20px 0;
}

.card-meta {
  display: flex;
  gap: 28px;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-item .label {
  font-size: 9px;
  color: var(--text-muted);
}

.meta-item .val {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Back Side Components */
.magnetic-strip {
  width: 100%;
  height: 40px;
  background-color: black;
  margin-top: 10px;
}

.signature-cvv {
  margin: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.strip-label {
  font-size: 8px;
  color: var(--text-muted);
}

.cvv-display {
  background-color: white;
  color: black;
  font-family: monospace;
  font-size: 15px;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 4px;
  text-align: right;
  letter-spacing: 2px;
}

.disclaimer {
  font-size: 8px;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 0 24px;
  text-align: center;
}

/* Mini order summary */
.mini-summary {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mini-summary h4 {
  font-size: 13px;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
  text-transform: uppercase;
}

.mini-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}

.mini-row.total {
  border-top: 1px dashed var(--border);
  padding-top: 8px;
  font-weight: 700;
  color: var(--text-primary);
}

/* Success Completed Banner Screen styling */
.success-screen {
  max-width: 500px;
  margin: 40px auto;
  text-align: center;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 40px;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: var(--shadow-lg);
}

.success-icon-box {
  width: 80px;
  height: 80px;
}

.success-screen h3 {
  font-size: 20px;
  font-weight: 800;
}

.success-screen p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.success-details {
  background-color: var(--bg-app);
  padding: 16px 24px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  font-size: 12px;
  text-align: left;
  width: 100%;
}

.success-details p {
  margin-bottom: 6px;
  color: var(--text-secondary);
}

.success-details p strong {
  color: var(--text-primary);
}

.done-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.done-btn:hover {
  opacity: 0.9;
}

/* Animated Tick checkmark */
.checkmark__circle {
  border-dasharray: 166;
  border-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #22c55e;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #22c55e;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% { stroke-dashoffset: 0; }
}
@keyframes scale {
  0%, 100% { transform: none; }
  50% { transform: scale3d(1.1, 1.1, 1); }
}
@keyframes fill {
  100% { box-shadow: inset 0px 0px 0px 40px #22c55e; }
}
</style>
