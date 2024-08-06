import ReinsurersHIstory from "./services/ReinsurersHIstory.vue";
import DetailsReinsurer from "./services/DetailsReinsurer.vue";

export const reinsurersRoutes = [
    {
        path: '/reinsurers',
        meta: { requiresAuth: false },
        name: 'Reinsurers',
        component: ReinsurersHIstory
    },
    {
        path: '/reinsurers/:id',
        meta: { requiresAuth: false },
        name: 'Details Reinsurer',
        component: DetailsReinsurer
    }
]