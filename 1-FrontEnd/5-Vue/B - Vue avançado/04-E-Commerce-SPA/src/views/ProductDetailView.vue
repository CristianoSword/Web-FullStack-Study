<template>
  <div class="details-container" v-if="product">
    <!-- Back Navigation -->
    <header class="details-header">
      <router-link to="/" class="back-btn">⬅️ Voltar ao Catálogo</router-link>
      
      <router-link to="/cart" class="cart-icon-btn">
        <span class="icon">🛒</span>
        <span v-if="cartStore.totalQuantity > 0" class="badge-count">{{ cartStore.totalQuantity }}</span>
      </router-link>
    </header>

    <main class="product-layout">
      <!-- Left Column (Product Image Card) -->
      <section class="image-section">
        <div class="img-box">
          <img :src="product.image" alt="Product Image" class="main-img" />
        </div>
      </section>

      <!-- Right Column (Details and Specifications) -->
      <section class="info-section">
        <span class="category-badge">{{ product.category }}</span>
        <h1>{{ product.name }}</h1>

        <div class="rating-box">
          <span class="stars">⭐ {{ product.rating }}</span>
          <span class="count">({{ product.reviewsCount }} reviews de clientes)</span>
        </div>

        <p class="price-tag">${{ product.price.toFixed(2) }}</p>

        <p class="description">{{ product.description }}</p>

        <button @click="cartStore.addToCart(product)" class="buy-now-btn">
          Adicionar ao Carrinho 🛍️
        </button>

        <!-- Specifications Table List -->
        <div class="specs-box">
          <h3>Especificações Técnicas</h3>
          <table class="specs-table">
            <tbody>
              <tr v-for="(val, name) in product.specs" :key="name">
                <td class="spec-name">{{ name }}</td>
                <td class="spec-val">{{ val }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <!-- Reviews Section at bottom -->
    <section class="reviews-section">
      <h2>Avaliações Recentes</h2>
      <div class="reviews-list">
        <div v-for="rev in product.reviews" :key="rev.id" class="review-card">
          <div class="rev-header">
            <span class="rev-author">{{ rev.author }}</span>
            <span class="rev-stars">⭐ {{ rev.rating }}/5</span>
          </div>
          <p class="rev-comment">"{{ rev.comment }}"</p>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <p>Produto não localizado no catálogo.</p>
    <router-link to="/">Voltar ao Catálogo</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreCart } from '../stores/storeCart'

const route = useRoute()
const cartStore = useStoreCart()

const product = computed(() => {
  return cartStore.products.find(p => p.id === route.params.id)
})
</script>

<style scoped>
.details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
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

.cart-icon-btn {
  position: relative;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
}

.cart-icon-btn:hover {
  background-color: var(--bg-surface-hover);
}

.cart-icon-btn .icon {
  font-size: 20px;
}

.badge-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: hsl(var(--primary));
  color: white;
  font-size: 10px;
  font-weight: 700;
  border-radius: var(--radius-full);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Product details layout */
.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  margin-bottom: 56px;
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.image-section {
  background-color: rgba(24, 24, 27, 0.4);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-box {
  max-width: 320px;
  width: 100%;
}

.main-img {
  width: 100%;
  object-fit: contain;
}

.info-section {
  display: flex;
  flex-direction: column;
}

.category-badge {
  align-self: flex-start;
  background-color: var(--primary-glow);
  color: hsl(var(--primary));
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
}

.info-section h1 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.rating-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.rating-box .stars {
  font-size: 13px;
  font-weight: 600;
}

.rating-box .count {
  font-size: 12px;
  color: var(--text-secondary);
}

.price-tag {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.description {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.buy-now-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 16px;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
  box-shadow: 0 4px 14px hsla(var(--primary), 0.35);
  margin-bottom: 40px;
}

.buy-now-btn:hover {
  opacity: 0.9;
}

/* Specs table */
.specs-box h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table td {
  padding: 10px 0;
  font-size: 13px;
  border-bottom: 1px solid rgba(39, 39, 42, 0.5);
}

.spec-name {
  font-weight: 600;
  color: var(--text-secondary);
  width: 150px;
}

.spec-val {
  color: var(--text-primary);
}

/* Reviews Section */
.reviews-section {
  border-top: 1px solid var(--border);
  padding-top: 40px;
}

.reviews-section h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 20px;
  border-radius: var(--radius-md);
}

.rev-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 8px;
}

.rev-author {
  font-weight: 700;
}

.rev-stars {
  color: hsl(var(--primary));
  font-weight: 600;
}

.rev-comment {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  font-style: italic;
}

.not-found {
  text-align: center;
  padding: 80px 24px;
}
</style>
