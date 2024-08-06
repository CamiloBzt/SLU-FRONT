export const users = [
  //HOME
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/User/Users.vue'),
    redirect: { name: 'list-users' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'list-users',
        component: () => import('../components/Users/List.vue'),
      },
      {
        path: 'create',
        name: 'create-user',
        component: () => import('../components/Users/CreateUser.vue'),
        props: (route) => ({userId: route.query.userId})
      }
    ]
  },
];
