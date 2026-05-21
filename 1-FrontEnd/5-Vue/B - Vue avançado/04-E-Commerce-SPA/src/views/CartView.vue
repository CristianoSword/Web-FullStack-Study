<template>
  <div class="cart-container">
    <header class="cart-header">
      <router-link to="/" class="back-btn">⬅️ Continuar Comprando</router-link>
      <h2>Seu Carrinho</h2>
    </header>

    <div class="cart-layout" v-if="store.cartItems.length > 0">
      <!-- Left Column: Items List -->
      <section class="items-section">
        <div 
          v-for="item in store.cartItems" 
          :key="item.id" 
          class="cart-item"
        >
          <div class="item-img-box">
            <img :src="item.image" alt="Item Image" />
          </div>

          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <span class="item-cat">{{ item.category }}</span>
          </div>

          <div class="item-quantity-controls">
            <button @click="store.updateQuantity(item.id, -1)" class="qty-btn">-</button>
            <span class="qty-count">{{ item.quantity }}</span>
            <button @click="store.updateQuantity(item.id, 1)" class="qty-btn">+</button>
          </div>

          <div class="item-total-price">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
        </div>
      </section>

      <!-- Right Column: Order Summary & Coupon -->
      <section class="summary-section">
        <div class="summary-card">
          <h3>Resumo do Pedido</h3>

          <!-- Financial Breakdown -->
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ store.cartTotal.toFixed(2) }}</span>
          </div>

          <div v-if="store.discountPercent > 0" class="summary-row discount">
            <span>Desconto ({{ store.appliedCoupon }} {{ store.discountPercent }}%)</span>
            <span>-${{ store.discountAmount.toFixed(2) }}</span>
          </div>

          <div class="summary-row">
            <span>Frete</span>
            <span>{{ store.shippingCost === 0 ? 'Grátis' : '$' + store.shippingCost.toFixed(2) }}</span>
          </div>

          <div class="summary-row grand-total">
            <span>Total Geral</span>
            <span>${{ store.grandTotal.toFixed(2) }}</span>
          </div>

          <!-- Coupon Input Form -->
          <div class="coupon-box">
            <label>Cupom de Desconto</label>
            <div class="coupon-form">
              <input 
                type="text" 
                v-model="couponCode" 
                placeholder="Ex: TRILHA10, VIP20" 
                class="coupon-input"
                :disabled="store.discountPercent > 0"
              />
              <button 
                @click="submitCoupon" 
                class="apply-btn"
                :disabled="store.discountPercent > 0"
              >
                Aplicar
              </button>
            </div>
            <p v-if="couponMessage" :class="['coupon-msg', { error: isCouponError }]">
              {{ couponMessage }}
            </p>
            <p class="coupon-helper" v-if="store.discountPercent === 0">
              💡 Dica: Tente usar o cupom <span class="badge">TRILHA10</span> ou <span class="badge">AURA50</span>!
            </p>
          </div>

          <router-link to="/checkout" class="checkout-btn">
            Finalizar Compra
          </router-link>
        </div>
      </section>
    </div>

    <!-- Empty cart view -->
    <div class="empty-cart" v-else>
      <span class="empty-icon">🛒</span>
      <h3>Seu carrinho está vazio</h3>
      <p>Parece que você ainda não adicionou nenhum item premium. Volte à nossa vitrine e escolha as melhores soluções tecnológicas!</p>
      <router-link to="/" class="browse-btn">Explorar Produtos</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreCart } from '../stores/storeCart'

const store = useStoreCart()
const couponCode = ref('')
const couponMessage = ref('')
const isCouponError = ref(false)

function submitCoupon() {
  if (!couponCode.value.trim()) return
  
  const success = store.applyCoupon(couponCode.value)
  if (success) {
    couponMessage.value = `Cupom ${store.appliedCoupon} aplicado com sucesso!`
    isCouponError.value = false
    couponCode.value = ''
  } else {
    couponMessage.value = 'Cupom inválido ou expirado.'
    isCouponError.value = true
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.cart-header {
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
  transition: color 0.2s;
}

.back-btn:hover {
  color: var(--text-primary);
}

.cart-header h2 {
  font-size: 20px;
  font-weight: 700;
}

/* Two-column layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 40px;
  align-items: start;
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.items-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px;
  gap: 20px;
}

.item-img-box {
  width: 70px;
  height: 70px;
  background-color: rgba(9, 9, 11, 0.4);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.item-img-box img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.item-cat {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.item-quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--border);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-app);
}

.qty-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: color 0.2s;
}

.qty-btn:hover {
  color: var(--text-primary);
}

.qty-count {
  font-size: 13px;
  font-weight: 700;
  width: 18px;
  text-align: center;
}

.item-total-price {
  font-size: 15px;
  font-weight: 700;
  width: 80px;
  text-align: right;
}

/* Order Summary Box styling */
.summary-section {
  position: sticky;
  top: 40px;
}

.summary-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-card h3 {
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-secondary);
}

.summary-row.discount {
  color: rgb(34, 197, 94);
}

.summary-row.grand-total {
  border-top: 1px solid var(--border);
  padding-top: 16px;
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
}

/* Coupon section */
.coupon-box {
  border-top: 1px solid var(--border);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.coupon-box label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.coupon-form {
  display: flex;
  gap: 8px;
}

.coupon-input {
  flex-grow: 1;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 13px;
  outline: none;
}

.coupon-input:focus {
  border-color: var(--border-focus);
}

.apply-btn {
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0 16px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.apply-btn:hover:not(:disabled) {
  background-color: #37373a;
  border-color: var(--border-focus);
}

.coupon-msg {
  font-size: 11px;
  color: rgb(34, 197, 94);
  font-weight: 600;
}

.coupon-msg.error {
  color: rgb(239, 68, 68);
}

.coupon-helper {
  font-size: 11px;
  color: var(--text-muted);
}

.coupon-helper .badge {
  font-family: monospace;
  background-color: var(--bg-app);
  padding: 2px 4px;
  border-radius: 4px;
  color: var(--text-secondary);
}

.checkout-btn {
  text-align: center;
  text-decoration: none;
  background-color: hsl(var(--primary));
  color: white;
  padding: 14px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 12px hsla(var(--primary), 0.25);
  transition: opacity 0.2s;
}

.checkout-btn:hover {
  opacity: 0.9;
}

/* Empty shopping cart */
.empty-cart {
  text-align: center;
  padding: 80px 24px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  max-width: 600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-icon {
  font-size: 48px;
}

.empty-cart h3 {
  font-size: 18px;
  font-weight: 700;
}

.empty-cart p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 440px;
}

.browse-btn {
  text-decoration: none;
  background-color: hsl(var(--primary));
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 13px;
  transition: opacity 0.2s;
  margin-top: 8px;
}

.browse-btn:hover {
  opacity: 0.9;
}
</style>
