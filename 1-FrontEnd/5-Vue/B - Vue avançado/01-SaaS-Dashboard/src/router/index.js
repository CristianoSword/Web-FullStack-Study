import { createRouter, createWebHistory } from 'vue-router'
import { useSaasStore } from '../stores/saasStore'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/billing',
    name: 'Billing',
    component: () => import('../views/BillingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('../views/UnauthorizedView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const saasStore = useSaasStore()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!saasStore.isAuthenticated) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else if (to.name === 'Login' && saasStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  const titleMap = {
    Dashboard: 'AuraSaaS | Painel Geral',
    Users: 'AuraSaaS | Membros Corporativos',
    Billing: 'AuraSaaS | Faturamento & Finanças',
    Login: 'AuraSaaS | Autenticação',
    Unauthorized: 'AuraSaaS | Acesso Restrito'
  }
  document.title = titleMap[to.name] || 'AuraSaaS'
})

export default router
