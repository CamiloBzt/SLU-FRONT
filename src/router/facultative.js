export const facultative = [


  {
    path: '/facultative/accounts',
    name: 'accounts facultative',
    component: () => import('../views/Facultative/Accounts'),
    meta: { requiresAuth: false },
  },
  {
    path: '/facultative/negotiation',
    name: 'in negotiation facultative',
    component: () => import('../views/Facultative/InNegotiation'),
    meta: { requiresAuth: false },
  }

]