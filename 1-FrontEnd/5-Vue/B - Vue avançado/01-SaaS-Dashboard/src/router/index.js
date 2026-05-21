import { createRouter, createWebHistory } from 'vue-router'

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
    meta: { requiresAuth: true, role: 'admin' }
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

// Navigation Guard will be updated in Commit 3 once the Pinia store is ready
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('saas_token')
  const userRole = localStorage.getItem('saas_role') || 'viewer'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' })
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: 'Unauthorized' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
