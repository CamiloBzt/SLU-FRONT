import { RouteConfig } from 'vue-router';
export const dashboard = [
  //HOME
  {
    path: '/dashboard/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/Home.vue'),
    meta: { requiresAuth: true }
  },
];
