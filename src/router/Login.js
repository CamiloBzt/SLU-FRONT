import { RouteConfig } from 'vue-router';
export const login = [
  {
    path: "/",
    name: "Login home",
    redirect: '/login',
    component: () => import("../views/Login/Login.vue"),
    children:[
      {
        path:'/login',
        name:'login',
        component: () => import('@/components/Login/LoginComponent.vue'),
      },
      {
        path:'/reset',
        name: "Reset password",
        component: () => import('@/components/Login/ResetPassword.vue'),
      },
      {
        path:'/check-your-slu-email',
        name:'Check your email',
        component: () => import('@/components/Login/ChekYourEmail.vue'),
      },
      {
        path:'/create-new-password',
        name:'Create new password',
        component: () => import('@/components/Login/CreateNewPassword.vue'),
      },
      {
        path:'/congratulations',
        name:'Congratulations',
        component: () => import('@/components/Login/Congratulations.vue'),
      }
    ]
  },
];
