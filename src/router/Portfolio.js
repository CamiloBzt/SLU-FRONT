export const portfolio = [
  {
    path: '/portfolio',
    name: 'portfolio home',
    component: () => import('../views/Portfolio/index'),
    meta: { requiresAuth: false },
  },
  {
    path: '/portfolio/payment-request/',
    name: 'portfolio payment request',
    component: () => import('../views/Portfolio/payment-request'),
    meta: { requiresAuth: false },
  },
  {
    path: '/portfolio/balance/',
    name: 'portfolio balance',
    component: () => import('../views/Portfolio/balance'),
    meta: { requiresAuth: false },
  },
];
