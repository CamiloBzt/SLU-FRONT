import EndorsementsEngineeringView from "./engineering/EndorsementsEngineeringView.vue";
import EndorsementsPropertyQuotatorView from "./property-quotator/EndorsementsPropertyQuotatorView.vue";

export const endorsementRoutes = [
  {
    path: "/endorsements/engineering/:id",
    meta: { requiresAuth: false },
    name: "Engineering Endorsements",
    component: EndorsementsEngineeringView,
  },
  {
    path: "/endorsements/property-quotator/:id",
    meta: { requiresAuth: false },
    name: "Property Quotator endorsements",
    component: EndorsementsPropertyQuotatorView,
  },
];
