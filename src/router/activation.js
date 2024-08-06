import { RouteConfig } from 'vue-router';
export const activation = [
  //HOME
  {
    path: '/activation',
    name: 'activation',
    component: () => import('../views/Activation.vue'),
    meta: { requiresAuth: false },
  },
];
