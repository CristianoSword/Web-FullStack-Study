/**
 * SaaS Dashboard Types & Mock Data Generation
 */

export const PLANS = {
  STARTER: 'Starter',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise'
};

export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

export const USER_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
};

export const INVOICE_STATUS = {
  PAID: 'Paid',
  PENDING: 'Pending',
  OVERDUE: 'Overdue'
};

// Raw initial users data
export const INITIAL_USERS = [
  {
    id: 1,
    name: 'Cristiano Sword',
    email: 'cristiano@saas.com',
    role: ROLES.ADMIN,
    status: USER_STATUS.ACTIVE,
    plan: PLANS.ENTERPRISE,
    lastActive: 'Hoje, 14:15',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cristiano'
  },
  {
    id: 2,
    name: 'Ana Silva',
    email: 'ana.silva@saas.com',
    role: ROLES.EDITOR,
    status: USER_STATUS.ACTIVE,
    plan: PLANS.PRO,
    lastActive: 'Ontem, 18:30',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ana'
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos.santos@saas.com',
    role: ROLES.VIEWER,
    status: USER_STATUS.ACTIVE,
    plan: PLANS.STARTER,
    lastActive: 'Hoje, 09:12',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Carlos'
  },
  {
    id: 4,
    name: 'Mariana Costa',
    email: 'mariana.c@saas.com',
    role: ROLES.VIEWER,
    status: USER_STATUS.INACTIVE,
    plan: PLANS.PRO,
    lastActive: 'Há 5 dias',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Mariana'
  },
  {
    id: 5,
    name: 'Bruno Lima',
    email: 'bruno.l@saas.com',
    role: ROLES.EDITOR,
    status: USER_STATUS.ACTIVE,
    plan: PLANS.STARTER,
    lastActive: 'Há 2 horas',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bruno'
  }
];

// Raw initial invoice data
export const INITIAL_INVOICES = [
  { id: 'INV-001', date: '2026-05-15', amount: 1250.00, status: INVOICE_STATUS.PAID, plan: PLANS.ENTERPRISE, customer: 'Cristiano Sword' },
  { id: 'INV-002', date: '2026-05-14', amount: 299.00, status: INVOICE_STATUS.PAID, plan: PLANS.PRO, customer: 'Ana Silva' },
  { id: 'INV-003', date: '2026-05-12', amount: 99.00, status: INVOICE_STATUS.PENDING, plan: PLANS.STARTER, customer: 'Carlos Santos' },
  { id: 'INV-004', date: '2026-05-10', amount: 299.00, status: INVOICE_STATUS.OVERDUE, plan: PLANS.PRO, customer: 'Mariana Costa' },
  { id: 'INV-005', date: '2026-05-08', amount: 99.00, status: INVOICE_STATUS.PAID, plan: PLANS.STARTER, customer: 'Bruno Lima' }
];

// Initial Core SaaS Metrics
export const INITIAL_METRICS = {
  mrr: 154200,      // Monthly Recurring Revenue
  activeUsers: 8420, // Daily Active Users
  churnRate: 2.1,    // Monthly churn percentage
  conversionRate: 3.4 // Demo to paid percentage
};

// MRR History trends for graph drawing
export const MRR_TRENDS = [
  { month: 'Jan', mrr: 120000, active: 6200 },
  { month: 'Fev', mrr: 125000, active: 6500 },
  { month: 'Mar', mrr: 132000, active: 7100 },
  { month: 'Abr', mrr: 141000, active: 7800 },
  { month: 'Mai', mrr: 154200, active: 8420 }
];
