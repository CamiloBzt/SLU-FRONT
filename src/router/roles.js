export const roles = [
  //HOME
  {
    path: '/roles',
    name: 'roles',
    component: () => import('../views/Roles/Roles.vue'),
    redirect: { name: 'list-roles' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'list-roles',
        component: () => import('../components/Roles/List.vue'),
      },
      {
        path: 'create-role',
        name: 'create-role',
        component: () => import('../components/Roles/Create.vue'),
        props: (route) => ({roleId: route.query.roleId})
      }
    ]
  },
];
// :preApplicationId(\\d+) 