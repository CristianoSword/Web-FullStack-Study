<template>
  <div class="catalog-container">
    <!-- Premium navigation header -->
    <header class="catalog-header">
      <div class="logo">
        <span class="logo-icon">🛍️</span>
        <h2>AURA<span class="highlight">Store</span></h2>
      </div>

      <div class="search-bar-wrapper">
        <input 
          type="text" 
          v-model="store.searchFilter" 
          placeholder="Pesquisar produtos premium..." 
          class="search-input"
        />
      </div>

      <router-link to="/cart" class="cart-icon-btn">
        <span class="icon">🛒</span>
        <span v-if="store.totalQuantity > 0" class="badge-count">{{ store.totalQuantity }}</span>
      </router-link>
    </header>

    <!-- Category Filters -->
    <nav class="category-filters">
      <button 
        v-for="cat in ['Todos', 'Laptops', 'Áudio', 'Wearables', 'Acessórios']" 
        :key="cat" 
        :class="['filter-btn', { active: store.categoryFilter === cat }]"
        @click="store.categoryFilter = cat"
      >
        {{ cat }}
      </button>
    </nav>

    <!-- Product Grid -->
    <main class="products-grid">
      <div 
        v-for="prod in store.filteredProducts" 
        :key="prod.id" 
        class="product-card"
      >
        <div class="product-image-box">
          <img :src="prod.image" alt="Product Image" class="product-img" />
          <span class="cat-tag">{{ prod.category }}</span>
        </div>

        <div class="product-info">
          <h3 class="product-title">{{ prod.name }}</h3>
          
          <div class="product-rating">
            <span class="stars">⭐ {{ prod.rating }}</span>
            <span class="count">({{ prod.reviewsCount }} reviews)</span>
          </div>

          <p class="product-price">${{ prod.price.toFixed(2) }}</p>

          <div class="card-actions">
            <router-link :to="`/product/${prod.id}`" class="details-btn">
              Detalhes
            </router-link>
            <button @click="store.addToCart(prod)" class="add-to-cart-btn">
              + Carrinho
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useStoreCart } from '../stores/storeCart'

const store = useStoreCart()
</script>

<style scoped>
.catalog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
  margin-bottom: 32px;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 28px;
}

.logo h2 {
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.5px;
}

.highlight {
  color: hsl(var(--primary));
}

.search-bar-wrapper {
  flex-grow: 1;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--border-focus);
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

/* Categories Filter Buttons */
.category-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.filter-btn {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 10px 20px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: var(--bg-surface-hover);
  color: var(--text-primary);
}

.filter-btn.active {
  background-color: hsl(var(--primary));
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 10px hsla(var(--primary), 0.25);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}

.product-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s, border-color 0.25s;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-focus);
}

.product-image-box {
  position: relative;
  height: 200px;
  background-color: rgba(9, 9, 11, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.product-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.cat-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: var(--bg-app);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.product-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.product-rating .stars {
  font-size: 12px;
  font-weight: 600;
}

.product-rating .count {
  font-size: 11px;
  color: var(--text-muted);
}

.product-price {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
}

.details-btn {
  text-align: center;
  text-decoration: none;
  background-color: var(--bg-surface-hover);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
}

.details-btn:hover {
  background-color: #37373a;
}

.add-to-cart-btn {
  background-color: hsl(var(--primary));
  color: white;
  border: none;
  padding: 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-to-cart-btn:hover {
  opacity: 0.9;
}
</style>
