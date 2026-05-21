import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: () => import('../views/CatalogView.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetailView.vue'),
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/CheckoutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Set document dynamic titles
router.afterEach((to) => {
  const titles = {
    Catalog: 'AuraStore | Tecnologia de Alto Nível',
    ProductDetail: 'AuraStore | Detalhes do Produto',
    Cart: 'AuraStore | Seu Carrinho',
    Checkout: 'AuraStore | Finalizar Compra'
  }
  document.title = titles[to.name] || 'AuraStore'
})

export default router
