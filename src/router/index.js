import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

import { create } from "./Create";
import { dashboard } from "./Dashboard";
import { login } from "./Login";
import { portfolio } from "./Portfolio";
import { subscription } from "./Subscription";
import { activation } from "./activation";
import { activities } from "./activities";
import { brokers } from "./brokers";
import { cedents } from "./cedents";
import { claims } from "./claims";
import { contacts } from "./contacts";
import { countries } from "./countries";
import { currencies } from "./currencies";
import { lineOfRisk } from "./lineOfRisk";
import { renewals } from "./renewals";
import { roles } from "./roles";
import { users } from "./users";
import { wallet } from "./wallet";

// Rutas de la segunda versión de SLU
import { AppRoutes } from "@/modules/home/home.routes";
Vue.use(VueRouter);

const globalRoutes = [
  //LOGIN
];

const routes = globalRoutes.concat(
  activation,
  subscription,
  dashboard,
  create,
  login,
  users,
  roles,
  claims,
  renewals,
  brokers,
  cedents,
  lineOfRisk,
  activities,
  currencies,
  countries,
  contacts,
  AppRoutes,
  wallet,
  portfolio
);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/* destructured store */
const { dispatch, getters, commit } = store;

/* Route Protection */
router.beforeEach((to, from, next) => {
  /* is token stored */
  if (localStorage.getItem("sessionToken"))
    dispatch("setToken", { token: localStorage.getItem("sessionToken") });
  commit("setTokenOutlook", localStorage.getItem("tokenOutlook"));
  const isUserLoggedIn = getters.isAuthenticated;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedIn || isUserLoggedIn === false) {
      dispatch("logOut");
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
