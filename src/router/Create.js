import { RouteConfig } from 'vue-router';
export const create = [
  //HOME
  {
    path: '/create',
    redirect: '/create/broker',
    name: 'Create user',
    component: () => import('../views/Create/CreateUser.vue'),
    children: [
      {
        path: 'user',
        component: () => import(/* webpackPreload: true */ '@/components/Create/UserInformation.vue'),
      }, {
        path: 'broker',
        component: () => import(/* webpackPreload: true */ '@/components/Create/BrokerInformation.vue'),
      }, {
        path: 'cedent',
        component: () => import(/* webpackPreload: true */ '@/components/Create/CedentInformation.vue'),
      }
    ],
    meta: { requiresAuth: true },
  },
];
