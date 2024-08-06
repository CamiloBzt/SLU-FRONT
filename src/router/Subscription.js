import store from '../store';
import { RouteConfig } from 'vue-router';

export const subscription = [
  //HOME
  {
    path: '/subscription/',
    name: 'Subs home',
    component: () => import('../views/Subscription/Home.vue'),
    meta: { requiresAuth: true },
  },
  // SUBMISSION
  {
    path: '/underwriting/submission',
    name: 'Subs submission',
    component: () => import('../views/Subscription/Submission.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/underwriting/:subscriptionId/submission',
    name: 'Edit Subs submission',
    component: () => import('../views/Subscription/Submission.vue'),
    meta: { requiresAuth: true },
    async beforeEnter(to, from, next) {
      if (to.params && to.params.subscriptionId) {
        const id = to.params.subscriptionId;
        const valid = await validateSubscriptionRoute(id);
        if (valid) {
          next();
        } else {
          next('/dashboard');
        }
      } else {
        next();
      }
    },
  },
  {
    path: '/subscription/quotation/non-proportional',
    name: 'Quotation non proportional',
    component: () => import('../views/Subscription/QuotationNonProportional.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/subscription/quotation/proportional',
    name: 'Quotation proportional',
    component: () => import('../views/Subscription/QuotationProportional.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/subscription/:subscriptionId/quotation/proportional',
    name: 'Edit Subs quotation',
    component: () => import('../views/Subscription/QuotationProportional.vue'),
    meta: { requiresAuth: true },
    async beforeEnter(to, from, next) {
      if (to.params && to.params.subscriptionId) {
        const id = to.params.subscriptionId;
        const valid = await validateSubscriptionRoute(id);
        if (valid) {
          next();
        } else {
          next('/dashboard');
        }
      } else {
        next();
      }
    },
  },
  {
    path: '/subscription/:subscriptionId/quotation/non-proportional',
    name: 'Edit Subs quotation non-proportional',
    component: () => import('../views/Subscription/QuotationNonProportional.vue'),
    meta: { requiresAuth: true },
    async beforeEnter(to, from, next) {
      if (to.params && to.params.subscriptionId) {
        const id = to.params.subscriptionId;
        const valid = await validateSubscriptionRoute(id);
        if (valid) {
          next();
        } else {
          next('/dashboard');
        }
      } else {
        next();
      }
    },
  },
  //NOTES
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('../views/Subscription/Notes.vue'),
    meta: { requiresAuth: true },
  },
  //Bound
  {
    path: '/subscription/bound',
    name: 'Bound',
    component: () => import('../views/Subscription/BoundEngineering.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/subscription/:subscriptionId/bound/property-quotator-proportional',
    name: 'Bound Property Quotator Proportional',
    component: () => import('../views/Subscription/BoundPropertyQuotatorProportional.vue'),
    meta: { requiresAuth: true },
    async beforeEnter(to, from, next) {
      if (to.params && to.params.subscriptionId) {
        const id = to.params.subscriptionId;
        const valid = await validateSubscriptionRoute(id);
        if (valid) {
          next();
        } else {
          next('/dashboard');
        }
      } else {
        next();
      }
    },
  },
  {
    path: '/subscription/:subscriptionId/bound/property-quotator-non-proportional',
    name: 'Bound Property Quotator Non Proportional',
    component: () => import('../views/Subscription/BoundPropertyQuotatorNonProportional.vue'),
    meta: { requiresAuth: true },
    async beforeEnter(to, from, next) {
      if (to.params && to.params.subscriptionId) {
        const id = to.params.subscriptionId;
        const valid = await validateSubscriptionRoute(id);
        if (valid) {
          next();
        } else {
          next('/dashboard');
        }
      } else {
        next();
      }
    },
  },
  {
    path: '/subscription/:subscriptionId/bound',
    name: 'Edit Bound',
    component: () => import('../views/Subscription/BoundEngineering.vue'),
    meta: { requiresAuth: true },
    async beforeEnter(to, from, next) {
      if (to.params && to.params.subscriptionId) {
        const id = to.params.subscriptionId;
        const valid = await validateSubscriptionRoute(id);
        if (valid) {
          next();
        } else {
          next('/dashboard');
        }
      } else {
        next();
      }
    },
  },

  //Endorsements
  {
    path: '/subscription/endorsements',
    name: 'Endorsements Car Ear',
    component: () => import('../views/Subscription/Endorsements.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/subscription/endorsements/pro-cpe-cecr',
    name: 'Endorsements Pro Cpe Cecr',
    component: () => import('../views/Subscription/EndorsementsProCpeCecr.vue'),
    meta: { requiresAuth: true },
  },

];

const validateSubscriptionRoute = async (id) => {
  const exists = await store.dispatch('existsSubscription', { id });
  return exists;
};
