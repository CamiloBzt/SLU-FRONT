export const lineOfRisk = [
  {
    path: "/line-of-risk",
    name: "line-of-risk",
    component: () => import("../views/LineOfRisk/LineOfRisk.vue"),
    redirect: { name: "list-line-of-risk" },
    meta: { requiresAuth: true },
    children: [
      {
        path: "list",
        name: "list-line-of-risk",
        component: () => import("../components/LineOfRisk/List.vue"),
      },
      {
        path: "create",
        name: "create-line-of-risk",
        component: () =>
          import("../components/LineOfRisk/CreateLineOfRisk.vue"),
        props: (route) => ({ lineOfRiskId: route.query.lineOfRiskId }),
      },
    ],
  },
];
