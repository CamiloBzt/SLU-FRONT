export const brokers = [
  //HOME
  {
    path: '/brokers',
    name: 'brokers',
    component: () => import('../views/Brokers/Brokers.vue'),
    redirect: { name: 'list-brokers' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'list-brokers',
        component: () => import('../components/Brokers/List.vue'),
      },
      {
        path: 'create',
        name: 'create-broker',
        component: () => import('../components/Brokers/CreateBroker.vue'),
        props: (route) => ({brokerId: route.query.brokerId})
      }
    ]
  },
];
