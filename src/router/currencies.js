export const currencies = [
  {
    path: "/currencies",
    name: "currencies",
    component: () => import("../views/Currencies/Currencies.vue"),
    redirect: { name: "list-currencies" },
    meta: { requiresAuth: true },
    children: [
      {
        path: "list",
        name: "list-currencies",
        component: () => import("../components/Currencies/List.vue"),
      },
      {
        path: "create",
        name: "create-currency",
        component: () => import("../components/Currencies/CreateCurrency.vue"),
        props: (route) => ({ currencyId: route.query.currencyId }),
      },
    ],
  },
];
