export const wallet = [
  {
    path: '/wallet/payments',
    name: 'Wallet Payments',
    component: () => import('../views/Wallet/Payments'),
    meta: { requiresAuth: true },
  },
  {
    path: '/wallet/:subscriptionId/payments',
    name: 'Wallet Payments Sub',
    component: () => import('../views/Wallet/Payments'),
    meta: { requiresAuth: true },
  },
  {
    path: '/wallet/cancelation',
    name: 'Wallet Cancelation',
    component: () => import('../views/Wallet/Cancelation'),
    meta: { requiresAuth: true },
  },
];
