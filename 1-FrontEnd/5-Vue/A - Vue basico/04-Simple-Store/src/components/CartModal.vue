<script setup>
defineProps({
  cart: {
    type: Array,
    required: true
  },
  subtotal: Number,
  discount: Number,
  total: Number
});

const emit = defineEmits(['close', 'update-quantity', 'remove']);
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="cart-modal">
      <header class="modal-header">
        <h2>Carrinho de Compras</h2>
        <button @click="emit('close')" class="close-trigger">&times;</button>
      </header>

      <!-- Corpo da lista -->
      <div class="modal-body">
        <div v-if="cart.length === 0" class="empty-cart">
          <p>Seu carrinho está vazio.</p>
        </div>
        
        <div v-else class="cart-items-list">
          <div v-for="item in cart" :key="item.product.id" class="cart-item">
            <img :src="item.product.image" :alt="item.product.name" class="cart-item-img" />
            <div class="cart-item-details">
              <h4>{{ item.product.name }}</h4>
              <p class="unit-price">R$ {{ item.product.price.toFixed(2) }}</p>
              
              <div class="quantity-controls">
                <button @click="emit('update-quantity', { productId: item.product.id, quantity: item.quantity - 1 })">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="emit('update-quantity', { productId: item.product.id, quantity: item.quantity + 1 })">+</button>
              </div>
            </div>
            <button @click="emit('remove', item.product.id)" class="item-delete-btn" title="Excluir item">
              &times;
            </button>
          </div>
        </div>
      </div>

      <!-- Rodapé com totais -->
      <footer v-if="cart.length > 0" class="modal-footer">
        <slot name="coupon"></slot>
        
        <div class="totals-summary">
          <div class="summary-line">
            <span>Subtotal</span>
            <span>R$ {{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line discount" v-if="discount > 0">
            <span>Desconto</span>
            <span>- R$ {{ discount.toFixed(2) }}</span>
          </div>
          <div class="summary-line total">
            <span>Total Geral</span>
            <span>R$ {{ total.toFixed(2) }}</span>
          </div>
        </div>

        <button @click="alert('Checkout simulado com sucesso!')" class="checkout-btn">
          Finalizar Pedido
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
  z-index: 100;
}

.cart-modal {
  width: 100%;
  max-width: 450px;
  background: #0f172a;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.close-trigger {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.8rem;
  cursor: pointer;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  color: #94a3b8;
  padding-top: 50px;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  gap: 15px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 12px;
  border-radius: 12px;
  align-items: center;
  position: relative;
}

.cart-item-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-item-details h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #f8fafc;
}

.unit-price {
  color: #6366f1;
  font-size: 0.88rem;
  font-weight: 600;
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  cursor: pointer;
}

.item-delete-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 1.3rem;
  cursor: pointer;
}

.item-delete-btn:hover {
  color: #ef4444;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.totals-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 0.95rem;
}

.summary-line.discount {
  color: #10b981;
}

.summary-line.total {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 8px;
}

.checkout-btn {
  background: #10b981;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}
</style>
