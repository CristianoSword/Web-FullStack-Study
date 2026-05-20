<script setup>
import { ref, computed } from 'vue';
import ProductCard from './components/ProductCard.vue';
import CartModal from './components/CartModal.vue';

// Mock de Produtos
const products = ref([
  { id: 1, name: 'Sapatilha Running Pro', price: 299.90, category: 'Calçados', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id: 2, name: 'Smartwatch V8 Fit', price: 450.00, category: 'Eletrônicos', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: 3, name: 'Mochila Outdoor Tech', price: 189.90, category: 'Acessórios', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: 4, name: 'Fone Headphone Wireless', price: 350.00, category: 'Áudio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
  { id: 5, name: 'Garrafa Inox Térmica', price: 89.90, category: 'Acessórios', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' }
]);

const cart = ref([]);
const isCartOpen = ref(false);
const couponCode = ref('');
const activeDiscount = ref(0); // Porcentagem

// Métodos
const addToCart = (product) => {
  const item = cart.value.find(c => c.product.id === product.id);
  if (item) {
    item.quantity++;
  } else {
    cart.value.push({ product, quantity: 1 });
  }
};

const updateQuantity = ({ productId, quantity }) => {
  const item = cart.value.find(c => c.product.id === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    }
  }
};

const removeFromCart = (productId) => {
  cart.value = cart.value.filter(c => c.product.id !== productId);
};

const applyCoupon = () => {
  const code = couponCode.value.trim().toUpperCase();
  if (code === 'VUE20') {
    activeDiscount.value = 20;
    alert('Cupom VUE20 aplicado: 20% de Desconto!');
  } else {
    alert('Cupom inválido!');
    activeDiscount.value = 0;
  }
};

// Computeds
const totalItemsCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0);
});

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});

const discountAmount = computed(() => {
  return (subtotal.value * activeDiscount.value) / 100;
});

const total = computed(() => {
  return subtotal.value - discountAmount.value;
});
</script>

<template>
  <div class="store-container">
    <!-- Navbar -->
    <header class="store-nav">
      <div class="brand">🚀 DevStore</div>
      <button @click="isCartOpen = true" class="cart-trigger">
        🛒 Carrinho <span class="badge">{{ totalItemsCount }}</span>
      </button>
    </header>

    <div class="store-header">
      <h1>Produtos Premium</h1>
      <p>Comunicação entre Componentes por Props e Events em Vue 3</p>
    </div>

    <!-- Catálogo de Produtos -->
    <main class="products-grid">
      <ProductCard 
        v-for="prod in products" 
        :key="prod.id" 
        :product="prod"
        @add-to-cart="addToCart"
      />
    </main>

    <!-- Modal Carrinho -->
    <CartModal 
      v-if="isCartOpen" 
      :cart="cart"
      :subtotal="subtotal"
      :discount="discountAmount"
      :total="total"
      @close="isCartOpen = false"
      @update-quantity="updateQuantity"
      @remove="removeFromCart"
    >
      <template #coupon>
        <div class="coupon-section">
          <input 
            v-model="couponCode"
            type="text" 
            placeholder="Cupom VUE20" 
            class="coupon-input"
          />
          <button @click="applyCoupon" class="coupon-btn">Aplicar</button>
        </div>
      </template>
    </CartModal>
  </div>
</template>
