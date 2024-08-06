export const claims = [
  //HOME
  {
    path: "/claims",
    name: "Claims Home",
    meta: { requiresAuth: true },
    redirect: {
      name: "Register Claims",
    },
  },
  {
    path: "/claims/register-claims",
    name: "Register Claims",
    component: () => import("../views/Claims/Home.vue"),
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/claims/make-reports",
  //   name: "make-report",
  //   component: () => import("../views/Claims/makeReports.vue"),
  //   meta: { requiresAuth: true },
  //   props: (route) => ({ claimId: route.query.claimId }),
  // },
  // {
  //   path: "/claims/payment",
  //   name: "Claims Payment",
  //   component: () => import("../views/Claims/ClaimsPayment"),
  //   meta: { requiresAuth: true },
  // },
];
