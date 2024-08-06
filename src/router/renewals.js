import { RouteConfig } from 'vue-router';
export const renewals = [
  {
    path: '/renewals/accounts',
    name: 'Accounts to be renewed',
    component: () => import('../views/Renewals/Accounts.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/renewals/subscription',
    name: 'Renewal subscription',
    component: () => import('../views/Renewals/Subscription.vue'),
    meta: { requiresAuth: true },
  },

];
