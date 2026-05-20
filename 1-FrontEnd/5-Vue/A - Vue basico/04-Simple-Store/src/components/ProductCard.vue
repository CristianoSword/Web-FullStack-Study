<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);
</script>

<template>
  <div class="product-card">
    <div class="img-wrapper">
      <img :src="product.image" :alt="product.name" />
      <span class="category-badge">{{ product.category }}</span>
    </div>
    <div class="card-body">
      <h3>{{ product.name }}</h3>
      <p class="price">R$ {{ product.price.toFixed(2) }}</p>
      <button @click="emit('add-to-cart', product)" class="add-btn">
        Adicionar ao Carrinho
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.4);
}

.img-wrapper {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .img-wrapper img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  color: #a5b4fc;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.card-body h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8fafc;
  line-height: 1.4;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #6366f1;
  margin: 0;
}

.add-btn {
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  margin-top: auto;
}

.add-btn:hover {
  background: #4f46e5;
}
</style>
