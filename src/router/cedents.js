export const cedents = [
  //HOME
  {
    path: '/cedents',
    name: 'cedents',
    component: () => import('../views/Cedents/Cedents.vue'),
    redirect: { name: 'list-cedents' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'list-cedents',
        component: () => import('../components/Cedents/List.vue'),
      },
      {
        path: 'create',
        name: 'create-cedent',
        component: () => import('../components/Cedents/CreateCedent.vue'),
        props: (route) => ({cedentId: route.query.cedentId})
      }
    ]
  },
];
