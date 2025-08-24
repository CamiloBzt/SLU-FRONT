export const activities = [
  {
    path: "/activities",
    name: "activities",
    component: () => import("../views/Activities/Activities.vue"),
    redirect: { name: "list-activities" },
    meta: { requiresAuth: true },
    children: [
      {
        path: "list",
        name: "list-activities",
        component: () => import("../components/Activities/List.vue"),
      },
      {
        path: "create",
        name: "create-activity",
        component: () => import("../components/Activities/CreateActivity.vue"),
        props: (route) => ({ activityId: route.query.activityId }),
      },
    ],
  },
];
