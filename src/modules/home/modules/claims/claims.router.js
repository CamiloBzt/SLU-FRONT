import ClaimsDashboardView from "./ClaimsDashboardView.vue";
import CreateClaim from "./components/CreateClaim.vue";

export const claimsRoutes = [
  {
    path: "/claims/dashboard/:id",
    meta: { requiresAuth: false },
    name: "Claims",
    component: ClaimsDashboardView,
  },
  {
    path: "/claims/create-claim",
    meta: { requiresAuth: false },
    name: "New Claim",
    component: CreateClaim,
  },
];
