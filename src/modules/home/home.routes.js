import HomeLayout from './HomeLayout.vue'
import { HomeRoutes } from './modules/home.routes'

export const AppRoutes = [
    {
        path: '/',
        name: 'HomeLayout',
        component: HomeLayout,
        children: HomeRoutes
    }
]