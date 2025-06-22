export const countries = [
  {
    path: "/countries",
    name: "countries",
    component: () => import("../views/Countries/Countries.vue"),
    redirect: { name: "list-countries" },
    meta: { requiresAuth: true },
    children: [
      {
        path: "list",
        name: "list-countries",
        component: () => import("../components/Countries/List.vue"),
      },
      {
        path: "create",
        name: "create-country",
        component: () => import("../components/Countries/CreateCountry.vue"),
        props: (route) => ({ countryId: route.query.countryId }),
      },
    ],
  },
];
