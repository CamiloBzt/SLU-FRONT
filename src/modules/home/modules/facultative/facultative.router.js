import FacultativeDistributionViewVue from "./distribution/FacultativeDistributionView.vue"
import FacultativeDetailViewVue from "./detail/FacultativeDetailView.vue"
import FacultativeSummaryViewVue from "./summary/FacultativeSummaryView.vue"

export const facultativeRoutes = [
  {
    path: '/facultative',
    meta: { requiresAuth: false },
    name: 'Facultative',
		component: FacultativeDistributionViewVue
  },
  {
    path: '/facultative/detail',
    meta: { requiresAuth: false },
    name: 'Facultative',
		component: FacultativeDetailViewVue
  },
  {
    path: '/facultative/summary',
    name: 'Facultative',
    meta: { requiresAuth: false },
		component: FacultativeSummaryViewVue
  }
]