import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { INITIAL_USERS, INITIAL_INVOICES, INITIAL_METRICS, MRR_TRENDS, ROLES } from '../models/mockData'

export const useSaasStore = defineStore('saas', () => {
  // Authentication State
  const currentUser = ref(null)
  
  // App Data State (hydrated from LocalStorage if exists, else from initial mock data)
  const users = ref(JSON.parse(localStorage.getItem('saas_users')) || INITIAL_USERS)
  const invoices = ref(JSON.parse(localStorage.getItem('saas_invoices')) || INITIAL_INVOICES)
  const metrics = ref(INITIAL_METRICS)
  const mrrTrends = ref(MRR_TRENDS)

  // Initialization: check local storage token for session persistent state
  const token = localStorage.getItem('saas_token')
  const savedRole = localStorage.getItem('saas_role')
  const savedEmail = localStorage.getItem('saas_email')
  const savedName = localStorage.getItem('saas_name')

  if (token && savedRole && savedEmail) {
    currentUser.value = {
      name: savedName || 'User',
      email: savedEmail,
      role: savedRole,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${savedName || 'User'}`
    }
  }

  // Computed state getters
  const isAuthenticated = computed(() => !!currentUser.value)
  const isAdmin = computed(() => currentUser.value?.role === ROLES.ADMIN)
  const isEditor = computed(() => currentUser.value?.role === ROLES.EDITOR || currentUser.value?.role === ROLES.ADMIN)

  // Actions
  function login(email, password) {
    // Basic mock authentication
    let mockUser = users.value.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    // Fallback default admin/editor if not in lists (for testing flexibility)
    if (!mockUser) {
      if (email === 'admin@saas.com') {
        mockUser = { name: 'Super Admin', email: 'admin@saas.com', role: ROLES.ADMIN }
      } else if (email === 'editor@saas.com') {
        mockUser = { name: 'Creative Editor', email: 'editor@saas.com', role: ROLES.EDITOR }
      } else {
        mockUser = { name: 'Standard Viewer', email: email, role: ROLES.VIEWER }
      }
    }

    currentUser.value = {
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
      avatar: mockUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${mockUser.name}`
    }

    // Persist to local storage
    localStorage.setItem('saas_token', 'token_saas_dashboard_premium_123')
    localStorage.setItem('saas_role', mockUser.role)
    localStorage.setItem('saas_email', mockUser.email)
    localStorage.setItem('saas_name', mockUser.name)
    
    return true
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('saas_token')
    localStorage.removeItem('saas_role')
    localStorage.removeItem('saas_email')
    localStorage.removeItem('saas_name')
  }

  // User CRUD actions
  function addUser(user) {
    const nextId = users.value.length ? Math.max(...users.value.map(u => u.id)) + 1 : 1
    const newUser = {
      id: nextId,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`,
      lastActive: 'Recém criado',
      ...user
    }
    users.value.push(newUser)
    saveUsers()
    
    // Automatically recalculate dashboard metrics slightly to simulate real system impact!
    metrics.value.activeUsers += 1
    metrics.value.mrr += user.plan === 'Enterprise' ? 1250 : user.plan === 'Pro' ? 299 : 99
  }

  function updateUser(id, updatedFields) {
    const idx = users.value.findIndex(u => u.id === id)
    if (idx !== -1) {
      users.value[idx] = { ...users.value[idx], ...updatedFields }
      saveUsers()
    }
  }

  function deleteUser(id) {
    users.value = users.value.filter(u => u.id !== id)
    saveUsers()
    metrics.value.activeUsers = Math.max(0, metrics.value.activeUsers - 1)
  }

  // Billing Actions
  function addInvoice(invoice) {
    const newInvoice = {
      id: `INV-00${invoices.value.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      ...invoice
    }
    invoices.value.unshift(newInvoice)
    saveInvoices()
    
    // Update MRR on new active invoices
    if (invoice.status === 'Paid') {
      metrics.value.mrr += invoice.amount
    }
  }

  // Helpers
  function saveUsers() {
    localStorage.setItem('saas_users', JSON.stringify(users.value))
  }

  function saveInvoices() {
    localStorage.setItem('saas_invoices', JSON.stringify(invoices.value))
  }

  return {
    currentUser,
    users,
    invoices,
    metrics,
    mrrTrends,
    isAuthenticated,
    isAdmin,
    isEditor,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
    addInvoice
  }
})
