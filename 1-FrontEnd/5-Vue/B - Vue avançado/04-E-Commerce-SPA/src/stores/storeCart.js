import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MOCK_PRODUCTS } from '../models/mockData'

export const useStoreCart = defineStore('cart', () => {
  // Catalog & Shopping Cart States
  const products = ref(MOCK_PRODUCTS)
  const cartItems = ref(JSON.parse(localStorage.getItem('aurastore_cart')) || [])
  const searchFilter = ref('')
  const categoryFilter = ref('Todos')
  
  // Coupons system
  const discountPercent = ref(0)
  const appliedCoupon = ref('')

  // Getters
  const filteredProducts = computed(() => {
    return products.value.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchFilter.value.toLowerCase())
      const matchesCategory = categoryFilter.value === 'Todos' || p.category === categoryFilter.value
      return matchesSearch && matchesCategory
    })
  })

  const cartTotal = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  })

  const shippingCost = computed(() => {
    if (cartTotal.value === 0) return 0
    return cartTotal.value > 1000 ? 0 : 25.00 // Free shipping over $1000!
  })

  const discountAmount = computed(() => {
    return cartTotal.value * (discountPercent.value / 100)
  })

  const grandTotal = computed(() => {
    return cartTotal.value - discountAmount.value + shippingCost.value
  })

  const totalQuantity = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  // Actions
  function addToCart(product) {
    const existing = cartItems.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1
      })
    }
    saveCart()
  }

  function updateQuantity(productId, delta) {
    const item = cartItems.value.find(i => i.id === productId)
    if (!item) return

    item.quantity += delta
    if (item.quantity <= 0) {
      cartItems.value = cartItems.value.filter(i => i.id !== productId)
    }
    saveCart()
  }

  function applyCoupon(code) {
    const cleanCode = code.toUpperCase().trim()
    if (cleanCode === 'TRILHA10') {
      discountPercent.value = 10
      appliedCoupon.value = 'TRILHA10'
      return true
    } else if (cleanCode === 'VIP20') {
      discountPercent.value = 20
      appliedCoupon.value = 'VIP20'
      return true
    } else if (cleanCode === 'AURA50') {
      discountPercent.value = 50
      appliedCoupon.value = 'AURA50'
      return true
    }
    return false
  }

  function clearCart() {
    cartItems.value = []
    discountPercent.value = 0
    appliedCoupon.value = ''
    saveCart()
  }

  // LocalStorage helper
  function saveCart() {
    localStorage.setItem('aurastore_cart', JSON.stringify(cartItems.value))
  }

  return {
    products,
    cartItems,
    searchFilter,
    categoryFilter,
    discountPercent,
    appliedCoupon,
    filteredProducts,
    cartTotal,
    shippingCost,
    discountAmount,
    grandTotal,
    totalQuantity,
    addToCart,
    updateQuantity,
    applyCoupon,
    clearCart
  }
})
